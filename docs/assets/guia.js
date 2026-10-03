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

  /* ---------- Tema: claro, oscuro o el del sistema ---------- */
  function aplicarTema(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  function temaGuardado() {
    try { var t = window.localStorage.getItem(CLAVE + "-tema"); return t === "light" || t === "dark" ? t : "system"; } catch (e) { return "system"; }
  }
  function ponerTema(modo) {
    aplicarTema(modo);
    try {
      if (modo === "light" || modo === "dark") window.localStorage.setItem(CLAVE + "-tema", modo);
      else window.localStorage.removeItem(CLAVE + "-tema");
    } catch (e) { /* nada */ }
  }
  aplicarTema(temaGuardado());

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
  }
  var pausada = false;
  try { pausada = window.localStorage.getItem(CLAVE + "-cinta") === "pausa"; } catch (e) { /* nada */ }
  function ponerCinta(pausar, guardar) {
    pausada = !!pausar;
    if (barraEl) barraEl.classList.toggle("pausada", pausada);
    if (guardar) { try { window.localStorage.setItem(CLAVE + "-cinta", pausada ? "pausa" : "corre"); } catch (e) { /* nada */ } }
  }
  ponerCinta(pausada, false);

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

  /* ---------- Panel "Edición": las ediciones con su avance, tu avance total y los ajustes ----------
     Reemplaza al menú de pantalla completa. Baja desde la barra; se cierra con Esc, con el botón o al hacer clic fuera. */
  var edBtn = document.querySelector(".edicion-btn");
  var ed = document.getElementById("edicion");
  if (edBtn && ed) {
    var filas = "", tHechos = 0, tTotal = 0, tQok = 0, tQtot = 0;
    Array.prototype.forEach.call(document.querySelectorAll(".cinta-pista > .tk"), function (el) {
      var clave = el.getAttribute("data-tk");
      var numero = el.querySelector("b").textContent;
      if (!clave) {
        var k = Number(numero.slice(1)) - 1;
        filas += '<li class="fut"><span class="n">' + numero + '</span><span class="t">' + TITULOS[k] + '</span><span class="b" aria-hidden="true"></span><span class="p">próximamente</span></li>';
        return;
      }
      var a = avance(clave);
      var total = a.total || Number(el.getAttribute("data-total") || 0);
      tHechos += a.hechos; tTotal += total; tQok += a.quizOk; tQtot += a.quizTotal;
      var aqui = el.getAttribute("aria-current") === "page";
      var tit = clave === "c1" ? el.getAttribute("data-control") : TITULOS[Number(clave.slice(1)) - 1];
      filas += '<li' + (aqui ? ' class="aqui"' : "") + '><a href="' + el.getAttribute("href") + '"' + (aqui ? ' aria-current="page"' : "") + ">" +
        '<span class="n">' + numero + '</span><span class="t">' + tit + (aqui ? " <em>estás aquí</em>" : "") + "</span>" +
        '<span class="b" aria-hidden="true"><i style="width:' + a.pct + '%"></i></span>' +
        '<span class="p" data-estado="' + (a.pct > 0 ? "sube" : "cero") + '"><span class="sr">avance </span>' + (a.pct > 0 ? "▲ " : "■ ") + a.pct + " %</span></a></li>";
    });
    var tema = temaGuardado();
    var seg = function (nombre, opciones, actual, desactivado) {
      return '<div class="seg" role="group" aria-label="' + nombre + '">' + opciones.map(function (o) {
        return '<button type="button" data-valor="' + o[0] + '" aria-pressed="' + (o[0] === actual) + '"' + (desactivado ? " disabled" : "") + ">" + o[1] + "</button>";
      }).join("") + "</div>";
    };
    ed.innerHTML = '<div class="edicion-in">' +
      '<section class="ed-lista" aria-labelledby="ed-t1"><h2 class="ed-tit" id="ed-t1">Las ediciones <small>tu avance en cada guía</small></h2><ol>' + filas + "</ol>" +
      '<a class="ed-inicio" href="' + RAIZ + 'index.html">↖ Portada, temario y evaluación</a></section>' +
      '<div class="ed-lado"><h2 class="ed-tit">Tu avance</h2><div class="ed-resumen"><b>' + tHechos + "</b> <small>de " + tTotal + "</small><p>actividades marcadas en todas las guías" + (tQtot ? " · quiz " + tQok + "/" + tQtot : "") + "</p></div>" +
      '<h2 class="ed-tit">Ajustes</h2>' +
      '<div class="ed-ajuste" data-ajuste="tema"><span>Tema</span>' + seg("Tema", [["light", "Claro"], ["dark", "Oscuro"], ["system", "Sistema"]], tema) + "</div>" +
      '<div class="ed-ajuste" data-ajuste="cinta"><span>Cinta de semanas' + (sinMovimiento ? '<small>quieta: tu sistema pide menos movimiento</small>' : "") + "</span>" +
      seg("Cinta de semanas", [["corre", "Corre"], ["quieta", "Quieta"]], sinMovimiento || pausada ? "quieta" : "corre", sinMovimiento) + "</div>" +
      '<p class="ed-atajos"><kbd>Ctrl K</kbd> buscar · <kbd>←</kbd> <kbd>→</kbd> leer el gráfico · <kbd>Esc</kbd> cerrar</p></div></div>';
    ed.querySelectorAll(".ed-ajuste").forEach(function (fila) {
      fila.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-valor]");
        if (!b || b.disabled) return;
        fila.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        var v = b.getAttribute("data-valor");
        if (fila.getAttribute("data-ajuste") === "tema") ponerTema(v);
        else ponerCinta(v === "quieta", true);
      });
    });
    var abrirEd = function (abrir, devolverFoco) {
      ed.hidden = !abrir;
      edBtn.setAttribute("aria-expanded", abrir ? "true" : "false");
      if (abrir) {
        if (indicePop && !indicePop.hidden) { indicePop.hidden = true; indiceBtn.setAttribute("aria-expanded", "false"); }
        void ed.offsetWidth;
        ed.classList.add("abierta");
        var primero = ed.querySelector('a[aria-current="page"]') || ed.querySelector("a");
        if (primero) primero.focus({ preventScroll: true });
      } else {
        ed.classList.remove("abierta");
        if (devolverFoco) edBtn.focus();
      }
    };
    edBtn.addEventListener("click", function () { abrirEd(ed.hidden, false); });
    ed.addEventListener("click", function (e) { if (e.target.closest("a")) abrirEd(false, false); });
    document.addEventListener("click", function (e) { if (!ed.hidden && !e.target.closest(".edicion") && !e.target.closest(".edicion-btn")) abrirEd(false, false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ed.hidden) abrirEd(false, true); });
    if (indiceBtn) indiceBtn.addEventListener("click", function () { if (!ed.hidden) abrirEd(false, false); });
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

