---
tags: [bitacora]
fecha: 2026-08-25
material: "vault"
tipo: "meta"
---

# 2026-08-25 — Creación del Vault FPEN

**Contexto:** Carlos pidió construir este vault de Obsidian como conocimiento persistente del Proyecto — para que el aprendizaje de Claude (qué funciona, qué no) y el de Carlos vayan de la mano al construir los materiales del curso. Todavía no existe ningún material `.html` — este vault se construyó *antes* de la primera sesión de laboratorio.

**Qué se hizo:**
- Se leyeron las instrucciones maestras del Proyecto y se buscó (`project_search`) el texto del programa oficial (`Programa - Fundamentos de Programación para Economía y Negocios - 2026.docx`) para verificar contra la fuente primaria, no solo contra el resumen del documento maestro.
- Se revisó la carpeta conectada del curso y se encontraron dos archivos adicionales: una entrega de instalación de R (`20255766 - Carlos Navas - Instalación de R.docx`) y una captura de pantalla suelta.
- Se construyó la estructura completa: programa, 12 notas semanales, referencias, y este mismo sistema de aprendizaje.

**Qué funcionó:**
- `project_search` sí devolvió el contenido completo del documento (`project_read` fallaba de forma consistente con un error de "documento no encontrado" a pesar de que el path coincidía exactamente — parece un problema del backend con ese documento específico, no un error de ruta). **Ajuste registrado:** si `project_read` falla así en el futuro, probar `project_search` antes de asumir que el documento no está disponible.
- El documento oficial resultó tener **más detalle por semana** del que contenía el resumen del documento maestro del Proyecto (por ejemplo, "uso de ayuda y lectura de errores" en Semana 1, o la técnica de verificación "probar una función con valores cuyo resultado ya se conoce" en el proyecto grupal). Se incorporó ese detalle adicional a [[Programa Oficial (ESEN)]] y se enlazó desde cada nota semanal, en vez de descartarlo.

**Qué no funcionó / qué se ajustó:**
- La primera suposición sobre el archivo `20255766 - Carlos Navas - Instalación de R.docx` fue incorrecta: se asumió que era una *guía* de instalación (recurso del docente). Al inspeccionarlo (no tenía texto extraíble con `python-docx`, solo una imagen incrustada), resultó ser la **entrega de Carlos** demostrando que su instalación de R/RStudio ya funciona. Se corrigió el nombre de la nota de referencia (de "Instalación de R - Guía" a "Instalación de R - Estado") y su contenido antes de que el error se propagara a otras notas.
- **Lección para la próxima vez:** cuando un archivo de la carpeta del curso no tiene un nombre autoexplicativo evidente (mezcla de código de estudiante + nombre + tema), inspeccionar su contenido real antes de asumir su función, en vez de inferirla solo por el nombre del archivo.

**Ajuste para la próxima vez:** antes de generar el primer material de la Semana 1, releer esta entrada y [[Semana 01]] — la instalación de R ya está resuelta para Carlos, así que el material no necesita instrucciones de instalación, puede asumir que RStudio ya corre.

**Relacionado:** [[Instalación de R - Estado]] · [[Programa Oficial (ESEN)]] · [[Semana 01]]
