# Datos de los gráficos de portada, calculados con R a partir de los CSV de docs/datos
suppressMessages({ library(readr); library(dplyr); library(jsonlite) })
# Ejecutar desde la raíz del repositorio: Rscript herramientas/portadas.R
setwd("docs")
out <- list()
ingresos <- c(4200, 4550, 4100, 4800)
out$s1 <- list(etq = paste("mes", 1:4), val = ingresos)
v <- read_csv("datos/ventas_mensuales.csv", show_col_types = FALSE)
out$s2 <- list(etq = c("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"), val = v$ventas_miles)
s <- read_csv("datos/salarios.csv", show_col_types = FALSE) |> group_by(sector) |> summarise(n = n(), m = mean(salario_mensual))
out$s3 <- list(etq = s$sector, val = s$m, n = s$n)
e <- read_csv("datos/empresas.csv", show_col_types = FALSE) |> arrange(desc(ventas_2024))
out$s4 <- list(etq = e$empresa, val = e$ventas_2024, antes = e$ventas_2023)
f <- nycflights13::flights |> count(month)
out$s5 <- list(etq = c("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"), val = f$n)
c1 <- read_csv("datos/ventas_campus.csv", show_col_types = FALSE) |> group_by(punto) |>
  summarise(ingreso = sum(ingreso_usd), costo = sum(costo_usd), utilidad = ingreso - costo)
out$c1 <- list(etq = c1$punto, val = c1$utilidad, ingreso = c1$ingreso, costo = c1$costo)
write_json(out, "../herramientas/portadas.json", auto_unbox = FALSE, na = "null", digits = NA)
