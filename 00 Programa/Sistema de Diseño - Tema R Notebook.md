---
tags: [programa, diseno, tema-r-notebook]
---

# Sistema de Diseño — Tema "R Notebook"

Sistema nuevo, no reciclado de otros cursos — pensado para R/Tidyverse en vez de SQL/MariaDB (a diferencia de la plantilla original del curso SIN).

## Paleta de colores

```
--bg0:    #0a0f1c   (fondo base)
--bg1:    #111a30   (tarjetas y paneles)
--bg2:    #182645   (hover states, headers internos)
--blue:   #4c9aff   (acción principal, correcto, R/RStudio)
--teal:   #2dd4bf   (información, tidyverse, links)
--amber:  #f5a623   (advertencias, lecturas previas)
--coral:  #ff6b6b   (errores, problemas, "Sin IA")
--violet: #a78bfa   (proyecto grupal, trabajo en equipo)
--green:  #34d399   (éxito, feedback correcto, "IA permitida")
--tp:     #edf1fa   (texto principal)
--ts:     #8792ae   (texto secundario)
```

**Uso semántico obligatorio** — no se puede reasignar color por color sin romper la convención del curso:

- coral = "Sin IA" y errores
- verde = "IA permitida" y respuestas correctas
- violeta = "IA requerida" y todo lo relacionado al proyecto grupal
- ámbar = lecturas previas y advertencias
- azul/teal = navegación, información neutra y código de R

## Tipografía

| Uso | Fuente | Notas |
|---|---|---|
| Display / Títulos | `Fraunces` (700–800) | Serif editorial — evita el look genérico de dashboard |
| Cuerpo / Lectura | `Literata` | Serif optimizada para lectura extendida |
| Código / Mono | `JetBrains Mono` | Alta legibilidad para distinguir `1`/`l`/`I` y operadores de R (`<-`, `\|>`, `::`) |

Nunca tipografías genéricas (Inter, Roboto, Arial, system-ui) para el display.

## Componentes obligatorios en cada sesión

1. Hero con grid animado o diagrama del ciclo importar→ordenar→transformar→visualizar→modelar→comunicar (marca recurrente del curso)
2. Navegación sticky con pills por sección
3. Sistema XP en el nav global que suma puntos por interacciones completadas
4. Badges de nivel de IA visibles en cada ejercicio — texto con color semántico, nunca emoji
5. Tarjetas de conceptos con hover glow + barra degradada al fondo
6. Respuestas con textarea — el botón de revelar deshabilitado hasta un mínimo de caracteres
7. Panel de feedback con criterios de evaluación completos, no frases de aliento genéricas
8. Barra de progreso en el laboratorio
9. Bloques de código R con resaltado manual (vanilla JS/CSS, sin librerías externas)
10. Íconos SVG inline — nunca emojis, nunca librerías externas de íconos
11. Grain texture con SVG filter en el body
12. Pregunta de verificación recurrente ("¿Cómo sabemos que este resultado es correcto?") como cierre de cada laboratorio

## Estructura de cada archivo de sesión (4 pestañas)

1. **Guía de Estudio** — hero con chips de contexto, navegación interna sticky, conceptos clave, analogías económicas, tabla de referencia, repaso activo con textareas
2. **Laboratorio** — hero con chips de dificultad y badge de IA por ejercicio, barra de progreso, 5 ejercicios mínimo progresivos (01–02 interpretación/predicción, 03–04 construcción con justificación, 05 ejercicio "Proyecto"), checkboxes de verificación, reflexión final
3. **R Playground** — 4 fragmentos progresivos con SOLO funciones ya enseñadas hasta esa semana, dataset simulado con contexto económico, salida junto al código
4. **Cheat Sheet** — compacto, vocabulario con badges, tabla de funciones de la semana, diagrama de la regla central, footer con bibliografía

## Ejecución real vs. simulada en el R Playground

R no puede ejecutarse de forma confiable con JavaScript vanilla. Dos caminos válidos, **nunca mezclados en el mismo archivo sin dejarlo explícito**:

- **Por defecto:** código R junto a salida **precomputada** (texto de consola o SVG estático), dejando claro que es referencia, no ejecución en vivo. Mantiene el archivo 100% offline.
- **Opcional/avanzado:** **webR** (WebAssembly) vía CDN para ejecución real — rompe el offline-first y añade carga pesada de WASM. Solo si el usuario lo pide explícitamente y acepta la excepción online-only.

## Formato de entrega

