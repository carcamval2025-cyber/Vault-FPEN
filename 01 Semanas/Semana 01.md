---
tags: [semana, semana-01]
numero: 1
r4ds_cap: "Cap. 2 (Workflow: basics)"
fase_proyecto: "Formación de equipos, elección de tema y datos"
estado: "borrador"
---

# Semana 01 — ¿Qué puedo hacer con R y cómo le doy instrucciones?

Título oficial del programa: *"R como herramienta para pensar con datos"*. Detalle textual completo (incluye "uso de ayuda y lectura de errores", "índices y conversiones", "series pequeñas de observaciones") → [[Programa Oficial (ESEN)]], sección Semana 01.

## Meta de la semana

Abrir un script, crear objetos, hacer cálculos, usar funciones.

## Contenidos clave

- Ciclo importar → ordenar → transformar → visualizar → modelar → comunicar (marco conceptual del curso completo, no solo de esta semana)
- Instalación de R y RStudio → [[Instalación de R - Estado]] (Carlos ya la completó el 24 de agosto de 2026)
- Consola y scripts
- Objetos y asignación
- Tipos de datos
- Operadores
- Funciones y argumentos
- Vectores

## Funciones y vocabulario nuevos de esta semana

Asignación `<-`, tipos de datos (numeric, character, logical), operadores aritméticos y de comparación, `c()` para vectores, sintaxis básica de llamada a función `nombre_funcion(argumento)`.

Ampliado al construir el material (26 de agosto): `class()`, `length()`, `sum()`, `mean()`, `round(x, digits =)`, y `?nombre` para pedir ayuda — todas funciones R base razonables para introducir junto con vectores y "funciones y argumentos", ninguna es de `dplyr`/`ggplot2`. Ver [[2026-08-26 - Primer material HTML (Semana 01)]] para el razonamiento completo.

**Regla estricta:** solo R base. Nada de `dplyr`/`ggplot2` todavía, aunque Carlos ya tenga RStudio instalado.

## Acumulado permitido hasta esta semana

R base: `<-`, tipos de datos, operadores, funciones y argumentos, vectores con `c()`.

## Analogías económicas obligatorias

Tasas de crecimiento, variaciones porcentuales, ingresos/costos/utilidad, índices.

## Estilo de código a aplicar

`<-` (no `=`) para asignar; `snake_case` en nombres de objetos; comentarios con `#` explicando el *por qué*; espacios alrededor de operadores (`x <- 5`, no `x<-5`).

Fuente completa de estas reglas (con ejemplos correctos/incorrectos) → [[R4DS - Cap 4 - Flujo de Trabajo, Estilo de Código]]. No es la lectura asignada de esta semana (esa es el Cap. 2), pero es de donde vienen estas reglas de estilo.

## Estado del material

- [x] Guía de Estudio
- [x] Laboratorio
- [x] R Playground
- [x] Cheat Sheet

Las 4 pestañas están en un solo archivo: `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` (carpeta del curso, fuera del vault). Estado `borrador` — falta revisión de Carlos. Registro completo → [[Registro de Materiales]]

## Notas de esta sesión

**2026-08-26:** primer material `.html` del curso, ahora estándar de calidad de referencia (ver [[Sistema de Diseño - Tema R Notebook]]). Detalle completo de la sesión → [[2026-08-26 - Primer material HTML (Semana 01)]].

## Notas relacionadas

[[Mapa Curricular]] · [[Semana 02]] · [[Proyecto Grupal]] · [[R4DS - Cap 4 - Flujo de Trabajo, Estilo de Código]]
