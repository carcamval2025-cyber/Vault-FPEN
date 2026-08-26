---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "creación"
---

# 2026-08-26 — Primer material HTML (Semana 01)

**Contexto:** Carlos pidió crear el primer artefacto interactivo de aprendizaje del curso — "mucho mejor de lo que ya hemos generado" — aplicando explícitamente varias skills de diseño (frontend-design, design, ui-ux-pro-max, canvas-design) y prompt-enhancer para afinar el brief antes de construir.

**Qué se hizo:**
- Se interpretó "aplica /design" como aprovechar el nivel de exigencia visual de esas herramientas, **no** como usar literalmente el lienzo de Design Canvas (hospedado, editable) ni el flujo de canvas-design (arte estático en .png/.pdf) — ambos son formatos distintos al que exige el documento maestro del Proyecto: un solo `.html` autocontenido, offline, con la paleta y tipografía ya fijas del tema "R Notebook". Se avisó de este ajuste en vez de bloquear con una pregunta, dado que el documento maestro ya resolvía la ambigüedad.
- Se aplicó el framework de 8 componentes de prompt-enhancer internamente (rol, tarea, contexto, restricciones, formato) para fijar un brief antes de escribir código, en vez de saltar directo a construir.
- Se construyó `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`: un archivo, 4 pestañas, todos los componentes obligatorios del sistema de diseño (hero con ciclo de datos, nav sticky, XP, badges de IA, tarjetas con hover glow, textareas con revelar condicionado, panel de feedback con criterios exactos, barra de progreso, resaltado manual de código R, SVG inline, grain texture, pregunta de verificación de cierre).
- Contenido verificado contra fuentes reales: R4DS Cap. 2 (WebFetch del texto real, no memoria) y el detalle línea por línea del programa oficial para Semana 01 (`grep` sobre [[Programa Oficial (ESEN)]]) — de ahí salió que la indexación de vectores (`vector[i]`) es contenido de Semana 02, no de Semana 01, así que el Playground y el Laboratorio se limitaron a creación de vectores y operaciones vectorizadas completas, sin indexar.
- Analogías económicas: ingresos/costos/utilidad de un pequeño negocio, tasa de crecimiento, número índice — tomadas del banco de aplicaciones ya definido para la Semana 01, incluyendo "índices y conversiones" y "series pequeñas de observaciones" del programa oficial.
- Verificación técnica antes de entregar: `grep` para confirmar cero CDNs externos salvo Google Fonts, cero `localStorage`, cero uso real de `dplyr`/`ggplot2`/pipe nativo; capturas de pantalla completas (Playwright) de las 4 pestañas en escritorio y una en móvil (390px, sin scroll horizontal); prueba de interacción real (escribir en un textarea, confirmar que el botón de revelar se habilita, que el panel de feedback aparece y que el XP sube); cálculo de contraste WCAG de la paleta ya fija (todos los pares texto/fondo entre 5.5:1 y 16.9:1, sobre el mínimo de 4.5:1).
- Se entregó el archivo al usuario y se escribió también en la carpeta del curso (fuera del vault, junto a los `.docx`) vía el puente al dispositivo.
- Se actualizó el vault: [[Semana 01]] (estado, checklist, funciones nuevas realmente usadas), [[Registro de Materiales]] y [[Sistema de Diseño - Tema R Notebook]] (este archivo ahora es el estándar de calidad de referencia), [[Home]] (estado actual), [[Patrones que Funcionan Bien]].

**Qué funcionó:**
- Fijar por escrito, antes de codificar, qué partes de las 4 skills de diseño aplicaban (ejecución, jerarquía, motion, pulido) y cuáles no (paleta/tipografía ya están fijas) evitó terminar con un archivo bonito pero fuera de marca o en el formato equivocado (canvas hospedado en vez de HTML offline).
- Verificar el contenido permitido por semana contra el detalle línea por línea del programa oficial (no solo el resumen) evitó un error real: casi se incluye indexación de vectores en la Semana 01 porque parecía natural pedagógicamente, pero el programa la reserva para la Semana 02.
- Probar con una captura de página completa automatizada, no solo revisar el código a simple vista, encontró un problema real de UX (contenido invisible bajo el pliegue por la animación fade-in) que no era obvio leyendo el HTML.

