# Guía de ejercicios semana 2

# Parte A
# 1. Inventario de dos bodegas
# Datos 
Bodega_Norte <- c(42, 35, 28, 31)
Bodega_Sur <- c(38, 41, 25, 36)

nombres_bodegas <- c("Bodega Norte", 
                     "Bodega Sur")
nombres_productos <- c("arroz",
                       "frijoles",
                       "aceite",
                       "azúcar")
# Primera forma: valores en una matriz
datos_bodega <- c(Bodega_Norte, Bodega_Sur)
Bodegas_1 <- matrix(datos_bodega,2,4, byrow = TRUE)
# Ordenamiento
rownames(Bodegas_1) <- nombres_bodegas
colnames(Bodegas_1) <- nombres_productos
Bodegas_1
dim(Bodegas_1)

# Segunda forma: vector como columna
Bodegas_2 <- data.frame(Bodega_Norte, Bodega_Sur)
rownames(Bodegas_2) <- nombres_productos

Bodegas_2
dim(Bodegas_2)

# 2. El orden cambia la historia
# Datos
Ventas <- c(12, 18, 25, 10, 15, 22)
semanas <- c("Semana 1",
            "Semana 2")
productos <- c("Producto 1",
               "Producto 2",
               "Producto 3")
# Interpretacion 1: Filas <- semanas, productos <- columnas
matriz_semanas <- matrix(Ventas, nrow = 2, ncol = 3, byrow = TRUE)
colnames(matriz_semanas) <- productos
rownames(matriz_semanas) <- semanas

matriz_semanas
dim(matriz_semanas)

# Interpretacion 1: Filas <- productos, productos <- semanas
matriz_productos <- matrix(Ventas, nrow = 3, ncol = 2, byrow = TRUE)
colnames(matriz_productos) <- semanas
rownames(matriz_productos) <- productos

matriz_productos
dim(matriz_productos)
# Explicaciones: el orden de byrow (estandi ambos en TRUE) cambia como los valores se leen,
# ya que en matriz_productos, los valores se leen por producto, es decir, la primera fila contiene
# las ventas del producto 1. En matriz_semanas, las ventas se leen por semana, teniendo los 2 primeros
# valores del vector Ventas como las ventas del producto 1 en semana 1 y 2.

# 3. Localizar, corregir y rotular
# Datos
Meses <- c("Enero", "Febrero", "Marzo")
tipo_costo <- c("Transporte", "Energía", "Alquiler")
costos <- c(420, 310, 800, 450, 950, 800, 470, 330, 800)
# Matriz previa a corrección
matriz_de_costos <- matrix(costos, nrow = 3, ncol = 3, byrow = TRUE)
rownames(matriz_de_costos) <- Meses
colnames(matriz_de_costos) <- tipo_costo

# Todos los costos de febrero
matriz_de_costos["Febrero", ]
matriz_de_costos[2, ]
# Corrección Febrero-Energía
matriz_de_costos["Febrero", "Energía"] <- 590

# Matriz corregida
matriz_de_costos

# Alquiler durante los tres meses
matriz_de_costos[, "Alquiler"]


# Parte B
# 4. Una tabla de empleados
# Datos
empleados <- c("Laura", "Miguel", "Sofía")
salarios <- c(1800, 2250, 2100)
fecha_ingreso <- as.Date(c("2024-02-12", "2023-09-01", "2025-01-20"))
# Empleado como fila con sus valores y en columnas variables como salarios y fechas de ingreso
tabla_empleados <- data.frame(empleados, salarios, fecha_ingreso)
# Dimensión
dim(tabla_empleados)
# Tipo de datos
str(tabla_empleados) 
# La segunda fila representa a Miguel:
# su salario es 2250 y su fecha de ingreso es 2023-09-01.
names(tabla_empleados)