/* Reproductores de Parcial I. */

/* ===================================================================
   FPEN Parcial I · reproductor de resoluciones. Vanilla JS, sin librerías.
   Estado solo en memoria (sin localStorage).
   =================================================================== */
(function(){
'use strict';
const payload=document.getElementById('parcial-datos');
if(!payload) return;
const D=JSON.parse(payload.textContent);
const NS = 'http://www.w3.org/2000/svg';
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- utilidades ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
const sleep = ms => new Promise(r => setTimeout(r, ms));
function md(s){
  return String(s).split('\n\n').map(p => '<p>' + esc(p)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>') + '</p>').join('');
}
function mdi(s){ return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>'); }

const IC = {
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>',
  next:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6.2v11.6a.9.9 0 0 0 1.4.75l8.2-5.8a.9.9 0 0 0 0-1.5L7.4 5.45A.9.9 0 0 0 6 6.2Z"/><rect x="17" y="5.5" width="2.6" height="13" rx="1.1"/></svg>',
  prev:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 6.2v11.6a.9.9 0 0 1-1.4.75l-8.2-5.8a.9.9 0 0 1 0-1.5l8.2-5.8A.9.9 0 0 1 18 6.2Z"/><rect x="4.4" y="5.5" width="2.6" height="13" rx="1.1"/></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v4.5h4.5"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 2 4.6 13.4a.8.8 0 0 0 .64 1.28H10l-1.1 6.4a.5.5 0 0 0 .9.38l8.6-11.4a.8.8 0 0 0-.64-1.28H13l1.1-6.4a.5.5 0 0 0-.9-.38Z"/></svg>'
};

/* ---------- XP ---------- */
let XP = 0;
function addXP(n){
  XP += n; const b=$('#xpval'); if(b) b.textContent = XP;
  const w=$('#xpbadge'); if(w){ w.classList.remove('bump'); void w.offsetWidth; w.classList.add('bump'); }
}

/* ---------- resaltado de sintaxis R (manual) ---------- */
const KW = new Set(['TRUE','FALSE','NA','NULL','function','if','else','library','for','in']);
function hl(src){
  let out='', i=0; const n=src.length;
  const isId = c => /[A-Za-z0-9_.]/.test(c);
  while(i<n){
    const c=src[i];
    if(c==='#'){ out+='<span class="t-cm">'+esc(src.slice(i))+'</span>'; break; }
    if(c==='"'||c==="'"){ let j=i+1; while(j<n&&src[j]!==c){ if(src[j]==='\\') j++; j++; } j=Math.min(j+1,n); out+='<span class="t-str">'+esc(src.slice(i,j))+'</span>'; i=j; continue; }
    if(src.startsWith('|>',i)){ out+='<span class="t-pipe">|&gt;</span>'; i+=2; continue; }
    if(src.startsWith('<-',i)){ out+='<span class="t-pipe">&lt;-</span>'; i+=2; continue; }
    if(/[0-9]/.test(c) && (i===0||!isId(src[i-1]))){ let j=i; while(j<n&&/[0-9.]/.test(src[j])) j++; out+='<span class="t-num">'+src.slice(i,j)+'</span>'; i=j; continue; }
    if(/[A-Za-z_.]/.test(c)){ let j=i; while(j<n&&isId(src[j])) j++; const w=src.slice(i,j);
      if(KW.has(w)) out+='<span class="t-kw">'+w+'</span>'; else if(src[j]==='(') out+='<span class="t-fn">'+w+'</span>'; else out+='<span class="t-col">'+w+'</span>'; i=j; continue; }
    if(c==='%'){ const j=src.indexOf('%',i+1); if(j>0){ out+='<span class="t-op">'+esc(src.slice(i,j+1))+'</span>'; i=j+1; continue; } }
    if(/[=!<>&|+\-*\/^~]/.test(c)){ out+='<span class="t-op">'+esc(c)+'</span>'; i++; continue; }
    out+=esc(c); i++;
  }
  return out;
}

/* ===================================================================
   VISUALIZACIÓN 1 · tabla con movimiento (FLIP por llave)
   =================================================================== */
class TableViz{
  constructor(host){
    this.host=host; this.rows=new Map(); this.heads=new Map(); this.colX=new Map();
    host.innerHTML='<div class="tv-scroll"><div class="tv-body"><div class="tv-head"></div></div></div><div class="tv-foot"></div><p class="tv-cap"></p>';
    this.scroll=$('.tv-scroll',host); this.body=$('.tv-body',host); this.head=$('.tv-head',host);
    this.foot=$('.tv-foot',host); this.cap=$('.tv-cap',host);
    this.HEAD=30; this.ROW=28;
  }
  update(spec){
    const HEAD=this.HEAD, ROW=this.ROW, cols=spec.cols, rows=spec.rows;
    const widths = cols.map(c=>{
      let m=(c.label||c.k).length;
      for(const r of rows){ const v=r.v[c.k]; if(v!=null){ const L=String(v).length; if(L>m) m=L; } }
      return Math.max(58, Math.round(m*7.5+24));
    });
    let x=0; const xs=widths.map(w=>{ const p=x; x+=w; return p; });
    const totalW=x; const colIdx=new Map(cols.map((c,i)=>[c.k,i]));
    this.body.style.width=totalW+'px'; this.head.style.width=totalW+'px';
    this.body.style.height=(HEAD+rows.length*ROW+8)+'px';

    /* cabecera */
    const keepH=new Set();
    cols.forEach((c,i)=>{
      keepH.add(c.k);
      let h=this.heads.get(c.k);
      if(!h){ h=el('div','tv-cell enter'); h._new=true; this.head.appendChild(h); this.heads.set(c.k,h); h.style.left=xs[i]+'px'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ h._new=false; h.classList.remove('enter'); })); }
      h.style.left=xs[i]+'px'; h.style.width=widths[i]+'px';
      h.textContent=c.label||c.k;
      h.className='tv-cell'+(c.tone?' '+c.tone:'')+(h._new?' enter':'');
    });
    for(const [k,h] of this.heads){ if(!keepH.has(k)){ h.classList.add('leave'); this.heads.delete(k); setTimeout(()=>h.remove(),700); } }

    /* mapa de destino para filas que se funden (merge) */
    const mergeTo=new Map();
    rows.forEach((r,i)=>{ if(r.from) r.from.forEach(k=>mergeTo.set(k,i)); });
    const newKeys=new Set(rows.map(r=>r.k));
    for(const [k,re] of this.rows){
      if(!newKeys.has(k)){
        const ty = mergeTo.has(k) ? HEAD+mergeTo.get(k)*ROW : re.y;
        re.el.classList.add('leave'); re.el.style.transform='translate(0px,'+ty+'px)';
        this.rows.delete(k); setTimeout(()=>re.el.remove(),700);
      }
    }
    /* filas */
    rows.forEach((r,i)=>{
      const y=HEAD+i*ROW; let re=this.rows.get(r.k);
      if(!re){
        const e=el('div','tv-row enter'); e.style.width=totalW+'px'; e.style.transform='translate(14px,'+y+'px)';
        re={el:e,cells:new Map(),y,_enter:true}; this.rows.set(r.k,re); this.body.appendChild(e);
        void e.offsetWidth;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ re._enter=false; e.classList.remove('enter'); e.style.transform='translate(0px,'+y+'px)'; }));
      } else { re.y=y; re.el.style.transform='translate(0px,'+y+'px)'; re.el.style.width=totalW+'px'; }
      re.el.className='tv-row'+(r.st?' '+r.st:'')+(re._enter?' enter':'');
      const keepC=new Set();
      cols.forEach((c,ci)=>{
        keepC.add(c.k);
        let ce=re.cells.get(c.k); const val=r.v[c.k]==null?'':String(r.v[c.k]);
        const num=/^-?[\d.,]+%?$/.test(val);
        if(!ce){
          ce=el('div','tv-cell'); ce.style.left=xs[ci]+'px'; re.cells.set(c.k,ce); re.el.appendChild(ce); ce.textContent=val;
          if(re.mounted){ ce._new=true; ce.classList.add('enter'); requestAnimationFrame(()=>requestAnimationFrame(()=>{ ce._new=false; ce.classList.remove('enter'); })); }
        } else if(ce.textContent!==val){ ce.textContent=val; ce.classList.add('flash'); setTimeout(()=>ce.classList.remove('flash'),700); }
        ce.style.left=xs[ci]+'px'; ce.style.width=widths[ci]+'px';
        let cl='tv-cell'+(num?' num':'');
        if(c.tone==='new') cl+=' newc'; else if(c.tone==='drop') cl+=' dropc'; else if(c.tone==='key') cl+=' keyc';
        if(c.tone==='lgl'){ if(val==='TRUE') cl+=' T'; else if(val==='FALSE') cl+=' F'; }
        ce.className=cl+(ce._new?' enter':'');
      });
      for(const [k,ce] of re.cells){ if(!keepC.has(k)){ ce.classList.add('leave'); re.cells.delete(k); setTimeout(()=>ce.remove(),700); } }
      re.mounted=true;
    });
    /* pie */
    let f='';
    if(spec.badge) f+='<span class="badge-dim">'+esc(spec.badge)+'</span>';
    if(spec.foot) f+='<span>'+mdi(spec.foot)+'</span>';
    this.foot.innerHTML=f;
    this.cap.innerHTML = spec.cap ? mdi(spec.cap) : '';
    this.cap.style.display = spec.cap ? '' : 'none';
    if(spec.focusCol!=null && colIdx.has(spec.focusCol)){
      const left=Math.max(0, xs[colIdx.get(spec.focusCol)]-60);
      this.scroll.scrollTo({left, behavior: REDUCED?'auto':'smooth'});
    } else if(spec.scrollHome){ this.scroll.scrollTo({left:0, behavior: REDUCED?'auto':'smooth'}); }
  }
}