**Qué no funcionó / qué se ajustó:**
- El primer intento de captura con Playwright falló porque el selector `.first` tomaba el textarea de la Guía (oculta, pestaña inactiva) en vez de la del Laboratorio — hubo que acotar el selector al panel activo (`#panel-lab textarea.answer`) en vez de un selector genérico.
- La animación `fade-in` por scroll dejaba secciones completas en `opacity:0` permanente en una captura de página completa (el `IntersectionObserver` nunca las "vio" pasar por el viewport real) — se agregó una red de seguridad (`setTimeout` que fuerza visibilidad después de 1.5s) para que ningún contenido educativo dependa 100% de que la animación dispare correctamente.

**Ajuste para la próxima vez:** al automatizar screenshots de un archivo con animaciones de scroll, no confiar en un solo `full_page` screenshot inmediato — probar también con tiempo de espera después de la carga (para que la red de seguridad, si existe, tenga oportunidad de actuar) y, si es posible, simular scroll real en vez de solo redimensionar el viewport.

## Auditoría anti-AI-slop (misma sesión, después de la entrega inicial)

**Contexto:** Carlos conectó dos carpetas nuevas del dispositivo (`claude-skills`, su archivo personal de 119+ skills, y `claude-guides`) y pidió aplicar esas skills y directrices para mejorar el diseño, evitar "AI-slop" y definir mejores paletas de color en los artefactos de aprendizaje.

**Qué se hizo:**
- Se leyeron las skills de diseño más relevantes del archivo personal: `design-taste-frontend`, `high-end-visual-design`, `impeccable`, `gpt-taste`, `design-critique`, `design-system`, `extract-design`. La mayoría (`design-taste-frontend`, `high-end-visual-design`, `gpt-taste`) están explícitamente pensadas para landing pages de marketing en React/Tailwind/GSAP ("Not dashboards, not data tables, not multi-step product UI", cita literal de `design-taste-frontend`), un registro distinto al de esta herramienta educativa multi-pestaña con marca ya fija. Se aplicaron solo las reglas de higiene universales, register-agnostic, y se descartaron las específicas de landing page que entrarían en conflicto con los requisitos ya fijos del documento maestro (grain texture, tipografía Fraunces, secciones numeradas pedagógicas).
- Cambios reales aplicados a `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`:
  - Eliminados los 43 guiones largos (—) del archivo, reescritos caso por caso (coma, dos puntos, punto y seguido, punto medio) según el contexto de cada frase, no con un reemplazo ciego. Regla descrita en `design-taste-frontend` como "el Tell visual más violado en producción".
  - Bloque `@media (prefers-reduced-motion: reduce)` agregado (no existía) — colocado al final de la hoja de estilos a propósito, porque puesto antes perdía la cascada contra reglas posteriores con la misma especificidad (se detectó con Playwright: `reducedMotion:'reduce'` seguía mostrando `opacity:0`, y tras mover el bloque al final pasó a `opacity:1`).
  - Barra de progreso (`.progress-fill`) migrada de animar `width` a animar `transform:scaleX()` (GPU-safe), incluyendo el JS que la actualiza.
  - Contraste explícito en placeholders de textarea (`::placeholder`), antes dependía del gris por defecto del navegador.
  - Escala de radios consolidada de 6 valores sueltos (7/9/10/12/14/16px) a 3 tokens + pill (`--r-sm:8px`, `--r-md:12px`, `--r-lg:16px`, `--r-pill:999px`), con variable `--z-subnav` agregada para que el `z-index` del subnav ya no fuera un número suelto.
  - `.exercise` cambió el acento lateral (`border-left`) por una barra superior degradada (mismo patrón que `.card::before`) — el borde lateral de color está señalado en `impeccable` como un patrón "nunca intencional"; se mantuvo la codificación semántica por color (obligatoria en el documento maestro) pero en un tratamiento distinto, menos genérico.
  - `max-width:72ch` + `text-wrap:pretty` en párrafos, `text-wrap:balance` en encabezados.
