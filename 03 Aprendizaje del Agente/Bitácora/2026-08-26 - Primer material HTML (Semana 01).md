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

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[Home]]
