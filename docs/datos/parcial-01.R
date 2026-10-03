library(tidyverse)
pedidos <- read_csv("pedidos_comercio.csv", show_col_types = FALSE)

# 1 · Importación reproducible
library(tidyverse)
pedidos <- read_csv("pedidos_comercio.csv")
head(pedidos, 4)
tail(pedidos, 4)
nrow(pedidos)   # comprobación: debe dar 180

# 2 · Estructura
dim(pedidos)
names(pedidos)
glimpse(pedidos)

pedidos |>
  select(precio_unitario, costo_unitario, costo_envio,
         dias_entrega, calificacion)

# 3 · Selección negativa
pedidos_operativos <- pedidos |>
  select(-precio_unitario, -costo_unitario, -descuento_pct)

dim(pedidos_operativos)   # 180 filas, 9 columnas

# 4 · Reordenamiento de columnas
vista_control <- pedidos |>
  relocate(pedido_id, canal, centro_distribucion, devuelto)

names(vista_control)

# 5 · Promociones de volumen
promos_volumen <- pedidos |>
  filter(unidades >= 4,
         descuento_pct >= 0.10,
         descuento_pct <= 0.20) |>
  select(pedido_id, canal, familia_producto,
         unidades, precio_unitario, descuento_pct) |>
  arrange(descuento_pct, unidades, precio_unitario)

nrow(promos_volumen)   # 40

# 6 · Servicio crítico
servicio_critico <- pedidos |>
  filter(devuelto == "Si" | calificacion <= 2) |>
  arrange(desc(dias_entrega), calificacion)

nrow(servicio_critico)   # 23

# 7 · Condición excluyente
app_web_rapidos <- pedidos |>
  filter(canal %in% c("App", "Web"),
         descuento_pct == 0,
         dias_entrega <= 5)

nrow(app_web_rapidos)   # 36

# 8 · Extremos sin función especializada
pedidos |>
  arrange(desc(precio_unitario)) |>
  head(7)

pedidos |>
  arrange(desc(dias_entrega)) |>
  head(7)

# 9 · Resultados por pedido
pedidos_calculados <- pedidos |>
  mutate(
    venta_bruta      = unidades * precio_unitario,
    descuento_valor  = venta_bruta * descuento_pct,
    venta_neta       = venta_bruta - descuento_valor,
    costo_mercaderia = unidades * costo_unitario,
    contribucion     = venta_neta - costo_mercaderia - costo_envio,
    margen_pct       = contribucion / venta_neta
  )

# Puntos de control de la guía
nrow(pedidos_calculados)                        # 180
round(sum(pedidos_calculados$venta_neta), 2)    # 24867.3
round(sum(pedidos_calculados$contribucion), 2)  # 8137.46

# 10 · Clasificación lógica
pedidos_calculados <- pedidos_calculados |>
  mutate(entrega_aceptable = dias_entrega <= 5 & devuelto == "No")

sum(pedidos_calculados$entrega_aceptable)   # 107 son TRUE

# 11 · Priorización económica
top_contribucion <- pedidos_calculados |>
  arrange(desc(contribucion), desc(margen_pct)) |>
  select(pedido_id, contribucion, margen_pct,
         canal, familia_producto, dias_entrega) |>
  head(8)

sum(pedidos_calculados$contribucion >= 166.51)   # 8: sin empates en el 8.º

# 12 · Resultado contraintuitivo
contraintuitivo <- pedidos_calculados |>
  filter(venta_neta > 150, contribucion < 20) |>
  arrange(contribucion)

nrow(contraintuitivo)   # 0 con esta base

# Cada condición por separado:
sum(pedidos_calculados$venta_neta > 150)        # 59
sum(pedidos_calculados$contribucion < 20)       # 72

# 13 · Resumen general
resumen_general <- pedidos_calculados |>
  summarise(
    venta_neta_total      = sum(venta_neta),
    contribucion_total    = sum(contribucion),
    pedidos               = n(),
    unidades_totales      = sum(unidades),
    descuento_promedio    = mean(descuento_pct),
    dias_promedio         = mean(dias_entrega),
    calificacion_promedio = mean(calificacion)
  )

resumen_general
sum(pedidos_calculados$dias_entrega) / 180   # a mano: igual a dias_promedio

