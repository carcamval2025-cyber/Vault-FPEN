---
tags: [semana, semana-05]
numero: 5
r4ds_cap: "Continuación Cap. 3 + inicio Cap. 10 (EDA)"
fase_proyecto: "Resúmenes descriptivos aplicados a las preguntas del proyecto"
estado: "Sesión 01 publicada (repaso pipe y verbos de transformación)"
---

# Semana 05 — ¿Cómo convierto miles de observaciones en información útil?

Título oficial del programa: *"Resumir, comparar e interpretar"*. El programa vincula explícitamente esta semana con el curso de Estadística posterior ("estadísticas descriptivas para Estadística"). Detalle completo → [[Programa Oficial (ESEN)]], sección Semana 05.

## Meta de la semana

Secuencia transformación → agrupación → resumen → visualización.

## Contenidos clave

- `summarise()`, `group_by()`
- Conteos, media, mediana, mínimo/máximo
- Resúmenes por categoría
- Introducción a EDA (análisis exploratorio de datos)

## Funciones y vocabulario nuevos de esta semana

`summarise()`, `group_by()`, funciones resumen dentro de `summarise()` (`mean()`, `median()`, `min()`, `max()`, `n()`).

## Acumulado permitido hasta esta semana

Semanas 1–4 + `summarise()`/`group_by()`. Con esto se completa el flujo `dplyr` básico: `select()`, `filter()`, `arrange()`, `mutate()`, `group_by()`, `summarise()`.

## Analogías económicas obligatorias

Ingreso promedio por grupo, ventas por región, precios por categoría, comparaciones por sexo/sector/departamento.

## Nota de examen

Esta es la última semana antes del **Primer Parcial (Semana 6)**, integrador de las semanas 1–5. El cheat sheet de esta semana es el más importante para el repaso pre-parcial → considerar un material de repaso acumulado además del cheat sheet semanal.

## Estado del material

- [x] Guía de Estudio (Sesión 01 — El operador pipe y verbos de transformación)
- [x] Laboratorio (Sesión 01 — 5 ejercicios con validación y XP)
- [x] R Playground (Sesión 01 — fragmentos progresivos)
- [x] Cheat Sheet (Sesión 01 — sintaxis y flujo)
- [ ] Sesión 02 (`group_by()`, `summarise()`, `slice_*()`)

Registro completo → [[Registro de Materiales]]

## Notas de esta sesión

Sesión 01 publicada (`FPEN_Semana05_Sesion01_Pipe_y_Verbos_de_Transformacion.html` y script de clase `FPEN_Semana05_Sesion01_Codigo_Clase.R`). Cubre el operador pipe nativo `|>`, operadores relacionales y booleanos en `filter()`, y reordenamiento/selección con `nycflights13`. Publicada en GitHub Pages en `/docs/semana-05/`.

## Notas relacionadas

[[Mapa Curricular]] · [[Semana 04]] · [[Semana 06]] · [[Proyecto Grupal]]
