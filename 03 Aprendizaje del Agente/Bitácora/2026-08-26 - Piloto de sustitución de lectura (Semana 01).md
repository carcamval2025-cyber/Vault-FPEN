---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "piloto de diseño pedagógico"
---

# 2026-08-26 — Piloto de sustitución de lectura (Semana 01)

**Contexto:** Carlos planteó una ambición nueva para todo el curso: que la pestaña Guía de Estudio no sea solo un resumen de apoyo, sino que pueda funcionar como sustituto real de la lectura asignada de R4DS, visualizando los mismos conceptos que el capítulo explica en prosa ("la idea es que se puedan visualizar los conceptos de la lectura"). Se documentó el enfoque como regla formal en [[Sistema de Diseño - Tema R Notebook]] (sección "Objetivo: la Guía debe poder sustituir la lectura") antes de tocar ningún archivo, y luego se probó en una sola sección como piloto, según lo acordado.

**Qué se hizo:** se rediseñó la sección "Objetos y asignación" (id `g-objetos`) de la Guía de la Semana 01, el concepto más cargado de la semana (asignación con `<-`, qué hace R al ejecutar una línea que no imprime nada). Antes: un párrafo de definición + un bloque de código con su salida + un tip de atajo de teclado, formato de hoja de referencia. Después:

1. **Marco narrativo primero**: la sección abre con la pregunta económica real (los $4,200 de enero) en vez de la definición abstracta de "objeto".
2. **Diagrama del comportamiento invisible**: dos paneles ("antes" / "después" de ejecutar la línea) mostrando el ambiente de R como una caja con etiquetas, explícitamente conectado al panel Environment real de RStudio para que el estudiante lo reconozca cuando abra RStudio. Hace visible que la asignación no imprime nada pero sí crea un objeto, que es justo lo que R4DS explica con prosa.
3. **Evaluador de juguete interactivo**: un input numérico + botón "Asignar" (ambos elementos nativos, accesibles por teclado sin esfuerzo extra) que recalcula en vivo el valor mostrado en el diagrama y simula las dos líneas de consola correspondientes (la asignación silenciosa, luego el nombre solo imprimiendo el valor). Etiquetado explícitamente como "Simulación en JavaScript, no ejecución real de R", según exige la regla de "Ejecución real vs. simulada" del documento maestro.
4. El párrafo de cierre y el tip del atajo de teclado se conservaron, pero recortados, porque el diagrama ya carga buena parte del peso conceptual que antes llevaba solo el texto.

Todo dentro de los tokens ya fijos (colores, tipografía, radios, z-index) — el `.toy-eval` reutiliza el patrón de borde punteado que ya existía en `.verify-box`, y `.env-box`/`.toy-eval` reutilizan el mismo degradado sutil de profundidad del pase anterior.

**Verificación:** Playwright en escritorio (1440×900, sin desbordamiento) y móvil (390×844, la flecha del diagrama rota 90° para apilarse verticalmente, sin desbordamiento), interacción real (cambiar el valor del input y hacer clic en "Asignar" actualiza el diagrama y la consola simulada; la tecla Enter dentro del input dispara la misma acción que el botón) y `reducedMotion:'reduce'` (el resto de la página sigue resolviendo correctamente). Se regeneró `docs/semana-01/index.html` a partir del archivo corregido y se verificó la misma interacción ahí también.

**Qué funcionó:**
- Anclar el diagrama al panel "Environment" real de RStudio (en vez de una metáfora inventada) le da al estudiante algo que va a reconocer la primera vez que abra RStudio, no solo una ilustración bonita sin conexión con la herramienta real.
- El evaluador de juguete no necesitó ningún estado nuevo de XP ni de progreso — es exploratorio, no evaluado, así que se mantuvo fuera del sistema de XP existente a propósito, para no complicar esa lógica ni dar la impresión de que es un ejercicio calificado.

**Qué no funcionó / qué se ajustó:** ninguno de los hallazgos técnicos previos (contraste, `prefers-reduced-motion`, z-index) reaparecieron aquí porque el nuevo componente reutilizó patrones ya establecidos (degradado de profundidad, borde punteado, curva de easing) en vez de inventar CSS nuevo desde cero — confirma que vale la pena seguir reutilizando el vocabulario visual ya auditado en vez de crear componentes nuevos sin necesidad.

**Ajuste para la próxima vez / pendiente:** este es un piloto de una sola sección, no una generalización todavía. Antes de aplicar el mismo tratamiento a las otras 8 secciones de la Guía de Semana 01 (y luego a las Semanas 02-12), falta: (1) que Carlos revise este piloto y confirme si el enfoque funciona como él lo imaginaba; (2) subir a la Knowledge del proyecto los capítulos de R4DS realmente asignados por semana (hoy solo está el Capítulo 4, de estilo) para poder verificar cada sección rediseñada contra el capítulo real, no contra una paráfrasis general del libro.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[2026-08-26 - Elevación visual (tercer pase) y multi-material por semana]]