- Un solo archivo `.html` por sesión/material, todo integrado en pestañas. **Una semana puede tener más de un material** (por ejemplo, si hay más de una sesión de clase esa semana, o si un tema se divide en dos entregas) — no asumir una relación 1:1 entre semana y archivo.
- Nombre: `FPEN_Semana[NN]_[Titulo].html` (ej. `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`). Cuando una semana tiene más de un material, el `[Titulo]` de cada uno ya los distingue de forma natural (títulos distintos → nombres de archivo distintos); si dos materiales de la misma semana compartieran título, agregar un sufijo `a`/`b` al número de semana (`Semana01b`).
- Offline salvo Google Fonts (y webR si se pidió explícitamente).
- Sin librerías JS externas (nada de jQuery, Bootstrap, Chart.js, resaltado de sintaxis externo) — todo vanilla.
- Íconos SVG inline, nunca Font Awesome ni emojis funcionales.
- Responsive.
- Textareas editables con progreso en memoria de JS (sin `localStorage`).

## Identidad visual del sitio

Dirección aprobada por Carlos el 26 de agosto de 2026: un prompt de consola conectado a barras de datos por una órbita de aprendizaje. La marca resume programación, análisis y progresión sin copiar el logotipo oficial de R.

- **Wordmark maestro para fondo oscuro:** `docs/assets/brand/fpen-logo.svg`. El texto exacto se compone de forma controlada; no se genera con IA.
- **Favicon y símbolo compacto:** `docs/assets/brand/fpen-favicon.svg`. Se usa en el índice y en cada material publicado.
- **Ilustración del hero:** `docs/assets/brand/fpen-hero-data-lab.svg`. Es decorativa, transparente y reutiliza solo los tokens existentes.
- **Previews raster:** `fpen-logo-preview.png` y `fpen-favicon-256.png`, ambos con canal alfa real. Los SVG son siempre la fuente editable.

ImageGen se usa para exploración de composición, no como fuente del wordmark ni del texto final. Toda salida raster candidata debe verificarse por formato y alfa antes de integrarse; una cuadrícula visible no demuestra transparencia real.

### Serie visual del índice

El índice utiliza tres ilustraciones editoriales generadas con ImageGen y optimizadas como WebP de 960×640:

- `fpen-programar.webp` — consola, objetos y vectores.
- `fpen-analizar.webp` — tabla, transformación y patrones.
- `fpen-comunicar.webp` — verificación, informe y presentación.

Se consumen como una secuencia conceptual, no como decoración aislada. Los títulos y explicaciones permanecen en HTML; las imágenes no contienen texto y siempre llevan `alt` específico, dimensiones declaradas y carga diferida.

## Higiene anti-AI-slop (checklist para cada sesión nueva)

Reglas destiladas de un archivo personal de skills de diseño (`design-taste-frontend`, `high-end-visual-design`, `impeccable`), filtradas a lo *register-agnostic* — la mayoría de esas skills están pensadas para landing pages de marketing (React/Tailwind/GSAP), un registro distinto al de este curso, así que **no** se adoptaron reglas que entrarían en conflicto con este documento (ban a serifs, ban a secciones numeradas, bento grids, etc.). Solo lo universal:

- **Cero guiones largos (—)** en el texto visible. Es la señal de IA más citada en estas skills. Reescribir con coma, dos puntos, punto y seguido o punto medio, según el contexto de cada frase — nunca con un reemplazo automático ciego.
- **`@media (prefers-reduced-motion: reduce)`** obligatorio en todo archivo con animaciones (fade-in, hover, transiciones). Debe declararse **al final** de la hoja de estilos, no al inicio — si no, pierde la cascada contra reglas posteriores con la misma especificidad.
- **Animaciones GPU-safe**: animar solo `transform` y `opacity`, nunca `width`/`height`/`top`/`left` (ej. la barra de progreso usa `transform:scaleX()`, no `width`).
- **Contraste explícito en `::placeholder`** de cualquier textarea/input — no depender del gris por defecto del navegador.
- **Límite de ancho de línea** en prosa (`max-width` en `ch`, ~65–75) para que los párrafos no corran de borde a borde en pantallas anchas.
- **Escala de radios de borde limitada** (3–4 valores como máximo, vía variables CSS) en vez de valores sueltos repartidos por todo el archivo.
- **Ojo con los hijos de CSS Grid con `white-space:pre`** (bloques de código): pueden desbordar su celda en móvil por el `min-width:auto` por defecto — fijar `min-width:0` explícito.
- **Bordes laterales de color como "acento" están señalados como patrón genérico** — si se necesita codificación semántica por color en una tarjeta, preferir una barra superior degradada (como `.card::before`) sobre un `border-left` plano.

