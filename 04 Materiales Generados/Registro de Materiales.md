---
tags: [registro, moc]
banner: "![[materiales.svg]]"
---

# Registro de Materiales

Tabla de seguimiento de cada archivo `.html` generado para el curso (`FPEN_Semana[NN]_[Titulo].html`, ver formato de entrega en [[Sistema de Diseño - Tema R Notebook]]). Se actualiza manualmente cada vez que se termina, revisa o entrega un material — no depende de Dataview porque los archivos `.html` viven fuera del vault (en la carpeta del curso) y no tienen frontmatter que Dataview pueda leer.

**Una semana puede tener más de un material** (más de una sesión de clase, o un tema partido en dos entregas) — la tabla no asume una fila única por semana; simplemente se agrega una fila nueva por cada archivo, y el número de semana se repite cuando corresponda.

## Tabla de seguimiento

| Semana | Archivo | Fecha | Estado | Bitácora | Feedback |
|---|---|---|---|---|---|
| 01 | `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` | 2026-08-26 | `aprobado` | [[2026-08-26 - Primer material HTML (Semana 01)]] | [[2026-08-26 - Aprobación de identidad visual FPEN]] |
| 01-02 (C1) | `FPEN_Control01_Guia_de_Lectura_y_Analisis.html` | 2026-09-16 | `aprobado` | [[2026-09-16 - Control 01 y Suite de SVGs]] | Aprobado con suite de diagramas SVG independientes |
| 01-02 (C1) | `FPEN_Control01_Repaso_y_Simulacro.html` | 2026-09-16 | `aprobado` | [[2026-09-16 - Control 01 y Suite de SVGs]] | Aprobado con webR en vivo y dataset CSV descargable |
| 05 (S1) | `FPEN_Semana05_Sesion01_Pipe_y_Verbos_de_Transformacion.html` | 2026-09-24 | `en uso en clase` | [[2026-09-24 - Semana 05 Sesión 01 - Pipe y Verbos de Transformación]] | Repaso de pipe nativo `\|>`, filter, arrange, select, rename y operadores lógicos |
| 01–05, C1 | Sitio `docs/` rediseñado (Guía FPEN): `semana-01` a `semana-05`, `control-01/guia`, `control-01/repaso`, `index.html` | 2026-09-25 | `borrador` | [[2026-09-25 - Rediseño Guía FPEN y semanas 02 a 04]] | Pendiente de revisión de Carlos |
| 01–05, C1 | Sitio `docs/` con voz propia (tabloide económico): portada con gráfico y lupa, color por momento, cinta, índice y buscador Ctrl K | 2026-09-25 | `aprobado` | [[2026-09-25 - Voz propia - tabloide económico]] | [[2026-09-25 - Voz propia del diseño aprobada]]: "Está a otro nivel ahora" |
| 01–05, C1 | Logo FPEN ▲, favicon y barra con panel Edición (reemplaza al menú de rayitas) | 2026-09-25 | `aprobado` | [[2026-09-25 - Logo FPEN y panel Edición]] | Carlos eligió el logo A y aprobó el panel tal como se prototipó |
| 02 | `docs/semana-02/index.html` (nueva) | 2026-09-25 | `borrador` | [[2026-09-25 - Rediseño Guía FPEN y semanas 02 a 04]] | Pendiente de revisión de Carlos |
| 03 | `docs/semana-03/index.html` (nueva) | 2026-09-25 | `borrador` | [[2026-09-25 - Rediseño Guía FPEN y semanas 02 a 04]] | Pendiente de revisión de Carlos |
| 04 | `docs/semana-04/index.html` (nueva) | 2026-09-25 | `borrador` | [[2026-09-25 - Rediseño Guía FPEN y semanas 02 a 04]] | Pendiente de revisión de Carlos |

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

`FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` (26 de agosto de 2026, tras tres pases: contenido inicial, curación técnica anti-AI-slop, y elevación visual/composición) — ver detalle en [[Sistema de Diseño - Tema R Notebook]] y en [[2026-08-26 - Elevación visual (tercer pase) y multi-material por semana]]. Estado `borrador`: cumple todas las reglas del documento maestro (verificado con capturas de pantalla, prueba de interacción y revisión automática de dependencias externas). Carlos aprobó la nueva identidad visual del sitio, pero la revisión completa del material y su uso en clase siguen pendientes; pasa a `revisado`/`aprobado` cuando eso ocurra.

## Publicación (GitHub Pages)

Desde el 26 de agosto de 2026, cada material publicado también vive en `docs/` en la raíz del repo `Vault-FPEN`, para servirse como sitio estático vía GitHub Pages (Settings → Pages → Deploy from a branch → `main`/`master`, carpeta `/docs`, todavía pendiente de activar por Carlos). Estructura:

- `docs/index.html` — índice central de las 12 semanas (mismo Tema "R Notebook"), con Semana 01 enlazada y 02-12 marcadas "Próxima".
- `docs/semana-NN/index.html` — copia curada de cada material semanal, ya pasada por el [[Sistema de Diseño - Tema R Notebook|checklist de curación]].
- `docs/assets/brand/` — identidad compartida del sitio: logo, favicon, ilustración del hero, previews raster y la serie visual “Programar · Analizar · Comunicar”. Registro → [[2026-08-26 - Serie visual Programar Analizar Comunicar]].

Cada semana nueva se agrega igual: su carpeta `docs/semana-NN/` + una tarjeta nueva en `docs/index.html` (cambiar su badge de "Próxima" a "Disponible" y agregar el `href`). **Si una semana tiene más de un material**, usar `docs/semana-NN-a/`, `docs/semana-NN-b/` (etc.) para cada uno, y mostrar una tarjeta por material en el índice — agrupadas visualmente bajo el mismo número de semana, cada una con su propio título y estado.

## Notas relacionadas

[[Home]] · [[Mapa Curricular]] · [[Bitácora de Aprendizaje]] · [[Plantilla - Revisión de Material]]
