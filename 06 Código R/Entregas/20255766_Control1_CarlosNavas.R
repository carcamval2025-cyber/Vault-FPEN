# 12. Importar y comprobar
library(readr) # Cargamos la librería que contiene nuestra función read_csv()
rutas_variación <- read_csv(file.choose()) # Como opción si tenemos que buscar entre carpetas a nuestro gusto
rutas <- read_csv("~/Downloads/rutas_entrega.csv") # Cargamos el .csv con su dirección
# Comprobaciones
head(rutas) # Obtenemos los primeros 6 datos de rutas
dim(rutas) # Obtenemos las dimensiones del objeto rutas
names(rutas) # Obtenemos los nombres de las columnas del csv rutas
str(rutas) # Sacamos los tipos de datos de las columnas de rutas
# Una fila representa un registro de ruta, con su id, zona, vehiculo, entre otras. 
# El objeto tiene 20 observaciones (registros) con 7 variables encontradas como ruta_id o distancia_km.
# Hay variables númericas en este objeto como distancia_km, paquetes, tiempo_min y costo_usd

# 13. Poner a prueba una afirmación
# La afirmación parece ser universal, ya que indica que cada que una ruta dura más de 12km, su tiempo es de al menos 60 minutos
any(rutas$distancia_km > 12 & rutas$tiempo_min >= 60)

rutas_largas <- rutas[c(
  rutas$distancia_km > 12 & rutas$tiempo_min >= 60
),]
rutas_largas
rutas_cortas <- rutas[c(
  rutas$distancia_km < 12 & rutas$tiempo_min <= 60
),]
rutas_cortas
# Aparecen 7 rutas largas de más de 12 kilometros y 60 minutos de tiempo tardado. Además, las 12 restantes
# cumplen con la condición de tener menos de 12 kilometros y durar menos de 60 minutos. Un solo registro no cumple
# ni una de las condiciones

# 14. Responder una pregunta operativa
zonas_comparacion <- rutas[]

# 15. Elegir y construir gráficos
library(ggplot2)
# a. Barras
ggplot(rutas, 
       mapping = aes(
         x = rutas$vehiculo,
         y = sum(length(rutas$ruta_id)))) +
  labs(title = "Rutas por vehiculo",
       subtitle = "Cantidad",
       x = "vehiculos",
       y = "cantidad"
       ) 
  geom_bar()