# 5. ¿Valores o tabla?
# La consulta de salarios devolverá un vector
tabla_empleados$salarios
tabla_empleados[["salarios"]]
# Nombre y salario será un data.frame al combinar 2 tipos de datos
tabla_empleados[, c("empleados", "salarios")]
# Segunda observación completa devolverá un data.frame al ser una combinación de tipo de datos
tabla_empleados[2,]
# Conviene conservar la tabla cuando se quiera conservar variables de una fila que tengan
# distintos tipos de datos en un registro

# 6. Una condición selecciona observaciones
# El filtro conservara 2 salarios, siendo el segundo y tercero estos
mayor_que_2000 <- tabla_empleados$salarios > 2000
mayor_que_2000
# Tabla filtrada:
salario_cumple <- tabla_empleados[mayor_que_2000, ]
salario_cumple
dim(salario_cumple)
# variable agregada
tabla_empleados$salario_anual <- tabla_empleados$salarios * 12
tabla_empleados
str(tabla_empleados) # la nueva variable es de tipo número, ya que son los salarios*12

# 7. Una fila que daña los tipos
# Esos valores se convierten en texto porque el vector al combinar valores num y chr,
# crea un solo dominio de valor en chr para que en R, esos datos pasen
tabla_empleados_copia <- tabla_empleados # Copia para reproducir el daño

nueva_fila_error <- c("Ana", 2500, "2025-02-01")
str(nueva_fila_error)

tabla_empleados_copia[4, ] <- nueva_fila_error # fallará
# La forma correcta sería usar data.frame desde el inicio para agregar datos con un solo registro en vez de tres
nuevo_empleado <- data.frame(empleados = "Ana",
                         salarios = 2500,
                         fecha_ingreso = as.Date("2025-02-01"),
                         salario_anual = 2500*12
                         )
tabla_empleados[4, ] <- nuevo_empleado
str(tabla_empleados)

# 8. Cuatro empresas, una decisión
# Datos
empresas <- c("Alba", "Beta", "Cima" ,"Delta")
areas <- c("Comercio", "Servicios", "Comercio", "Industria")
ventas <- c(120, 95, 140, 160)
costos <- c(80, 70, 105, 125)
# Representación
tabla_empresas <- data.frame(empresas, areas, ventas, costos)
tabla_empresas
# Dimensiones
dim(tabla_empresas)
# Tipos de datos
str(tabla_empresas)

# Al buscar y obtener empresas y ventas del sector comercio, el dato sera data.frame
sector_comercio <- tabla_empresas$areas == "Comercio"
sector_comercio
# 2 TRUE, 2 FALSE
# Buscamos las empresas con sus datos completos
empresas_comercio <- tabla_empresas[sector_comercio, c("empresas", "ventas")]
empresas_comercio

# Parte C · Paquetes y datos disponibles en R
# 9. Funciona ayer, falla hoy
# Los paquetes fallan, porque aunque esten en nuestra computadora instalados, cada sesión
# debe de cargarlos, ya que sino se sobrecargarían sistemas enteros con paquetes 
# que no son para nada de utilidad en ciertos contextos, realentizando los tiempos de carga
# y el procesamiento efectivo de funciones y datos
# instrucciones para instalar, usar y comprobar
# INSTALAR
install.packages("tidyverse")
install.packages("palmerpenguins")
install.packages("gapminder")
# Cargar en cada sesión segun necesidad
library(tidyverse)
library(palmerpenguins)
library(gapminder) # lo acabo de instalar
# Comprobación rápida - uso
str(penguins)

# 10. Primera inspección de pingüinos
library(palmerpenguins)
penguins
# contiene 344 observaciones y a 8 variables  y las cifras significan muchas cosas 
# desde especie, peso, sexo, hasta año de avistamiento. Aparecen, dbl, int y fct
head(penguins)
tail(penguins)
dim(penguins)
names(penguins)
str(penguins)
summary(penguins)
# La primera fila representa un pinguino de especie Adelie, visto en torgersen,
# registrado en 2007 con sus medidas y su sexo. Una pregunta podría ser, ¿la masa corporal
# cambia según la especie y genero?
# Usando summary 2 caracteristicas a revisar serían los valores en NA que pueden afectar los cálculos
# y verificar los rangos de todas las medidas por si hay errores de dedo

