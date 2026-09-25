# Vault FPEN · Guía de estudio de Fundamentos de Programación para Economía y Negocios

ESEN · Ciclo III/2026 · Secciones 1 y 2 · Catedrático: Alvin Javier Portillo Tiliano.

Este repositorio tiene tres partes:

- **El vault de Obsidian** (carpetas `00 Programa/` a `06 Código R/`, `Home.md`, `AGENTS.md`): la memoria del curso (programa, mapa curricular, política de IA, bitácora y código de clase). Empieza por `AGENTS.md`.
- **El sitio web** en `docs/`: una guía de estudio interactiva que se publica con GitHub Pages desde esa carpeta.
- **Las herramientas** en `herramientas/`: el contenido fuente de cada página y los scripts que generan `docs/`, calculan con R los gráficos de portada y verifican todo. Las páginas de `docs/` no se editan a mano; ver `herramientas/README.md`.

## El sitio (`docs/`)

| Página | Contenido |
|---|---|
| `index.html` | Portada, recorrido Programar · Analizar · Comunicar, temario de las 12 semanas con barra de avance, cómo estudiar, evaluación y rúbrica, política de IA, bibliografía y progreso |
| `semana-01/` | R como herramienta para pensar: consola y scripts, objetos, tipos, operadores, funciones, vectores |
| `semana-02/` | De valores a conjuntos de datos: vectorización, indexación, vectores lógicos, matrices, data frames, `read_csv()` |
| `semana-03/` | Visualizar antes de modelar: `ggplot2`, barras, histograma, boxplot, dispersión, líneas, elegir el gráfico |
| `semana-04/` | Transformar datos: `dplyr`, el pipe `\|>`, `filter()`, `mutate()`, operadores lógicos y `NA` |
| `semana-05/` | Sesión 1: el pipe en acción, Y contra O, `%in%`, `arrange()`, `select()` y `rename()` con `nycflights13` |
| `control-01/guia/` | Control 01: lectura profunda de las semanas 1 a 3, 36 preguntas para analizar, R4DS en contexto, mapa y cierre |
| `control-01/repaso/` | Control 01: 30 preguntas de teoría, práctica con R real, simulacro cronometrado de 45 minutos y cheat sheet |

Las semanas 6 a 12 aparecen en el temario como “sin guía todavía”.

Cada semana incluye:

- **Qué puedes usar y qué no todavía**: nunca se usa una función que el curso enseña en una semana posterior.
- **Lecturas** de R4DS (2.ª ed.) con qué buscar en cada capítulo.
- **Control de lectura**: un quiz que se corrige solo y explica cada respuesta.
- **En palabras simples**: una analogía de negocios o economía al inicio de cada tema.
- **Conceptos resueltos con el ciclo del curso**: pregunta → exploración → implementación → resultado → interpretación → verificación.
- **Tablas de traza** para llenar a mano, con botón para comprobar.
- **Ejercicios** con su nivel de IA (Sin IA, IA permitida, IA requerida), un cuadro para escribir la respuesta y la solución desplegable, que se abre cuando escribiste un mínimo de caracteres.
- **Práctica intensiva**: ejercicios rápidos de “¿qué imprime R?” que se corrigen solos y 3 problemas tipo examen con casos de prueba y solución verificada.
- **Proyecto grupal**: la fase de la semana, entregables y preguntas de defensa del banco oficial.
- **Lista “puedo…”** para el control o el parcial, **cheat sheet** y fuentes.
- **Progreso** guardado solo en tu navegador (`localStorage`, clave `fpen-guia-v1`, distinta de otras guías que compartan el dominio de GitHub Pages).

### R ejecutable en la página