/* ===================================================================
   VISUALIZACIÓN 2 · consola de R
   =================================================================== */
class ConsoleViz{
  constructor(host){
    host.innerHTML='<pre class="con" aria-live="polite"></pre><p class="tv-cap"></p>';
    this.pre=$('.con',host); this.cap=$('.tv-cap',host); this.sig=null;
  }
  async update(spec, o){
    const sig=JSON.stringify(spec.lines);
    if(sig===this.sig){ this.cap.innerHTML=spec.cap?mdi(spec.cap):''; return; }
    this.sig=sig; this.pre.innerHTML='';
    const spans=[];
    spec.lines.forEach(L=>{
      const t = typeof L==='string' ? {t:L} : L;
      const s=el('span','l');
      let html;
      if(t.t.startsWith('> ')) html='<span class="p">&gt; </span>'+hl(t.t.slice(2));
      else html=esc(t.t);
      if(t.c) html='<span class="'+t.c+'">'+html+'</span>';
      s.innerHTML=html; this.pre.appendChild(s); spans.push(s);
    });
    this.cap.innerHTML=spec.cap?mdi(spec.cap):''; this.cap.style.display=spec.cap?'':'none';
    if(o.instant||REDUCED){ spans.forEach(s=>s.classList.add('in')); return; }
    for(const s of spans){ if(o.tok!==o.cur()) return; s.classList.add('in'); await sleep((spec.gap||70)/o.spd); }
  }
}

/* ===================================================================
   VISUALIZACIÓN 3 · gráficos tipo ggplot (SVG con movimiento)
   =================================================================== */
