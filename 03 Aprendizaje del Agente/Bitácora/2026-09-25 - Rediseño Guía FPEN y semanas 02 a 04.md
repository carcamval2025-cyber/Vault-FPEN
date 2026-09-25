---
tags: [bitacora]
fecha: 2026-09-25
material: "sitio docs/ completo; Semanas 01 a 05 y Control 01"
tipo: "creación | ajuste"
---

# 2026-09-25 — Rediseño Guía FPEN y semanas 02 a 04

**Contexto:** Carlos pidió llevar el sitio al nivel de diseño e interactividad de su guía de IDS (Python), con su sistema de componentes pero con identidad propia de FPEN, y escribir completas las semanas 2 a 4.

**Qué se hizo:** `docs/assets/guia.css`, `guia.js` y `ejecutar-r.js` (webR) compartidos; páginas de las semanas 1 a 5, Control 01 (guía y repaso) e índice en una sola estructura (control de lectura, En palabras simples, ciclo, trazas, ejercicios con etiqueta de IA y respuesta escrita, práctica intensiva, proyecto y defensa, lista “puedo…”). Láminas SVG nuevas en `docs/assets/img/`, gráficos generados con R y CSV de práctica en `docs/datos/`. Decisiones de Carlos: azul noche FPEN, resaltador ámbar, Fraunces + Atkinson + JetBrains Mono, código estilo RStudio, tema según el sistema, webR para ejecutar R.

**Qué funcionó:** generar cada salida ejecutando el bloque en R (y compararla después con un verificador) en lugar de escribirla; el atributo `data-previo` para que cada bloque ejecute antes la preparación de datos que necesita.

**Qué no funcionó / qué se ajustó:** las salidas de tibble de la Semana 5 original estaban escritas a mano y no coincidían con R (`5505.5` en lugar de `5506.`, meses sin abreviar); el E3 de la Semana 1 decía que la utilidad promedio era 1800 cuando es 2075; en Control 01 había ejemplos con un objeto `ventas` nunca creado y un gráfico con columnas inexistentes (`antiguedad_meses`). Todo se corrigió con las salidas reales.

**Ajuste para la próxima vez:** ninguna salida de R se escribe a mano: se ejecuta el bloque y se pega lo que da R; y cada bloque debe correr solo (con `data-previo` si depende de otro).

**Relacionado:** [[Registro de Materiales]] · [[Sistema de Diseño - Tema R Notebook]] · [[Semana 02]] · [[Semana 03]] · [[Semana 04]]
