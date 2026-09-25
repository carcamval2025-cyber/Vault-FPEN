/* Ejecutar código R dentro de la página.
   Usa webR (R compilado a WebAssembly), que corre en su propio Web Worker: un bucle infinito no congela la página.
   Si un bloque tarda más del límite, se cierra esa sesión de R y la siguiente ejecución arranca una nueva.
   - Cada bloque corre en un ambiente nuevo, como un script recién abierto.
   - data-previo="id1 id2": antes de correr, ejecuta en silencio esos bloques (datos o library() que el ejemplo necesita).
   - data-archivos="../datos/x.csv": descarga ese archivo y lo deja en la carpeta de trabajo como datos/x.csv
     (si la ruta no pasa por una carpeta datos/, lo deja con su nombre).
   - library(paquete): si el paquete no está en la sesión, se instala desde el repositorio de webR (la primera vez tarda).
   - Los gráficos (ggplot2 o R base) se dibujan debajo de la salida. */
(function () {
  "use strict";

  var WEBR = "https://webr.r-wasm.org/v0.6.0/webr.mjs";
  var LIMITE_MS = 15000;
  var BASE = ["base", "stats", "utils", "graphics", "grDevices", "methods", "datasets", "tools", "grid", "parallel", "splines"];
  var PRELUDIO = ".fpen_msg_error <- function(e) {\n  if (inherits(e, \"rlang_error\")) {\n    txt <- strsplit(paste(format(e, backtrace = FALSE), collapse = \"\\n\"), \"\\n\", fixed = TRUE)[[1]]\n    txt <- paste(txt[!grepl(\"^<error\", txt)], collapse = \"\\n\")\n    return(if (startsWith(txt, \"Error\")) txt else paste0(\"Error: \", txt))\n  }\n  cl <- conditionCall(e)\n  txt <- if (is.null(cl)) \"\" else paste(deparse(cl), collapse = \" \")\n  if (!nzchar(txt) || grepl(\"^(eval|withVisible|withCallingHandlers|doTryCatch)\\\\(\", txt))\n    paste0(\"Error: \", conditionMessage(e))\n  else paste0(\"Error in \", txt, \" : \", conditionMessage(e))\n}\n.fpen_correr <- function(.codigo, .env) {\n  .exprs <- tryCatch(parse(text = .codigo, keep.source = FALSE), error = function(e) {\n    message(\"Error: \", sub(\"^<text>:[0-9]+:[0-9]+: \", \"\", conditionMessage(e))); NULL })\n  if (is.null(.exprs)) return(invisible(FALSE))\n  for (.i in seq_along(.exprs)) {\n    .avisos <- character(0)\n    .ok <- tryCatch(withCallingHandlers({\n      .r <- withVisible(eval(.exprs[[.i]], .env))\n      if (.r$visible) print(.r$value)\n      TRUE\n    }, warning = function(w) {\n      cl <- conditionCall(w)\n      txt <- if (is.null(cl)) \"\" else paste(deparse(cl), collapse = \" \")\n      .avisos <<- c(.avisos, if (!nzchar(txt) || grepl(\"^(eval|withVisible)\\\\(\", txt)) conditionMessage(w)\n                    else paste0(\"In \", txt, \" :\\n  \", conditionMessage(w)))\n      invokeRestart(\"muffleWarning\")\n    }), error = function(e) { message(.fpen_msg_error(e)); FALSE })\n    if (length(.avisos) == 1) message(\"Warning message:\\n\", .avisos)\n    if (length(.avisos) > 1) message(\"Warning messages:\\n\", paste0(seq_along(.avisos), \": \", .avisos, collapse = \"\\n\"))\n    if (!isTRUE(.ok)) return(invisible(FALSE))\n  }\n  invisible(TRUE)\n}\n";

  var webR = null, cargando = null, instalados = {}, escritos = {};

  function iniciarR(avisar) {
    if (webR) return Promise.resolve(webR);
    if (cargando) return cargando;
    avisar("preparando R en tu navegador (la primera vez tarda de 10 a 30 s)…");
    cargando = import(WEBR).then(function (m) {
      var w = new m.WebR({ interactive: false });
      return w.init().then(function () { return w.evalRVoid(PRELUDIO); }).then(function () {
        return w.evalRVoid("options(width = 80, cli.unicode = TRUE, crayon.enabled = FALSE)");
      }).then(function () { webR = w; cargando = null; return w; });
    });
    cargando.catch(function () { cargando = null; });
    return cargando;
  }

  function reiniciar() {
    try { if (webR) webR.close(); } catch (e) { /* ya estaba cerrado */ }
    webR = null; cargando = null; instalados = {}; escritos = {};
  }

  function paquetesDe(codigo) {
    var re = /\b(?:library|require)\(\s*["']?([A-Za-z][A-Za-z0-9.]*)/g, m, lista = [];
    while ((m = re.exec(codigo))) if (BASE.indexOf(m[1]) < 0 && lista.indexOf(m[1]) < 0) lista.push(m[1]);
    return lista;
  }

  function instalar(w, pkgs, avisar) {
    var faltan = pkgs.filter(function (p) { return !instalados[p]; });
    return faltan.reduce(function (prom, p) {
      return prom.then(function () {
        return w.evalRBoolean('requireNamespace("' + p + '", quietly = TRUE)').then(function (ya) {
          if (ya) { instalados[p] = true; return; }
          avisar("instalando el paquete " + p + " (solo la primera vez)…");
          return w.installPackages([p], { quiet: true }).then(function () { instalados[p] = true; });
        });
      });
    }, Promise.resolve());
  }

  function escribirArchivos(w, rutas) {
    return rutas.reduce(function (prom, ruta) {
      return prom.then(function () {
        // "../datos/x.csv" queda como "datos/x.csv" (igual que en un proyecto de RStudio); lo demás, con su nombre
        var i = ruta.lastIndexOf("datos/");
        var nombre = i >= 0 ? ruta.slice(i) : ruta.split("/").pop();
        if (escritos[nombre]) return;
        return fetch(ruta).then(function (r) {
          if (!r.ok) throw new Error("No se pudo descargar " + ruta);
          return r.arrayBuffer();
        }).then(function (buf) {
          var escribir = function () { return w.FS.writeFile("/home/web_user/" + nombre, new Uint8Array(buf)); };
          if (nombre.indexOf("/") < 0) return escribir();
          return w.FS.mkdir("/home/web_user/datos").catch(function () { /* ya existe */ }).then(escribir);
        }).then(function () { escritos[nombre] = true; });
      });
    }, Promise.resolve());
  }

  function capturar(w, codigo, graficos) {
    return w.objs.globalEnv.bind(".fpen_codigo", codigo).then(function () {
      return new w.Shelter();
    }).then(function (sh) {
      return sh.captureR(".fpen_correr(.fpen_codigo, .fpen_env)", {
        withAutoprint: false, captureStreams: true, captureConditions: false,
        captureGraphics: graficos ? { width: 560, height: 360 } : false
      }).then(function (res) {
        var salida = { lineas: res.output.map(function (o) { return { err: o.type === "stderr", texto: String(o.data) }; }), imagenes: res.images || [] };
        sh.purge();
        return salida;
      });
    });
  }

  /* ---------- Interfaz ---------- */
  function codigoDe(pre) {
    var ta = pre.parentElement.querySelector("textarea.editor");
    if (ta && !ta.hidden) return ta.value;
    return pre.getAttribute("data-original") || pre.querySelector("code").textContent;
  }

  function previos(pre, visto) {
    visto = visto || [];
    var ids = (pre.getAttribute("data-previo") || "").split(/\s+/).filter(Boolean), lista = [];
    ids.forEach(function (id) {
      if (visto.indexOf(id) >= 0) return;
      visto.push(id);
      var p = document.getElementById(id);
      if (!p) return;
      lista = lista.concat(previos(p, visto));
      lista.push(p);
    });
    return lista;
  }

  function boton(clase, html, titulo) {
    var b = document.createElement("button");
    b.type = "button"; b.className = clase; b.innerHTML = html;
    if (titulo) b.title = titulo;
    return b;
  }

  function prepararVentana(ventana) {
    var pre = ventana.querySelector(":scope > pre");
    var code = pre && pre.querySelector("code");
    if (!code || !code.classList.contains("language-r") || pre.hasAttribute("data-norun") || ventana.closest(".qq")) return;
    var barra = ventana.querySelector(".ventana-barra");
    var original = code.textContent.replace(/\n+$/, "");
    pre.setAttribute("data-original", original);
    var nombre = pre.getAttribute("data-file") || "script.R";

    var bEditar = boton("btn-mini btn-editar", "Editar", "Modificar el código y volver a ejecutarlo");
    var bCorrer = boton("btn-mini btn-correr", '<span aria-hidden="true">▶</span> Ejecutar', "Ejecutar este código con R en tu navegador (Ctrl + Enter en el editor)");
    var copiar = barra.querySelector(".copy-btn");
    barra.insertBefore(bEditar, copiar);
    barra.insertBefore(bCorrer, copiar);

    var editor = document.createElement("textarea");
    editor.className = "editor"; editor.hidden = true; editor.spellcheck = false;
    editor.setAttribute("aria-label", "Editor de " + nombre);
    editor.value = original;
    ventana.appendChild(editor);
    editor.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) { e.preventDefault(); editor.setRangeText("  ", editor.selectionStart, editor.selectionEnd, "end"); }
      else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); bCorrer.click(); }
    });
    function ajustar() { editor.style.height = "auto"; editor.style.height = (editor.scrollHeight + 4) + "px"; }
    editor.addEventListener("input", ajustar);
    bEditar.addEventListener("click", function () {
      var editando = editor.hidden;
      editor.hidden = !editando; pre.hidden = editando;
      bEditar.textContent = editando ? "Restaurar" : "Editar";
      if (editando) { ajustar(); editor.focus(); } else editor.value = original;
    });

    var salida = null;
    bCorrer.addEventListener("click", function () {
      if (bCorrer.disabled) return;
      if (!salida) {
        salida = document.createElement("div");
        salida.className = "ventana terminal ejecucion";
        salida.innerHTML = '<div class="ventana-barra"><span class="ventana-archivo">Console · R en tu navegador</span><span class="estado" aria-live="polite"></span></div><pre><code></code></pre><div class="graficos"></div>';
        ventana.parentNode.insertBefore(salida, ventana.nextSibling);
      }
      var out = salida.querySelector("code"), est = salida.querySelector(".estado"), graf = salida.querySelector(".graficos");
      out.textContent = ""; graf.innerHTML = "";
      salida.classList.remove("con-error");
      bCorrer.disabled = true;
      function avisar(t) { est.textContent = t; }
      function escribir(texto, esError) {
        if (esError) {
          var s = document.createElement("span"); s.className = "err"; s.textContent = texto + "\n"; out.appendChild(s);
          if (/^Error/.test(texto)) salida.classList.add("con-error");
        } else out.appendChild(document.createTextNode(texto + "\n"));
      }
      var codigo = codigoDe(pre);
      var anteriores = previos(pre);
      var todo = anteriores.map(codigoDe).concat([codigo]).join("\n");
      var archivos = [];
      anteriores.concat([pre]).forEach(function (p) {
        (p.getAttribute("data-archivos") || "").split(/\s+/).filter(Boolean).forEach(function (a) { if (archivos.indexOf(a) < 0) archivos.push(a); });
      });
      var usaGraficos = /\b(ggplot|plot|hist|barplot|boxplot)\s*\(/.test(todo);
      var inicio = 0, terminado = false, temporizador = null;
      function fin() {
        terminado = true; clearTimeout(temporizador); bCorrer.disabled = false;
        if (!out.textContent && !graf.children.length) out.textContent = "(el código no imprimió nada: asignar con <- no muestra resultados)\n";
        if (!est.textContent.startsWith("⏹")) est.textContent = salida.classList.contains("con-error") ? "terminó con error" : "listo · " + Math.max(1, Math.round(performance.now() - inicio)) + " ms";
      }
      iniciarR(avisar).then(function (w) {
        return instalar(w, paquetesDe(todo), avisar).then(function () { return escribirArchivos(w, archivos); }).then(function () {
          avisar("ejecutando…");
          inicio = performance.now();
          temporizador = setTimeout(function () {
            if (terminado) return;
            reiniciar();
            escribir("\n⏹ Detenido después de " + LIMITE_MS / 1000 + " s. ¿Hay un bucle infinito? Revisa que algo dentro del bucle acerque la condición a ser falsa. La próxima ejecución abre una sesión nueva de R.", true);
            est.textContent = "⏹ detenido";
            fin();
          }, LIMITE_MS);
          return w.evalRVoid(".fpen_env <- new.env(parent = globalenv())").then(function () {
            return anteriores.reduce(function (prom, p) {
              return prom.then(function (ok) {
                if (!ok) return false;
                return capturar(w, codigoDe(p), false).then(function (r) {
                  var fallo = r.lineas.filter(function (l) { return l.err && /^Error/.test(l.texto); });
                  if (fallo.length) { escribir("Error en el bloque previo " + (p.getAttribute("data-file") || p.id) + ":", true); fallo.forEach(function (l) { escribir(l.texto, true); }); return false; }
                  return true;
                });
              });
            }, Promise.resolve(true));
          }).then(function (ok) {
            if (!ok || terminado) return;
            return capturar(w, codigo, usaGraficos).then(function (r) {
              if (terminado) return;
              r.lineas.forEach(function (l) { escribir(l.texto, l.err); });
              r.imagenes.forEach(function (img) {
                var c = document.createElement("canvas");
                c.width = img.width; c.height = img.height;
                c.style.maxWidth = (img.width > 800 ? img.width / 2 : img.width) + "px";
                c.getContext("2d").drawImage(img, 0, 0);
                c.setAttribute("role", "img");
                c.setAttribute("aria-label", "Gráfico generado por R");
                graf.appendChild(c);
              });
            });
          });
        });
      }).catch(function (err) {
        if (terminado) return;
        escribir("No se pudo ejecutar R en el navegador: " + String(err && err.message || err).slice(0, 200) + "\nRevisa tu conexión y pulsa Ejecutar de nuevo. También puedes copiar el código a RStudio.", true);
        salida.classList.add("con-error");
        reiniciar();
      }).then(function () { if (!terminado) fin(); });
    });
  }

  function iniciar() {
    if (!window.Worker || !window.WebAssembly) return;
    document.querySelectorAll(".ventana:not(.terminal)").forEach(prepararVentana);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
