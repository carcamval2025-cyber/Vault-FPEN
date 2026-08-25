---
tags: [aprendizaje, checklist]
---

# Errores Comunes a Evitar

Checklist viva. Dos tipos de origen:

- **[Regla]** — anticipado por el documento maestro del Proyecto, nunca se ha observado como error real todavía.
- **[Observado — AAAA-MM-DD]** — ocurrió de verdad en una sesión, con enlace a la entrada de [[Bitácora de Aprendizaje]] donde se documentó.

Antes de generar o revisar cualquier material, repasar esta lista. Cuando algo de aquí ocurra en la práctica, actualizar su origen de [Regla] a [Observado] con la fecha — eso es evidencia de que la regla no es solo teórica, hay que vigilarla de verdad.

## Diseño y UI (Sistema "R Notebook")

- [ ] **[Regla]** Usar emojis como íconos funcionales, incluyendo en los badges de nivel de IA — deben ser texto + color semántico, nunca emoji.
- [ ] **[Regla]** Usar librerías de íconos externas (Font Awesome u otras).
- [ ] **[Regla]** Usar tipografías genéricas (Inter, Roboto, Arial, system-ui) para el display — solo Fraunces + Literata + JetBrains Mono.
- [ ] **[Regla]** Reasignar el color semántico de la paleta (coral, verde, violeta, ámbar, azul/teal tienen un significado fijo → [[Sistema de Diseño - Tema R Notebook]]).
- [ ] **[Regla]** Crear archivos separados por pestaña — siempre un solo HTML con las 4 pestañas integradas.
- [ ] **[Regla]** Usar librerías JS externas (jQuery, Bootstrap, Chart.js, resaltado de sintaxis) — todo vanilla JS/CSS/SVG.
- [ ] **[Regla]** Presentar salidas de R del Playground como ejecución en vivo sin aclarar si son precomputadas o webR.
- [ ] **[Regla]** Revelar la respuesta de un ejercicio antes de que el estudiante haya escrito algo en el textarea.
- [ ] **[Regla]** Omitir el badge de nivel de IA en un ejercicio evaluado — la ausencia de etiqueta no es válida.
- [ ] **[Regla]** Usar `localStorage` para el progreso del laboratorio — debe ser estado en memoria de JS (el archivo puede abrirse fuera de un entorno con esa API disponible de forma consistente).

## Progresión pedagógica y contenido de R

- [ ] **[Regla]** Usar en una semana una función de `dplyr`/`ggplot2`/`tidyr` que el programa introduce en una semana posterior (ver progresión exacta en cada nota de `01 Semanas/`).
- [ ] **[Regla]** Usar `%>%` de magrittr como pipe por defecto — el curso usa `|>` nativo, salvo que se esté explicando explícitamente la diferencia histórica.
- [ ] **[Regla]** Poner un `library(...)` antes de que el programa mencione ese paquete para esa semana (la primera es `ggplot2` en la Semana 3, luego `dplyr` en la Semana 4).
- [ ] **[Regla]** Usar analogías genéricas ("empleados y departamentos") en vez del banco de aplicaciones económicas específico de cada semana.
- [ ] **[Regla]** Inventar contenido de un capítulo de R4DS que no esté disponible como archivo en el Proyecto — resumir a nivel conceptual en su lugar, sin inventar número de página.
- [ ] **[Regla]** Presentar la fase del proyecto grupal por semana (tabla de [[Proyecto Grupal]]) como si fuera literal del programa oficial — es un mapeo sugerido, hay que dejarlo claro.
- [ ] **[Regla]** Cerrar un laboratorio sin la pregunta "¿Cómo sabemos que este resultado es correcto?" y al menos una técnica concreta de verificación.
- [ ] **[Regla]** Hacer laboratorios fáciles — ejercicios 1–2 deben exigir lectura/predicción real de código; 3–4, justificación técnica real, no solo "elegir la función correcta".

## Proceso de trabajo con el Proyecto de Claude

- [x] **[Observado — 2026-08-25]** `project_read` puede fallar con "documento no encontrado" en un archivo que sí existe y aparece correctamente en `project_info` — antes de asumir que el archivo no está disponible, probar `project_search`. → [[2026-08-25 - Creación del vault]]
- [x] **[Observado — 2026-08-25]** No asumir la función de un archivo de la carpeta del curso solo por su nombre (ej. "Instalación de R.docx" resultó ser la entrega de Carlos, no una guía) — inspeccionar el contenido real antes de construir una nota o material a partir de él. → [[2026-08-25 - Creación del vault]]

## Notas relacionadas

[[Home]] · [[Bitácora de Aprendizaje]] · [[Patrones que Funcionan Bien]] · [[Sistema de Diseño - Tema R Notebook]]
