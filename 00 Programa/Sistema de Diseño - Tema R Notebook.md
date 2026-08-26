---
tags: [programa, diseno, tema-r-notebook]
---

# Sistema de Diseño — Tema "R Notebook"

Sistema nuevo, no reciclado de otros cursos — pensado para R/Tidyverse en vez de SQL/MariaDB (a diferencia de la plantilla original del curso SIN).

## Paleta de colores

```
--bg0:    #0a0f1c   (fondo base)
--bg1:    #111a30   (tarjetas y paneles)
--bg2:    #182645   (hover states, headers internos)
--blue:   #4c9aff   (acción principal, correcto, R/RStudio)
--teal:   #2dd4bf   (información, tidyverse, links)
--amber:  #f5a623   (advertencias, lecturas previas)
--coral:  #ff6b6b   (errores, problemas, "Sin IA")
--violet: #a78bfa   (proyecto grupal, trabajo en equipo)
--green:  #34d399   (éxito, feedback correcto, "IA permitida")
--tp:     #edf1fa   (texto principal)
--ts:     #8792ae   (texto secundario)
```

**Uso semántico obligatorio** — no se puede reasignar color por color sin romper la convención del curso:

- coral = "Sin IA" y errores
- verde = "IA permitida" y respuestas correctas
- violeta = "IA requerida" y todo lo relacionado al proyecto grupal
- ámbar = lecturas previas y advertencias
- azul/teal = navegación, información neutra y código de R

## Tipografía

| Uso | Fuente | Notas |
|---|---|---|
| Display / Títulos | `Fraunces` (700–800) | Serif editorial — evita el look genérico de dashboard |
| Cuerpo / Lectura | `Literata` | Serif optimizada para lectura extendida |
| Código / Mono | `JetBrains Mono` | Alta legibilidad para distinguir `1`/`l`/`I` y operadores de R (`<-`, `\|>`, `::`) |

Nunca tipografías genéricas (Inter, Roboto, Arial, system-ui) para el display.

## Componentes obligatorios en cada sesión

1. Hero con grid animado o diagrama del ciclo importar→ordenar→transformar→visualizar→modelar→comunicar (marca recurrente del curso)
2. Navegación sticky con pills por sección
3. Sistema XP en el nav global que suma puntos por interacciones completadas
4. Badges de nivel de IA visibles en cada ejercicio — texto con color semántico, nunca emoji
5. Tarjetas de conceptos con hover glow + barra degradada al fondo
6. Respuestas con textarea — el botón de revelar deshabilitado hasta un mínimo de caracteres
7. Panel de feedback con criterios de evaluación completos, no frases de aliento genéricas
8. Barra de progreso en el laboratorio
9. Bloques de código R con resaltado manual (vanilla JS/CSS, sin librerías externas)
10. Íconos SVG inline — nunca emojis, nunca librerías externas de íconos
11. Grain texture con SVG filter en el body
12. Pregunta de verificación recurrente ("¿Cómo sabemos que este resultado es correcto?") como cierre de cada laboratorio

## Estructura de cada archivo de sesión (4 pestañas)

1. **Guía de Estudio** — hero con chips de contexto, navegación interna sticky, conceptos clave, analogías económicas, tabla de referencia, repaso activo con textareas
2. **Laboratorio** — hero con chips de dificultad y badge de IA por ejercicio, barra de progreso, 5 ejercicios mínimo progresivos (01–02 interpretación/predicción, 03–04 construcción con justificación, 05 ejercicio "Proyecto"), checkboxes de verificación, reflexión final
3. **R Playground** — 4 fragmentos progresivos con SOLO funciones ya enseñadas hasta esa semana, dataset simulado con contexto económico, salida junto al código
4. **Cheat Sheet** — compacto, vocabulario con badges, tabla de funciones de la semana, diagrama de la regla central, footer con bibliografía

## Ejecución real vs. simulada en el R Playground

R no puede ejecutarse de forma confiable con JavaScript vanilla. Dos caminos válidos, **nunca mezclados en el mismo archivo sin dejarlo explícito**:

- **Por defecto:** código R junto a salida **precomputada** (texto de consola o SVG estático), dejando claro que es referencia, no ejecución en vivo. Mantiene el archivo 100% offline.
- **Opcional/avanzado:** **webR** (WebAssembly) vía CDN para ejecución real — rompe el offline-first y añade carga pesada de WASM. Solo si el usuario lo pide explícitamente y acepta la excepción online-only.

## Formato de entrega

- Un solo archivo `.html` por sesión, todo integrado en pestañas.
- Nombre: `FPEN_Semana[NN]_[Titulo].html` (ej. `FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`).
- Offline salvo Google Fonts (y webR si se pidió explícitamente).
- Sin librerías JS externas (nada de jQuery, Bootstrap, Chart.js, resaltado de sintaxis externo) — todo vanilla.
- Íconos SVG inline, nunca Font Awesome ni emojis funcionales.
- Responsive.
- Textareas editables con progreso en memoria de JS (sin `localStorage`).

## Estándar de calidad de referencia

Establecido el 26 de agosto de 2026: **`FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html`** (carpeta del curso, fuera del vault — registro completo en [[Registro de Materiales]] y en [[2026-08-26 - Primer material HTML (Semana 01)]]). Se construyó combinando varias herramientas de diseño (frontend-design, ui-ux-pro-max, principios visuales de canvas-design) **dentro** de la paleta y tipografía ya fijas de este documento, no reemplazándolas — ese es el patrón a repetir: usar herramientas de diseño para elevar la ejecución (jerarquía, composición, motion, pulido), nunca para renegociar el sistema de marca del curso.

Cualquier sesión nueva debe compararse contra este archivo antes de darse por terminada.

## Notas relacionadas

[[Programa General]] · [[Política de IA]] · [[Patrones que Funcionan Bien]] · [[Errores Comunes a Evitar]]
