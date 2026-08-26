---
tags: [bitacora]
fecha: 2026-08-26
material: "Sitio índice / serie visual FPEN"
tipo: "generación de imágenes + integración"
---

# 2026-08-26 — Serie visual Programar, Analizar y Comunicar

**Contexto:** Carlos pidió agregar tres imágenes más a la página después de aprobar e integrar la identidad visual FPEN.

**Qué se hizo:** se generaron tres ilustraciones distintas mediante ImageGen, usando el símbolo FPEN como referencia de estilo y paleta:

1. **Programar:** consola, objetos, vectores y flujo de instrucciones.
2. **Analizar:** tabla económica transformada en barras, puntos y una curva.
3. **Comunicar:** hallazgo verificado convertido en informe y presentación.

Las salidas se optimizaron como WebP de 960×640: `fpen-programar.webp` (20 KB), `fpen-analizar.webp` (25 KB) y `fpen-comunicar.webp` (23 KB). Se integraron en `docs/index.html` como una sección semántica con títulos y descripciones HTML, texto alternativo específico, dimensiones declaradas, `loading="lazy"` y `decoding="async"`.

**Verificación:** servidor HTTP local y Chrome con `agent-browser`. En escritorio se muestran tres tarjetas en una fila; en móvil se apilan a 358 px sin desbordamiento (`scrollWidth === clientWidth`). Las tres imágenes cargaron completas a 960×640, sin errores de consola ni recursos faltantes.

**Qué funcionó:** mantener el texto fuera de las imágenes evitó errores tipográficos, conservó accesibilidad y permitió que cada ilustración se concentrara en una sola idea.

**Relacionado:** [[2026-08-26 - Identidad visual FPEN y rediseño del índice]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]]
