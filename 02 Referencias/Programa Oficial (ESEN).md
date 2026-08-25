---
tags: [referencia, programa-oficial]
banner: "![[referencias.svg]]"
---

# Programa Oficial (ESEN)

Extracto organizado del documento original del Proyecto: `Programa - Fundamentos de Programación para Economía y Negocios - 2026.docx`, catedrático Alvin Javier Portillo Tiliano. Esta nota existe para que el resto del vault (en particular `01 Semanas/`) pueda enlazar al texto oficial completo sin duplicarlo en cada nota semanal. Las notas de `00 Programa/` y `01 Semanas/` son la versión curada y de trabajo; esta nota es la fuente primaria casi textual.

Sitio de clases (Moodle): https://moodle.esen.edu.sv/

## Descripción del curso

Fundamentos de Programación para Economía y Negocios introduce al estudiante al uso de R como herramienta para resolver problemas, explorar información y desarrollar análisis cuantitativos aplicados a economía y negocios.

El curso no asume conocimientos previos de R ni experiencia formal en programación. Su propósito es proporcionar un conjunto amplio de herramientas computacionales utilizable posteriormente en Estadística, Inferencia Estadística, Econometría y otras materias cuantitativas de la carrera.

Más que memorizar sintaxis, el curso busca desarrollar la capacidad de comprender qué se desea hacer con los datos, identificar las herramientas apropiadas, construir y modificar soluciones en R, interpretar resultados y verificar críticamente que el código responde realmente a la pregunta planteada.

La IA generativa se incorpora de forma gradual como herramienta adicional: el estudiante aprende no solo a solicitar código, sino a comprenderlo, adaptarlo, probarlo y determinar cuándo una solución generada es correcta o inapropiada.

## Objetivos

**Objetivo general:** desarrollar en los estudiantes competencias fundamentales para utilizar R en la preparación, transformación, exploración, visualización y análisis de datos económicos y empresariales, construyendo una base computacional sólida para cursos cuantitativos posteriores.

**Objetivos específicos** — al finalizar el curso, el estudiante será capaz de:

- Utilizar R y RStudio con autonomía básica para desarrollar análisis reproducibles mediante scripts.
- Comprender objetos, funciones, vectores y estructuras de datos fundamentales.
- Importar, inspeccionar y comprender conjuntos de datos de diferentes fuentes.
- Seleccionar y construir visualizaciones apropiadas para explorar distribuciones y relaciones entre variables.
- Seleccionar, filtrar, ordenar, transformar y crear variables con herramientas del Tidyverse.
- Obtener estadísticas descriptivas y resúmenes para diferentes grupos de observaciones.
- Reconocer y tratar apropiadamente datos faltantes.
- Reorganizar conjuntos de datos entre formatos anchos y largos.
- Combinar información de diferentes tablas mediante relaciones y joins.
- Utilizar expresiones lógicas y estructuras de control cuando el problema lo requiera.
- Crear funciones sencillas y automatizar tareas repetitivas.
- Leer, explicar, modificar y depurar código en R.
- Utilizar IA generativa como apoyo, verificando críticamente código y resultados.
- Integrar estas herramientas para explorar de forma estructurada un problema económico o empresarial.

## Enfoque metodológico y dinámica del curso

Modalidad **Flipped Classroom + laboratorio**. Dinámica declarada explícitamente: *"el docente no es la única fuente de conocimiento — los libros lo son también — y el laboratorio es el espacio donde el conocimiento se vuelve real."*

- **Lectura previa:** cada sesión tiene una lectura asignada; se espera que el estudiante llegue habiendo leído — la sesión activa y discute la lectura, no la repite. Sin lectura previa, la sesión "pierde la mitad de su valor" (texto literal del programa).
- **Laboratorio en RStudio:** desde la Sesión 2, cada clase incluye laboratorio. Las bases de práctica se proveen antes de la sesión. Los ejercicios parten siempre de una **pregunta de negocio**, nunca de "escriba el siguiente comando".
- **Actividades evaluadas (controles):** se realizarán **dos controles** durante el ciclo — comprensión y aplicación de herramientas, combinando interpretación de código, resolución de problemas, trabajo con datos, visualización y verificación. Fechas anunciadas con anticipación. *(Nota: la ponderación agregada de "Controles" en la tabla de evaluación es 20% — ver [[Evaluación y Rúbricas]]; el programa no especifica si ese 20% se reparte igual entre los dos controles.)*
- **Exámenes parciales:** semanas 6 y 12. Combinan interpretación y trazado de código, identificación/corrección de errores, selección de herramientas, construcción o modificación de soluciones, trabajo con datos e interpretación de resultados. El objetivo declarado: evaluar no solo sintaxis, sino comprensión, aplicación y verificación.