# 14 · Centros de distribución
centros <- pedidos_calculados |>
  group_by(centro_distribucion) |>
  summarise(
    venta_neta    = sum(venta_neta),
    contribucion  = sum(contribucion),
    pedidos       = n(),
    dias_promedio = mean(dias_entrega)
  ) |>
  arrange(desc(contribucion))

sum(centros$pedidos)                  # 180
round(sum(centros$venta_neta), 2)     # 24867.3

# 15 · Familias de producto
familias <- pedidos_calculados |>
  group_by(familia_producto) |>
  summarise(
    venta_neta   = sum(venta_neta),
    contribucion = sum(contribucion),
    unidades     = sum(unidades)
  ) |>
  mutate(margen_global = contribucion / venta_neta) |>
  arrange(desc(margen_global))

# Control: NO es el promedio simple de margen_pct
mean(pedidos_calculados$margen_pct[pedidos_calculados$familia_producto == "Accesorios"])   # 0.2376

# 16 · Canales y participación
canales <- pedidos_calculados |>
  group_by(canal) |>
  summarise(
    venta_neta   = sum(venta_neta),
    contribucion = sum(contribucion),
    pedidos      = n()
  ) |>
  mutate(
    participacion_ventas       = venta_neta / sum(venta_neta),
    participacion_contribucion = contribucion / sum(contribucion)
  )

sum(canales$participacion_ventas)         # 1
sum(canales$participacion_contribucion)   # 1

# 17 · Dos dimensiones
centro_canal <- pedidos_calculados |>
  group_by(centro_distribucion, canal) |>
  summarise(
    pedidos       = n(),
    venta_neta    = sum(venta_neta),
    dias_promedio = mean(dias_entrega)
  ) |>
  arrange(centro_distribucion, desc(venta_neta))

nrow(centro_canal)         # 12 = 4 centros x 3 canales
sum(centro_canal$pedidos)  # 180

# 18 · Devoluciones por canal
devoluciones <- pedidos_calculados |>
  filter(devuelto == "Si") |>
  group_by(canal) |>
  summarise(
    devoluciones = n(),
    venta_neta   = sum(venta_neta)
  ) |>
  arrange(desc(devoluciones))

sum(devoluciones$devoluciones)      # 16
sum(pedidos$devuelto == "Si")       # 16

# 19 · Comparación categórica
contribucion_familia <- pedidos_calculados |>
  group_by(familia_producto) |>
  summarise(contribucion_total = sum(contribucion))

contribucion_familia |>
  ggplot(aes(x = reorder(familia_producto, -contribucion_total),
             y = contribucion_total)) +
  geom_col() +
  labs(x = "Familia de producto", y = "Contribución total",
       title = "Contribución total por familia")

sum(contribucion_familia$contribucion_total)   # 8137.46

# 20 · Distribución condicionada
bajo_500 <- pedidos_calculados |>
  filter(venta_neta < 500)

bajo_500 |>
  ggplot(aes(x = venta_neta)) +
  geom_histogram(binwidth = 50)   # probé 100, 25 y 50; conservo 50

nrow(bajo_500)                          # 173
sum(pedidos_calculados$venta_neta >= 500)   # 7 pedidos excluidos

# 21 · Comparación de distribuciones
pedidos_calculados |>
  ggplot(aes(x = canal, y = dias_entrega)) +
  geom_boxplot() +
  labs(x = "Canal", y = "Días de entrega",
       title = "Días de entrega por canal")

pedidos_calculados |>
  group_by(canal) |>
  summarise(mediana = median(dias_entrega),
            minimo = min(dias_entrega),
            maximo = max(dias_entrega))

# 22 · Relación entre medidas
pedidos_calculados |>
  ggplot(aes(x = venta_neta, y = contribucion, color = devuelto)) +
  geom_point() +
  labs(x = "Venta neta", y = "Contribución",
       color = "¿Devuelto?",
       title = "Relación entre venta neta y contribución")

nrow(pedidos_calculados)             # 180 puntos
sum(pedidos_calculados$devuelto == "Si")   # 16 puntos de color distinto

