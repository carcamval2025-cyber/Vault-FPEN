---
tags: [revision]
---

# Plantilla — Revisión de Material

Checklist para evaluar un archivo `.html` recién generado antes de marcarlo `revisado` en [[Registro de Materiales]]. Copiar esta lista dentro de la entrada de [[Bitácora de Aprendizaje]] correspondiente y marcar cada punto.

## Estructura y formato de entrega

- [ ] Nombre de archivo correcto: `FPEN_Semana[NN]_[Titulo].html`
- [ ] Un solo archivo HTML con las 4 pestañas (Guía de Estudio, Laboratorio, R Playground, Cheat Sheet)
- [ ] Funciona offline (sin dependencias externas salvo Google Fonts, o webR si se pidió explícitamente y está documentado como excepción)
- [ ] Sin librerías JS externas — todo vanilla JS/CSS/SVG
- [ ] Responsive

## Sistema de diseño ("R Notebook")

- [ ] Paleta y uso semántico de color correctos (coral/verde/violeta/ámbar/azul-teal) → [[Sistema de Diseño - Tema R Notebook]]
- [ ] Tipografías correctas: Fraunces (display), Literata (cuerpo), JetBrains Mono (código) — nada de Inter/Roboto/Arial/system-ui
- [ ] Íconos SVG inline — cero emojis, cero librerías de íconos
- [ ] Badge de nivel de IA visible en cada ejercicio evaluado, sin excepción → [[Política de IA]]
- [ ] Textareas con botón de revelar deshabilitado hasta un mínimo de caracteres
- [ ] Panel de feedback con criterios de evaluación completos, no frases genéricas
- [ ] Grain texture y demás componentes obligatorios presentes (ver lista completa en [[Sistema de Diseño - Tema R Notebook]])

## Progresión pedagógica

- [ ] Ninguna función de `dplyr`/`ggplot2`/`tidyr` usada antes de su semana de introducción — comparar contra "Acumulado permitido hasta esta semana" en la nota de esa semana
- [ ] Pipe nativo `|>`, no `%>%` (salvo que se esté explicando la diferencia explícitamente)
- [ ] `<-` para asignación, `snake_case`, comentarios explicando el *por qué*
- [ ] Analogías económicas del banco de esa semana — no genéricas → ver [[Programa Oficial (ESEN)]]
- [ ] Ningún `library(...)` introducido antes de su semana
- [ ] Ejercicios 1–2 exigen lectura/predicción real; 3–4 exigen justificación técnica, no solo elegir la función correcta
- [ ] Ejercicio 05 conecta explícitamente con la fase sugerida del proyecto grupal de esa semana → [[Proyecto Grupal]]
- [ ] Cierra con "¿Cómo sabemos que este resultado es correcto?" y una técnica concreta de verificación

## Fidelidad al programa

- [ ] Ningún contenido de un capítulo de R4DS inventado sin tener el archivo real en el Proyecto
- [ ] Si se menciona la fase del proyecto grupal, queda claro que es un mapeo sugerido, no literal del programa

## Resultado de esta revisión

**Veredicto:** aprobado / con ajustes menores / requiere rehacer una sección

**Qué se ajustó:**

**Qué quedó pendiente (si algo):**

→ Registrar en [[Bitácora de Aprendizaje]] y actualizar el estado en [[Registro de Materiales]].
