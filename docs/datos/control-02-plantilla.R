# Práctica de repaso · Control 02
# Fundamentos de Programación para Economía y Negocios
#
# Guarde este archivo y creditos_crece_practica.csv en la carpeta del proyecto.
# Complete el código debajo de cada ejercicio y escriba las interpretaciones como comentarios.
# Conserve creditos como registro original; transforme copias.
# Al terminar, reinicie R y ejecute el script desde el principio.
# Respuestas y cifras de referencia: Guia de repaso FPEN - Control 02.docx

# Preparación ----
library(tidyverse)

creditos <- read_csv("creditos_crece_practica.csv")

# Caso 1 · Inspección antes de decidir ----

# Ejercicio A: Estructura ----
# Importa el archivo como creditos y no lo modifiques. Antes de ejecutar, escribe
# cuántas columnas y qué tipos esperas; luego compruébalo con dim() y glimpse(). ¿Las
# fechas son texto o fechas de R?

# Código:


# Interpretación:
#
#

# Ejercicio B: Categorías registradas ----
# Cuenta préstamos por estado y por sucursal. ¿Qué problema muestra el conteo de
# sucursales?

# Código:


# Interpretación:
#
#

# Ejercicio C: Identificadores ----
# Compara el número de filas con el número de identificadores distintos. Lista los ids
# repetidos y comprueba si las repeticiones son exactas o contienen información
# contradictoria.

# Código:


# Interpretación:
#
#

# Caso 2 · Preparación y calidad de las fechas ----

# Ejercicio D: Duplicados y conversión ----
# Crea creditos_unicos sin repeticiones exactas. En creditos_prep conserva las columnas
# originales y crea fecha y desembolso con la función adecuada. Cuenta los NA de
# fecha_solicitud antes y de fecha después, e inspecciona los textos que no se
# convirtieron.

# Código:


# Interpretación:
#
#

# Ejercicio E: Duraciones e incidencias ----
# Crea dias_desembolso en días y convierte en NA los montos menores o iguales a 0.
# Identifica desembolsados sin fecha de desembolso y duraciones negativas. ¿Por qué una
# fecha de desembolso vacía es esperable en algunos estados?

# Código:


# Interpretación:
#
#

# Ejercicio F: Tres poblaciones ----
# Construye solicitudes_temporales (fecha de solicitud válida, todos los estados),
# colocaciones (desde la anterior: Desembolsado con monto conocido) y
# desembolsos_validos (Desembolsado, fecha de desembolso conocida y días mayor o igual a
# 0). Registra las filas de cada uno.

# Código:


# Interpretación:
#
#

# Caso 3 · Distribución de los montos colocados ----

# Ejercicio G: Resumen e histograma ----
# Con colocaciones calcula número de préstamos, monto total, media, mediana, Q1, Q3 y
# máximo. Construye un histograma y compara media con mediana. ¿Qué sugiere la forma?

# Código:


# Interpretación:
#
#

# Ejercicio H: ¿Requieren revisión? ----
# Muestra los cinco préstamos de mayor monto con su sector, plazo y calificación. ¿El
# histograma demuestra que son errores? Propón una comprobación adicional.

# Código:


# Interpretación:
#
#

# Ejercicio I: Zoom y tramos ----
# Haz zoom al histograma con coord_cartesian(ylim = c(0, 10)) para ver los montos raros
# sin eliminarlos. Después crea tramo_monto con cut() (hasta 1000, hasta 3000, más) en
# creditos_prep y cuenta préstamos por tramo.

# Código:


# Interpretación:
#
#

# Caso 4 · Categorías limpias y ordenadas ----

# Ejercicio J: Unificar sucursales ----
# Crea sucursal_limpia con fct_recode() conservando sucursal. Compara frecuencias antes
# y después.

# Código:


# Interpretación:
#
#

# Ejercicio K: Escala de calificación ----
# Intenta crear el factor de calificación con factor() y con fct() usando los niveles A,
# B, C, D, E y «Sin calificar». ¿Qué pasa en cada caso? Corrige y crea calificacion_f en
# orden de riesgo.

# Código:


# Interpretación:
#
#

# Ejercicio L: Agrupar sectores ----
# Crea sector_grupo con case_when() y %in% (Comercio y servicios: Comercio, Servicios,
# Turismo; Producción: Agropecuario, Manufactura, Artesanía; Transporte) y comprueba que
# el total se conserva.

# Código:


# Interpretación:
#
#

# Ejercicio M: Ordenar por frecuencia ----
# Grafica préstamos por sucursal_limpia con barras de mayor a menor (fct_infreq()).
# Luego invierte el orden con fct_rev(). ¿Qué cambia y qué no?

# Código:


# Interpretación:
#
#

# Caso 5 · Tiempos de desembolso por sucursal ----

# Ejercicio N: Resumen, caja y orden ----
# Con desembolsos_validos (vuelve a crearlo desde creditos_prep para que tenga
# sucursal_limpia) compara por sucursal el número de casos, la media, la mediana y la
# desviación estándar de días. Haz diagramas de caja con las sucursales ordenadas por su
# mediana. ¿Cuál tarda más? ¿Cuál es más dispersa?

# Código:


# Interpretación:
#
#

# Caso 6 · Evolución temporal ----

# Ejercicio O: Mes del año o mes calendario ----
# En solicitudes_temporales crea anio, mes_num y periodo_mes. Compara un conteo por
# mes_num con otro por periodo_mes. ¿Cuántos grupos produce cada uno y qué pregunta
# responde?

# Código:


# Interpretación:
#
#

# Ejercicio P: Serie mensual ----
# Crea resumen_mensual con una fila por periodo_mes y el número de solicitudes (todos
# los estados). Grafica con líneas e identifica los meses de mayor volumen con su año.

# Código:


# Interpretación:
#
#

# Ejercicio Q: Misma ventana entre años ----
# Filtra enero a marzo de cada año y resume solicitudes por anio. ¿Por qué esta
# comparación es más justa que un año completo contra tres meses?

# Código:


# Interpretación:
#
#

# Caso 7 · Comunicar ----

# Ejercicio R: Memo para la gerencia ----
# Redacta cinco líneas: una incidencia de calidad y su tratamiento, un hallazgo sobre
# montos, uno sobre tiempos, uno temporal con mes y año, y una limitación. Cada hallazgo
# debe citar una cifra obtenida.

# Código:


# Interpretación:
#
#

# Revisión de la entrega ----
# [ ] Conserva la base original y transforma una copia.
# [ ] Cuenta filas antes y después de cada filtro, y explica la diferencia.
# [ ] Cada pregunta usa su propia población; no borres todo lo que tenga NA.
# [ ] Un NA nuevo tras convertir es un texto que no se pudo leer: inspecciónalo.
# [ ] No reemplaces faltantes por 0.
# [ ] Compara medidas por caso (media, mediana) con su n; no sumas.
# [ ] El EDA describe asociaciones, no causas.