Lo que se decidió **no** tocar y por qué: la paleta de colores de este documento ya evita las dos alertas más citadas contra "paletas de IA" (el morado por defecto en todo, y la paleta beige+bronce "premium-consumer"), así que sus valores hex se mantienen fijos — la mejora de calidad se aplica a nivel de disciplina de tokens (arriba), no de color. Igual se mantiene la tipografía Fraunces, el grain texture con `feTurbulence` y las secciones numeradas 01–09, aunque skills genéricas los señalen como "Tell": aquí son requisitos deliberados de este documento, no defaults perezosos. Detalle completo del primer pase de auditoría en [[2026-08-26 - Primer material HTML (Semana 01)]].

## Checklist de curación (26 de agosto de 2026, segundo pase)

Checklist técnico, adaptado del archivo personal de skills de Carlos (`impeccable`, `ui-ux-pro-max`), que se aplica **automáticamente a toda sesión nueva (Semanas 02-12)** sin que haga falta pedirlo de nuevo. Ninguno de estos puntos toca color ni tipografía — son higiene de implementación, no de marca:

1. **Cero bordes "side-stripe"** (`border-left`/`border-right` de color como único acento de una tarjeta, caja o alerta). Si se necesita codificación semántica por color en una tarjeta, usar borde completo + tinte de fondo, o una barra superior degradada (patrón ya usado en `.card::before` y `.exercise::before`) — nunca un borde lateral plano.
2. **Todo elemento interactivo debe ser real y accesible por teclado**: usar `<button>`/`<a>`/`<label>` nativos en vez de `<div onclick>`; cualquier `role`/`aria-*` debe venir acompañado de comportamiento real (Enter/Espacio activan, no solo click de mouse). Ejemplo de bug real encontrado y corregido en este pase: los checkboxes de autoevaluación (`.check-item`) tenían el `<input>` visualmente oculto sin envolver en `<label>`, así que un clic en el texto o el ícono visible no marcaba nada — solo funcionaba clicando un área de 1×1px invisible. Se corrigió envolviendo cada `.check-item` en un `<label>`.
3. **`@media (prefers-reduced-motion: reduce)` obligatorio**, cubriendo tanto CSS (`transition`/`animation`) como cualquier animación disparada por JS (`Element.animate()`, como el rebote del contador de XP) — comprobar con `window.matchMedia('(prefers-reduced-motion: reduce)').matches` antes de invocar `.animate()`.
4. **Curva de easing `cubic-bezier(0.16,1,0.3,1)` (expo-out)** en todas las transiciones y animaciones con propósito de interfaz (hover, aparición de panel, barra de progreso, rebote de XP) — nunca `ease`/`linear`/`ease-out` por defecto del navegador.
5. **Contraste WCAG AA (≥4.5:1) verificado numéricamente**, no asumido — calcular con luminancia relativa real para: `--ts` sobre `--bg0`/`--bg1`/`--bg2`; cada color semántico (`--coral`/`--green`/`--violet`/`--amber`/`--blue`/`--teal`) sobre los fondos donde aparece como texto, incluyendo fondos compositados (ej. `rgba(color, .08)` de los badges de IA sobre `--bg1`). En la auditoría de la Semana 01 los 20+ pares verificados dieron entre 4.82:1 y 16.91:1 — la paleta ya pasa sin ajustes, pero cualquier color semántico nuevo que se agregue debe verificarse igual antes de usarse.
6. **Sin patrón "ghost-card"**: nunca combinar `border:1px solid` con un `box-shadow` de blur ≥16px en el mismo elemento (ej. tarjetas al hover) — es una de las señales de IA más específicas señaladas por `impeccable`. Si hace falta feedback de profundidad al hover, usar un `box-shadow` de blur ≤8px, o apoyarse en el `transform:translateY()` y el glow radial que las tarjetas ya tienen.
7. **Escala de z-index formal por variables**, incluso para el apilamiento simple (fondo vs. contenido vs. overlay de grain) — nunca números sueltos como `z-index:1`/`z-index:2` sin declarar como token, aunque el valor en sí sea pequeño y razonable.

Registro completo de ambos pases (incluyendo por qué el bug del checkbox y los otros hallazgos no se detectaron en el primer pase) en [[2026-08-26 - Primer material HTML (Semana 01)]].

## Elevación visual (26 de agosto de 2026, tercer pase — composición, no higiene)