Dinámica de clase, cuando sea apropiado: **pregunta → exploración → implementación → resultado → interpretación → verificación**. Los conceptos de programación se introducen cuando son necesarios para resolver una tarea concreta. El estudiante usa R desde la Semana 1. Las actividades priorizan datos y situaciones de economía, empresas, mercados, finanzas y fenómenos sociales.

## Políticas del curso (texto oficial)

- **Clases:** la asistencia se rige por la normativa institucional. La participación requiere involucramiento activo. El estudiante es responsable de cubrir el material de cualquier sesión a la que no asista. Salvo causa justificada, quien salga del salón durante una sesión debe reingresar hasta que esta finalice.
- **Tareas tardías:** vía Moodle, nota máxima 8.0. Pasada una semana de la fecha límite, solo se aceptan con justificación válida; si no, nota cero.
- **Copia:** cualquier alerta se reporta al comité disciplinario. En entregas presenciales se usa registro de IPs; más de una IP vinculada a la evaluación (sin autorización previa del catedrático) abre una investigación que puede escalar al comité disciplinario.
- **Participación:** 50% participación activa en sesión, 50% entrega de tareas/actividades cortas (puede incluir subir los ejercicios de la clase al finalizar, cuando el catedrático lo indique).

## Organización semanal — contenido oficial completo

*(Los títulos de semana entre comillas son los del documento oficial; pueden diferir levemente de la pregunta orientadora usada en `01 Semanas/` por brevedad.)*

### Semana 01 — "R como herramienta para pensar con datos"

**Contenidos:** introducción al curso y al papel de R en Economía; ciclo importar→ordenar→transformar→visualizar→modelar→comunicar; instalación de R y RStudio, diferencia entre ambos; consola y scripts; flujo básico en RStudio; expresiones y ejecución de instrucciones; objetos y asignación; tipos básicos de datos; operadores aritméticos y lógicos básicos; funciones y argumentos; vectores; **uso de ayuda y lectura de errores**.

**Aplicaciones:** tasas de crecimiento; variaciones porcentuales; ingresos, costos y utilidad; **índices y conversiones**; **series pequeñas de observaciones**.

**Meta:** el estudiante puede abrir un script, crear objetos, realizar cálculos, utilizar funciones y comprender la lógica básica con la que R procesa instrucciones.

→ [[Semana 01]]

### Semana 02 — "De valores individuales a conjuntos de datos"

**Contenidos:** vectores y operaciones vectorizadas; indexación básica; data frames y tibbles; **filas, columnas y observaciones**; **variables y tipos de variables**; exploración inicial de un conjunto de datos; `head()`, `glimpse()`, `summary()` y funciones relacionadas; importación de archivos CSV; **introducción a importación desde hojas de cálculo**; **tipos de datos durante la importación**.

**Aplicaciones:** datos de hogares; ventas; empleo; precios; indicadores económicos.

**Meta:** el estudiante puede importar una base sencilla, identificar qué representa cada fila y columna y realizar una primera inspección de su contenido.

→ [[Semana 02]]

### Semana 03 — "Visualizar antes de modelar"

**Contenidos:** introducción a `ggplot2`; estructura básica de un gráfico; `data`, `aes()` y `geom`; **variables categóricas y numéricas**; barras, histograma, boxplot, dispersión, líneas; **variables en ejes y estéticas**; **títulos y etiquetas básicas**; elección del gráfico según el tipo de pregunta.

**Aplicaciones:** distribución del ingreso; comparación entre grupos; evolución de variables en el tiempo; relación entre dos variables cuantitativas.

**Meta:** el estudiante puede construir e interpretar los gráficos básicos que necesitará en su curso de Estadística.

→ [[Semana 03]]

### Semana 04 — "Transformar datos para responder preguntas"

**Contenidos:** introducción formal a `dplyr`; pipe `|>`; `select()`, `filter()`, `arrange()`, `mutate()`; **creación de nuevas variables**; **transformaciones numéricas**; operadores relacionales; condiciones lógicas; valores faltantes y `NA`; uso básico de `is.na()` y `na.rm`.

**Aplicaciones:** salario real; crecimiento porcentual; margen; rentabilidad; clasificaciones; **filtrado de subpoblaciones**.

**Meta:** el estudiante puede convertir una base original en una base apropiada para responder una pregunta concreta.

→ [[Semana 04]]

### Semana 05 — "Resumir, comparar e interpretar"

