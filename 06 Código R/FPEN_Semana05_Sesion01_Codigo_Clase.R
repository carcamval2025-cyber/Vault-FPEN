# ============================================================
# FPEN - Fundamentos de Programación para Economía y Negocios
# Semana 05 · Sesión 01 — El operador pipe y verbos de transformación
# Catedrático: Alvin Portillo | ESEN, Ciclo III 2026
#
# Esta sesión es principalmente un repaso a fondo del pipe |> y de los
# verbos ya vistos en la Semana 4 (filter, arrange, select, rename),
# antes de avanzar a group_by()/summarize() en la Sesión 02 (miércoles).
# ============================================================

# ---- 1. Instalación y carga de librerías ----
# (Solo instalar si no las tienes ya instaladas)
install.packages("tidyverse")
install.packages("nycflights13")
install.packages("palmerpenguins")

library(tidyverse)
library(nycflights13)
library(palmerpenguins)

# ---- 2. Exploración inicial de flights ----
str(flights)      # estructura: 336,776 filas x 19 columnas
glimpse(flights)  # "ojeada" a cada columna y su tipo de dato
flights           # imprime el tibble con explicación de cada columna
view(flights)     # vista completa tipo hoja de cálculo
head(flights)     # primeras filas
summary(flights)  # mínimos, máximos, promedios por columna numérica

# ---- 3. Funciones y argumentos: repaso con round() ----
valor <- 123.4567899

round(valor)      # sin segundo argumento -> usa el valor por defecto (0 decimales)
round(valor, 2)   # segundo argumento = cantidad de decimales

# ---- 4. El operador pipe nativo |> ----
# Activar en RStudio: Tools > Global Options > Code > Display >
# "Use native pipe operator" (atajo: Ctrl/Cmd + Shift + M)
#
# Regla: x |> f() equivale a f(x). Lo de la izquierda se convierte
# en el primer argumento de la función de la derecha.

valor |> round(2)  # lee: "toma valor y pásalo como primer argumento de round()"

# Ejemplo con ggplot: penguins se convierte en el primer argumento de ggplot()
penguins |>
  ggplot(aes(x = flipper_length_mm, y = body_mass_g)) +
  geom_point()

# ---- 5. Verbos de fila: filter() ----

# 5.1 Filtrando paso a paso, encadenando con el pipe
flights |> filter(carrier == "UA")
flights |> filter(carrier == "UA") |> filter(dep_delay == 2)
flights |> filter(carrier == "UA") |> filter(dep_delay == 2) |> filter(day == 1)

# 5.2 Lo mismo, en un solo filter() con varios argumentos (más eficiente)
flights |> filter(carrier == "UA", dep_delay == 2, day == 1)

# 5.3 Operadores relacionales: == != > < >= <=
flights |> filter(dep_delay > 30)

# 5.4 El error clásico: Y (&) vs. O (|)
# Una fila no puede tener month == 1 Y month == 2 al mismo tiempo:
# esto SIEMPRE da 0 filas.
flights |> filter(month == 1 & month == 2)   # 0 filas -> error de lógica

# Lo correcto para "enero o febrero" es el operador O:
flights |> filter(month == 1 | month == 2)   # 51,955 filas

# & sí tiene sentido cuando las condiciones son de columnas distintas:
flights |> filter(carrier == "UA" & day == 1)

# 5.5 %in% : atajo para varios valores de una misma columna
flights |> filter(month %in% c(1, 4, 8, 11, 12))

# ---- 6. Verbos de fila: arrange() ----

# Por defecto, arrange() ordena ascendente
flights |> filter(month %in% c(1, 4, 8, 11, 12)) |> arrange(dep_delay)

# Para descendente, se envuelve la columna en desc()
flights |> filter(month %in% c(1, 4, 8, 11, 12)) |> arrange(desc(dep_delay))

# Se pueden combinar varios criterios de orden
flights |> arrange(desc(month), desc(dep_delay))

# ---- 7. Verbos de columna: select() y rename() ----

# select() se queda solo con las columnas indicadas, en ese orden
flights |>
  filter(month %in% c(1, 4, 8, 11, 12)) |>
  arrange(desc(dep_delay)) |>
  select(year, month, day, flight, carrier, dep_delay)

# select() también puede renombrar mientras selecciona: nuevo_nombre = original
flights2 <- flights |>
  filter(month %in% c(1, 4, 8, 11, 12)) |>
  arrange(desc(dep_delay)) |>
  select(
    año = year, mes = month, dia = day,
    vuelo = flight, operador = carrier,
    retraso_despegue = dep_delay
  )

flights2

# rename() cambia nombres SIN eliminar las demás columnas (a diferencia de select)
flights2 |>
  rename(
    variable1 = año,
    variable2 = vuelo,
    variable3 = mes,
    variable4 = operador,
    variable5 = retraso_despegue
  )

# ============================================================
# Fin de la Sesión 01. En la Sesión 02 (miércoles) se retoma
# flights2 como base para introducir group_by() y summarize().
# ============================================================
