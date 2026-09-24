---
tags: [bitacora]
fecha: 2026-08-26
material: "vault + proyecto"
tipo: "ajuste"
---

# 2026-08-26 — Extracto de R4DS Cap. 4 (estilo de código)

**Contexto:** Carlos compartió el enlace a la versión en español de R4DS del capítulo "Flujo de trabajo: estilo de código" (davidrsch.github.io/r4ds-es/workflow-style.html) y pidió agregarlo tanto localmente (vault) como dentro del Proyecto de Claude, desglosado siguiendo el orden del programa/vault.

**Qué se hizo:**
- Se descargó el contenido real del capítulo (WebFetch, extracción exhaustiva sección por sección: nombres, espacios, pipes, ggplot2, comentarios de sección, ejercicio de reformateo, resumen) en vez de resumir de memoria — cumple la regla del documento maestro de no inventar contenido de capítulos de R4DS.
- Se creó la nota `02 Referencias/R4DS - Cap 4 - Flujo de Trabajo, Estilo de Código.md` en el vault, con el mismo formato que `Programa Oficial (ESEN)` (banner `referencias.svg`, tags `[referencia, r4ds]`).
- Se creó el documento equivalente en el Proyecto de Claude (`R4DS/Cap 04 - Flujo de Trabajo - Estilo de Código.md`), con una sección adicional explicando dónde encaja en el programa: no es la lectura asignada de ninguna semana (la de Semana 01 es el Cap. 2), pero es la fuente textual de la regla "Estilo de código en R" que las instrucciones maestras ya declaran obligatoria desde la Semana 01.
- Se enlazó la nueva nota desde [[Semana 01]] (sección "Estilo de código a aplicar" y "Notas relacionadas"), dejando explícito que no reemplaza la lectura asignada, solo respalda las reglas de estilo.

**Qué funcionó:**
- Buscar el contenido real vía WebFetch en lugar de asumir el contenido del capítulo por su título — el capítulo trae ejemplos de código concretos (correcto/incorrecto) que son directamente reutilizables como ejercicios de laboratorio (sección 4.6, "reformatea este código sin estilo"), algo que no se podría haber generado de forma confiable sin la fuente real.
- Mantener el mismo contenido espejado en dos lugares (vault local y Proyecto de Claude) con una nota cruzada explícita en cada uno señalando dónde está la otra copia, para que no queden desalineados sin que se note.

**Qué no funcionó / qué se ajustó:**
- Ninguna fricción técnica esta vez — a diferencia de la sesión de GitHub, esta tarea no tocó git ni el puente al dispositivo para archivos que ya existían (solo escritura de archivos nuevos, sin locks).

**Ajuste para la próxima vez:** cuando se agregue un nuevo capítulo de R4DS como referencia, replicar este mismo patrón: WebFetch del contenido real → nota en `02 Referencias/` del vault → documento espejo en el Proyecto bajo `R4DS/` → enlace desde la(s) nota(s) semanal(es) donde aplique, aclarando siempre si es la lectura asignada o solo un respaldo/complemento.

**Relacionado:** [[Semana 01]] · [[Home]]