**Contenidos:** `summarise()`, `group_by()`; conteos; media, mediana, mínimo, máximo y medidas descriptivas fundamentales; resúmenes por categorías; combinación de transformación y resumen; gráficos de resultados agregados; relación entre pregunta, transformación y estadístico; introducción al EDA; identificación de valores inusuales.

**Aplicaciones:** ingreso promedio por grupo; ventas por región; precios por categoría; comparaciones por sexo, sector, departamento o período; **estadísticas descriptivas para Estadística** (conexión explícita con el curso de Estadística posterior).

**Meta:** el estudiante puede formular una pregunta descriptiva y construir una secuencia transformación → agrupación → resumen → visualización para responderla.

→ [[Semana 05]]

### Semana 06 — Primer examen parcial

**Contenidos:** evaluación integradora de las semanas 1 a 5. Interpretación de código, predicción de resultados, selección de herramientas, modificación de fragmentos, identificación de errores, construcción de soluciones breves, interpretación de datos y gráficos, ejercicios prácticos en R cuando corresponda.

→ [[Semana 06]]

### Semana 07 — "Datos que no vienen como los necesitamos"

**Contenidos:** principios de tidy data; **variables, observaciones y valores**; formatos ancho y largo; `pivot_longer()`, `pivot_wider()`; **problemas comunes de estructura**; **reconocimiento de datos desordenados**; factores como representación de categorías cuando sea pertinente.

**Aplicaciones:** datos por año en diferentes columnas; encuestas; estados financieros; series por categoría y período.

**Meta:** el estudiante puede reconocer cuándo la estructura de los datos dificulta un análisis y reorganizarlos apropiadamente.

→ [[Semana 07]]

### Semana 08 — "Combinar información"

**Contenidos:** concepto de llave; relaciones entre tablas; `left_join()`, `inner_join()`, `full_join()` cuando corresponda; duplicados y relaciones muchos-a-muchos; verificación del resultado de un join; **identificación de observaciones sin correspondencia**; **diferencia entre combinar columnas y combinar observaciones**.

**Aplicaciones:** empresas + sectores; municipios + indicadores; hogares + información territorial; ventas + productos; datos por país + indicadores macroeconómicos.

**Meta:** el estudiante puede integrar información de distintas fuentes y comprobar que la combinación realizada es válida.

→ [[Semana 08]]

### Semana 09 — "Lógica y automatización para el análisis"

**Contenidos:** **expresiones lógicas con mayor profundidad**; `if`/`else`; `if_else()` y transformaciones condicionales; variables dummy; clasificación de observaciones; introducción a funciones propias; parámetros y valores de retorno; introducción a iteración; `for` cuando resulte pedagógicamente apropiado; **diferencia entre operaciones vectorizadas, funciones e iteración**.

**Aplicaciones:** clasificación de riesgo; categorías de ingreso; bonificaciones y reglas empresariales; creación repetida de indicadores; **aplicación del mismo procedimiento a distintas variables**.

**Meta:** el estudiante comprende que programar permite encapsular y automatizar procesos analíticos, sin convertir la automatización en un fin por sí mismo.

→ [[Semana 09]]

### Semana 10 — "Explorar datos como economista"

**Contenidos:** ciclo de análisis exploratorio; **formular preguntas sobre los datos**; distribuciones; variación; valores atípicos; covariación; **relaciones entre variables categóricas y cuantitativas**; **gráficos con múltiples variables**; facetas; capas y estéticas adicionales; **interpretación económica de patrones**; diferencia entre observar una relación y establecer causalidad.

**Aplicaciones:** uso de una base real o semirreal para construir un pequeño análisis exploratorio de carácter económico.

**Meta:** el estudiante utiliza transformación y visualización de forma iterativa para formular, responder y refinar preguntas sobre una base.

→ [[Semana 10]]

### Semana 11 — "Resolver problemas con R en la era de la IA"

**Contenidos:** integración — importar, inspeccionar, limpiar, transformar, combinar, resumir, visualizar, interpretar, automatizar cuando sea útil y verificar; uso explícito de IA para solicitar explicaciones, generar alternativas, depurar errores, modificar soluciones, proponer visualizaciones y comparar aproximaciones; auditoría de código generado (checklist de 6 preguntas → [[Política de IA]]).

**Aplicaciones:** resolución de un caso económico o empresarial usando una base de datos y el conjunto de herramientas adquiridas.

**Meta:** utilizar R y, cuando corresponda, IA, para resolver un problema sin delegar la comprensión ni el juicio sobre el resultado.

