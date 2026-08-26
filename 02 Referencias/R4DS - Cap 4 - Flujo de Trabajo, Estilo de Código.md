---
tags: [referencia, r4ds]
banner: "![[referencias.svg]]"
---

# R4DS — Cap. 4: Flujo de trabajo, estilo de código

Extracto fiel del capítulo **"Flujo de trabajo: estilo de código"** de *R para Ciencia de Datos* (2ª ed.), traducción al español: [davidrsch.github.io/r4ds-es/workflow-style.html](https://davidrsch.github.io/r4ds-es/workflow-style.html). No es la lectura asignada de ninguna semana en el mapa curricular (la de la Semana 01 es el Cap. 2 — *Workflow: basics*, ver [[Semana 01]]) — es el respaldo textual completo de una regla que el documento maestro del Proyecto ya declara obligatoria desde la Semana 01: **"Estilo de código en R (aplicar siempre)"**. Esta nota es esa fuente primaria, citable en vez de asumida.

**Contraparte en el Proyecto de Claude:** `R4DS/Cap 04 - Flujo de Trabajo - Estilo de Código.md` — mismo contenido, para que cualquier sesión de Claude en el Proyecto lo consulte al generar bloques de código. Si se actualiza uno, actualizar el otro.

## Introducción

> "Un buen estilo de codificación es como la puntuación correcta: puede arreglárselas sin ella, pero seguro que hace que todo sea más fácil de leer."

El paquete **styler** reformatea código existente automáticamente (paleta de comandos de RStudio, Cmd/Ctrl + Shift + P).

## 4.1 Nombres

`snake_case`: solo minúsculas, números y `_` para separar palabras.

```r
# Correcto
vuelos_cortos <- flights |> filter(air_time < 60)

# Incorrecto
VUELOSCORTOS <- flights |> filter(air_time < 60)
```

Preferir nombres descriptivos largos sobre abreviaturas (el autocompletado ayuda), mantener coherencia, y usar prefijos comunes en vez de sufijos para que el autocompletado agrupe objetos relacionados.

## 4.2 Espacios

Espacios alrededor de operadores matemáticos (`+`, `-`, `==`, `<`...) **excepto** `^`; espacios alrededor de `<-`; sin espacios dentro/fuera de paréntesis de función; siempre espacio tras una coma.

```r
# Correcto
z <- (a + b)^2 / d
mean(x, na.rm = TRUE)

# Incorrecto
z<-( a + b ) ^ 2/d
mean (x ,na.rm=TRUE)
```

Espacio adicional permitido para alinear visualmente, especialmente en `mutate()`:

```r
flights |>
  mutate(
    speed      = distance/air_time,
    dep_hour   = dep_time %/% 100,
    dep_minute = dep_time %%  100
  )
```

## 4.3 Pipes (`|>`)

Espacio antes de `|>`, generalmente al final de línea.

```r
# Correcto
flights |>
  filter(!is.na(arr_delay), !is.na(tailnum)) |>
  count(dest)
```

Funciones con argumentos nombrados (`mutate()`, `summarize()`) → un argumento por línea. Funciones sin argumentos nombrados (`select()`, `filter()`) → una línea si cabe, si no, un argumento por línea.

```r
flights |>
  group_by(tailnum) |>
  summarize(
    delay = mean(arr_delay, na.rm = TRUE),
    n = n()
  )
```

Indentación: dos espacios tras el primer paso (RStudio lo hace solo tras `|>`); dos espacios adicionales si cada argumento va en su propia línea; el `)` de cierre en su propia línea, alineado con el nombre de la función. Una canalización corta puede quedarse en una línea (`df |> mutate(y = x + 1)`); una muy larga (10–15+ líneas) conviene partirla en subtareas con nombres informativos.

## 4.4 ggplot2

Mismas reglas, tratando `+` como `|>` (queda al final de línea porque `ggplot2` es anterior al operador pipe).

```r
flights |>
  group_by(month) |>
  summarize(delay = mean(arr_delay, na.rm = TRUE)) |>
  ggplot(aes(x = month, y = delay)) +
  geom_point() +
  geom_line()
```

## 4.5 Seccionamiento de comentarios

```r
# Cargar datos ----------------------------------

# Graficar datos --------------------------------
```

Atajo en RStudio: Cmd/Ctrl + Shift + R — aparecen en el menú de navegación de código (esquina inferior izquierda del editor).

## 4.6 Ejercicio de reformateo (plantilla reutilizable)

```r
flights|>filter(dest=="IAH")|>group_by(year,month,day)|>summarize(n=n(),
delay=mean(arr_delay,na.rm=TRUE))|>filter(n>10)
```

Útil como plantilla para un ejercicio de interpretación (Ej. 01–02) de cualquier laboratorio que ya use `dplyr`, adaptando el dataset a contexto económico.

## 4.7 Resumen

Las reglas parecen arbitrarias al inicio; su valor se entiende con la práctica y el trabajo colaborativo. `styler` mejora rápidamente código existente. El capítulo siguiente de R4DS trata datos ordenados (`tidyr`).

## Notas relacionadas

[[Semana 01]] · [[Programa Oficial (ESEN)]] · [[Sistema de Diseño - Tema R Notebook]]