- **Bug real encontrado y corregido** (no relacionado con "AI slop", sino con lógica): el botón de "revelar" actualizaba `updateProgress()` *antes* de marcar `btn.disabled = true` y cambiar su texto, por lo que la barra de progreso siempre iba un paso atrás del estado real. Se encontró al verificar con Playwright que la barra se quedaba en 0% tras la primera interacción cuando debía mostrar ~8-11%. Se corrigió el orden de las líneas.
- **Se decidió NO tocar la paleta de colores fija.** Razonamiento explicado a Carlos: las dos alertas más citadas contra paletas "de IA" (el degradado morado por defecto en todo, y la paleta "premium-consumer" de beige cálido + bronce + espresso) ya no aplican aquí — el sistema "R Notebook" es una paleta semántica de 6 acentos con un propósito documentado cada uno (coral=Sin IA/errores, verde=IA permitida/correcto, violeta=IA requerida/proyecto, ámbar=lecturas/advertencias, azul/teal=navegación/código), ya usada de forma consistente en el resto del vault. Cambiar los valores hex habría roto esa consistencia de marca sin resolver ningún problema real. La mejora de "paleta" se hizo a nivel de disciplina de tokens (radios, z-index) en vez de a nivel de valores de color.
- Se mantuvieron deliberadamente, con justificación explícita: la tipografía Fraunces (marcada como "serif por defecto a evitar" en `design-taste-frontend`, pero es la tipografía de marca ya fija y usada en todo el vault, no un default perezoso); el filtro `feTurbulence` del grain texture (marcado como "amateur" en `impeccable`, pero es un componente obligatorio del documento maestro); las secciones numeradas 01-09 de la Guía y Ej.01-05 del Laboratorio (marcadas como "Tell" salvo que la sección sea una secuencia real, y aquí sí lo es: son ejercicios en dificultad progresiva, no etiquetas decorativas).
- Verificación posterior con Playwright: 4 pestañas × escritorio y móvil sin overflow horizontal (se encontró y corrigió uno nuevo: en Playground móvil, el `.code` con `white-space:pre` desbordaba su celda de grid porque `min-width:auto` es el valor por defecto de los hijos de grid — se agregó `min-width:0` a los contenedores; y la tabla del dataset se volvió `display:block; overflow-x:auto` para desplazarse dentro de su propio marco en vez de empujar la página), prueba de interacción (textarea → botón se habilita → feedback aparece → XP sube → checkbox suma XP), y confirmación de `prefers-reduced-motion` funcionando.
- Archivo reentregado al usuario y sobrescrito en la carpeta del curso en el dispositivo.

**Qué funcionó:**
- Triar las skills genéricas de diseño contra el documento maestro del proyecto *antes* de aplicar nada evitó romper la identidad visual ya establecida (que es más estricta y más específica al contexto ESEN que cualquier regla genérica anti-slop).
- La verificación automatizada (Playwright) volvió a encontrar un problema real que la lectura del código no había mostrado: el bug de la barra de progreso desfasada.

**Qué no funcionó / qué se ajustó:**
- El bloque `prefers-reduced-motion` no funcionaba en su primera ubicación (cerca del inicio de la hoja de estilos) por orden de cascada, no por sintaxis — hay que declarar overrides de accesibilidad al final del archivo CSS cuando compiten con reglas de igual especificidad declaradas después.

**Ajuste para la próxima vez:** al fijar un token nuevo (radios, z-index, etc.) para "consistencia de forma", conviene revisar también los elementos dentro de contenedores CSS Grid con contenido monoespaciado/`pre` — el desborde por `min-width:auto` en hijos de grid es fácil de pasar por alto en revisión visual y solo aparece en viewports angostos.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[Home]]
