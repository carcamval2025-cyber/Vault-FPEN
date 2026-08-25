---
tags: [registro, moc]
banner: "![[materiales.svg]]"
---

# Registro de Materiales

Tabla de seguimiento de cada archivo `.html` generado para el curso (`FPEN_Semana[NN]_[Titulo].html`, ver formato de entrega en [[Sistema de Diseño - Tema R Notebook]]). Se actualiza manualmente cada vez que se termina, revisa o entrega un material — no depende de Dataview porque los archivos `.html` viven fuera del vault (en la carpeta del curso) y no tienen frontmatter que Dataview pueda leer.

## Tabla de seguimiento

| Semana | Archivo | Fecha | Estado | Bitácora | Feedback |
|---|---|---|---|---|---|
| — | *(sin materiales todavía)* | — | — | — | — |

**Estado** usa siempre uno de: `borrador` · `revisado` · `aprobado` · `en uso en clase`.

## Estado por semana (desde las notas semanales)

```dataview
TABLE estado AS "Estado del material"
FROM "01 Semanas"
SORT numero ASC
```

## Cómo se actualiza esta tabla

1. Al terminar un material nuevo: agregar una fila con estado `borrador`, la fecha, y enlazar la entrada de [[Bitácora de Aprendizaje]] de esa sesión.
2. Al revisarlo con la [[Plantilla - Revisión de Material]]: cambiar a `revisado` (si pasó) o dejarlo en `borrador` con una nota de qué falta.
3. Cuando Carlos lo confirma como listo para usar: `aprobado`.
4. Después de usarlo en clase al menos una vez: `en uso en clase` — y si algo no funcionó en el aula, esa observación va a [[Bitácora de Aprendizaje]] y posiblemente a [[Errores Comunes a Evitar]].
5. Actualizar también el checklist de estado (Guía de Estudio / Laboratorio / Playground / Cheat Sheet) dentro de la nota de esa semana en `01 Semanas/`.

## Estándar de calidad de referencia

Todavía no existe (ver [[Home]] y [[Sistema de Diseño - Tema R Notebook]]). Cuando la primera sesión (idealmente Semana 1) se construya y apruebe, enlazarla aquí como el archivo contra el que se comparan todas las siguientes.

## Notas relacionadas

[[Home]] · [[Mapa Curricular]] · [[Bitácora de Aprendizaje]] · [[Plantilla - Revisión de Material]]
