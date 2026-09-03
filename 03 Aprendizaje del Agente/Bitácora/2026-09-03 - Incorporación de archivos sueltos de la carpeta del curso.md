---
tags: [bitacora]
fecha: 2026-09-03
material: "vault"
tipo: "ajuste"
---

# 2026-09-03 — Incorporación de archivos sueltos de la carpeta del curso

**Contexto:** Carlos preguntó si los archivos que va agregando a la carpeta del curso ("Fundamentos de programación para Economía") quedan versionados. Se identificó que la carpeta raíz **no** es un repositorio git — solo `Vault FPEN/` (conectado a `github.com/carcamval2025-cyber/Vault-FPEN`, al día) y `FPEN GitHub Upload/` (repo huérfano, remoto placeholder nunca configurado, subconjunto viejo de archivos) lo son. Varios archivos sueltos en la raíz no estaban versionados en ningún lado. Carlos pidió identificarlos e incorporarlos.

**Qué se hizo:**
- Se copiaron a `02 Referencias/Fuentes/` los tres documentos originales que ya estaban referenciados por nombre desde notas existentes pero nunca se habían incorporado al vault:
  - `20255766 - Carlos Navas - Instalación de R.docx` — la entrega/prueba de instalación de Carlos, ya descrita en [[Instalación de R - Estado]].
  - `Captura de pantalla 2026-08-24 a la(s) 4.30.31 p. m..png` — la captura hermana mencionada en esa misma nota como "no incorporada todavía".
  - `Programa - Fundamentos de Programación para Economía y Negocios - 2026.docx` — el documento fuente del que [[Programa Oficial (ESEN)]] es un extracto organizado.
- Se creó `06 Código R/` para el código de R propio de Carlos, que no tenía hogar en el vault (es trabajo del estudiante, no documentación del curso):
  - `Clase01.R`, `Clase02.R`, `Clase03.R` — código de las primeras tres sesiones de laboratorio.
  - `Entregas/20255766-CarlosNavas-Guía1.R` — la Guía 1 resuelta (entrega evaluada).
- Se actualizó [[Instalación de R - Estado]] para reflejar que el docx y la captura ya están incorporados, y se agregó una entrada a la lista de carpetas de `AGENTS.md`.
- **No se incorporaron** (quedan solo en la carpeta local de Carlos, fuera de git):
  - `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` — es un borrador previo a la curación final; el propio [[Registro de Materiales]] documenta que los `.html` de sesión viven intencionalmente *fuera* del vault (solo la copia curada en `docs/semana-01/` está versionada). Incorporarlo habría contradicho esa decisión ya tomada.
  - `Vault FPEN.zip` y `vault-fpen.bundle` — son respaldos del propio repositorio `Vault FPEN` (un zip y un bundle de git), redundantes por definición una vez que el repo ya está en GitHub.

**Qué funcionó:** Revisar primero qué decía cada nota existente (`Instalación de R - Estado`, `Programa Oficial (ESEN)`, `Registro de Materiales`) antes de mover nada — dos de los tres documentos ya tenían "hogar" implícito y el registro de materiales ya explicaba por qué el `.html` suelto no debía copiarse.

**Qué no funcionó / qué se ajustó:** Los nombres de archivo con tildes (p. ej. "Economía", "Guía1") fallan al referenciarse como string literal en `device_bash` — probablemente una diferencia de normalización Unicode (NFC vs NFD) entre cómo se escribe el acento aquí y cómo lo guarda macOS/APFS. Usar expansión de glob (`Captura*.png`, `Fundamentos*`) en vez de escribir el nombre completo con tilde evita el problema.

**Ajuste para la próxima vez:** cuando un `cd`/`cp`/`cat` a una ruta con tildes falle con "No such file or directory" aunque `ls` sí la muestre, no reintentar con la misma ruta literal — usar un glob que evite escribir el caracter acentuado.

**Relacionado:** [[Instalación de R - Estado]] · [[Programa Oficial (ESEN)]] · [[Registro de Materiales]] · [[2026-08-25 - Vault subido a GitHub]]