# 23 · Dos categorías simultáneas
centro_canal_contrib <- pedidos_calculados |>
  group_by(centro_distribucion, canal) |>
  summarise(contribucion = sum(contribucion))

centro_canal_contrib |>
  ggplot(aes(x = centro_distribucion, y = contribucion, fill = canal)) +
  geom_col(position = "dodge") +
  labs(x = "Centro de distribución", y = "Contribución", fill = "Canal")

nrow(centro_canal_contrib)                        # 12 barras
round(sum(centro_canal_contrib$contribucion), 2)  # 8137.46

# 24 · Afirmación absoluta
auditoria <- pedidos |>
  summarise(
    minimo_marketplace = min(dias_entrega[canal == "Marketplace"]),
    maximo_app         = max(dias_entrega[canal == "App"]),
    afirmacion_cumple  = minimo_marketplace > maximo_app
  )

auditoria

# Los pedidos que desmienten la afirmación
sum(pedidos$canal == "Marketplace" & pedidos$dias_entrega <= auditoria$maximo_app)   # 23

# 25 · Dos criterios de liderazgo
centros_lider <- pedidos_calculados |>
  group_by(centro_distribucion) |>
  summarise(venta_neta = sum(venta_neta),
            contribucion = sum(contribucion)) |>
  mutate(margen_global = contribucion / venta_neta)

rank_ventas <- centros_lider |> arrange(desc(venta_neta))
rank_margen <- centros_lider |> arrange(desc(margen_global))

rank_ventas$centro_distribucion[1] == rank_margen$centro_distribucion[1]   # FALSE

# 26 · Control de coherencia
por_canal <- pedidos_calculados |>
  group_by(canal) |>
  summarise(venta_neta = sum(venta_neta)) |>
  mutate(participacion = venta_neta / sum(venta_neta))

control <- por_canal |>
  summarise(
    dif_participacion = sum(participacion) - 1,
    dif_venta         = sum(venta_neta) - sum(pedidos_calculados$venta_neta)
  )

control

# 27 · Cambio de regla
cambio_regla <- pedidos_calculados |>
  mutate(
    entrega_aceptable_v2 = dias_entrega <= 4 &
      (devuelto == "No" | calificacion == 5)
  )

cambio_regla |>
  summarise(
    aceptables_original = sum(entrega_aceptable),
    aceptables_nueva    = sum(entrega_aceptable_v2),
    cambian             = sum(entrega_aceptable != entrega_aceptable_v2)
  )

# ¿En qué sentido cambian?
cambio_regla |>
  group_by(entrega_aceptable, entrega_aceptable_v2) |>
  summarise(pedidos = n())

# 28 · Cambio de denominador
denominador <- pedidos_calculados |>
  group_by(familia_producto) |>
  summarise(unidades = sum(unidades),
            contribucion = sum(contribucion)) |>
  mutate(
    participacion_unidades     = unidades / sum(unidades),
    participacion_contribucion = contribucion / sum(contribucion),
    diferencia_abs             = abs(participacion_unidades - participacion_contribucion)
  ) |>
  arrange(desc(diferencia_abs))

sum(denominador$participacion_unidades)       # 1
sum(denominador$participacion_contribucion)   # 1

# 29 · Auditoría de un script ajeno
auditoria_margen <- pedidos_calculados |>
  group_by(familia_producto) |>
  summarise(
    margen_simple = mean(margen_pct),                    # incorrecto a propósito
    margen_global = sum(contribucion) / sum(venta_neta)  # método correcto
  ) |>
  mutate(diferencia = margen_simple - margen_global)

# Comprobación a mano de Accesorios
mean(pedidos_calculados$margen_pct[pedidos_calculados$familia_producto == "Accesorios"])   # 0.2376
1160.68 / 2619.95                                                                           # 0.4430

# 30 · Ejecución completa
library(tidyverse)

# Ruta relativa: el CSV está en la carpeta de trabajo
pedidos <- read_csv("pedidos_comercio.csv")

pedidos_calculados <- pedidos |>
  mutate(venta_neta = unidades * precio_unitario * (1 - descuento_pct))

resumen_canal <- pedidos_calculados |>
  group_by(canal) |>
  summarise(venta_neta = sum(venta_neta))

resumen_canal
sum(resumen_canal$venta_neta)   # 24867.3
