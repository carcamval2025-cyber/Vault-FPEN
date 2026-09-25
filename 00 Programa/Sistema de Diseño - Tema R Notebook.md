---
tags: [programa, diseno, guia-fpen]
---

# Sistema de Diseño — Guía FPEN (vigente desde el 25 de septiembre de 2026)

> El nombre del archivo se conserva para no romper los enlaces del vault. El tema anterior, "R Notebook" (oscuro, Fraunces + Literata, 4 pestañas, XP), quedó **reemplazado** por decisión de Carlos: la guía adopta el sistema de componentes e interacción de su guía de IDS, con identidad propia de FPEN. El texto completo del sistema anterior está en el historial de git de este archivo.

## Dónde vive

Todo el diseño está en `docs/assets/` y lo comparten todas las páginas. Una página nueva **no** trae CSS ni JS propios.

| Archivo | Qué hace |
|---|---|
| `guia.css` | Tokens, componentes, liquid glass, ventanas estilo RStudio, modo oscuro, accesibilidad |
| `guia.js` | Progreso (`localStorage`, clave `fpen-guia-v1`), quizzes, trazas, bloqueo de soluciones, simulacro, menú, tema, copiar, láminas SVG incrustadas |
| `ejecutar-r.js` | Ejecutar y Editar código R con webR, bloques previos, CSV, gráficos, tiempo límite |
| `icons/` | Íconos SVG de las cajas y botones |
| `img/` | Láminas SVG independientes; `img/graficos/` tiene los gráficos de resultado generados con R |

## Identidad

| Token | Valor | Uso |
|---|---|---|
| Azul noche (`--brand`) | `#111a30` | Portadas, barra flotante, editor de código |
| Ámbar (`--mark`) | `#f5a623` | Resaltador de la pregunta orientadora, semana actual, lo esencial |
| Azul R (`--accent`) | `#4c9aff` aclarado / oscurecido según el tema | Enlaces y acción principal |
| Teal | `#2dd4bf` | Información neutra, funciones en el código |
| Coral | `#ff6b6b` | **Sin IA** y errores |
| Verde | `#34d399` | **IA permitida** y respuestas correctas |
| Violeta | `#a78bfa` | **IA requerida** y proyecto grupal |

- Tipografías: **Fraunces** (títulos, la serif del logo), **Atkinson Hyperlegible Next** (lectura) y **JetBrains Mono** (código, sin ligaduras).
- Logo y favicon FPEN en la barra; ilustraciones Programar, Analizar y Comunicar en el índice.
- Un tono por semana (`body[data-semana="sN"]`, y `c1` para Control 01) cambia los campos de color del fondo y la luz de la portada.
- Tema claro u oscuro según el sistema, con botón para cambiarlo (se recuerda en `fpen-guia-v1-tema`).

## Componentes

- **Barra flotante** con S1 a S12 (las semanas sin guía, atenuadas) y C1, más menú a pantalla completa.
- **Portada** en azul noche: número de semana en Fraunces, prompt `>` en la unidad, pregunta orientadora con resaltador ámbar, ciclo importar → … → comunicar con las etapas de la semana resaltadas, datos de lectura, proyecto y evaluación, y barra de avance.
- **Paneles liquid glass** (transparentes, desenfoque, brillo y canto de luz). Con `prefers-reduced-transparency` pasan a sólidos; con `prefers-reduced-motion` no hay animaciones.
- **Código como en RStudio**: pestaña de script `.R`, etiqueta R, Editar, Ejecutar y Copiar, números de línea. La salida es el panel **Console** con el prompt `>`.
- **Caja “En palabras simples”** al inicio de cada tema (analogía de economía o negocios).
- **Ciclo** pregunta → exploración → implementación → resultado → interpretación → verificación, con la verificación en verde.
- **Control de lectura** (quiz autocorregible con explicación), **tablas de traza**, **ejercicios rápidos** (“¿qué imprime R?”), **ejercicios** con etiqueta de IA, cuadro de respuesta (la solución se abre al escribir el mínimo de caracteres) y **problemas tipo examen** con casos de prueba.
- **Etiquetas de IA** como píldoras de color semántico: `<span class="ia sin">`, `ia permitida`, `ia requerida`. Toda actividad evaluada declara su nivel.
- **Simulacro**: `<div class="simulacro" data-minutos="45">` con reloj; las soluciones se abren al finalizar o al acabarse el tiempo.
- **Antes → después** para transformaciones (`.antes-despues` con filas que salen o columnas nuevas resaltadas).
- **Proyecto** (entregables y preguntas de defensa), **lista “puedo…”**, **cheat sheet** y navegación entre semanas.

## Código R en la página

- Bloque: `<pre data-file="nombre.R"><code class="language-r">…</code></pre>`; su salida, `<pre class="salida"><code>…</code></pre>` inmediatamente después.
- `data-previo="id"` ejecuta antes otro bloque (datos o `library()`); `data-archivos="../datos/x.csv"` deja el archivo en `datos/x.csv`; `data-norun` para fragmentos ilustrativos.
- **Toda salida mostrada debe salir de ejecutar el código de verdad** (R local para comparar, la misma que da webR). No se escriben tibbles “a mano”: R abrevia (`diciem…`, `5506.`) y la página debe mostrar lo mismo.
- Los paquetes se cargan con `library()` desde la semana en que el curso los introduce; `warn.conflicts = FALSE` en los bloques de preparación de dplyr para que la salida sea estable.

## Láminas

- SVG independientes en `docs/assets/img/`, fondo claro, Fraunces para títulos, Atkinson para etiquetas y JetBrains Mono (sin ligaduras) para código.
- Se muestran con `<figure class="lamina"><div class="placa"><div class="placa-core"><img …></div></div><figcaption>…</figcaption></figure>`; en GitHub Pages se incrustan para usar las fuentes de la página.
- Las ilustraciones generadas con IA se conservan como archivo aparte, con `data-no-inline` y la clase `ia-ilustracion`, que agrega al pie “Ilustración de apoyo generada con asistencia de IA”. El flujo para pedir una nueva sigue igual: prompt literal con la paleta y lo que no debe aparecer, revisar el archivo real y su fidelidad al concepto antes de integrarla, y rotularla como IA.

## Higiene que sigue vigente

- Cero guiones largos (—) en el texto visible.
- `prefers-reduced-motion` y `prefers-reduced-transparency` respetados.
- Elementos interactivos nativos y accesibles por teclado (`button`, `label`, `details`).
- Contraste suficiente en ambos temas; límite de ancho de línea en la prosa.
- Sin scroll horizontal a 390 px; tablas y código se desplazan dentro de su propio contenedor.

## Checklist antes de publicar una página

1. Ejecutar todos los bloques de R y comparar con las salidas de la página.
2. Revisar ids duplicados, anclas rotas, archivos inexistentes y que los SVG sean XML válido.
3. Con Playwright: sin scroll horizontal a 390 y 1280 px, sin errores de JavaScript, quizzes y trazas dan “correcto” con las soluciones, Ejecutar y Editar funcionan.
4. Progresión estricta: nada de una semana posterior, salvo marcado como adelanto opcional.
5. Registrar el resultado en `Registro de Materiales.md` y en la bitácora.

## Notas relacionadas

[[Programa General]] · [[Política de IA]] · [[Patrones que Funcionan Bien]] · [[Errores Comunes a Evitar]] · [[Registro de Materiales]]