Cada bloque de R tiene **Ejecutar** y **Editar**. Corre con [webR](https://docs.r-wasm.org/webr/latest/) (R compilado a WebAssembly) en el navegador, sin instalar nada:

- La primera ejecución descarga R (10 a 30 segundos). Los paquetes (`readr`, `ggplot2`, `dplyr`, `nycflights13`, `palmerpenguins`) se instalan la primera vez que un bloque los carga.
- Los bloques que dependen de otros (por ejemplo, de la importación de una base) los ejecutan antes, solos (`data-previo`).
- Los CSV de práctica están en `docs/datos/` y se leen con rutas relativas, como en un proyecto de RStudio (`read_csv("datos/hogares.csv")`).
- Los gráficos se dibujan debajo de la salida. Un bucle infinito se detiene a los 15 segundos y la siguiente ejecución abre una sesión de R nueva.
- Ctrl + Enter en el editor ejecuta el bloque.

## Diseño

Voz propia de **tabloide económico**: cada semana es una edición con portada, gráfico y titulares. Mismos componentes e interacción de estudio de siempre, con identidad FPEN.

- **Portada**:
  - número de semana gigante, titular y un sello con la evaluación;
  - la pregunta orientadora en una franja azul noche con subrayado ámbar;
  - un **gráfico real de los datos de la semana** (calculado con R) que se lee con una **lupa**: se mueve con el cursor, al tocar o con las flechas ← →, y una región viva lee cada dato.
- **Color por momento de estudio**:
  - ámbar para *Antes de clase*, blanco frío para *Aprender*, azul noche para *Practicar* y azul R intenso para *Proyecto y evaluación*;
  - detrás corre, tenue, la serie de datos de la semana.
- **Barra interactiva**:
  - **cinta de semanas** que cotiza tu avance ("S2 ▲ 42 %"): corre despacio y se pausa con el cursor, el foco o un botón;
  - **índice de la página**, con la sección actual, su momento y el tiempo de lectura restante;
  - **buscador Ctrl K** de semanas, secciones, ejercicios y funciones de R (cada función, en la semana que la enseña);
  - **barra de lectura**, tema claro u oscuro y menú a pantalla completa.
- **Papeles de imprenta** (marco de 2 px y sombra sólida desplazada) para cajas, ejercicios, quiz, tablas y código.
- **Vidrio ahumado** azul noche con filo ámbar solo en "En palabras simples", la nota de la lupa, el índice y el buscador. Con "reducir transparencia" pasa a sólido; con "reducir movimiento" no hay animaciones y la cinta queda quieta.
- **Código como en RStudio**: pestaña de script `.R`, etiqueta R, Editar, Ejecutar, Copiar y números de línea. Las salidas son el panel **Console**.
- Tipografías **Schibsted Grotesk** (titulares, cifras, etiquetas y gráficos), **Source Serif 4** (lectura) y **JetBrains Mono** (código, sin ligaduras).
- Logo y favicon FPEN. Colores semánticos del curso para las etiquetas de IA: coral, verde y violeta.
- **Láminas SVG** en `docs/assets/img/`, numeradas en cada página; gráficos de resultado generados con R en `docs/assets/img/graficos/`.

Archivos compartidos:

- `docs/assets/guia.css`;
- `docs/assets/guia.js`: progreso, quizzes, trazas, bloqueo de soluciones, simulacro, cinta, índice, buscador, lupa, menú y tema;
- `docs/assets/ejecutar-r.js`: webR;
- `docs/assets/buscar.json`: índice del buscador.

El detalle completo está en `00 Programa/Sistema de Diseño - Tema R Notebook.md`.

## Verificación

- Todos los bloques de R con salida mostrada se ejecutaron con R 4.3 (dplyr 1.1, ggplot2, readr) y se compararon con la página; los bloques sin salida se ejecutaron para confirmar que no dan errores (salvo los ejemplos de error intencionales).
- Sin ids duplicados, anclas rotas ni archivos inexistentes; todos los SVG son XML válido.
- Con Chromium (Playwright):
  - sin scroll horizontal a 390 y 1280 px y sin errores de JavaScript;
  - quizzes y trazas dan “correcto” con las soluciones;
  - Ejecutar, Editar, bucle infinito, gráficos, CSV y simulacro funcionan en el navegador;
  - el índice salta a cada sección, Ctrl K encuentra y navega, la lupa responde al teclado y la cinta se pausa.

## Publicar con GitHub Pages

1. En GitHub, abre el repositorio → **Settings** → **Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. Elige la rama y la carpeta **`/docs`**, y pulsa **Save**.
4. En uno o dos minutos la guía queda en `https://<usuario>.github.io/Vault-FPEN/`.

## Verla en tu computadora

```bash
cd docs
python3 -m http.server 8000
# y abre http://localhost:8000
```

Abrir `index.html` con doble clic también funciona, pero la ejecución de R y la carga de los CSV necesitan un servidor (http).

## Aviso

Material de apoyo **no oficial**: no sustituye la lectura ni la clase. Si algo no coincide, mandan el programa del curso y Moodle. La guía resume los temas de R for Data Science sin reproducir su contenido. Los datos de práctica (`hogares`, `salarios`, `empresas`, `ventas`…) son simulados.
