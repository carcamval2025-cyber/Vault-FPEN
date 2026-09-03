# Parte A - Traducir un problema a R
# 1 La cuenta del almuerzo
# Datos
consumos <- c(8.50, 6.75, 9.25, 7.50)
tasa_servicio <- 0.10
#Cálculos
subtotal <- sum(consumos)
servicio <- subtotal * tasa_servicio
total <- subtotal + servicio
pago_individual <- total/length(consumos)
#Evidencia
subtotal
servicio
total
pago_individual
# Comprobación
total_directo <- subtotal*(subtotal*1.10)
total_directo == total
# Desafío
pago_desafio <- consumos
pago_desafio[2:4] <- pago_desafio[2:4] + servicio/3
pago_desafio
sum(pago_desafio) == total

# 2. ¿Descuento o impuesto primero?
# Datos
articulo <- 240
porc_descuento <- 0.15
IVA <- 0.13
#Cálculos
subtotal_A <- articulo - articulo*porc_descuento
total_A <- subtotal_A + subtotal_A*IVA
subtotal_B <- articulo + articulo*IVA
total_B <- subtotal_B - subtotal_B*porc_descuento
# Evidencia
total_A
total_B
# Comprobación
round(total_A,2) == round(total_B,2)
# Cambio de precio
articulo <- 315
# Si, da lo mismo si se redondea, sino, varía por muy poco

# 3. Meta de Ahorro
# Datos
dinero_disponible <- 55
porc_ahorro <- 0.30
gasto_transporte <- 12
meses <- 5
# Cálculos
dinero_ahorrado <- dinero_disponible*porc_ahorro
dinero_ocio <- dinero_disponible - dinero_ahorrado - gasto_transporte
ahorro_acumulado <- dinero_ahorrado*meses
# Evidencia
dinero_ahorrado
dinero_ocio
ahorro_acumulado
# Comprobación
dinero_ocio >= 25

# 4. Auditoría de un cálculo
# Datos
capital_inicial <- 1200
tasa_intereses <- 0.08
años <- 3
# Cálculos
crecimiento_simple <- capital_inicial * (1+tasa_intereses*años)
crecimiento_compuesto <- capital_inicial*(1+tasa_intereses)^años
# Evidencia
crecimiento_simple
crecimiento_compuesto
# Razonamiento: El crecimiento simple genera 1488
# Porque en este caso, el crecimiento simple si da 1488, pero el compuesto da 1511.65, 
# lo cual puede engañar si no se nombra el método usado

# Parte B: Pensar en varios valores
# 5. Seis meses de ventas
# Datos
ventas_mensuales <- c(
  enero = 1840,
  febrero = 2100,
  marzo = 1975,
  abril = 2320,
  mayo = 2510,
  junio = 2440)
# Evidencia
ventas_mensuales["marzo"]
ventas_mensuales[1:3]
ventas_mensuales[-4]
# Correciones
ventas_mensuales["mayo"] <- 2590
ventas_mensuales["julio"] <- 2680
# Verificación final
ventas_mensuales

# 6. Precios con una política común
# Datos
precio_productos <- c(12.50,18.00,7.75,25.00,10.25)
porc_aumento <- 0.06
# Cálculos
nuevos_precios_productos <- round(precio_productos + precio_productos*porc_aumento,2)
superan_15 <- nuevos_precios_productos > 15
precios_seleccionados <- nuevos_precios_productos[superan_15]
cantidad_superan_15 <- sum(superan_15)
# Desafío opcional
precio_supera_25 <- any(nuevos_precios_productos>25)
todos_superan_8 <- all(nuevos_precios_productos>8)

# 7. Dos escenarios de inflación
# Datos
gastos_familiares <- c("alimentacion" = 420,
                       "transporte" = 180,
                       "servicios" = 95,
                       "entretenimiento" = 60)
inflacion_uniforme <- 0.04
inflacion_variada <- c("alimentación" = 0.06,
                       "transporte" = 0.03,
                       "servicios" = 0.05,
                       "entretenimiento" = 0.02)
# Cálculos
gastos_infuniformes <- gastos_familiares * (1+inflacion_uniforme)
gastos_infvariada <- gastos_familiares * (1+inflacion_variada)
diferencia_categoría <- gastos_infvariada - gastos_infuniformes
# Conclusiones
total_uniforme <- sum(gastos_infuniformes)
total_variada <- sum(gastos_infvariada)
diferencia_final <- round(total_variada - total_uniforme,2)
#Evidencias
gastos_infuniformes
gastos_infvariada
diferencia_categoría
total_uniforme
total_variada
diferencia_final

