---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "integración visual (ilustraciones generadas con IA)"
---

# 2026-08-26 — Integración de ilustraciones SVG generadas con IA (Semana 01)

**Contexto:** Carlos corrió los 3 prompts de [[2026-08-26 - Generalización de diagramas y prompts para Antigravity (Semana 01)]] en Antigravity y entregó 4 SVG (`fpen-vector-estructura.svg`, `fpen-vector-operacion.svg`, `fpen-tipos-datos.svg`, `fpen-operadores.svg`) vía un documento de handoff pidiendo su integración directa. Antes de tocar el HTML se verificaron los 4 archivos reales en `Vault FPEN/docs/assets/brand/` (no la copia desactualizada en la carpeta suelta `FPEN GitHub Upload`) renderizándolos a PNG con Playwright para inspección visual.

**Qué se encontró en la primera entrega:** resultado desigual. `fpen-tipos-datos.svg` y `fpen-operadores.svg` seguían el prompt casi al pie de la letra (paleta correcta, mismos valores que ya usaban los diagramas CSS existentes) — listas para integrar. `fpen-vector-estructura.svg` y `fpen-vector-operacion.svg` en cambio mostraban un motivo genérico de "tarjetas de dashboard conectadas" (iconos de pantalla, barras, gráfico de líneas/barras) que no comunicaba el concepto de vector pedido. Se reportó esta evaluación a Carlos con las 4 previsualizaciones antes de integrar nada, y se le dieron 3 decisiones explícitas: qué hacer con las 2 imágenes de Vectores, cómo integrar las 2 que sí funcionaron, y qué hacer con la carpeta `FPEN GitHub Upload` (desconectada, sin git). Eligió: regenerar Vectores con un prompt más literal, integrar Tipos de datos/Operadores junto a los diagramas ya construidos, e ignorar la carpeta suelta por ahora.

**Decisión de formato — SVG inline, no `<img src>`:** el handoff sugería `<figure><img src="../assets/brand/archivo.svg"></figure>`, pero el documento maestro exige que cada sesión sea "un solo archivo HTML... debe funcionar offline" y el archivo no tenía ninguna referencia externa hasta ahora (ni siquiera el favicon, que ya usaba un data URI). Se verificó esto en el archivo antes de decidir, y se optó por incrustar el SVG completo como marcado inline dentro de un nuevo componente `.concept-figure`, preservando el requisito de archivo único y autocontenido en vez de seguir el patrón sugerido en el handoff sin cuestionarlo.

**Prompt de regeneración para Vectores:** se escribió un prompt más explícito y restrictivo (`prompt_regeneracion_vectores.md`, entregado a Carlos) que describe exactamente 4 cajas idénticas conectadas con valores de `ingresos` y rechaza explícitamente cualquier iconografía de dashboard/analytics. Carlos lo corrió en Antigravity y el resultado esta vez sí coincidió con el concepto: `fpen-vector-estructura.svg` muestra las 4 cajas con subíndices `[1]`–`[4]` y los mismos valores (4200, 4550, 4100, 4800) del ejemplo ya usado en el diagrama CSS existente, envueltas en un contorno punteado con la etiqueta "un solo objeto: ingresos"; `fpen-vector-operacion.svg` muestra 4 flechas verticales paralelas (no en zigzag, no numeradas como secuencia) con el símbolo `× 1.05` repetido individualmente en cada una, bajando hacia una fila de resultado en verde con los valores correctos (4410, 4777.5, 4305, 5040). Se verificaron también antes de integrar.

**Qué se hizo:** las 4 ilustraciones (Tipos de datos, Operadores, y las 2 de Vectores regeneradas) se integraron como SVG inline dentro de `<figure class="concept-figure">`, cada una justo después del diagrama `.cpanel`/`.vec-op-row` correspondiente que ya existía en esa sección — complementarias, no en reemplazo, como se acordó. Cada figura lleva un `<figcaption>` que rotula explícitamente la ilustración como "generada con asistencia de IA". Se añadió el componente CSS `.concept-figure` (panel con el mismo degradado y borde que `.cpanel`, para que se lean como la misma familia visual) al bloque de diagramas conceptuales reutilizables.

**Verificación:** Playwright en escritorio (1440×900/1200) y móvil (390×844/900) en ambos archivos (`FPEN_Semana01_R_Como_Herramienta_Para_Pensar.html` y `docs/semana-01/index.html`) — sin desbordamiento horizontal en ninguno, las 4 figuras presentes y con el tamaño/proporción esperada. Se revisó que ningún `id` interno de los SVG (gradientes, patrones) colisionara entre las 4 piezas ni con los `id` ya existentes en el archivo.

**Qué funcionó:**
- Verificar el archivo real antes de aplicar el patrón HTML sugerido por el handoff evitó romper el requisito de archivo único offline: `<img src="../assets/brand/...">` habría funcionado en `docs/semana-01/index.html` (que sí vive junto a esa carpeta) pero habría roto la portabilidad de la Guía standalone, que se abre sola desde cualquier carpeta.
- Pedir la regeneración con un prompt que nombra explícitamente lo que NO debe aparecer (iconografía de dashboard) resolvió el problema de raíz — la segunda entrega coincidió con el concepto en el primer intento.
- Reportar la evaluación de fidelidad con las 4 previsualizaciones antes de integrar, en vez de integrar todo automáticamente porque el handoff lo pedía, permitió detectar el problema de las 2 imágenes de Vectores antes de publicarlas.

**Qué no funcionó / qué se ajustó:** ninguno de los hallazgos técnicos de pases anteriores (contraste, overflow, ids duplicados) reapareció, porque el nuevo componente `.concept-figure` reutilizó el mismo tratamiento visual (degradado, borde, radio) que `.cpanel` en vez de inventar un estilo nuevo.

**Pendiente:** ninguno específico de esta ronda. Sigue pendiente "Funciones y argumentos" como próxima sección a rediseñar, y la carpeta `FPEN GitHub Upload` (desconectada, desactualizada) sin resolver — Carlos pidió ignorarla por ahora.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[2026-08-26 - Generalización de diagramas y prompts para Antigravity (Semana 01)]] · [[2026-08-26 - Piloto de sustitución de lectura (Semana 01)]] · [[Registro de Materiales]]