const PAL = ['#4c9aff','#2dd4bf','#f5a623','#a78bfa','#ff6b6b'];
class ChartViz{
  constructor(host, id){
    this.id=id; this.reg=new Map();
    host.innerHTML='<svg class="chart" viewBox="0 0 640 400" role="img" aria-label="Gráfico animado"></svg><p class="chart-cap"></p>';
    this.svg=$('svg',host); this.cap=$('.chart-cap',host);
    this.W=640; this.H=400; this.ml=66; this.mr=20; this.mt=58; this.mb=64;
  }
  niceTicks(max, target=5){
    const raw=max/target, mag=Math.pow(10,Math.floor(Math.log10(raw)));
    const f=raw/mag, step=(f<=1?1:f<=2?2:f<=5?5:10)*mag;
    const top=Math.ceil(max/step)*step, t=[]; for(let v=0; v<=top+1e-9; v+=step) t.push(+v.toFixed(6));
    return {step,top,ticks:t};
  }
  fmt(v){ return Math.abs(v)>=1000 ? String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,',') : String(+v.toFixed(2)); }
  update(spec){
    const P=[]; const {W,H,ml,mr,mt,mb}=this; const x0=ml, x1=W-mr, y0=mt, y1=H-mb, pw=x1-x0, ph=y1-y0;
    const show=spec.show||{};
    const T=(x,y,extra)=>'translate('+x+'px,'+y+'px)'+(extra?' '+extra:'');
    P.push({key:'panel',tag:'rect',cls:'panel',attrs:{x:x0,y:y0,width:pw,height:ph,rx:3}});
    const txt=(key,x,y,s,cls,anchor)=>P.push({key,tag:'text',cls,attrs:{x:0,y:0,'text-anchor':anchor||'middle'},text:s,tf:T(x,y)});
    /* títulos */
    if(show.labs && spec.title){ txt('ttl',x0,24,spec.title,'ttl','start'); if(spec.subtitle) txt('sub',x0,41,spec.subtitle,'sub','start'); }
    const xt = show.labs && spec.xlab ? spec.xlab : (spec.xdef||''), yt = show.labs && spec.ylab ? spec.ylab : (spec.ydef||'');
    const defx = !(show.labs && spec.xlab), defy = !(show.labs && spec.ylab);
    if(show.geom){
      if(xt) P.push({key:'xt',tag:'text',cls:'axt'+(defx?' def':''),attrs:{x:0,y:0,'text-anchor':'middle'},text:xt,tf:T(x0+pw/2,H-12)});
      if(yt) P.push({key:'yt',tag:'text',cls:'axt'+(defy?' def':''),attrs:{x:0,y:0,'text-anchor':'middle'},text:yt,tf:T(16,y0+ph/2,'rotate(-90deg)')});
    }
    const kind=spec.kind;
    if(kind==='bar' || kind==='dodge' || kind==='stack'){
      const cats=spec.cats, n=cats.length, band=pw/n;
      const ymax = spec.ymax|| (kind==='stack' ? Math.max(...cats.map(c=>c.vals.reduce((a,b)=>a+b,0))) : Math.max(...cats.flatMap(c=>c.vals||[c.v])));
      const nt=this.niceTicks(ymax*1.04), ys=v=>y1-(v/nt.top)*ph;
      if(show.geom){
        nt.ticks.forEach((v,i)=>{ P.push({key:'yg'+i,tag:'line',cls:'gl',attrs:{x1:x0,x2:x1,y1:0,y2:0},tf:T(0,ys(v))}); txt('yl'+i,x0-8,ys(v)+3.5,this.fmt(v),'', 'end'); });
      }
      const order = spec.order || cats.map(c=>c.k);
      order.forEach((k,pos)=>{
        const c=cats.find(q=>q.k===k); const cx=x0+band*(pos+.5);
        if(show.geom) txt('xl-'+k, cx, y1+16, c.label||c.k, '', 'middle');
        if(kind==='bar'){
          const bw=band*0.72, h=(c.v/nt.top)*ph;
          if(show.geom){
            P.push({key:'bar-'+k,tag:'rect',cls:'bar',attrs:{x:0,y:0,width:bw,height:1},fill:c.fill||'#4c9aff',tf:T(cx-bw/2,y1,'scale(1,'+(-h)+')'),tf0:T(cx-bw/2,y1,'scale(1,-0.001)'),delay:pos*60});
            if(show.vals) txt('bv-'+k,cx,y1-h-7,this.fmt(c.v),'', 'middle');
          }
        } else if(kind==='stack'){
          const bw=band*0.5; let base=0;
          c.vals.forEach((v,j)=>{ const h=(v/nt.top)*ph, yb=y1-(base/nt.top)*ph; base+=v; if(show.geom) P.push({key:'bar-'+k+'-'+j,tag:'rect',cls:'bar',attrs:{x:0,y:0,width:bw,height:1},fill:(spec.series&&spec.series[j]&&spec.series[j].fill)||PAL[j],tf:T(cx-bw/2,yb,'scale(1,'+(-h)+')'),tf0:T(cx-bw/2,yb,'scale(1,-0.001)'),delay:pos*60+j*40}); });
        } else {
          const m=c.vals.length, gw=band*0.78, bw=gw/m;
          c.vals.forEach((v,j)=>{ const h=(v/nt.top)*ph; if(show.geom) P.push({key:'bar-'+k+'-'+j,tag:'rect',cls:'bar',attrs:{x:0,y:0,width:bw-1.5,height:1},fill:(spec.series&&spec.series[j]&&spec.series[j].fill)||PAL[j],tf:T(cx-gw/2+j*bw,y1,'scale(1,'+(-h)+')'),tf0:T(cx-gw/2+j*bw,y1,'scale(1,-0.001)'),delay:pos*60+j*40}); });
        }
      });
      if((kind==='dodge'||kind==='stack') && show.legend){ this.legend(P,spec.series,spec.legendTitle,W-mr); }
    }
    else if(kind==='hist'){
      const bins=spec.bins, dmin=Math.min(...bins.map(b=>b.x0)), dmax=Math.max(...bins.map(b=>b.x1));
      const pad=(dmax-dmin)*0.03, a=dmin-pad, b=dmax+pad, xs=v=>x0+(v-a)/(b-a)*pw;
      const cmax=Math.max(...bins.map(q=>q.c)), nt=this.niceTicks(cmax*1.05), ys=v=>y1-(v/nt.top)*ph;
      if(show.geom){
        nt.ticks.forEach((v,i)=>{ P.push({key:'yg'+i,tag:'line',cls:'gl',attrs:{x1:x0,x2:x1,y1:0,y2:0},tf:T(0,ys(v))}); txt('yl'+i,x0-8,ys(v)+3.5,this.fmt(v),'','end'); });
        const step=spec.xstep||100; for(let v=Math.ceil(0/step)*step; v<=b; v+=step){ if(v<a) continue; P.push({key:'xg'+v,tag:'line',cls:'glm',attrs:{x1:0,x2:0,y1:y0,y2:y1},tf:T(xs(v),0)}); txt('xl'+v,xs(v),y1+16,String(v),'','middle'); }
        bins.forEach((q,i)=>{ const w=xs(q.x1)-xs(q.x0)-1.2, h=(q.c/nt.top)*ph; P.push({key:'bin'+spec.bw+'-'+i,tag:'rect',cls:'bar hb',attrs:{x:0,y:0,width:Math.max(w,1),height:1},tf:T(xs(q.x0)+0.6,y1,'scale(1,'+(-Math.max(h,0.001))+')'),tf0:T(xs(q.x0)+0.6,y1,'scale(1,-0.001)'),delay:i*28}); if(show.vals&&q.c>0) txt('bc'+spec.bw+'-'+i,(xs(q.x0)+xs(q.x1))/2,y1-h-5,String(q.c),'','middle'); });
      }
    }
    else if(kind==='box'){
      const gs=spec.groups, n=gs.length, band=pw/n, ymax=spec.ymax;
      const nt=this.niceTicks(ymax*1.05), ys=v=>y1-(v/nt.top)*ph;
      if(show.geom){
        nt.ticks.forEach((v,i)=>{ P.push({key:'yg'+i,tag:'line',cls:'gl',attrs:{x1:x0,x2:x1,y1:0,y2:0},tf:T(0,ys(v))}); txt('yl'+i,x0-8,ys(v)+3.5,this.fmt(v),'','end'); });
        gs.forEach((g,i)=>{
          const cx=x0+band*(i+.5), bw=Math.min(band*0.5,110), d=i*140;
          txt('xl'+i,cx,y1+16,g.label,'','middle');
          const mk=(key,tag,cls,attrs,tf,tf0)=>P.push({key,tag,cls,attrs,tf,tf0,delay:d});
          mk('wl'+i,'line','box-l',{x1:0,x2:0,y1:0,y2:1},T(cx,ys(g.q3),'scale(1,'+(ys(g.max)-ys(g.q3))+')'),T(cx,ys(g.q3),'scale(1,0.001)'));
          mk('wu'+i,'line','box-l',{x1:0,x2:0,y1:0,y2:1},T(cx,ys(g.q1),'scale(1,'+(ys(g.min)-ys(g.q1))+')'),T(cx,ys(g.q1),'scale(1,0.001)'));
          mk('cp'+i,'line','box-l',{x1:-bw/4,x2:bw/4,y1:0,y2:0},T(cx,ys(g.max)),T(cx,ys(g.max),'scale(0,1)'));
          mk('cl'+i,'line','box-l',{x1:-bw/4,x2:bw/4,y1:0,y2:0},T(cx,ys(g.min)),T(cx,ys(g.min),'scale(0,1)'));
          mk('bx'+i,'rect','box-b',{x:-bw/2,y:0,width:bw,height:1},T(cx,ys(g.q3),'scale(1,'+(ys(g.q1)-ys(g.q3))+')'),T(cx,ys(g.med),'scale(1,0.001)'));
          mk('md'+i,'line','box-m',{x1:-bw/2,x2:bw/2,y1:0,y2:0},T(cx,ys(g.med)),T(cx,ys(g.med),'scale(0,1)'));
          (g.out||[]).forEach((o,j)=>mk('ot'+i+'-'+j,'circle','out',{r:3.6,cx:0,cy:0},T(cx,ys(o)),T(cx,ys(o),'scale(0)')));
          if(show.vals){ [['max',g.max],['q3',g.q3],['med',g.med],['q1',g.q1],['min',g.min]].forEach(([nm,v])=>txt('bv'+i+nm,cx+bw/2+8,ys(v)+3.5,String(v),'','start')); }
        });
      }
    }
    else if(kind==='scatter'){
      const pts=spec.pts, xm=spec.xmax, ym=spec.ymax, ymin=spec.ymin||0;
      const nx=this.niceTicks(xm,6), ny=this.niceTicks(ym-ymin>0?ym:ym,6);
      const xs=v=>x0+(v/nx.top)*pw; const lo=Math.min(0,ymin); const span=ny.top-lo; const ys=v=>y1-((v-lo)/span)*ph;
      if(show.geom){
        ny.ticks.concat(lo<0&&Math.abs(lo)>=ny.step*0.6?[lo]:[]).forEach((v,i)=>{ P.push({key:'yg'+i,tag:'line',cls:'gl',attrs:{x1:x0,x2:x1,y1:0,y2:0},tf:T(0,ys(v))}); txt('yl'+i,x0-8,ys(v)+3.5,this.fmt(v),'','end'); });
        for(let v=lo<0?Math.ceil(lo/ny.step)*ny.step:0; v<=ny.top; v+=ny.step){ if(v<lo) continue; }
        nx.ticks.forEach((v,i)=>{ P.push({key:'xg'+i,tag:'line',cls:'glm',attrs:{x1:0,x2:0,y1:y0,y2:y1},tf:T(xs(v),0)}); txt('xl'+i,xs(v),y1+16,this.fmt(v),'','middle'); });
        if(lo<0) P.push({key:'zero',tag:'line',cls:'gl',attrs:{x1:x0,x2:x1,y1:0,y2:0,'stroke-dasharray':'4 4'},tf:T(0,ys(0))});
        pts.forEach((p,i)=>{
          const col = show.color ? (spec.colors[p.g]||'#4c9aff') : '#c4cde4';
          P.push({key:'pt'+i,tag:'circle',cls:'pt',attrs:{r:3.4,cx:0,cy:0},fill:col,tf:T(xs(p.x),ys(p.y)),tf0:T(xs(p.x),ys(p.y),'scale(0)'),delay:Math.min(i*6,900)});
        });
        if(show.legend && show.color){ this.legend(P,Object.keys(spec.colors).map(k=>({k,label:k,fill:spec.colors[k]})),spec.legendTitle,W-mr); }
      }
    }
    this.reconcile(P);
    this.cap.innerHTML = spec.cap ? mdi(spec.cap) : ''; this.cap.style.display = spec.cap ? '' : 'none';
  }
  legend(P,series,title,xr){
    let x=xr; const y=14;
    const items=(series||[]).map((s,i)=>({label:s.label||s.k,fill:s.fill||PAL[i]}));
    let cur=xr; items.slice().reverse().forEach((s,ri)=>{ const i=items.length-1-ri; const w=s.label.length*6.6+24; cur-=w;
      P.push({key:'lg-r'+i,tag:'rect',cls:'',attrs:{x:0,y:0,width:10,height:10,rx:2},fill:s.fill,tf:'translate('+cur+'px,'+(y-9)+'px)'});
      P.push({key:'lg-t'+i,tag:'text',cls:'',attrs:{x:0,y:0,'text-anchor':'start'},text:s.label,tf:'translate('+(cur+15)+'px,'+y+'px)'}); });
    if(title) P.push({key:'lg-ti',tag:'text',cls:'axt',attrs:{x:0,y:0,'text-anchor':'end'},text:title,tf:'translate('+(cur-8)+'px,'+y+'px)'});
  }
  reconcile(P){
    const seen=new Set();
    P.forEach(p=>{
      seen.add(p.key); let e=this.reg.get(p.key); const created=!e;
      if(created){
        e=document.createElementNS(NS,p.tag); e.setAttribute('class','el '+(p.cls||'')+' enter'); this.svg.appendChild(e); this.reg.set(p.key,e);
        if(p.tf0) e.style.transform=p.tf0;
      } else { e.classList.remove('gone'); }
      for(const k in (p.attrs||{})) e.setAttribute(k,p.attrs[k]);
      if(p.text!=null && e.textContent!==p.text) e.textContent=p.text;
      if(p.fill) e.style.fill=p.fill;
      e.style.transitionDelay=(p.delay||0)+'ms';
      const apply=()=>{ e.classList.remove('enter'); e.style.transform=p.tf||''; };
      if(created){ if(!p.tf0) e.style.transform=p.tf||''; void e.getBoundingClientRect(); requestAnimationFrame(()=>requestAnimationFrame(apply)); }
      else apply();
    });
    for(const [k,e] of this.reg){
      if(!seen.has(k)){ e.classList.add('gone'); e.style.transitionDelay='0ms'; setTimeout(()=>{ if(e.classList.contains('gone')){ e.remove(); this.reg.delete(k);} },700); }
    }
  }
}

