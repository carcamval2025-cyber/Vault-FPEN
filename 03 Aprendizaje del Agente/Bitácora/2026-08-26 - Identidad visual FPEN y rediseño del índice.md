---
tags: [bitacora]
fecha: 2026-08-26
material: "Sitio índice / identidad FPEN"
tipo: "identidad visual + implementación"
---

# 2026-08-26 — Identidad visual FPEN y rediseño del índice

**Contexto:** Carlos aprobó la dirección visual del nuevo símbolo FPEN y pidió aplicar explícitamente los flujos de `brand-logo-assets` e `imagegen` para completar el logo y los diseños del sitio. Feedback fuente → [[2026-08-26 - Aprobación de identidad visual FPEN]].

**Qué se hizo:**

- Se construyó el wordmark exacto en SVG, con el símbolo aprobado (prompt de consola + barras de datos + órbita), y un favicon simplificado que conserva lectura a tamaño pequeño.
- Se generó con ImageGen una composición original de “laboratorio de datos” como exploración para el hero. Dos intentos de transparencia devolvieron una cuadrícula horneada sin canal alfa real; esas salidas no se integraron. La composición aprobada se reconstruyó como SVG determinista y transparente para producción.
- `docs/index.html` ahora usa el wordmark en la navegación, el favicon real y la ilustración del laboratorio de datos en un hero de dos columnas. En móvil la composición baja debajo del texto sin provocar desbordamiento.
- `docs/semana-01/index.html` consume el mismo favicon y símbolo en su enlace de regreso, para mantener continuidad visual.

**Activos maestros:** `docs/assets/brand/fpen-logo.svg`, `fpen-favicon.svg` y `fpen-hero-data-lab.svg`. Los PNG de la carpeta son previews raster con alfa real, no los masters editables.

**Verificación:** servidor HTTP local + Chrome mediante `agent-browser`; escritorio 1440×1000 y móvil 390×844. `scrollWidth === clientWidth` en el índice móvil, consola y errores vacíos, y favicon resuelto desde `/assets/brand/fpen-favicon.svg` en Semana 01. Los PNG de preview se validaron con canal alfa real.

**Qué funcionó:** usar ImageGen para explorar la composición y SVG para el master final permitió conservar personalidad visual sin depender de texto generado, fondos falsamente transparentes o una imagen pesada.

**Qué no funcionó / qué se ajustó:** la transparencia solicitada a ImageGen no produjo alfa real en dos intentos. Se verificó el archivo, se descartó la salida para producción y se mantuvo solo su aporte conceptual.

**Relacionado:** [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[2026-08-26 - Elevación visual (tercer pase) y multi-material por semana]]
