/* Guía de estudio FPEN: interacción compartida.
   Todo el progreso se guarda solo en este navegador (localStorage).
   La clave es propia de este curso: las guías de GitHub Pages comparten el dominio usuario.github.io
   y, con la misma clave, el progreso de un curso pisaría el de otro.
   Si el navegador bloquea el almacenamiento, la guía funciona igual pero no recuerda nada. */
(function () {
  "use strict";

  var CLAVE = "fpen-guia-v1";

  function leer() {
    try {
      var crudo = window.localStorage.getItem(CLAVE);
      var datos = crudo ? JSON.parse(crudo) : {};
      datos.checks = datos.checks || {};
      datos.quiz = datos.quiz || {};
      datos.semanas = datos.semanas || {};
      datos.textos = datos.textos || {};
      datos.sim = datos.sim || {};
      return datos;
    } catch (e) {
      return { checks: {}, quiz: {}, semanas: {}, textos: {}, sim: {} };
    }
  }

  function guardar(datos) {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ }
  }

  var estado = leer();
  var semana = document.body.getAttribute("data-semana"); // "s1", "s2"..., "c1" (Control 01) o null en el índice
  // clave del progreso: la semana, salvo en el Control 01, donde la guía (c1g) y el repaso (c1r) llevan cuentas separadas
  var claveProg = document.body.getAttribute("data-progreso") || semana;

  /* ---------- Tema claro / oscuro ---------- */
  function aplicarTema(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  try { aplicarTema(window.localStorage.getItem(CLAVE + "-tema")); } catch (e) { /* nada */ }
  function alternarTema() {
    var actual = document.documentElement.getAttribute("data-theme");
    var oscuroSistema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var esOscuro = actual ? actual === "dark" : oscuroSistema;
    var nuevo = esOscuro ? "light" : "dark";
    aplicarTema(nuevo);
    try { window.localStorage.setItem(CLAVE + "-tema", nuevo); } catch (e) { /* nada */ }
  }
  document.querySelectorAll(".theme-btn").forEach(function (btn) { btn.addEventListener("click", alternarTema); });

  /* ---------- Checklist de progreso ---------- */
  var checks = Array.prototype.slice.call(document.querySelectorAll("input[type=checkbox][data-track]"));

  function actualizarProgreso() {
    var total = checks.length;
    var hechos = checks.filter(function (c) { return c.checked; }).length;
    var pct = total ? Math.round((hechos / total) * 100) : 0;
    document.querySelectorAll("[data-progreso-pagina]").forEach(function (el) {
      var barra = el.querySelector(".progress-bar > span");
      var etiqueta = el.querySelector(".progress-label");
      if (barra) barra.style.width = pct + "%";
      if (etiqueta) etiqueta.textContent = hechos + " de " + total + " actividades marcadas (" + pct + " %)";
    });
    if (claveProg) {
      var previo = estado.semanas[claveProg] || {};
      previo.hechos = hechos;
      previo.total = total;
      estado.semanas[claveProg] = previo;
      guardar(estado);
    }
  }

  checks.forEach(function (c) {
    var id = c.getAttribute("data-track");
    c.checked = !!estado.checks[id];
    c.addEventListener("change", function () {
      if (c.checked) estado.checks[id] = true;
      else delete estado.checks[id];
      guardar(estado);
      actualizarProgreso();
    });
  });
  if (checks.length) actualizarProgreso();

  /* ---------- Quiz (reading checkpoint) ---------- */
  function barajar(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // El resumen de la semana suma todas las preguntas de todos los quizzes de la página.
  function resumenQuizSemana() {
    if (!claveProg) return;
    var todas = document.querySelectorAll(".quiz .qq");
    var ok = 0;
    todas.forEach(function (q) {
      var r = estado.quiz[q.getAttribute("data-q")];
      if (r && r.ok) ok++;
    });
    var previo = estado.semanas[claveProg] || {};
    previo.quizOk = ok;
    previo.quizTotal = todas.length;
    estado.semanas[claveProg] = previo;
    guardar(estado);
  }

  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var preguntas = Array.prototype.slice.call(quiz.querySelectorAll(".qq"));
    var marcador = quiz.querySelector("[data-score]");

    function puntuar() {
      var ok = 0, resp = 0;
      preguntas.forEach(function (q) {
        var r = estado.quiz[q.getAttribute("data-q")];
        if (r) { resp++; if (r.ok) ok++; }
      });
      if (marcador) {
        marcador.textContent = resp === 0
          ? "Aún no respondes ninguna pregunta (" + preguntas.length + " en total)."
          : "Llevas " + ok + " de " + resp + " correctas (" + preguntas.length + " preguntas en total).";
      }
      resumenQuizSemana();
    }

    function mostrar(q, elegido) {
      q.classList.add("respondida");
      q.querySelectorAll(".quiz-opt").forEach(function (b) {
        b.disabled = true;
        if (b.hasAttribute("data-ok")) b.classList.add("correcta");
        else if (b.getAttribute("data-i") === String(elegido)) b.classList.add("incorrecta");
      });
    }

    preguntas.forEach(function (q, n) {
      var id = q.getAttribute("data-q");
      var cont = q.querySelector(".quiz-opts");
      var opciones = Array.prototype.slice.call(cont.querySelectorAll(".quiz-opt"));
      opciones.forEach(function (b, i) { b.setAttribute("data-i", i); b.type = "button"; });
      barajar(opciones).forEach(function (b) { cont.appendChild(b); });

      var primero = q.querySelector("p");
      if (primero && !primero.querySelector(".num")) {
        var s = document.createElement("span");
        s.className = "num";
        s.textContent = (n + 1) + ".";
        primero.insertBefore(s, primero.firstChild);
      }

      var guardada = estado.quiz[id];
      if (guardada) mostrar(q, guardada.i);

      opciones.forEach(function (b) {
        b.addEventListener("click", function () {
          if (q.classList.contains("respondida")) return;
          var i = Number(b.getAttribute("data-i"));
          estado.quiz[id] = { i: i, ok: b.hasAttribute("data-ok") };
          guardar(estado);
          mostrar(q, i);
          puntuar();
        });
      });
    });

    var reiniciar = quiz.querySelector("[data-reset]");
    if (reiniciar) {
      reiniciar.addEventListener("click", function () {
        preguntas.forEach(function (q) {
          delete estado.quiz[q.getAttribute("data-q")];
          q.classList.remove("respondida");
          var cont = q.querySelector(".quiz-opts");
          var opciones = Array.prototype.slice.call(cont.querySelectorAll(".quiz-opt"));
          opciones.forEach(function (b) { b.disabled = false; b.classList.remove("correcta", "incorrecta"); });
          barajar(opciones).forEach(function (b) { cont.appendChild(b); });
        });
        guardar(estado);
        puntuar();
      });
    }
    puntuar();
  });

  /* ---------- Tablas de traza ---------- */
  function normalizar(v) {
    return String(v).trim().toLowerCase()
      .replace(/^["'](.*)["']$/, "$1")
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ", ");
  }
  function coincide(escrito, esperado) {
    var e = normalizar(escrito);
    if (e === "") return false;
    return esperado.split("|").some(function (alt) {
      var a = normalizar(alt);
      if (e === a) return true;
      var ne = Number(e.replace(",", ".")), na = Number(a);
      return a !== "" && !isNaN(ne) && !isNaN(na) && Math.abs(ne - na) < 1e-9;
    });
  }

  document.querySelectorAll(".traza").forEach(function (tz) {
    var entradas = Array.prototype.slice.call(tz.querySelectorAll("input[data-a]"));
    var res = tz.querySelector(".resultado");
    entradas.forEach(function (inp) {
      inp.setAttribute("autocomplete", "off");
      inp.setAttribute("spellcheck", "false");
      inp.addEventListener("input", function () { inp.classList.remove("bien", "mal"); });
    });
    var bComprobar = tz.querySelector("[data-comprobar]");
    var bSolucion = tz.querySelector("[data-solucion]");
    var bLimpiar = tz.querySelector("[data-limpiar]");
    if (bComprobar) bComprobar.addEventListener("click", function () {
      var bien = 0;
      entradas.forEach(function (inp) {
        var ok = coincide(inp.value, inp.getAttribute("data-a"));
        inp.classList.toggle("bien", ok);
        inp.classList.toggle("mal", !ok);
        if (ok) bien++;
      });
      if (res) res.textContent = bien === entradas.length
        ? "¡Traza completa y correcta! " + bien + "/" + entradas.length
        : bien + " de " + entradas.length + " celdas correctas. Revisa las marcadas en rojo.";
    });
    if (bSolucion) bSolucion.addEventListener("click", function () {
      entradas.forEach(function (inp) {
        inp.value = inp.getAttribute("data-a").split("|")[0];
        inp.classList.remove("mal");
        inp.classList.add("bien");
      });
      if (res) res.textContent = "Solución mostrada. Intenta explicar cada celda en voz alta.";
    });
    if (bLimpiar) bLimpiar.addEventListener("click", function () {
      entradas.forEach(function (inp) { inp.value = ""; inp.classList.remove("bien", "mal"); });
      if (res) res.textContent = "";
    });
  });

  /* ---------- Botón copiar en bloques de código ---------- */
  document.querySelectorAll("pre > code").forEach(function (code) {
    var pre = code.parentElement;
    if (pre.classList.contains("salida")) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copy-btn";
    b.textContent = "Copiar";
    b.addEventListener("click", function () {
      var texto = code.innerText;
      function listo() { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 1400); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(listo, function () { b.textContent = "Selecciona y copia"; });
      } else {
        b.textContent = "Selecciona y copia";
      }
    });
    pre.appendChild(b);
  });

  /* ---------- Ventanas de código (Source de RStudio) y Console ---------- */
  function nombreLenguaje(pre, code) {
    var archivo = pre.getAttribute("data-file") || "";
    if (code.classList.contains("language-r")) return ["r", "R"];
    if (code.classList.contains("language-csv") || /\.csv$/.test(archivo)) return ["csv", "CSV"];
    if (code.classList.contains("language-bash")) return ["bash", "Terminal"];
    return ["texto", "Texto"];
  }
  document.querySelectorAll("pre").forEach(function (pre) {
    var code = pre.querySelector("code");
    if (!code || pre.classList.contains("mini") || pre.parentElement.classList.contains("ventana")) return;
    var salida = pre.classList.contains("salida");
    var ventana = document.createElement("div");
    ventana.className = "ventana" + (salida ? " terminal" : "");
    var barra = document.createElement("div");
    barra.className = "ventana-barra";
    var archivo = document.createElement("span");
    archivo.className = "ventana-archivo";
    if (salida) {
      archivo.textContent = pre.getAttribute("data-file") || "Console";
      barra.appendChild(archivo);
      var ruta = document.createElement("span");
      ruta.className = "ruta";
      ruta.textContent = pre.getAttribute("data-ruta") || "~/fpen/";
      barra.appendChild(ruta);
    } else {
      var lang = nombreLenguaje(pre, code);
      var pestana = document.createElement("span");
      pestana.className = "pestana";
      pestana.setAttribute("data-tipo", lang[0]);
      archivo.textContent = pre.getAttribute("data-file") || (lang[0] === "r" ? "script.R" : "texto");
      pestana.appendChild(archivo);
      var etiqueta = document.createElement("span");
      etiqueta.className = "ventana-lang";
      etiqueta.setAttribute("data-lang", lang[0]);
      etiqueta.textContent = lang[1];
      barra.appendChild(pestana);
      barra.appendChild(etiqueta);
      var copiar = pre.querySelector(".copy-btn");
      if (copiar) barra.appendChild(copiar);
      var n = code.textContent.replace(/\n+$/, "").split("\n").length;
      var lineas = document.createElement("span");
      lineas.className = "lineas";
      lineas.setAttribute("aria-hidden", "true");
      var numeros = [];
      for (var i = 1; i <= n; i++) numeros.push(i);
      lineas.textContent = numeros.join("\n");
      pre.insertBefore(lineas, code);
    }
    pre.parentNode.insertBefore(ventana, pre);
    ventana.appendChild(barra);
    ventana.appendChild(pre);
  });

  /* ---------- Respuesta escrita antes de ver la solución ----------
     Un <textarea data-min> dentro de un ejercicio bloquea sus <details class="solucion"> hasta escribir
     ese mínimo de caracteres. Lo escrito se guarda en este navegador. */
  document.querySelectorAll(".respuesta textarea").forEach(function (ta) {
    var ej = ta.closest(".ejercicio");
    var min = Number(ta.getAttribute("data-min") || 0);
    var id = ta.getAttribute("data-id");
    var cuenta = ta.parentElement.querySelector(".cuenta");
    var bloqueables = ej ? Array.prototype.slice.call(ej.querySelectorAll("details.solucion")) : [];
    if (id && estado.textos[id]) ta.value = estado.textos[id];
    function revisar() {
      var n = ta.value.trim().length;
      if (cuenta) cuenta.textContent = min ? Math.min(n, min) + " / " + min + " caracteres" : n + " caracteres";
      bloqueables.forEach(function (d) { d.classList.toggle("bloqueado", n < min); if (n < min) d.open = false; });
    }
    ta.addEventListener("input", function () {
      if (id) { estado.textos[id] = ta.value; guardar(estado); }
      revisar();
    });
    bloqueables.forEach(function (d) {
      d.querySelector("summary").addEventListener("click", function (e) {
        if (d.classList.contains("bloqueado")) { e.preventDefault(); ta.focus(); }
      });
    });
    revisar();
  });

  /* ---------- Simulacro cronometrado ----------
     .simulacro[data-id][data-minutos]: las soluciones quedan cerradas hasta finalizar o hasta que se acabe el tiempo. */
  document.querySelectorAll(".simulacro").forEach(function (sim) {
    var id = sim.getAttribute("data-id") || "sim";
    var minutos = Number(sim.getAttribute("data-minutos") || 45);
    var reloj = sim.querySelector(".reloj"), est = sim.querySelector(".estado-sim");
    var bIniciar = sim.querySelector("[data-sim-iniciar]"), bFinalizar = sim.querySelector("[data-sim-finalizar]"), bReiniciar = sim.querySelector("[data-sim-reiniciar]");
    var soluciones = Array.prototype.slice.call(sim.querySelectorAll("details.solucion"));
    var tick = null;
    function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); var m = Math.floor(s / 60); s = s % 60; return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; }
    function cerrar(c) {
      soluciones.forEach(function (d) { d.classList.toggle("cerrado-sim", c); if (c) d.open = false; });
    }
    soluciones.forEach(function (d) {
      d.querySelector("summary").addEventListener("click", function (e) { if (d.classList.contains("cerrado-sim")) e.preventDefault(); });
    });
    function pintar() {
      var s = estado.sim[id] || {};
      clearInterval(tick);
      if (s.fin) {
        cerrar(false);
        reloj.textContent = fmt(0); reloj.classList.remove("poco");
        est.textContent = "Simulacro terminado: revisión abierta. Compara cada respuesta con los criterios.";
        bIniciar.hidden = true; bFinalizar.hidden = true; bReiniciar.hidden = false;
      } else if (s.inicio) {
        cerrar(true);
        bIniciar.hidden = true; bFinalizar.hidden = false; bReiniciar.hidden = true;
        var limite = s.inicio + minutos * 60000;
        var paso = function () {
          var resta = limite - Date.now();
          reloj.textContent = fmt(resta);
          reloj.classList.toggle("poco", resta < 5 * 60000);
          est.textContent = "En curso. Sin IA; ejecutar R sí está permitido.";
          if (resta <= 0) { estado.sim[id] = { inicio: s.inicio, fin: Date.now() }; guardar(estado); pintar(); }
        };
        paso(); tick = setInterval(paso, 1000);
      } else {
        cerrar(true);
        reloj.textContent = fmt(minutos * 60000); reloj.classList.remove("poco");
        est.textContent = "Sin iniciar. Las respuestas se abren al finalizar.";
        bIniciar.hidden = false; bFinalizar.hidden = true; bReiniciar.hidden = true;
      }
    }
    bIniciar.addEventListener("click", function () { estado.sim[id] = { inicio: Date.now() }; guardar(estado); pintar(); });
    bFinalizar.addEventListener("click", function () {
      if (!window.confirm("¿Finalizar el simulacro y abrir las respuestas?")) return;
      estado.sim[id].fin = Date.now(); guardar(estado); pintar();
    });
    bReiniciar.addEventListener("click", function () { delete estado.sim[id]; guardar(estado); pintar(); });
    pintar();
  });

  /* ---------- Borrar progreso ---------- */
  document.querySelectorAll("[data-borrar-progreso]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!window.confirm("¿Borrar todas las casillas y respuestas guardadas en este navegador?")) return;
      try { window.localStorage.removeItem(CLAVE); } catch (e) { /* nada */ }
      window.location.reload();
    });
  });

  /* ---------- Página de inicio: progreso por semana ---------- */
  document.querySelectorAll("[data-progreso-semana]").forEach(function (el) {
    var a = avance(el.getAttribute("data-progreso-semana"));
    var barra = el.querySelector(".progress-bar > span");
    var etiqueta = el.querySelector(".progress-label");
    if (!a.total) { if (etiqueta) etiqueta.textContent = "Sin empezar"; return; }
    if (barra) barra.style.width = a.pct + "%";
    var txt = a.hechos + "/" + a.total + " actividades";
    if (a.quizTotal) txt += " · quiz " + a.quizOk + "/" + a.quizTotal;
    if (etiqueta) etiqueta.textContent = txt;
  });

  var RAIZ = document.body.getAttribute("data-raiz") || "";
  var sinMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TITULOS = ["R como herramienta para pensar con datos", "De valores individuales a conjuntos de datos",
                 "Visualizar antes de modelar", "Transformar datos para responder preguntas", "Resumir, comparar e interpretar",
                 "Primer examen parcial", "Datos que no vienen como los necesitamos", "Combinar información",
                 "Lógica y automatización para el análisis", "Explorar datos como economista",
                 "Resolver problemas con R en la era de la IA", "Segundo examen parcial"];

  function avance(clave) {
    var s = estado.semanas[clave];
    if (clave === "c1") {
      var g = estado.semanas.c1g, r = estado.semanas.c1r;
      if (g || r) {
        s = { hechos: 0, total: 0, quizOk: 0, quizTotal: 0 };
        [g, r].forEach(function (x) { if (x) { s.hechos += x.hechos || 0; s.total += x.total || 0; s.quizOk += x.quizOk || 0; s.quizTotal += x.quizTotal || 0; } });
      }
    }
    if (!s || !s.total) return { pct: 0, hechos: 0, total: 0, quizOk: 0, quizTotal: 0 };
    return { pct: Math.round((s.hechos / s.total) * 100), hechos: s.hechos, total: s.total, quizOk: s.quizOk || 0, quizTotal: s.quizTotal || 0 };
  }
  function etiquetaDe(a) { var n = a.querySelector(".n"); return n ? a.textContent.slice(n.textContent.length) : a.textContent; }
  function sinTildes(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function escHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Cinta de semanas: cada semana cotiza su avance ----------
     Corre despacio, se detiene con el cursor, con el foco o con el botón de pausa (que se recuerda).
     Con "reducir movimiento" queda quieta y se desplaza a mano. */
  var barraEl = document.querySelector(".barra");
  var pista = document.querySelector(".cinta-pista");
  if (pista) {
    pista.querySelectorAll(".tk[data-tk]").forEach(function (tk) {
      var a = avance(tk.getAttribute("data-tk"));
      var pct = tk.querySelector(".tk-pct");
      pct.textContent = (a.pct > 0 ? "▲ " : "■ ") + a.pct + " %";
      pct.setAttribute("data-estado", a.pct > 0 ? "sube" : "cero");
      var i = tk.getAttribute("data-tk") === "c1" ? -1 : Number(tk.getAttribute("data-tk").slice(1)) - 1;
      var titulo = i >= 0 ? "Semana " + (i + 1) + ": " + TITULOS[i] : tk.getAttribute("data-control");
      tk.setAttribute("title", titulo + " · " + (a.total ? a.hechos + " de " + a.total + " actividades" : "sin empezar") + (a.quizTotal ? " · quiz " + a.quizOk + "/" + a.quizTotal : ""));
      tk.setAttribute("aria-label", titulo + ", avance " + a.pct + " por ciento");
    });
    if (!sinMovimiento) {
      // copia para que la cinta sea continua; la copia no se lee ni recibe foco
      var copia = document.createElement("div");
      copia.setAttribute("aria-hidden", "true");
      copia.style.display = "contents";
      Array.prototype.forEach.call(pista.children, function (n) {
        var c = n.cloneNode(true);
        if (c.tagName === "A") c.setAttribute("tabindex", "-1");
        c.removeAttribute("aria-current");
        copia.appendChild(c);
      });
      pista.appendChild(copia);
      pista.style.setProperty("--dur-cinta", Math.max(40, Math.round(pista.scrollWidth / 45)) + "s");
    }
    var pausa = document.querySelector(".cinta-pausa");
    var pausada = false;
    try { pausada = window.localStorage.getItem(CLAVE + "-cinta") === "pausa"; } catch (e) { /* nada */ }
    function pintarPausa() {
      if (barraEl) barraEl.classList.toggle("pausada", pausada);
      if (pausa) {
        pausa.setAttribute("aria-pressed", pausada ? "true" : "false");
        pausa.setAttribute("aria-label", pausada ? "Reanudar la cinta de semanas" : "Pausar la cinta de semanas");
      }
    }
    if (pausa) {
      if (sinMovimiento) pausa.hidden = true;
      pausa.addEventListener("click", function () {
        pausada = !pausada;
        try { window.localStorage.setItem(CLAVE + "-cinta", pausada ? "pausa" : "corre"); } catch (e) { /* nada */ }
        pintarPausa();
      });
    }
    pintarPausa();
  }

  /* ---------- Índice de la página, sección actual, lectura y tiempo restante ---------- */
  var indiceBtn = document.querySelector(".indice-btn");
  var indicePop = document.getElementById("indice-pop");
  var lecturaEl = document.querySelector(".lectura > i");
  var tiempoEl = document.querySelector(".indice-tiempo");
  var mainEl = document.getElementById("contenido");
  var palabras = mainEl ? (mainEl.innerText || mainEl.textContent).split(/\s+/).length : 0;
  if (indiceBtn && indicePop) {
    var enlaces = Array.prototype.slice.call(indicePop.querySelectorAll("a[href^='#']"));
    var grupos = {};
    var grupoActual = "";
    indicePop.querySelectorAll("li").forEach(function (li) {
      if (li.classList.contains("grupo")) grupoActual = li.textContent;
      else { var a = li.querySelector("a"); if (a) grupos[a.getAttribute("href")] = grupoActual; }
    });
    var numEl = indiceBtn.querySelector(".indice-num"), titEl = indiceBtn.querySelector(".indice-tit"), momEl = indiceBtn.querySelector(".indice-mom");
    var total = enlaces.length;
    function marcar(a) {
      enlaces.forEach(function (x) { x.removeAttribute("aria-current"); });
      a.setAttribute("aria-current", "true");
      numEl.textContent = "§ " + a.querySelector(".n").textContent + "/" + total;
      titEl.textContent = etiquetaDe(a);
      momEl.textContent = grupos[a.getAttribute("href")] || "";
      momEl.setAttribute("data-mom", a.getAttribute("data-mom"));
    }
    if (enlaces.length) marcar(enlaces[0]);
    if ("IntersectionObserver" in window) {
      var mapa = {};
      enlaces.forEach(function (a) { mapa[a.getAttribute("href").slice(1)] = a; });
      var visibles = {};
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) { visibles[en.target.id] = en.isIntersecting; });
        for (var i = 0; i < enlaces.length; i++) {
          var id = enlaces[i].getAttribute("href").slice(1);
          if (visibles[id]) { marcar(enlaces[i]); break; }
        }
      }, { rootMargin: "-120px 0px -55% 0px" });
      Object.keys(mapa).forEach(function (id) { var sec = document.getElementById(id); if (sec) obs.observe(sec); });
    }
    function abrirIndice(abrir) {
      indicePop.hidden = !abrir;
      indiceBtn.setAttribute("aria-expanded", abrir ? "true" : "false");
      if (abrir) {
        var cur = indicePop.querySelector('[aria-current="true"]') || enlaces[0];
        if (cur) { cur.scrollIntoView({ block: "nearest" }); cur.focus({ preventScroll: true }); }
      }
    }
    indiceBtn.addEventListener("click", function () { abrirIndice(indicePop.hidden); });
    indicePop.addEventListener("click", function (e) { if (e.target.closest("a")) abrirIndice(false); });
    document.addEventListener("click", function (e) {
      if (!indicePop.hidden && !e.target.closest(".indice-fila")) abrirIndice(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !indicePop.hidden) { abrirIndice(false); indiceBtn.focus(); }
      if (!indicePop.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        var i = enlaces.indexOf(document.activeElement);
        if (i >= 0) { e.preventDefault(); enlaces[Math.max(0, Math.min(enlaces.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)))].focus(); }
      }
    });
  }
  var pendiente = false;
  function medirLectura() {
    pendiente = false;
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    var f = alto > 0 ? Math.min(1, Math.max(0, window.scrollY / alto)) : 0;
    if (lecturaEl) lecturaEl.parentNode.style.setProperty("--leido", f.toFixed(4));
    if (tiempoEl && palabras) {
      var min = Math.ceil((palabras * (1 - f)) / 200);
      tiempoEl.textContent = f > .985 ? "Terminaste la edición" : "Faltan ~" + min + " min de lectura";
    }
  }
  window.addEventListener("scroll", function () { if (!pendiente) { pendiente = true; window.requestAnimationFrame(medirLectura); } }, { passive: true });
  window.addEventListener("resize", medirLectura);
  medirLectura();

  /* ---------- Buscador (Ctrl K): semanas, secciones, ejercicios y funciones de R ---------- */
  var buscarBtn = document.querySelector(".buscar-btn");
  var dialogo = null, entradasBusqueda = null, resultados = [], elegido = 0;
  function entradasLocales() {
    var lista = [];
    document.querySelectorAll(".cinta-pista > .tk[href]").forEach(function (a) {
      lista.push({ k: "semana", t: a.getAttribute("title") ? a.getAttribute("title").split(" · ")[0] : a.textContent, d: "", u: a.getAttribute("href"), abs: true });
    });
    if (indicePop) indicePop.querySelectorAll("a").forEach(function (a) {
      lista.push({ k: "sección", t: etiquetaDe(a), d: document.title, u: a.getAttribute("href"), abs: true });
    });
    document.querySelectorAll("article.ejercicio[id] h3").forEach(function (h) {
      lista.push({ k: "ejercicio", t: h.textContent, d: document.title, u: "#" + h.closest("article").id, abs: true });
    });
    return lista;
  }
  function cargarEntradas() {
    if (entradasBusqueda) return Promise.resolve(entradasBusqueda);
    if (!/^https?:$/.test(location.protocol) || !window.fetch) { entradasBusqueda = entradasLocales(); return Promise.resolve(entradasBusqueda); }
    return fetch(RAIZ + "assets/buscar.json").then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (j) { entradasBusqueda = j; return j; })
      .catch(function () { entradasBusqueda = entradasLocales(); return entradasBusqueda; });
  }
  function urlDe(e) {
    if (e.abs) return e.u;
    var aqui = location.pathname.replace(/index\.html$/, "");
    var destino = e.u.split("#");
    var ruta = RAIZ + destino[0];
    // si el destino es esta misma página, basta con el ancla
    try {
      var abs = new URL(ruta, location.href).pathname.replace(/index\.html$/, "");
      if (abs === aqui && destino[1]) return "#" + destino[1];
    } catch (err) { /* nada */ }
    return ruta + (destino[1] ? "#" + destino[1] : "");
  }
  function pintarResultados(q) {
    var lista = dialogo.querySelector(".buscador-res");
    var nq = sinTildes(q.trim());
    var palabrasQ = nq.split(/\s+/).filter(Boolean);
    var base = entradasBusqueda || [];
    if (!palabrasQ.length) {
      var aquiRuta = location.pathname;
      resultados = base.filter(function (e) { return e.k === "semana"; }).slice(0, 9);
    } else {
      resultados = base.map(function (e) {
        var t = sinTildes(e.t), d = sinTildes(e.d || "");
        var ok = palabrasQ.every(function (w) { return t.indexOf(w) >= 0 || d.indexOf(w) >= 0; });
        if (!ok) return null;
        var p = 0;
        if (t.indexOf(nq) === 0) p += 6; else if (t.indexOf(nq) >= 0) p += 4;
        palabrasQ.forEach(function (w) { if (t.indexOf(w) >= 0) p += 2; else p += .5; });
        if (e.k === "función" && /\(/.test(q)) p += 3;
        return { e: e, p: p };
      }).filter(Boolean).sort(function (a, b) { return b.p - a.p; }).slice(0, 30).map(function (x) { return x.e; });
    }
    elegido = 0;
    if (!resultados.length) { lista.innerHTML = '<li class="buscador-vacio">Nada con “' + escHtml(q) + '”. Prueba con una función (<code>filter</code>) o un tema (vectores).</li>'; return; }
    lista.innerHTML = resultados.map(function (e, i) {
      var t = escHtml(e.t);
      if (palabrasQ.length) {
        palabrasQ.forEach(function (w) {
          var st = sinTildes(t), j = st.indexOf(w);
          if (j >= 0 && w.length > 1) t = t.slice(0, j) + "<mark>" + t.slice(j, j + w.length) + "</mark>" + t.slice(j + w.length);
        });
      }
      var tipo = e.k === "función" ? "funcion" : e.k;
      return '<li role="presentation"><a role="option" id="bres-' + i + '" href="' + escHtml(urlDe(e)) + '" aria-selected="' + (i === 0) + '">' +
        '<span class="tipo" data-tipo="' + tipo + '">' + escHtml(e.k) + '</span><span class="t">' + t + '</span><span class="d">' + escHtml(e.d || "") + "</span></a></li>";
    }).join("");
  }
  function mover(delta) {
    var as = dialogo.querySelectorAll(".buscador-res a");
    if (!as.length) return;
    elegido = (elegido + delta + as.length) % as.length;
    as.forEach(function (a, i) { a.setAttribute("aria-selected", i === elegido ? "true" : "false"); });
    as[elegido].scrollIntoView({ block: "nearest" });
    dialogo.querySelector("input").setAttribute("aria-activedescendant", as[elegido].id);
  }
  function abrirBuscador() {
    if (!dialogo) {
      dialogo = document.createElement("dialog");
      dialogo.className = "buscador";
      dialogo.setAttribute("aria-label", "Buscar en la guía");
      dialogo.innerHTML = '<div class="buscador-cab"><span class="ico" aria-hidden="true"></span>' +
        '<input type="search" role="combobox" aria-expanded="true" aria-controls="buscador-res" aria-autocomplete="list" placeholder="Busca una semana, un tema, un ejercicio o una función de R" autocomplete="off" spellcheck="false">' +
        '<button type="button" class="buscador-cerrar" aria-label="Cerrar">Esc</button></div>' +
        '<ol class="buscador-res" id="buscador-res" role="listbox"></ol>' +
        '<div class="buscador-pie"><span><kbd>↑</kbd> <kbd>↓</kbd> moverse</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> cerrar</span></div>';
      document.body.appendChild(dialogo);
      var inp = dialogo.querySelector("input");
      inp.addEventListener("input", function () { pintarResultados(inp.value); });
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { e.preventDefault(); dialogo.close(); }
        else if (e.key === "ArrowDown") { e.preventDefault(); mover(1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); mover(-1); }
        else if (e.key === "Enter") {
          var a = dialogo.querySelectorAll(".buscador-res a")[elegido];
          if (a) { e.preventDefault(); dialogo.close(); window.location.href = a.href; }
        }
      });
      dialogo.querySelector(".buscador-cerrar").addEventListener("click", function () { dialogo.close(); });
      dialogo.addEventListener("click", function (e) {
        if (e.target === dialogo) dialogo.close();
        if (e.target.closest(".buscador-res a")) dialogo.close();
      });
      dialogo.addEventListener("close", function () { if (buscarBtn) buscarBtn.focus(); });
    }
    if (typeof dialogo.showModal === "function") dialogo.showModal(); else dialogo.setAttribute("open", "");
    var input = dialogo.querySelector("input");
    input.value = "";
    input.focus();
    cargarEntradas().then(function () { pintarResultados(input.value); });
  }
  if (buscarBtn) buscarBtn.addEventListener("click", abrirBuscador);
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (dialogo && dialogo.open) dialogo.close(); else abrirBuscador();
    }
  });

  /* ---------- Gráfico de portada: la lupa ----------
     Cada <g class="dato"> trae su posición (data-x, data-y en unidades del viewBox), su valor y una nota.
     La lupa es un clon del SVG aumentado dentro de un círculo de vidrio; se mueve con el cursor, al tocar
     o con las flechas del teclado, y una región viva lee el dato en voz alta. */
  document.querySelectorAll("[data-progreso-grafico] .dato[data-semana]").forEach(function (g) {
    var a = avance(g.getAttribute("data-semana"));
    var base = Number(g.getAttribute("data-base")), tope = Number(g.getAttribute("data-tope"));
    var y = base - (base - tope) * a.pct / 100;
    var r = g.querySelector("rect.barra-g"), t = g.querySelector("text");
    r.setAttribute("y", y.toFixed(1)); r.setAttribute("height", (base - y).toFixed(1));
    t.setAttribute("y", (y - 8).toFixed(1)); t.textContent = a.pct + " %";
    g.setAttribute("data-y", y.toFixed(1));
    g.setAttribute("data-val", a.pct + " %");
    var tot = a.total || Number(g.getAttribute("data-total") || 0);
    g.setAttribute("data-nota", g.getAttribute("data-etq") + " · " + a.hechos + " de " + tot + " actividades" + (a.quizTotal ? " · quiz " + a.quizOk + "/" + a.quizTotal : ""));
  });
  document.querySelectorAll("figure[data-lupa]").forEach(function (fig) {
    var lienzo = fig.querySelector(".graf-lienzo"), svg = lienzo.querySelector("svg");
    var lectura = fig.querySelector(".graf-lectura");
    var datos = Array.prototype.slice.call(svg.querySelectorAll(".dato"));
    if (!datos.length) return;
    var horizontal = svg.classList.contains("horiz");
    var vb = svg.viewBox.baseVal;
    var Z = 2.2;
    var lupa = document.createElement("div");
    lupa.className = "lupa";
    lupa.setAttribute("aria-hidden", "true");
    var clon = svg.cloneNode(true);
    clon.removeAttribute("class");
    lupa.appendChild(clon);
    var nota = document.createElement("div");
    nota.className = "lupa-nota";
    nota.setAttribute("aria-hidden", "true");
    lienzo.appendChild(lupa);
    lienzo.appendChild(nota);
    var actual = Number(fig.getAttribute("data-inicial") || 0);
    function ir(i, anunciar) {
      actual = Math.max(0, Math.min(datos.length - 1, i));
      var g = datos[actual];
      var lr = lienzo.getBoundingClientRect(), sr = svg.getBoundingClientRect();
      var esc = sr.width / vb.width;
      var ox = sr.left - lr.left, oy = sr.top - lr.top;
      var px = ox + Number(g.getAttribute("data-x")) * esc, py = oy + Number(g.getAttribute("data-y")) * esc;
      var L = lupa.offsetWidth, W = lienzo.clientWidth, Hl = lienzo.clientHeight;
      var lx = Math.max(0, Math.min(W - L, px - L / 2)), ly = Math.max(10, Math.min(Hl - L, py - L / 2));
      lupa.style.setProperty("--lx", lx + "px");
      lupa.style.setProperty("--ly", ly + "px");
      clon.style.width = sr.width * Z + "px";
      clon.style.height = sr.height * Z + "px";
      clon.style.transform = "translate(" + ((ox - px) * Z + (px - lx)) + "px," + ((oy - py) * Z + (py - ly)) + "px)";
      var partes = g.getAttribute("data-nota").split(" · ");
      nota.innerHTML = "<b>" + escHtml(g.getAttribute("data-val")) + "</b><span>" + escHtml(partes[0]) + "</span>" + (partes.length > 1 ? "<small>" + escHtml(partes.slice(1).join(" · ")) + "</small>" : "");
      var nw = nota.offsetWidth, nh = nota.offsetHeight, H = Hl;
      var nx = lx + L / 2 > W / 2 ? lx - nw - 14 : lx + L + 14;
      if (nx < 0 || nx + nw > W) nx = lx + L / 2 > W / 2 ? 6 : W - nw - 6;
      var ny = Math.max(4, Math.min(H - nh - 4, ly + 12));
      nota.style.setProperty("--nx", nx + "px");
      nota.style.setProperty("--ny", ny + "px");
      if (anunciar && lectura) lectura.textContent = g.getAttribute("data-etq") + ": " + g.getAttribute("data-val") + ". " + partes.slice(1).join(", ");
    }
    function cercano(e) {
      var mejor = 0, d = Infinity;
      datos.forEach(function (g, i) {
        var r = (g.querySelector("circle, rect") || g).getBoundingClientRect();
        var dd = horizontal ? Math.abs(r.top + r.height / 2 - e.clientY) : Math.abs(r.left + r.width / 2 - e.clientX);
        if (dd < d) { d = dd; mejor = i; }
      });
      return mejor;
    }
    lienzo.addEventListener("pointermove", function (e) { var i = cercano(e); if (i !== actual) ir(i, false); });
    lienzo.addEventListener("pointerdown", function (e) { ir(cercano(e), true); });
    lienzo.addEventListener("keydown", function (e) {
      var k = e.key, d = 0;
      if (k === "ArrowRight" || k === "ArrowDown") d = 1;
      else if (k === "ArrowLeft" || k === "ArrowUp") d = -1;
      else if (k === "Home") { e.preventDefault(); ir(0, true); return; }
      else if (k === "End") { e.preventDefault(); ir(datos.length - 1, true); return; }
      if (d) { e.preventDefault(); ir(actual + d, true); }
    });
    lienzo.addEventListener("focus", function () { ir(actual, true); });
    var espera;
    window.addEventListener("resize", function () { clearTimeout(espera); espera = setTimeout(function () { ir(actual, false); }, 120); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ir(actual, false); });
    ir(actual, false);
  });

  /* ---------- Menú de pantalla completa ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu-completo");
  if (menuBtn && menu) {
    var n = 0;
    var entra = function (h) { return '<span class="entra" style="--i:' + (n++) + '">' + h + "</span>"; };
    var html = '<div class="menu-in"><nav aria-label="Semanas de la guía"><h2>La edición completa</h2><ol class="menu-semanas">';
    html += "<li>" + entra('<a href="' + RAIZ + 'index.html"><span class="n">↖</span><span class="tit">Inicio y temario</span><span class="pct"></span></a>') + "</li>";
    document.querySelectorAll(".cinta-pista > .tk").forEach(function (el) {
      var clave = el.getAttribute("data-tk");
      var numero = el.querySelector("b").textContent;
      if (!clave) {
        var k = Number(numero.slice(1)) - 1;
        html += "<li>" + entra('<span class="futura-m"><span class="n">' + (k < 9 ? "0" : "") + (k + 1) + '</span><span class="tit">' + TITULOS[k] + '</span><span class="pct"></span></span>') + "</li>";
        return;
      }
      var a = avance(clave);
      var cur = el.getAttribute("aria-current") === "page" ? ' aria-current="page"' : "";
      var tit = clave === "c1" ? el.getAttribute("data-control") : TITULOS[Number(clave.slice(1)) - 1];
      var num = clave === "c1" ? "C1" : "0" + clave.slice(1);
      html += "<li>" + entra('<a href="' + el.getAttribute("href") + '"' + cur + '><span class="n">' + num + '</span><span class="tit">' + tit + '</span><span class="pct">' + a.pct + " %</span></a>") + "</li>";
    });
    html += "</ol></nav>";
    if (indicePop) {
      html += '<nav aria-label="En esta página"><h2>En esta página</h2><ol class="menu-secciones">';
      indicePop.querySelectorAll("li").forEach(function (li) {
        if (li.classList.contains("grupo")) html += '<li class="grupo">' + entra(li.textContent) + "</li>";
        else { var a = li.querySelector("a"); html += "<li>" + entra('<a href="' + a.getAttribute("href") + '">' + etiquetaDe(a) + "</a>") + "</li>"; }
      });
      html += "</ol>";
    } else html += "<div>";
    html += '<button class="menu-tema" type="button"><span>Cambiar a tema claro u oscuro</span></button>' + (indicePop ? "</nav>" : "</div>");
    menu.innerHTML = html + "</div>";
    menu.querySelector(".menu-tema").addEventListener("click", alternarTema);
    var abrirMenu = function () {
      menu.hidden = false;
      void menu.offsetWidth;
      menu.classList.add("abierto");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-activo");
      var primero = menu.querySelector("a");
      if (primero) primero.focus({ preventScroll: true });
    };
    var cerrarMenu = function (devolverFoco) {
      menu.classList.remove("abierto");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-activo");
      setTimeout(function () { if (!menu.classList.contains("abierto")) menu.hidden = true; }, 350);
      if (devolverFoco) menuBtn.focus();
    };
    menuBtn.addEventListener("click", function () { if (menuBtn.getAttribute("aria-expanded") === "true") cerrarMenu(true); else abrirMenu(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) cerrarMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") cerrarMenu(true); });
  }

  /* ---------- Láminas: incrustar el SVG para que use las fuentes de la página ----------
     Solo cuando la guía se sirve por http(s) (GitHub Pages); al abrirla como archivo local se queda la <img>.
     El <style> y los id de cada SVG se aíslan con un prefijo único para no afectar al resto de la página. */
  if (/^https?:$/.test(location.protocol) && window.fetch && window.DOMParser) {
    document.querySelectorAll('.placa-core img[src$=".svg"]:not([data-no-inline])').forEach(function (img, k) {
      fetch(img.getAttribute("src")).then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
        .then(function (txt) {
          var uid = "lam" + k;
          txt = txt.replace(/id="([^"]+)"/g, 'id="' + uid + '-$1"').replace(/url\(#([^)]+)\)/g, "url(#" + uid + "-$1)");
          var doc = new DOMParser().parseFromString(txt, "image/svg+xml");
          var svg = doc.documentElement;
          if (!svg || svg.nodeName.toLowerCase() !== "svg") return;
          var estilo = svg.querySelector("style");
          if (estilo) {
            estilo.textContent = estilo.textContent.replace(/(^|\})\s*([^{}]+)\{/g, function (_, cierre, sel) {
              return cierre + "\n" + sel.split(",").map(function (x) { return "#" + uid + " " + x.trim(); }).join(", ") + " {";
            });
          }
          svg.setAttribute("id", uid);
          svg.setAttribute("role", "img");
          svg.setAttribute("aria-label", img.getAttribute("alt") || "");
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          var titulo = svg.querySelector("title");
          if (titulo) titulo.parentNode.removeChild(titulo);
          img.replaceWith(document.importNode(svg, true));
        })
        .catch(function () { /* se queda la imagen */ });
    });
  }

})();