/* ---------- escenario: elige el tipo de visualización ---------- */
class Stage{
  constructor(host){ this.host=host; this.type=null; this.v=null; this.cid=null; }
  async show(spec,o){
    if(!spec) return;
    const t=spec.t; const cid = t==='chart' ? (spec.id||'c') : null;
    if(t!==this.type || cid!==this.cid){
      this.host.innerHTML=''; this.type=t; this.cid=cid;
      this.v = t==='table' ? new TableViz(this.host) : t==='console' ? new ConsoleViz(this.host) : new ChartViz(this.host,cid);
    }
    await this.v.update(spec,o);
  }
}

/* ===================================================================
   REPRODUCTOR
   =================================================================== */
const PH_NAMES = {P:'Pregunta',E:'Exploración',I:'Implementación',R:'Resultado',T:'Interpretación',V:'Verificación'};
class Player{
  constructor(ex, host, onFinish){
    this.ex=ex; this.steps=ex.steps; this.N=this.steps.length; this.i=-1; this.playing=false; this.tok=0; this.spd=1; this.maxSeen=-1; this.finished=false; this.onFinish=onFinish;
    this.cum=[]; let m=0; this.steps.forEach((s,k)=>{ if(s.lines && s.lines[1]>m) m=s.lines[1]; this.cum.push(m); });
    this.build(host);
    this.renderIdle();
  }
  build(host){
    const root=this.root=el('div','player'); root.tabIndex=0; root.setAttribute('role','group'); root.setAttribute('aria-label','Reproductor de la resolución del ejercicio '+this.ex.n);
    const bar=el('div','pl-bar');
    this.bPrev=el('button','ctl',IC.prev); this.bPrev.title='Paso anterior'; this.bPrev.setAttribute('aria-label','Paso anterior');
    this.bPlay=el('button','ctl play',IC.play); this.bPlay.title='Reproducir / pausar'; this.bPlay.setAttribute('aria-label','Reproducir');
    this.bNext=el('button','ctl',IC.next); this.bNext.title='Paso siguiente'; this.bNext.setAttribute('aria-label','Paso siguiente');
    this.bRe=el('button','ctl',IC.replay); this.bRe.title='Reiniciar'; this.bRe.setAttribute('aria-label','Reiniciar');
    this.sel=el('select','speed'); [['0.75','0.75×'],['1','1×'],['1.5','1.5×'],['2','2×']].forEach(([v,t])=>{ const o=el('option',null,t); o.value=v; if(v==='1') o.selected=true; this.sel.appendChild(o); });
    this.sel.setAttribute('aria-label','Velocidad');
    this.scrub=el('div','scrub'); this.dots=this.steps.map((s,k)=>{ const d=el('button','dotp','<i></i>'); d.title='Paso '+(k+1)+': '+PH_NAMES[s.ph]; d.setAttribute('aria-label','Ir al paso '+(k+1)); d.addEventListener('click',()=>{ this.pause(); this.goto(k); }); this.scrub.appendChild(d); return d; });
    this.stepn=el('span','stepn','paso 0/'+this.N);
    [this.bRe,this.bPrev,this.bPlay,this.bNext,this.scrub,this.stepn,this.sel].forEach(x=>bar.appendChild(x));
    root.appendChild(bar);
    const ph=this.phBar=el('div','phases'); this.phEls={}; Object.keys(PH_NAMES).forEach(k=>{ const p=el('span','ph',PH_NAMES[k]); this.phEls[k]=p; ph.appendChild(p); });
    root.appendChild(ph);
    const main=el('div','pl-main');
    const left=el('div','pl-left');
    left.appendChild(el('div','pane-title','<i></i>Código en RStudio'));
    this.code=el('pre','code'); this.lnEls=this.ex.code.map((t,k)=>{ const l=el('div','ln hid','<span class="no">'+(k+1)+'</span><span class="tx"></span>'); this.code.appendChild(l); return l; });
    left.appendChild(this.code);
    const say=el('div','say'); say.appendChild(el('div','who','<i style="width:7px;height:7px;border-radius:50%;background:var(--teal);display:inline-block"></i>Lo que pienso'));
    this.txt=el('div','txt'); say.appendChild(this.txt); left.appendChild(say);
    const right=el('div','pl-right'); right.appendChild(el('div','pane-title','<i style="background:var(--amber)"></i>Datos · resultado'));
    this.stageEl=el('div','stage'); right.appendChild(this.stageEl); this.stage=new Stage(this.stageEl);
    main.appendChild(left); main.appendChild(right); root.appendChild(main); host.appendChild(root);
    /* eventos */
    this.bPlay.addEventListener('click',()=>this.toggle());
    this.bNext.addEventListener('click',()=>{ this.pause(); this.goto(Math.min(this.i+1,this.N-1),{type:true}); });
    this.bPrev.addEventListener('click',()=>{ this.pause(); this.goto(Math.max(this.i-1,0)); });
    this.bRe.addEventListener('click',()=>{ this.pause(); this.i=-1; this.renderIdle(); });
    this.sel.addEventListener('change',()=>{ this.spd=parseFloat(this.sel.value); root.style.setProperty('--dur',(0.55/this.spd)+'s'); });
    root.addEventListener('keydown',e=>{ if(e.target.tagName==='SELECT') return; if(e.code==='Space'){ e.preventDefault(); this.toggle(); } else if(e.key==='ArrowRight'){ e.preventDefault(); this.bNext.click(); } else if(e.key==='ArrowLeft'){ e.preventDefault(); this.bPrev.click(); } });
  }
  renderIdle(){
    this.tok++; this.lnEls.forEach(l=>{ l.className='ln hid'; l.querySelector('.tx').innerHTML=''; });
    this.txt.innerHTML='<p>Pulsa <b>Reproducir</b> para ver cómo se resuelve, paso a paso, con el razonamiento al lado. Puedes pausar, retroceder o saltar a cualquier paso.</p>';
    this.stageEl.innerHTML=''; this.stage=new Stage(this.stageEl);
    this.dots.forEach(d=>d.className='dotp'); Object.values(this.phEls).forEach(p=>p.className='ph'); this.stepn.textContent='paso 0/'+this.N;
    this.setPlayIcon(false); this.bPrev.disabled=true;
  }
  setPlayIcon(p){ this.bPlay.innerHTML = p ? IC.pause : (this.i>=this.N-1 && this.i>=0 ? IC.replay : IC.play); this.bPlay.setAttribute('aria-label', p?'Pausar':'Reproducir'); }
  effViz(i){ for(let k=i;k>=0;k--) if(this.steps[k].viz) return this.steps[k].viz; return null; }
  toggle(){ if(this.playing) this.pause(); else this.play(); }
  pause(){ this.playing=false; this.tok++; this.setPlayIcon(false); }
  wait(ms,t){ return new Promise(res=>{ const end=Date.now()+ms; const tick=()=>{ if(t!==this.tok||!this.playing) return res(false); if(Date.now()>=end) return res(true); setTimeout(tick,80); }; tick(); }); }
  async play(){
    if(this.playing) return;
    if(this.i>=this.N-1){ this.i=-1; this.renderIdle(); }
    this.playing=true; this.setPlayIcon(true);
    while(this.playing && this.i<this.N-1){
      const t=await this.goto(this.i+1,{type:true,auto:true});
      if(!this.playing||t===false) break;
      const words=this.steps[this.i].say.split(/\s+/).length;
      const hold=Math.max(2000,words*250)/this.spd;
      const ok=await this.wait(hold,this.tok); if(!ok) break;
    }
    if(this.playing){ this.playing=false; this.setPlayIcon(false); }
  }
  async typeLine(l,t){
    const src=this.ex.code[l], tx=this.lnEls[l].querySelector('.tx'); const L=this.lnEls[l]; L.classList.remove('hid');
    const per=Math.min(15, 800/Math.max(src.length,1))/this.spd;
    for(let c=1;c<=src.length;c++){
      if(t!==this.tok) return false;
      tx.innerHTML=hl(src.slice(0,c))+(c<src.length?'<span class="caret"></span>':'');
      await sleep(per);
    }
    tx.innerHTML=hl(src); return true;
  }
  async goto(i,o={}){
    const t=++this.tok; const s=this.steps[i]; this.i=i; if(i>this.maxSeen) this.maxSeen=i;
    this.dots.forEach((d,k)=>d.className='dotp'+(k<=this.maxSeen?' seen':'')+(k===i?' cur':''));
    const seenPh=new Set(this.steps.slice(0,i).map(x=>x.ph)); Object.keys(this.phEls).forEach(k=>this.phEls[k].className='ph'+(k===s.ph?' on':(seenPh.has(k)?' seen':'')));
    this.stepn.textContent='paso '+(i+1)+'/'+this.N; this.bPrev.disabled=(i<=0);
    this.txt.classList.add('swap'); setTimeout(()=>{ if(t===this.tok){ this.txt.innerHTML=md(s.say); this.txt.classList.remove('swap'); } },REDUCED?0:140);
    const prevN = i>0 ? this.cum[i-1] : 0, nowN=this.cum[i];
    const typing = o.type && nowN>prevN && !REDUCED;
    /* líneas ya mostradas */
    for(let l=0;l<this.lnEls.length;l++){
      const L=this.lnEls[l]; const tx=L.querySelector('.tx'); const focus = s.lines && l>=s.lines[0] && l<s.lines[1];
      if(l<prevN || (!typing && l<nowN)){ L.classList.remove('hid'); tx.innerHTML=hl(this.ex.code[l]); }
      else if(l>=nowN){ L.classList.add('hid'); tx.innerHTML=''; }
      L.classList.toggle('focus',!!focus); L.classList.toggle('dim',!!s.lines && !focus && l<nowN);
    }
    if(typing){
      for(let l=prevN;l<nowN;l++){ const ok=await this.typeLine(l,t); if(ok===false) return false; }
      await sleep(260/this.spd); if(t!==this.tok) return false;
    }
    const v=this.effViz(i);
    await this.stage.show(v,{instant:!o.type, tok:t, cur:()=>this.tok, spd:this.spd});
    if(t!==this.tok) return false;
    if(i===this.N-1 && !this.finished){ this.finished=true; this.onFinish && this.onFinish(); }
    if(!this.playing) this.setPlayIcon(false);
    return true;
  }
}

