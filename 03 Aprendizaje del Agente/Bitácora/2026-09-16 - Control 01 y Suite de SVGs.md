---
tags: [bitacora]
fecha: 2026-09-16
material: "Control 01 (Semanas 01 y 02)"
tipo: "publicación web y suite de ilustraciones SVG independientes"
---

# 2026-09-16 — Control 01 y Suite de SVGs Independientes

**Contexto:** Se generaron y completaron los artefactos de preparación integral para el **Control 01** (`FPEN_Control01_Guia_de_Lectura_y_Analisis.html` y `FPEN_Control01_Repaso_y_Simulacro.html`, junto con el dataset de práctica `datos_practica_guia.csv`). Carlos solicitó vía `/grill-me` subir los artefactos a GitHub, actualizar la página principal (`docs/index.html`) y generar una suite de SVGs independientes sin pegarlos inline en el código.

**Suite de 3 SVGs generados (`docs/assets/brand/`):**
1. `fpen-vector-vs-dataframe.svg`: Vector unidimensional (1D) vs. Data Frame / Tibble bidimensional (2D), ilustrando que una tabla en R es una colección rectangular de vectores atómicos alineados por columnas de igual longitud, y cómo `df$columna` extrae el vector base.
2. `fpen-filtrado-logico.svg`: Mecanismo en 3 fases de indexación y filtrado por máscara booleana (`ventas[ventas >= 300]`), donde la comparación lógica produce un vector booleano paralelo y solo las posiciones `TRUE` atraviesan al vector resultante.
3. `fpen-coercion-tipos.svg`: Escalera de jerarquía de coerción atómica (`logical` &rarr; `integer` &rarr; `double` &rarr; `character`), documentando el caso de contaminación silenciosa por caracteres y la utilidad económica de la coerción aritmética (`sum()` para conteos, `mean()` para proporciones).

**Decisión de integración — SVGs independientes vía `<img>`:**
A diferencia del pase anterior donde se incrustó SVG inline para auto-contención, aquí se cumplió la instrucción explícita de "generar los SVGs independientes sin pegarlos en el código". Se guardaron como activos vectoriales limpios en `docs/assets/brand/` y se vincularon mediante `<figure class="concept-figure"><img src="../../assets/brand/fpen-*.svg" alt="..." loading="lazy" /><figcaption>...</figcaption></figure>`.

**Publicación web (`Vault FPEN/docs/`):**
- Se creó `docs/control-01/guia/index.html` (Guía de lectura analítica con 36 preguntas y R4DS en contexto).
- Se creó `docs/control-01/repaso/index.html` (Repaso teórico, 6 ejercicios de laboratorio con R en vivo vía webR, simulacro cronometrado y cheat sheet).
- Se publicó `docs/control-01/datos_practica_guia.csv` con enlace directo de descarga para uso en RStudio local.
- Se actualizó la página principal `docs/index.html` añadiendo una sección destacada de **Controles y Evaluaciones** con tarjetas interactivas y enlaces directos a ambos materiales.

**Validación técnica:**
- Los 3 archivos SVG fueron validados contra el analizador XML nativo de Python (`xml.etree.ElementTree`), corrigiendo entidades HTML no estándar (`&rarr;`, `&times;`, etc.) por sus correspondientes caracteres Unicode para garantizar un renderizado vectorial 100% puro y sin advertencias.
- Se verificaron todas las rutas relativas a estilos, fuentes, favicons y logos.

**Relacionado:** [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[Bitácora de Aprendizaje]]
