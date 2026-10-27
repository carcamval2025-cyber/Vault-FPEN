---
tags: [bitacora]
fecha: 2026-10-26
material: "Control 02 (contenido desde la semana 6)"
tipo: "material de repaso: documento + HTML interactivo + dataset"
---

# 2026-10-26 · Control 02: guía de repaso y simulacro

**Contexto:** Carlos pidió material de estudio para el Control 02 con base en las guías, las clases y el contenido desde la semana 6. Antes de construir se le preguntó (regla 6 de `AGENTS.md`) y respondió: usar **ambas guías de clase** («EDA y factores: Conecta SV» y «EDA y fechas en pedidos comerciales»), entregar **documento tipo guía del profesor y HTML interactivo**, el control es **en RStudio con un CSV**, y entran **dplyr, EDA, factores y fechas**.

**Hallazgo importante: el curso real no sigue el Mapa Curricular del vault.** Las notas `Semana 07` a `Semana 10` planean tidy data, joins y funciones, pero las clases reales después del Parcial I fueron: 06 Transformación de datos (dplyr completo, `relocate`, `.keep`, `slice_*`), 07 EDA (diamonds), 08 Factores (forcats, `case_when` con `%in%`, `cut`) y una clase de fechas con lubridate (`dmy`, `make_date`, `floor_date`, `wday`). El material se limitó a ese temario real, verificado contra el código de las capturas de las presentaciones y los scripts `Clase12` a `Clase16`. No se usaron pivots ni joins. Conviene actualizar las notas semanales con la secuencia real cuando Carlos lo confirme.

**Qué se generó (carpeta del curso):**
- `Guia de repaso FPEN - Control 02.docx`: mismo formato que la guía del Control 01. Temario, 39 preguntas teóricas en 5 bloques, práctica de 18 ejercicios en 7 casos, respuestas y cheat sheet.
- `FPEN_Control02_Repaso_y_Simulacro.html`: Teoría (39 preguntas, 8 con R en vivo), Práctica con webR, Simulacro de 60 minutos (6 ítems, Sin IA) y Cheat Sheet. Reutiliza el CSS y JS del Control 01 (sistema R Notebook aprobado).
- `creditos_crece_practica.csv`: microfinanciera ficticia, 649 filas (640 préstamos y 9 duplicados exactos), con fechas imposibles, etiquetas de sucursal inconsistentes, calificaciones en minúscula, desembolsos sin fecha, duraciones negativas y un monto 0. Generado con semilla fija.
- `FPEN_Control02_Practica_Plantilla.R`: plantilla de script con los 18 ejercicios, al estilo de la guía Conecta SV.

**Verificación:**
- Todas las cifras del documento y del HTML salen de ejecutar el código de solución en R 4.6.1 (dplyr 1.2.1, forcats 1.0.1, lubridate 1.9.5). El script completo de la práctica corre de principio a fin sin errores.
- En el navegador, los 17 bloques de la práctica corren en webR con el código de solución y generan los 5 gráficos. El simulacro inicia, bloquea y revela criterios. Sin desbordamiento horizontal a 375 px en las 4 pestañas.

**Qué no funcionó a la primera (heredado del Control 01):**
- El módulo webR asumía que `out.data.message` era texto; con advertencias de R es un objeto y lanzaba «Cannot convert object to primitive value». Se corrigió leyendo `message` del objeto R. El Control 01 tiene el mismo defecto.
- El ícono de `.webr-btn` no tenía tamaño y se veía gigante en «Iniciar simulacro». Se agregó `.webr-btn svg{ width:12px; height:12px; }`. El Control 01 tiene el mismo defecto.
- `table.cheat td.f` con `white-space:nowrap` desbordaba la Cheat Sheet en móvil; se permite el salto de línea por debajo de 700 px.
- El envoltorio `tryCatch({...})` del Control 01 solo imprimía la última expresión de cada bloque; ahora cada expresión se imprime como en la consola.

**Pendiente:** revisión de Carlos (estado `borrador`) y actualizar las notas semanales con la secuencia real.

## Integración al sitio (mismo día)

Carlos pidió publicarlo. El sitio vigente vive en la rama `main` (copia `Vault-FPEN-publicar.jeEKB0`), no en `master` de `Vault FPEN`, y usa el sistema nuevo (tabloide económico, `guia.css`/`guia.js`/`ejecutar-r.js`, generador `herramientas/gen.py`). Por eso el HTML independiente con el tema R Notebook **no** se copió a `docs/`: se generó una página nueva en el sistema vigente.

- `herramientas/fuentes/c2.html`, generado desde el mismo contenido que el .docx y el HTML local; `PAGINAS["c2"]` en `paginas.py`; página en `docs/control-02/index.html`.
- Cinta: C2 después de S8, en todas las páginas. Temario del índice con fila C2. Portada «Gráfico C2»: mediana de días de desembolso por sucursal (3, 6 y 9), calculada en `portadas.R`.
- `guia.js`: la cinta y el panel Edición solo reconocían `c1` como control; ahora cualquier clave que empieza con `c`. `guia.css`: serie de fondo `serie-c2.svg`.
- En el navegador corren los 49 bloques de R (paquetes y bloques previos encadenados con `data-previo`) y los 6 gráficos se dibujan. Los únicos errores son intencionales: la demostración de `fct()` y el código con errores del simulacro S2. `estatico.py`: 0 problemas. Sin desbordamiento a 375 px.
- Gotcha: el bloque que demuestra el error de `fct()` no puede ser previo de otro bloque, porque un `Error` en un previo detiene la cadena. Por eso K tiene dos bloques.
- Limitación del ejecutor del sitio (no del Control 02): si se ejecutan varios bloques al mismo tiempo, comparten `.fpen_codigo` y uno puede mostrar la salida de otro.

Estado: cambios sin commit en la copia `main`; falta el commit y el push para que GitHub Pages lo publique.

**Relacionado:** [[Registro de Materiales]] · [[2026-09-16 - Control 01 y Suite de SVGs]] · [[Errores Comunes a Evitar]]