/* ===================================================================
   CONSTRUCCIÓN DE LA PÁGINA
   =================================================================== */
const TOOLS = D.toolStatus;
function toolChip(t){ return '<span class="tool '+t.s+'" title="'+({clase:'Aparece en tus scripts de clase',prog:'Está en el programa oficial; aún no aparece en tus scripts',adel:'Adelanto opcional: no está en el programa de las semanas 1 a 5'})[t.s]+'"><i></i>'+esc(t.n)+'</span>'; }

function buildExercise(ex){
  const card=document.getElementById('ej'+ex.n); card.innerHTML='';
  const head=el('button','ex-head'); head.setAttribute('aria-expanded','false'); head.setAttribute('aria-controls','body'+ex.n);
  head.innerHTML='<span class="ex-no">'+String(ex.n).padStart(2,'0')+'</span><span class="ex-title"><h3>'+esc(ex.titulo)+'</h3><p class="stmt">'+mdi(ex.resumen)+'</p><span class="ex-meta"><span class="badge noai" title="Practica como en el examen: primero sin IA; usa esta resolución para comparar">Sin IA</span>'+ex.tools.map(toolChip).join('')+'<span class="slot-done"></span></span></span><span class="chev">'+IC.chev+'</span>';
  const body=el('div','ex-body'); body.id='body'+ex.n;
  card.appendChild(head); card.appendChild(body);
  let built=false;
  head.addEventListener('click',()=>{
    const open=!card.classList.contains('open'); card.classList.toggle('open',open); head.setAttribute('aria-expanded',String(open));
    if(open && !built){ built=true; fillBody(ex,body,card); }
    if(!open){ const pl=body._player; if(pl) pl.pause(); }
  });
  return card;
}

