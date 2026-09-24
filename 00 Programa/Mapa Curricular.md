---
tags: [programa, curriculum]
banner: "![[programa.svg]]"
---

# Mapa Curricular (12 semanas)

Fuente: documento maestro del Proyecto. La columna "Fase de proyecto" es un mapeo **sugerido**, no un hecho literal del programa (ver [[Proyecto Grupal]]).

| Semana | Pregunta orientadora | Lectura R4DS | Meta de la semana | Nota |
|---|---|---|---|---|
| 1 | ¿Qué puedo hacer con R y cómo le doy instrucciones? | Cap. 2 (Workflow: basics) | Abrir un script, crear objetos, hacer cálculos, usar funciones | [[Semana 01]] |
| 2 | ¿Cómo representa R los datos con los que trabaja un economista? | Cap. 7 (Data import) | Importar una base, identificar filas/columnas, inspección inicial | [[Semana 02]] |
| 3 | ¿Qué puedo descubrir de mis datos antes de calcular? | Cap. 1 (Data visualization) | Construir e interpretar gráficos básicos | [[Semana 03]] |
| 4 | Tengo una base. ¿Cómo obtengo la información que necesito? | Cap. 3 (Data transformation) + selecciones Cap. 12 | Convertir una base original en una apropiada para responder una pregunta | [[Semana 04]] |
| 5 | ¿Cómo convierto miles de observaciones en información útil? | Continuación Cap. 3 + inicio Cap. 10 | Secuencia transformación → agrupación → resumen → visualización | [[Semana 05]] |
| **6** | — | — | **Primer examen parcial** (integrador semanas 1–5) | [[Semana 06]] |
| 7 | ¿Qué hago cuando la estructura de una base dificulta el análisis? | Cap. 5 (Data tidying) + selecciones Cap. 16 | Reconocer y reorganizar estructuras problemáticas | [[Semana 07]] |
| 8 | ¿Qué ocurre cuando la información está repartida entre bases? | Cap. 19 (Joins) | Integrar fuentes y comprobar que la combinación es válida | [[Semana 08]] |
| 9 | ¿Cómo dejo de repetir manualmente lo mismo? | Cap. 25 (Functions), Cap. 26 (Iteration), Cap. 27 ref. | Comprender la automatización sin volverla un fin en sí misma | [[Semana 09]] |
| 10 | ¿Cómo paso de tener una base a entender qué ocurre en ella? | Cap. 9 (Layers), Cap. 10 (EDA) | Usar transformación y visualización iterativamente para refinar preguntas | [[Semana 10]] |
| 11 | Si una IA puede escribir código, ¿qué necesito saber yo? | — | Resolver un problema con R e IA sin delegar la comprensión ni el juicio | [[Semana 11]] |
| **12** | — | — | **Segundo examen parcial** (integrador de todo el curso) | [[Semana 12]] |

## Regla estricta de progresión

Nunca se usa en una semana una función que se enseña en una semana posterior. Un adelanto, si es necesario, se marca explícitamente como "adelanto opcional" — nunca como parte del ejercicio evaluado. Detalle semana a semana de qué paquete/función se habilita → cada nota en `01 Semanas/`.

```dataview
TABLE estado AS "Estado", r4ds_cap AS "Lectura R4DS"
FROM "01 Semanas"
SORT numero ASC
```
