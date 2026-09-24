---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "curacion + publicacion"
---

# 2026-08-26 — Curación técnica (segundo pase) y publicación en GitHub Pages

**Contexto:** Carlos pidió dos cosas explícitas: (1) un pase de curación anti-AI-slop más técnico sobre `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`, con un checklist concreto adaptado de su biblioteca personal de skills (`impeccable`, `ui-ux-pro-max`) — side-stripe borders, accesibilidad de interactivos, `prefers-reduced-motion`, curva de easing expo-out, contraste WCAG calculado numéricamente — sin tocar color ni tipografía; y (2) publicar el vault/materiales en GitHub Pages con un índice central de las 12 semanas. También dio una instrucción operativa explícita: no ejecutar ningún comando git (ni `git status`) desde el puente al dispositivo, porque ese entorno no puede borrar sus propios locks y bloquea el plugin de Git de Obsidian.

**Qué se hizo:**
- Se auditó el archivo contra el checklist de Carlos, punto por punto:
  - Bordes side-stripe: ya no existían (se habían corregido en el primer pase de auditoría). Verificado con `grep`, cero coincidencias.
  - Accesibilidad de interactivos: se encontró y corrigió un **bug real, no solo cosmético**: los checkboxes de autoevaluación (`.check-item`) tenían el `<input>` oculto visualmente (`opacity:0; width:1px; height:1px`) sin envolver en `<label>`, así que un clic de mouse en el ícono o el texto visible no marcaba nada — solo un área de 1×1px invisible. Se corrigió envolviendo cada `.check-item` en un `<label>`, lo que activa el comportamiento nativo del navegador (clic en cualquier parte del label activa el input asociado) sin tocar el CSS de selección `input:checked + .check-box`.
  - `prefers-reduced-motion`: el bloque CSS ya existía (del primer pase), pero la animación de rebote del contador de XP usa `Element.animate()` desde JS, que **no** está cubierto por el `@media` de CSS. Se agregó una comprobación con `matchMedia('(prefers-reduced-motion: reduce)')` antes de invocar `.animate()`.
  - Curva de easing: se reemplazaron las 7 transiciones CSS y las 2 animaciones `@keyframes` que usaban `ease`/`cubic-bezier(.4,0,.2,1)` por `cubic-bezier(0.16,1,0.3,1)` (expo-out), incluyendo la animación JS del XP.
  - Contraste WCAG: se calculó numéricamente (luminancia relativa real, no estimación) `--ts` sobre los tres fondos, los 6 colores semánticos sobre `--bg0`/`--bg1`, y los fondos compositados reales de los badges de IA (`rgba(color, .08)` sobre `--bg1`) y de los chips casi transparentes. Los 20+ pares dieron entre 4.82:1 y 16.91:1 — todos pasan AA (≥4.5:1) sin ajustar ni un valor hex.
- A media tarea, el usuario avisó que las skills `impeccable` y `high-end-visual-design` ya estaban habilitadas como skills invocables (no solo archivos leídos del dispositivo). Se intentó invocar `/impeccable` directamente; su flujo completo (`context.mjs`, `PRODUCT.md`, etc.) está pensado para un proyecto de software con estructura propia, no para auditar un único archivo HTML aislado, así que no aplicaba el flujo completo — pero invocarla sí expuso el texto íntegro de sus "General rules" y "Absolute bans", que se usó para encontrar **dos hallazgos nuevos** no cubiertos por el checklist original de Carlos:
  - Patrón "ghost-card": `.card:hover` combinaba `border:1px solid` con `box-shadow` de 40px de blur — coincidencia literal con el anti-patrón "Codex-specific defect" de `impeccable`. Se redujo el blur a 8px, conservando el borde (estructural, no decorativo) y el resto del feedback de hover ya existente (`translateY` + glow radial).
  - Escala de z-index: `#grain`, `main` y `.hero-inner` usaban números sueltos (`z-index:1`/`z-index:2`) en vez de variables, aunque ya existía una escala parcial (`--z-nav`, `--z-subnav`, `--z-modal`). Se agregaron `--z-base` y `--z-grain` para completar la escala.