function fillBody(ex,body,card){
  body.appendChild(el('div','stmt-full','<b style="font-family:var(--font-mono);font-size:.7rem;letter-spacing:.07em;text-transform:uppercase;color:var(--blue);display:block;margin-bottom:4px">Enunciado de la guía</b>'+mdi(ex.enunciado)));
  if(ex.ambig){ body.appendChild(el('div','callout amber','<b class="lbl">Ambigüedad o hallazgo con tus datos</b>'+mdi(ex.ambig)+' <a href="#" data-goto="ambig">Ver todas las ambigüedades</a>')); }
  const gate=el('div','gate');
  gate.innerHTML='<h4>Primera vuelta: escribe tu plan antes de ver la solución</h4><p>'+mdi(ex.gate||'En una o dos frases: ¿qué verbos de R usarías y en qué orden? No hace falta código perfecto.')+'</p>';
  const ta=el('textarea'); ta.placeholder='Mi plan: primero..., luego...'; ta.setAttribute('aria-label','Tu plan para el ejercicio '+ex.n); gate.appendChild(ta);
  const row=el('div','gate-row'); const btn=el('button','btn','Desbloquear la resolución animada'); btn.disabled=true; const cnt=el('span','count','0 / 30 caracteres'); row.appendChild(btn); row.appendChild(cnt); gate.appendChild(row);
  body.appendChild(gate);
  ta.addEventListener('input',()=>{ const n=ta.value.trim().length; cnt.textContent=n+' / 30 caracteres'; cnt.classList.toggle('ok',n>=30); btn.disabled=n<30; });
  const after=el('div'); body.appendChild(after);
  btn.addEventListener('click',()=>{
    gate.style.display='none'; addXP(10);
    const pl=new Player(ex,after,()=>{ addXP(5); const sd=$('.slot-done',card); if(sd) sd.innerHTML='<span class="badge done">Revisado</span>'; });
    body._player=pl; buildUnder(ex,after); pl.root.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'nearest'});
  });
  $$('[data-goto]',body).forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); selectTab(a.dataset.goto); }));
}