# 8. El reciclaje que parece funcionar
# Datos
ventas <- c(20,24,18,30,27,25)
factores_promocion <- c(1.10,0.90)
cuatro_factores <- c(1.10,0.90,1.05,0.95)
# Cálculos 
ventas_totales <- ventas*factores_promocion
ventas_totales <- ventas*cuatro_factores
# Warning message:
# In ventas * cuatro_factores :
#. longer object length is not a multiple of shorter object length
# significa que los vectores no son múltiplos, ya que tenemos el de 
# ventas que es de 6 y el de cuatro factores que es de 4, la operación se realiza, 
# pero quedan fuera los valores 1.05 y 0.95 de cuatrofactores por la misma incompatibilidad.

# 9. Secuencias para planificar
# Datos
dias_revision <- seq(from = 5, to = 40, by = 5)
tasas <- seq(from = 0.02, to = 0.08, by = 0.005)
dias_revision
tasas
# Consultas y longitud
length(dias_revision)
length(tasas)
dias_revision[1]
dias_revision[8]
tasas[1]
tasas[13]
# by es el que controla los saltos y es el valor a
# cambiar para modificar la revisión de cada 5 días a cada 7

# Parte C Tipos, comparaciones y datos problemáticos
# 10. Códigos que parecen números
# Datos
codigos_sucursal_num <- c(101,102,103,104)
codigos_sucursal_str <- c("101","102","103","104")
typeof(codigos_sucursal_num)
typeof(codigos_sucursal_str)
# Operaciones
sum(codigos_sucursal_num) # sin sentido lógico
codigos_sucursal_str == "102"
# Yo usaría la versión de tratarlos como etiqueta para analizar sucursales, 
# ya que esto permite identificarlas, siendo esta la 
# razón de su uso y no de sumarlos

# 11. Una mezcla inesperada
# Fallará, ya que se estan combinando valores númericos con texto
valores <- c(12,15,"pendiente",18)
typeof(valores)
mean(valores)
# Falló como se esperaba que lo hiciera
# propuesta que permite incluir el valor pendiente y calcular el 
# promedio dejando fuera el valor pendiente
valores <- c(12,15,NA,18)
typeof(valores)
mean(valores, na.rm=TRUE)

# 12. Temperaturas fuera de rango
# Datos
temperatura <- c(22.4, 24.1, 51.8, 23.7, -8.0, 25.0)
plausibles <- temperatura >= 15 & temperatura <=35
# Analisis
no_plausibles <- temperatura[!plausibles]
indices_no_plausibles <- which(!plausibles)
existe_problema <- any(!plausibles) # Al ya haber 2 no plausibles, habra problema
todas_plausibles <- all(plausibles) 

# Parte D Integración
# 13. Reporte semanal de entregas
# Datos
despacho_prometido <- c(2, 3, 5, 4, 2, 6, 3)
despacho_real <- c(2, 4, 4, 5, 2, 8, 3)
# Cálculos
atrasos_o_adelantos <- despacho_prometido - despacho_real # lo hago de esta manera, 
# ya que prefiero partir desde la base planificada del negocio para evaluar el rendimiento
# signo menos para atrasas, positivos son adelantos
pedidos_entregados_antes_o_atiempo <- which(atrasos_o_adelantos >= 0)
tiempo_real_promedio <- mean(despacho_real)
mayor_tiempo <- max(despacho_real)
menor_tiempo <- min(despacho_real)
hubo_atraso <- any(atrasos_o_adelantos < 0)
pedidos_cumplieron_promesa <- all(atrasos_o_adelantos >= 0)
# El tiempo promedio real de entrega fue de 4 días, con entregas rápidas de 2 días 
# y una entrega larga de 8 días. Tres de los siete pedidos se atrasaron, 
# por lo que no todos cumplieron la promesa

# 14. Detective de código
# Datos
ventas <- 100
Ventas <- 200
VENTAS <- 300
# R las considera como 3 objetos distintos
c(ventas, Ventas, VENTAS)
# interpretaciones
ventas <- 5 # guardar 5 en ventas
ventas < -5 # preguntar si ventas es menor que menos cinco
# Listar objetos creados
ls()
# Eliminar objetos de prueba
rm(ventas,Ventas,VENTAS)