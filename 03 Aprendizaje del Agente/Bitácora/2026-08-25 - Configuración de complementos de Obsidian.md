---
tags: [bitacora]
fecha: 2026-08-25
material: "vault"
tipo: "ajuste"
---

# 2026-08-25 — Configuración de complementos de Obsidian

**Contexto:** minutos después de recibir el vault, Carlos abrió "Vault FPEN" en Obsidian, instaló 5–6 complementos comunitarios (Dataview, Homepage, Banners, Folder Notes, Iconize, y aparentemente Style Settings) y envió una captura de los complementos instalados sin pedir nada específico — la señal implícita era "adapta el vault para aprovecharlos".

**Qué se hizo:**
- Se inspeccionó `.obsidian/` en su carpeta local para confirmar que sí era un vault nuevo recién abierto (community-plugins.json con 5 plugins, sin archivos `data.json` todavía → nada configurado, cero riesgo de sobrescribir personalización existente).
- Se investigó (WebSearch/WebFetch) el esquema real de cada plugin antes de escribir nada, en vez de adivinar campos de configuración.
- Se corrigió un bug real encontrado de paso: la consulta Dataview de [[Home]] apuntaba a una ruta que ya no existía después de que la Bitácora pasó a ser una carpeta de notas individuales.
- Se generaron 5 banners SVG on-brand (paleta del tema "R Notebook", sin emojis) y se agregaron a las notas-hub del vault.

**Qué funcionó:**
- Investigar antes de escribir configuración de plugins ajenos evitó un error concreto: el plugin Homepage (v4) usa un esquema anidado (`homepages: {}`) más complejo del que se podría haber adivinado a ciegas, **pero** su valor por defecto ya abre una nota llamada "Home" al iniciar — exactamente el nombre de la nota índice de este vault. Conclusión: no hizo falta escribir ningún `data.json`, cero riesgo, cero esfuerzo.
- El README de Banners sí confirmó el campo `banner` con sintaxis `"![[archivo]]"` — se implementó con confianza.

**Qué no funcionó / qué se ajustó:**
- No se pudo confirmar con certeza la ubicación/nombre por defecto de Folder Notes (documentación pública insuficiente sobre el valor default). Además, existe un bug documentado (issue #141 del repo) que corrompe nombres de archivo si se usa "Rename existing folder notes" tras cambiar el patrón — así que **se decidió no adivinar y no tocar esa configuración**, dejando instrucciones manuales en vez de una automatización de bajo nivel de confianza.
- Los enlaces de banner se escribieron primero como rutas relativas (`../assets/banners/x.svg`) dentro de `[[...]]`, lo cual es sintaxis de filesystem, no de wikilink de Obsidian. Se corrigió a nombre de archivo simple (`[[x.svg]]`), que es como Obsidian resuelve enlaces internos realmente (por nombre, no por ruta relativa al archivo actual).

**Ajuste para la próxima vez:** cuando se necesite escribir un `data.json` de un plugin de Obsidian que Carlos ya tenga instalado, primero revisar si el archivo ya existe en su vault (`.obsidian/plugins/<id>/data.json`) — si existe, leerlo para no pisar configuración real; si no existe, es señal de que el plugin no se ha configurado todavía y escribir un valor por defecto razonable es de bajo riesgo. Nunca escribir configuración de un plugin sin antes verificar el esquema real (código fuente o documentación), incluso si "parece" obvio.

**Relacionado:** [[Home]] · [[2026-08-25 - Creación del vault]]