- Se documentó todo el checklist (los 5 puntos originales de Carlos + los 2 hallazgos de `impeccable`) como sección fechada en [[Sistema de Diseño - Tema R Notebook]], para que se aplique automáticamente a las Semanas 02-12.
- Se construyó el sitio de GitHub Pages:
  - `docs/index.html`: índice de las 12 semanas usando el mismo Tema "R Notebook" (mismos tokens de color/tipografía, mismo grain texture, mismo lenguaje visual de tarjetas), con las preguntas orientadoras de cada semana tomadas del mapa curricular del programa oficial. Semana 01 enlaza a `semana-01/`; semanas 02-12 muestran tarjetas atenuadas con badge "Próxima" (06 y 12 marcadas visualmente como exámenes parciales, sin enlace, ya que el programa no contempla material de laboratorio para esas semanas).
  - `docs/semana-01/index.html`: copia curada del material (post-checklist), con un enlace "volver al índice" agregado en el logo del nav (`href="../"`) — la única diferencia intencional frente al archivo entregado al usuario, que no necesita ese enlace porque vive solo en su carpeta del curso.
  - Favicon SVG inline (el mismo ícono de marca) agregado a ambos archivos del sitio publicado, ausente hasta ahora.
- Verificación: Playwright contra el `file://` local (screenshots, overflow, reducción de movimiento, interacción) y **de nuevo contra un servidor HTTP local real** (`python -m http.server`), porque `file://` no resuelve `carpeta/` → `carpeta/index.html` como sí lo hace GitHub Pages — la primera prueba de navegación con `file://` reportó "0 pestañas encontradas" al hacer clic en la tarjeta de Semana 01, lo que habría sido una falsa alarma si no se hubiera repetido con un servidor real.
- Se entregaron los 3 archivos finales (Semana 01 corregido, `docs/index.html`, `docs/semana-01/index.html`) y se escribieron en el dispositivo **solo con `device_commit_files`**, sin ejecutar ningún comando git desde `device_bash`, tal como pidió Carlos.

**Qué funcionó:**
- Invocar la skill `impeccable` (aunque su flujo completo no aplicaba) sí sirvió para obtener su lista completa de "Absolute bans", que encontró dos anti-patrones reales (ghost-card, z-index sin variable) que el checklist manual de Carlos no mencionaba explícitamente pero que estaban ahí.
- Probar la navegación de directorio (`/semana-01/`) contra un servidor HTTP real, no solo `file://`, evitó dar por buena una prueba que en realidad estaba fallando por una limitación del protocolo de archivos, no del sitio.
- El bug de accesibilidad del checkbox (label ausente) es el segundo bug funcional real que encuentra la verificación automatizada en dos pases consecutivos (el primero fue la barra de progreso desfasada) — confirma que "parece funcionar en la captura de pantalla" no es prueba suficiente para interacciones de mouse/teclado.

**Qué no funcionó / qué se ajustó:**
- Ninguno de los comandos git se ejecutó desde `device_bash` en este pase (instrucción explícita del usuario, respetada) — el commit y push de este trabajo quedan pendientes de que Carlos los haga desde Obsidian o su Terminal.

**Ajuste para la próxima vez:** al verificar un sitio multi-página con rutas de directorio (`/semana-NN/`), no confiar en pruebas con `file://` para la navegación entre páginas — levantar un servidor HTTP local mínimo (`python -m http.server`) reproduce el comportamiento real de GitHub Pages y evita falsos negativos por cómo Chromium resuelve (o no resuelve) directorios en el protocolo de archivos.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[Home]] · [[2026-08-26 - Primer material HTML (Semana 01)]]
