---
tags: [aprendizaje, checklist]
---

# Patrones que Funcionan Bien

El contrario de [[Errores Comunes a Evitar]]: qué repetir porque dio buen resultado. Igual que la lista de errores, distingue entre lo anticipado por el diseño del curso (**[Diseño]**) y lo confirmado en la práctica con Carlos (**[Confirmado — fecha]**, con enlace a la entrada de bitácora correspondiente).

## Del propio sistema del curso (a mantener siempre)

- **[Diseño]** El ciclo pregunta → exploración → implementación → resultado → interpretación → verificación como columna vertebral de cada sesión — no es decoración, es la estructura pedagógica declarada del curso.
- **[Diseño]** Analogías económicas específicas por semana (no genéricas) — el banco de aplicaciones de cada semana en `01 Semanas/` existe precisamente para no tener que improvisar un ejemplo ad hoc cada vez.
- **[Diseño]** La pregunta de cierre "¿Cómo sabemos que este resultado es correcto?" con una técnica concreta (no solo la pregunta retórica) — el programa oficial da un banco amplio de técnicas en [[Programa Oficial (ESEN)]], sección 9 del proyecto grupal.
- **[Diseño]** Badges de nivel de IA sin excepción — obliga a decidir conscientemente el nivel de apoyo de cada ejercicio en vez de dejarlo implícito.

## Del proceso de construcción del vault (confirmado en esta sesión)

- **[Confirmado — 2026-08-25]** Verificar el programa oficial con `project_search` en vez de conformarse con el resumen del documento maestro — encontró detalle real adicional (ver [[Programa Oficial (ESEN)]]) sin inventar nada. → [[2026-08-25 - Creación del vault]]
- **[Confirmado — 2026-08-25]** Antes de citar un archivo de la carpeta del curso en una nota, abrirlo y confirmar qué es realmente (texto, imagen, tabla) en vez de inferirlo del nombre — evitó dejar una nota de referencia con una premisa equivocada. → [[2026-08-25 - Creación del vault]]
- **[Confirmado — 2026-08-25]** Separar la fuente primaria casi textual ([[Programa Oficial (ESEN)]]) de las notas de trabajo curadas (`00 Programa/`, `01 Semanas/`) — permite enriquecer sin inflar cada nota semanal ni perder trazabilidad hacia el documento oficial.
- **[Confirmado — 2026-08-26]** Al usar herramientas de diseño genéricas (frontend-design, ui-ux-pro-max, canvas-design) sobre un material que ya tiene un sistema de diseño fijo (paleta, tipografía, componentes del [[Sistema de Diseño - Tema R Notebook]]), usarlas para elevar la *ejecución* (jerarquía tipográfica, composición, motion, pulido de detalle) — nunca para renegociar la paleta o la tipografía ya fijas. Ninguna de esas herramientas "sabe" que este curso ya tiene marca propia; hay que decírselo implícitamente respetando las restricciones, no dejarlas elegir libremente. → [[2026-08-26 - Primer material HTML (Semana 01)]]
- **[Confirmado — 2026-08-26]** Antes de dar por buena una sección con animación de aparición al hacer scroll (`fade-in`), probarla con una captura de página completa automatizada — reveló que el contenido bajo el pliegue quedaba invisible sin un mecanismo de respaldo. Se agregó un `setTimeout` de seguridad que fuerza la visibilidad si el `IntersectionObserver` no disparó — nunca dejar contenido educativo dependiendo 100% de una animación para ser visible.
- **[Confirmado — 2026-08-26]** Verificar restricciones de contenido por semana (qué función/estructura ya se enseñó) contra el detalle línea por línea del programa oficial, no solo contra el resumen del documento maestro — evitó usar indexación de vectores (`vector[i]`) en la Semana 01, que el programa reserva explícitamente para la Semana 02.
- **[Confirmado — 2026-08-26]** Al leer skills genéricas de "anti-AI-slop" (pensadas casi siempre para landing pages en React/Tailwind), triarlas primero contra el documento maestro del curso antes de aplicar nada: la mayoría de sus reglas son específicas de un registro distinto (bento grids, GSAP, ban total a serifs) y aplicarlas a ciegas rompería requisitos ya fijos (grain texture, Fraunces, secciones numeradas pedagógicas). Solo se adoptaron las reglas de higiene register-agnostic (guiones largos, `prefers-reduced-motion`, animación GPU-safe, contraste de placeholder, límite de ancho de línea). → [[2026-08-26 - Primer material HTML (Semana 01)]]
- **[Confirmado — 2026-08-26]** Un bloque `@media (prefers-reduced-motion: reduce)` colocado al inicio de la hoja de estilos puede perder la cascada contra una regla posterior con la misma especificidad, aunque la condición del media query sea verdadera — declararlo siempre al final del `<style>` para garantizar que gane. Se detectó automatizando `reducedMotion:'reduce'` con Playwright, no a simple vista.
- **[Confirmado — 2026-08-26]** Los hijos de un CSS Grid con contenido `white-space:pre` (bloques de código) pueden desbordar su celda en viewports angostos porque `min-width:auto` es el valor por defecto de un elemento de grid, y eso ignora el `overflow-x:auto` del propio elemento — hay que fijar `min-width:0` explícito en el contenedor del grid. Solo apareció al probar en 390px, no en escritorio.

## Notas relacionadas

[[Home]] · [[Bitácora de Aprendizaje]] · [[Errores Comunes a Evitar]]