A diferencia de los dos pases anteriores (higiene técnica: accesibilidad, motion, contraste), este pase respondió a feedback subjetivo directo de Carlos ("el diseño no es el mejor de todos") sobre `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`. Diagnóstico (vía capturas de pantalla de las 4 pestañas, revisadas con el framework de `design-critique`): el archivo cumplía todas las reglas técnicas pero se sentía plano y monótono — secciones numeradas 01-09 con el mismo patrón visual repetido sin variación de ritmo, tarjetas con relleno uniforme sin profundidad, y el hero sin un elemento gráfico propio (el "diagrama del ciclo" de este documento existía solo como fila de píldoras de texto, no como imagen). Mejoras aplicadas, **todas dentro de los tokens de color/tipografía ya fijos, sin agregar ninguno nuevo**:

1. **Diagrama orbital del ciclo en el hero principal**: SVG decorativo (nodos 1-6 en círculo, arco activo entre el paso actual y el siguiente) posicionado junto al título, visible solo en escritorio ancho (≥1080px) para no competir con el texto en móvil, donde ya existe la fila de píldoras equivalente. Le da al hero una identidad gráfica real en vez de solo texto y un fondo de grid casi imperceptible.
2. **Profundidad sutil en tarjetas** (`.card`, `.exercise`, `.cheat-card`, `.pg-dataset`): de relleno plano `var(--bg1)` a un degradado diagonal `var(--bg2)` → `var(--bg1)` de 165°, casi imperceptible pero suficiente para separar visualmente cada tarjeta del fondo de página en vez de fundirse con él.
3. **Numeral editorial de fondo por sección** (solo pestaña Guía, las 9 secciones `section.block`): un contador CSS (`counter-increment`/`counter()`, sin tocar el HTML de cada sección) genera un numeral grande (hasta ~7rem) en Fraunces al `opacity:.035` detrás del encabezado de cada sección, colgando parcialmente en el margen izquierdo. Rompe la monotonía de "bloque tras bloque idéntico" con un motivo editorial recurrente, oculto en móvil (`max-width:900px`) para no estorbar en pantallas angostas.
4. **Barra de progreso segmentada** en el Laboratorio: de una barra lisa de 8px a 12px con 4 marcas verticales (vía `repeating-linear-gradient` en una capa `::after` separada del relleno) que dividen visualmente los 5 ejercicios — refuerza la lectura de "voy en el ejercicio 2 de 5" que antes solo daba el porcentaje.

**Gotcha técnico encontrado**: el numeral de fondo (punto 3) usa `position:absolute` + `z-index:-1` dentro de `section.block`, pero `position:relative` por sí solo **no crea un contexto de apilamiento** — sin `isolation:isolate` explícito en `section.block`, el numeral se pintaba por encima del contenido en vez de detrás (el orden de pintado de CSS pone los descendientes posicionados con `z-index:auto/0` *después* del contenido en flujo no posicionado, así que un simple `z-index` negativo sin contexto propio se escapa al ancestro de apilamiento más cercano). Se corrigió agregando `isolation:isolate` a `section.block`.

**Verificación**: Playwright en escritorio (1440×900) y móvil (390×844) sin desbordamiento horizontal en ninguna pestaña, prueba de interacción completa (textarea → revelar → XP → checkbox por label) repetida y funcionando igual que antes de estos cambios, y prueba de `reducedMotion:'reduce'` (el `fade-in` sigue resolviendo a opacidad 1). También se regeneró `docs/semana-01/index.html` a partir del archivo corregido (reaplicando solo sus dos diferencias propias: favicon y enlace de vuelta al índice) y se verificó de nuevo contra un servidor HTTP local, no `file://` (ver [[2026-08-26 - Curación técnica (segundo pase) y publicación en GitHub Pages]] para por qué eso importa).

## Estándar de calidad de referencia

Establecido el 26 de agosto de 2026, actualizado el mismo día tras el tercer pase: **`FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`** (carpeta del curso, fuera del vault — registro completo en [[Registro de Materiales]] y en [[2026-08-26 - Primer material HTML (Semana 01)]]). Se construyó combinando varias herramientas de diseño (frontend-design, ui-ux-pro-max, principios visuales de canvas-design) **dentro** de la paleta y tipografía ya fijas de este documento, no reemplazándolas, se pasó por la checklist de higiene anti-AI-slop de arriba, y finalmente por un pase de composición/ritmo visual (sección anterior) — ese es el patrón completo a repetir: elevar la ejecución (jerarquía, composición, motion, pulido) y aplicar higiene register-agnostic, nunca renegociar el sistema de marca del curso.

Cualquier sesión nueva debe compararse contra este archivo antes de darse por terminada.

## Notas relacionadas

[[Programa General]] · [[Política de IA]] · [[Patrones que Funcionan Bien]] · [[Errores Comunes a Evitar]]