→ [[Semana 11]]

### Semana 12 — Segundo examen parcial

**Contenidos:** evaluación integradora del curso completo. El estudiante debe demostrar que sabe identificar la herramienta apropiada, leer código, interpretar transformaciones, detectar errores, completar o modificar soluciones, trabajar con datos, interpretar visualizaciones, verificar resultados y juzgar críticamente código generado por terceros o por IA.

→ [[Semana 12]]

## Proyecto grupal — texto oficial completo

*(Complementa a [[Proyecto Grupal]], que resume lo operativo. Aquí va el texto casi literal de las secciones numeradas del programa.)*

**1. Propósito.** Integrar las herramientas del curso mediante el análisis de un problema de economía, negocios, finanzas o fenómenos sociales, usando R. El objetivo **no es producir la mayor cantidad de código** ni usar las funciones más sofisticadas.

**2. Organización.** 4 estudiantes por equipo, 20% de la nota final, R/RStudio, IA permitida, tema libre dentro del dominio del curso, datos del docente o de fuentes públicas confiables. Se permiten equipos mixtos entre ambas secciones.

**3. Elección del problema.** Ejemplos dados por el programa (no exhaustivos): evolución de precios, empleo y salarios, desigualdad, comercio, educación, indicadores económicos, comportamiento de consumidores, ventas, desempeño de empresas, mercados, indicadores financieros, características de hogares, demografía, desarrollo económico, actividad empresarial. El proyecto debe comenzar con **preguntas**, no con gráficos.

**4. Preguntas de análisis.** 1 pregunta principal + 3 a 5 secundarias, concretas y respondibles con los datos disponibles. Ejemplo dado por el programa:

> **Principal:** ¿Cómo se relacionan las características educativas y laborales con los ingresos de las personas de la muestra?
> **Secundarias:** ¿Cómo se distribuyen los ingresos? ¿Existen diferencias de ingreso entre niveles educativos? ¿Cómo varía el ingreso entre diferentes grupos de edad? ¿Existen diferencias relevantes entre determinadas categorías laborales? ¿Qué patrones aparecen al observar simultáneamente algunas de estas variables?

**5. Conocimiento de la base.** El equipo debe poder explicar: fuente de los datos, unidad de observación, número de observaciones, variables relevantes y su significado, tipos de variables, período cubierto (si aplica), existencia de valores faltantes, posibles problemas o limitaciones. No basta con descargar una base y empezar a graficar.

**6. Preparación de los datos.** Herramientas posibles (no todas obligatorias): `select()`, `filter()`, `arrange()`, `mutate()`, `group_by()`, `summarise()`, tratamiento de `NA`, transformación/creación de variables, `pivot_longer()`/`pivot_wider()`, joins, expresiones lógicas, funciones propias, automatización. **No se otorgan puntos por usar una función solo para demostrar que se conoce** — cada transformación debe tener una razón relacionada con el problema.

**7. Análisis exploratorio.** Secuencia datos → transformación → resumen → visualización → interpretación. Estadísticas sugeridas: conteos, proporciones, media, mediana, mínimo/máximo, medidas por grupo. Los resultados deben interpretarse en contexto — no basta con reportar un número ("la media es 742.35" no es suficiente sin explicar qué significa).

**8. Visualizaciones.** Sin cantidad obligatoria de gráficos — se prefiere un número pequeño que aporte información sobre muchos sin propósito. Cada gráfico debe responder a una pregunta, usar variables apropiadas, ser legible, tener títulos/etiquetas comprensibles, usar una representación adecuada, y ser interpretado.

**9. Verificación.** Parte fundamental del proyecto — el equipo debe dar evidencia de que verificó su trabajo. Técnicas sugeridas por el programa (lista ampliada respecto a la versión resumida en [[Proyecto Grupal]]):
- comprobar manualmente algunos resultados
- comparar conteos antes y después de una transformación
- verificar que un filtro seleccionó las observaciones esperadas
- comprobar qué ocurrió con los `NA`
- revisar si un join aumentó inesperadamente el número de observaciones
- inspeccionar valores mínimos y máximos
- contrastar un resultado usando dos procedimientos distintos
- **probar una función con valores cuyo resultado ya se conoce** *(técnica presente en el texto oficial y ausente del resumen del documento maestro — vale la pena usarla explícitamente en los laboratorios de funciones propias, Semana 9)*

> "¿Cómo sabemos que este resultado es correcto?" — que el código ejecute sin errores **no demuestra que el análisis sea correcto**.

