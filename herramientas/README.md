# Herramientas de construcción de la guía

Con estos scripts se arma el sitio `docs/`. **Las páginas de `docs/` no se editan a mano:** el contenido se escribe en `fuentes/` y `gen.py` pone alrededor todo lo que se repite:

- la barra, con la cinta de semanas, el índice, el buscador y la lectura;
- la portada, con su gráfico y su lupa;
- los tramos de color, el pie y los scripts.

Todos los comandos se ejecutan **desde la raíz del repositorio**.

## Qué hay aquí

| Archivo | Para qué sirve |
|---|---|
| `fuentes/*.html` | El contenido de cada página: solo las `<section id="…">`, en orden (`s1`…`s5`, `c1g`, `c1r`, `index`). `{RAIZ}` se reemplaza por la ruta a `docs/` |
| `paginas.py` | Los datos de cada página: título, portada (número, titular, entrada, pregunta orientadora, ficha) e índice. Los grupos del índice definen los tramos de color |
| `gen.py` | Genera `docs/*/index.html`, `docs/assets/buscar.json` y las series de fondo (`docs/assets/img/serie-*.svg`) |
| `portadas.R` → `portadas.json` | Calcula con R los datos de los gráficos de portada a partir de `docs/datos/` |
| `portadas.py` | Dibuja los gráficos de portada (SVG con los datos que usa la lupa) |
| `marca/logo.py` | Genera el logo FPEN ▲ y el favicon en `docs/assets/brand/` (convierte Schibsted Grotesk Black a trazos; la fuente va en `marca/`, licencia OFL). Requiere `fonttools` y `brotli` |
| `laminas/` | Dibuja las láminas SVG de `docs/assets/img/` (`svg.py` tiene las ayudas y la paleta) |
| `graficos.py` | Ejecuta en R los bloques con `ggplot()` y guarda los PNG de resultado en `docs/assets/img/graficos/` |
| `verificar_r.py` + `prelude.R` | Ejecuta cada bloque de R de una página y compara con la salida que muestra la página. `prelude.R` es el mismo que usa webR en `ejecutar-r.js` |
| `estatico.py` | Busca ids duplicados, anclas rotas, archivos inexistentes y SVG inválidos |
| `pruebas_navegador.py` | Pruebas con Playwright: scroll horizontal, errores de JS, quizzes, trazas, candados, panel Edición (tema y cinta), índice, Ctrl K y lupa |
| `pruebas_webr.py` | Pruebas de R real en el navegador: bloques con previo, CSV, gráficos, `NA`, bucle infinito y simulacro |

## Flujo de trabajo

```bash
# 1. Si cambian los datos de docs/datos o un gráfico de portada:
Rscript herramientas/portadas.R

# 2. Generar las páginas (todas, o solo algunas: python3 herramientas/gen.py s2 index)
python3 herramientas/gen.py

# 3. Verificar las salidas de R contra R real
python3 herramientas/verificar_r.py --todos docs/semana-0*/index.html docs/control-01/*/index.html

# 4. Revisión estática
python3 herramientas/estatico.py

# 5. Pruebas en el navegador (en otra terminal: cd docs && python3 -m http.server 8765)
python3 herramientas/pruebas_navegador.py viejo nuevo
python3 herramientas/pruebas_webr.py
```

## Agregar una semana nueva (por ejemplo, la 6)

1. Escribir `fuentes/s6.html` con las secciones en el orden del formato de sesión (ver `AGENTS.md`). Cada bloque de R lleva su salida real, y cada ejercicio su etiqueta de nivel de IA.
2. Agregar `PAGINAS["s6"]` en `paginas.py`, copiando la forma de otra semana. El índice (`toc`) debe tener los cuatro grupos: Antes de clase, Aprender, Practicar, Proyecto y evaluación.
3. En `gen.py`, agregar `6: "semana-06"` a `SEMANAS_CON_GUIA`.
4. Agregar el gráfico de portada:
   - datos en `portadas.R`;
   - dibujo en `portadas.py` (`linea`, `barras` o `barras_h`, con titular, subtítulo y fuente);
   - la clave en `series()` de `gen.py`;
   - la regla `body[data-semana="s6"] .tramo` en `docs/assets/guia.css`.
5. En `docs/assets/guia.js`, la lista `TITULOS` ya tiene las 12 semanas. Agregar la fila de la semana en el temario de `fuentes/index.html` y su barra en el gráfico de avance (`portadas.py`, caso `"inicio"`).
6. Generar, verificar y registrar en `04 Materiales Generados/Registro de Materiales.md` y en la bitácora.

## Qué se necesita instalado

- **R** con `readr`, `dplyr`, `ggplot2`, `jsonlite`, `nycflights13` y `palmerpenguins`.
- **Python 3** con `beautifulsoup4` y `playwright`. Chromium se toma de `PW_CHROMIUM` o de `/opt/pw-browsers/chromium`; si no existe, se usa el de Playwright.
- Si hay un proxy en `HTTPS_PROXY`, las pruebas lo usan para cargar las fuentes y webR, pero no para el servidor local.
