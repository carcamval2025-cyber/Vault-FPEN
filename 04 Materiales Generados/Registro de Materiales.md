---
tags: [registro, moc]
banner: "![[materiales.svg]]"
---

# Registro de Materiales

Tabla de seguimiento de cada archivo `.html` generado para el curso (`FPEN_Semana[NN]_[Titulo].html`, ver formato de entrega en [[Sistema de Diseño - Tema R Notebook]]). Se actualiza manualmente cada vez que se termina, revisa o entrega un material — no depende de Dataview porque los archivos `.html` viven fuera del vault (en la carpeta del curso) y no tienen frontmatter que Dataview pueda leer.

## Tabla de seguimiento

| Semana | Archivo | Fecha | Estado | Bitácora | Feedback |
|---|---|---|---|---|---|
| 01 | `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` | 2026-08-26 | `borrador` | [[2026-08-26 - Primer material HTML (Semana 01)]] | *(pendiente — Carlos aún no lo revisa)* |

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

`FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` (26 de agosto de 2026) — ver detalle en [[Sistema de Diseño - Tema R Notebook]]. Estado `borrador`: cumple todas las reglas del documento maestro (verificado con capturas de pantalla y revisión automática de dependencias externas), pero todavía no lo revisa Carlos ni se usa en clase — pasa a `revisado`/`aprobado` cuando eso ocurra.

## Publicación (GitHub Pages)

Desde el 26 de agosto de 2026, cada material publicado también vive en `docs/` en la raíz del repo `Vault-FPEN`, para servirse como sitio estático vía GitHub Pages (Settings → Pages → Deploy from a branch → `main`/`master`, carpeta `/docs`, todavía pendiente de activar por Carlos). Estructura:

- `docs/index.html` — índice central de las 12 semanas (mismo Tema "R Notebook"), con Semana 01 enlazada y 02-12 marcadas "Próxima".
- `docs/semana-NN/index.html` — copia curada de cada material semanal, ya pasada por el [[Sistema de Diseño - Tema R Notebook|checklist de curación]].

Cada semana nueva se agrega igual: su carpeta `docs/semana-NN/` + una tarjeta nueva en `docs/index.html` (cambiar su badge de "Próxima" a "Disponible" y agregar el `href`).

## Notas relacionadas

[[Home]] · [[Mapa Curricular]] · [[Bitácora de Aprendizaje]] · [[Plantilla - Revisión de Material]]