**10. Uso de inteligencia artificial.** Permitido explícitamente, mencionando como ejemplo **ChatGPT, Gemini u otras herramientas autorizadas**. Usos sugeridos: consultar cómo hacer una operación, explicar código, identificar errores, proponer alternativas, generar fragmentos, mejorar una visualización, interpretar mensajes de error, sugerir verificaciones. **Todo código entregado es responsabilidad del equipo, sin importar quién o qué lo generó.** "Eso lo hizo ChatGPT" no es una respuesta válida en la defensa; si la IA produjo una solución incorrecta y el equipo la usó sin verificar, la responsabilidad sigue siendo del equipo.

**11. Registro de uso de IA.** Anexo breve "Uso de inteligencia artificial" — no hace falta entregar conversaciones completas, solo los usos **materiales**, en el formato de tabla de [[Proyecto Grupal]]. El objetivo del registro **no es penalizar el uso de IA**, sino evaluar la capacidad de usarla conscientemente.

**12. Entregables.** A. Script de R (ejecuta correctamente, organizado, nombres comprensibles, comentarios donde ayuden, sin código abandonado, reproducible). B. Informe de análisis (problema/motivación, pregunta principal, preguntas secundarias, descripción/fuente de datos, preparación, análisis, visualizaciones, interpretación, verificaciones, conclusiones, limitaciones, anexo de IA — centrado en comunicar, no en llenar páginas). C. Base(s) de datos, cuando licencia/tamaño lo permitan, o fuente indicada. D. Presentación breve (preguntas, datos, estrategia, hallazgos, visualizaciones, conclusiones) centrada en lo aprendido, no en explicar línea por línea el código.

**13. Defensa del proyecto.** El docente puede preguntar a cualquier integrante durante o después de la presentación. Banco oficial completo de preguntas (más amplio que el resumen de [[Proyecto Grupal]]):
- ¿Qué representa cada fila de esta base?
- ¿Por qué utilizaron la mediana y no solamente la media?
- ¿Qué hace este `filter()`?
- ¿Por qué utilizaron este tipo de gráfico?
- ¿Qué ocurriría si eliminamos esta línea?
- ¿Por qué utilizaron un `left_join()`?
- ¿Cómo saben que el join no duplicó observaciones?
- ¿Qué significa `na.rm = TRUE` aquí?
- ¿Cómo comprobaron este resultado?
- ¿Qué parte fue generada o sugerida por IA?
- ¿La primera solución que les dio la IA era correcta?
- Si tuviera que cambiar este análisis para otro grupo, ¿qué modificaría?

No se espera memorizar cada carácter del script — sí comprender el trabajo entregado.

**14. Evaluación del proyecto.** Rúbrica idéntica a la de [[Evaluación y Rúbricas]] (20% de la nota final, 8 criterios).

**15. Criterios detallados (Excelente / Adecuado / Insuficiente).** El programa detalla explícitamente qué distingue cada nivel para varios criterios — útil para calibrar el "Panel de feedback" de los laboratorios (ver [[Sistema de Diseño - Tema R Notebook]]):

- **Formulación del problema y preguntas (10%).** Excelente: preguntas claras, relevantes, respondibles con los datos, articuladas alrededor de un problema coherente. Adecuado: existe una pregunta identificable, aunque algunas secundarias son demasiado generales o poco conectadas. Insuficiente: el proyecto consiste principalmente en "analizar una base" sin preguntas definidas.
- **Comprensión y preparación de los datos (15%).** Se evalúa que el equipo comprenda unidad de observación, variables, fuente y limitaciones, y realice las transformaciones necesarias correctamente.
- **Uso apropiado de R (20%).** Se evalúa elección de herramientas, corrección del código, organización, transformaciones, uso razonable de lo estudiado, capacidad de modificar código. **La complejidad del código no implica una nota mayor** — una solución sencilla y apropiada puede superar a una innecesariamente sofisticada.
- **Análisis e interpretación (20%).** Los resultados deben responder efectivamente a las preguntas planteadas.

## Bibliografía

**Principal:** Wickham, H., Çetinkaya-Rundel, M. & Grolemund, G. (2023). *R for Data Science: Import, Tidy, Transform, Visualize, and Model Data* (2nd ed.). O'Reilly Media.

**Complementaria:** Grolemund, G. (2014). *Hands-On Programming with R*. O'Reilly Media. Más materiales, bases de datos, guías de laboratorio y lecturas seleccionadas proporcionadas por el docente.

## Notas relacionadas

[[Home]] · [[Programa General]] · [[Mapa Curricular]] · [[Proyecto Grupal]] · [[Evaluación y Rúbricas]]