function buildUnder(ex,host){
  const u=el('div','under');
  u.appendChild(el('div','card','<h4>Patrón transferible</h4><p>'+mdi(ex.patron)+'</p>'));
  u.appendChild(el('div','card','<h4>Trampas frecuentes</h4><ul>'+ex.trampas.map(t=>'<li>'+mdi(t)+'</li>').join('')+'</ul>'));
  /* afirmaciones */
  const ck=el('div','card wide'); ck.innerHTML='<h4>Criterios: marca las afirmaciones que consideres correctas</h4>';
  const ul=el('ul','checks'); ex.checks.forEach((c,k)=>{ const li=el('li'); li.innerHTML='<label><input type="checkbox"><span>'+mdi(c.t)+'</span></label><div class="why"></div>'; ul.appendChild(li); });
  ck.appendChild(ul); const cb=el('button','btn sm','Comprobar mis respuestas'); ck.appendChild(cb); const res=el('p','count'); res.style.marginTop='10px'; ck.appendChild(res);
  let graded=false;
  cb.addEventListener('click',()=>{
    let good=0; $$('li',ul).forEach((li,k)=>{ const c=ex.checks[k]; const chk=$('input',li).checked; const okk=(chk===c.ok); if(okk) good++; li.className=okk?'ok':'bad'; $('.why',li).innerHTML='<b>'+(okk?'Correcto. ':'Revisa. ')+'</b>'+(c.ok?'La afirmación es verdadera. ':'La afirmación es falsa. ')+mdi(c.why); });
    res.textContent=good+' de '+ex.checks.length+' criterios bien evaluados'; if(good===ex.checks.length && !graded){ graded=true; addXP(5); }
  });
  u.appendChild(ck);
  /* verificación */
  const v=el('div','card verif wide'); v.innerHTML='<h4>¿Cómo sabemos que este resultado es correcto?</h4><p>'+mdi(ex.verifica.txt)+'</p>'+(ex.verifica.code?'<pre class="codebox">'+ex.verifica.code.split('\n').map(hl).join('\n')+'</pre>':'');
  u.appendChild(v);
  /* tercera vuelta */
  const t=el('div','card wide'); t.innerHTML='<h4>Tercera vuelta: cambia una condición y anticipa el efecto</h4><p>'+mdi(ex.variante.q)+'</p>';
  const ta=el('textarea'); ta.style.minHeight='56px'; ta.placeholder='Mi predicción...'; ta.setAttribute('aria-label','Tu predicción'); t.appendChild(ta);
  const rb=el('button','btn sm ghost','Ver el efecto real'); rb.disabled=true; rb.style.marginTop='10px'; t.appendChild(rb);
  const rv=el('div','reveal'); rv.innerHTML=mdi(ex.variante.a); t.appendChild(rv);
  ta.addEventListener('input',()=>{ rb.disabled=ta.value.trim().length<8; });
  let got=false; rb.addEventListener('click',()=>{ rv.classList.add('show'); if(!got){ got=true; addXP(5); } });
  u.appendChild(t);
  host.appendChild(u);
}

function buildPage(){ D.ex.forEach(buildExercise); }

function selectTab(name){ document.getElementById(name)?.scrollIntoView({behavior:REDUCED?'auto':'smooth'}); }
document.addEventListener('DOMContentLoaded',()=>{
  buildPage();
  $$('.pill').forEach(p=>p.addEventListener('click',()=>selectTab(p.dataset.tab)));
  $$('[data-goto]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); selectTab(a.dataset.goto); }));
  if($('#xpicon')) $('#xpicon').innerHTML=IC.bolt;
  window.__fpen={D,Player};
});
})();