# 11. ¿Tabla de vehículos?
# INSPECCION
mtcars
head(mtcars)
dim(mtcars)
names(mtcars)
rownames(mtcars)
# Veredicto: tiene razón el compañero que sostiene que los nombres de los carros
# estan en las filas, ya que al inspeccionar nombres, solo devuelven atributos de los vehiculos
# , es decir, las columnas son variables como consumo, potencia y peso
carros_eficientes <- mtcars[
  mtcars$mpg > 25, 
  c("mpg", "hp", "wt")
]
carros_eficientes
dim(carros_eficientes)

# 12. Una sorpresa llamada islands
islands # Islas del mundo que parecen data.frame
typeof(islands) # Tipo double (decimales?)
class(islands) # clase númerica (contiene chr al parecer)
length(islands) # Largo 48
names(islands) # Los nombres aparecen con names(islands), sigue siendo un vector
# es decir, los nombres se asocionas a las posiciones, por eso $ no funciona
islas_grandes <- islands[islands > 1000]
islas_grandes

# Parte D · Otra historia dentro de un paquete
# 13.Un dataset que viaja por el tiempo
# Llamada
library(gapminder)
# Inspección
head(gapminder)
names(gapminder) # Data.frame
rownames(gapminder) # No hay rownames
dim(gapminder) # 1704 registros, 6 variables
# Las númericas serán year, lifeExp, pop y gdpPercap, categóricas: country y continent
str(gapminder) # acerté
# Porque corresponden a registros de años muy distintos, ej: 1957, afghanistan - 1952 (mismo país)

# 14 . El Salvador en distintos momentos
encontrar_ElSalvador <- gapminder[gapminder$country == "El Salvador", ]
# Conservará todas las variables, ya que se buscan los registros donde aparece
encontrar_ElSalvador
# Permanece constante: country y continent
# Cambian: year, population, life expectancy y GDP per capita
primera_observacion <- encontrar_ElSalvador[1,
  c("year", "pop", "lifeExp", "gdpPercap")
]

ultima_observacion <- encontrar_ElSalvador[nrow(encontrar_ElSalvador),
  c("year", "pop", "lifeExp", "gdpPercap")
]

primera_observacion
ultima_observacion
# El Salvador aparece muchas veces porque este dataset registra distintos años, no porque este equivocado.
# Por ejemplo: Entre 1952 y 2007, la población pasó de 2,042,865 a 6,939,688 habitantes

# 15. Una comparación que necesita contexto
# No la responde porque buscara sin criterio, es decir en TODOS los valores del dataset
#, mientras que la pregunta busca la respuesta en AMERICA, no en todo el mundo
condicion_americas_2007 <- gapminder$continent == "Americas" & gapminder$year == 2007
americas_2007 <- gapminder[condicion_americas_2007, ] # El subconjunto conservará las 6 variables

# Mayor esperanza de vidas
vida_americas_2007 <- americas_2007[, c("country", "lifeExp")]

mayor_vida_americas <- vida_americas_2007[
  vida_americas_2007$lifeExp == max(vida_americas_2007$lifeExp), 
]
mayor_vida_americas
# Canadá tuvo la mayor esperanza de vida en América durante 2007, con 80.7 años

# 16. Dictamen: ¿comprendo el objeto?
# Elijo penguins
head(penguins)
dim(penguins)
names(penguins)
str(penguins)
summary(penguins)
# La unidad de análisis es cada pingüino registrado. Penguins contiene 344 observaciones y 8 variables.
# species, island y sex son variables categóricas, mientras que year es numérica entera, 
# bill_length_mm, bill_depth_mm, flipper_length_mm y body_mass_g son medidas numéricas.

# head() nos permite observar que cada fila reúne las características de un pingüino individual.
# summary() muestra rangos generales para las medidas, pero también valores faltantes en algunas variables como NA.

# Una pregunta posible es: ¿la masa corporal cambia según la especie?.
# Mi veredicto es que el objeto está listo para analizar, pero con el matiz de que tratamiento se le darán a los valores NA