---
tags: [programa, proyecto-grupal]
---

# Proyecto Grupal

Texto oficial completo (las 15 secciones numeradas del programa, incluida la rúbrica detallada Excelente/Adecuado/Insuficiente) → [[Programa Oficial (ESEN)]], sección "Proyecto grupal — texto oficial completo".

- **Organización:** equipos de 4 (se permite mezclar ambas secciones).
- **Peso:** 20% de la nota final — ver reglas de sumatividad en [[Evaluación y Rúbricas]].
- **Herramienta:** R/RStudio. Nivel de IA: **IA permitida** (ver [[Política de IA]]).
- **Tema:** libre dentro de economía, negocios, finanzas o fenómenos sociales. Datos propios provistos por el docente o fuentes públicas confiables.
- **Estructura obligatoria del análisis:** 1 pregunta principal + 3 a 5 preguntas secundarias, todas respondibles con los datos disponibles. **No se espera demostrar causalidad.**
- **No es obligatorio** usar todas las herramientas del curso — se penaliza usar una función solo para demostrar que se conoce.

## Fases sugeridas por semana

*(Mapeo pedagógico propuesto por el documento maestro del Proyecto — el programa oficial solo ata los exámenes a las semanas 6 y 12; ajustar si el catedrático indica otra secuencia. No presentarlo como literal del programa.)*

| Semana(s) | Fase sugerida |
|---|---|
| 1 | Formación de equipos, elección de tema y datos → [[Semana 01]] |
| 2 | Conocimiento de la base: unidad de observación, variables, fuente, limitaciones → [[Semana 02]] |
| 3–4 | Preparación y primeras transformaciones + primeras visualizaciones exploratorias → [[Semana 03]], [[Semana 04]] |
| 5 | Resúmenes descriptivos aplicados a las preguntas del proyecto → [[Semana 05]] |
| 7–8 | Reestructuración (si aplica) y combinación de fuentes (si aplica) → [[Semana 07]], [[Semana 08]] |
| 9 | Automatización de clasificaciones/variables dummy relevantes al proyecto → [[Semana 09]] |
| 10–11 | Análisis exploratorio integrado, verificación, anexo de uso de IA, cierre de entregables → [[Semana 10]], [[Semana 11]] |

## Entregables

- **A. Script de R** — ejecutable, organizado, nombres comprensibles, comentado donde ayude, sin código abandonado.
- **B. Informe de análisis** — problema y motivación, pregunta principal y secundarias, datos, preparación, análisis, visualizaciones, interpretación, verificaciones, conclusiones, limitaciones, anexo de uso de IA.
- **C. Base(s) de datos** — incluidas cuando licencia/tamaño lo permitan, o fuente claramente indicada.
- **D. Presentación** — centrada en lo aprendido de los datos, no en explicar línea por línea el código.

## Herramientas de IA mencionadas explícitamente

El programa nombra ejemplos concretos: **ChatGPT, Gemini u otras herramientas autorizadas**. Frase clave a repetir en los materiales: *"Todo código entregado es responsabilidad del equipo, independientemente de quién o qué lo haya generado."* "Eso lo hizo ChatGPT" no es una respuesta válida en la defensa.

## Técnicas de verificación (banco ampliado)

Además de las técnicas ya listadas en la regla de verificación transversal del curso, el texto oficial del proyecto agrega una que vale la pena usar explícitamente en los laboratorios de la Semana 9 (funciones propias): **probar una función con valores cuyo resultado ya se conoce**. Ver el resto de técnicas en [[Programa Oficial (ESEN)]], sección 9 del proyecto grupal.

## Registro de uso de IA (formato exacto a replicar)

| Uso | ¿Qué necesitábamos? | ¿Qué hizo la IA? | ¿Qué hicimos nosotros? | ¿Cómo lo verificamos? |
|---|---|---|---|---|
| Ejemplo | Combinar dos tablas | Propuso `left_join()` | Modificamos la llave sugerida | Comparamos filas antes/después y observaciones sin match |

Esta misma estructura (necesidad → qué propuso la IA → qué se modificó → cómo se verificó) es el patrón que debería regir también las entradas de [[Bitácora de Aprendizaje]] de este vault: no basta con que Claude proponga algo, hay que registrar qué se ajustó y cómo se comprobó que quedó bien.

## Banco de preguntas de defensa

Usar en simulacros de defensa en materiales de semanas 9–11. Banco oficial completo (más amplio que el resumen del documento maestro):

- ¿Qué representa cada fila de esta base?
- ¿Por qué usaron mediana y no solo media?
- ¿Qué hace este `filter()`?
- ¿Por qué este tipo de gráfico?
- ¿Qué pasaría si eliminamos esta línea?
- ¿Por qué utilizaron un `left_join()`?
- ¿Cómo saben que el join no duplicó observaciones?
- ¿Qué significa `na.rm = TRUE` aquí?
- ¿Cómo comprobaron este resultado?
- ¿Qué parte fue generada o sugerida por IA?
- ¿La primera solución que dio la IA era correcta?
- Si tuviera que cambiar este análisis para otro grupo, ¿qué modificaría?

No se espera memorizar cada carácter del script — sí comprender el trabajo entregado (texto oficial).

## Regla fundamental (debe aparecer en todo material relacionado con el proyecto)

1. ¿Qué queríamos saber?
2. ¿Qué hicimos con los datos para averiguarlo?
3. ¿Cómo sabemos que el resultado es correcto?

## Notas relacionadas

[[Programa General]] · [[Evaluación y Rúbricas]] · [[Política de IA]] · [[Mapa Curricular]]
