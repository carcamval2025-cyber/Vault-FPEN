---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "diseño + aclaración de proceso"
---

# 2026-08-26 — Elevación visual (tercer pase) y multi-material por semana

**Contexto:** Después de los dos pases de curación técnica (accesibilidad, motion, contraste — ver [[2026-08-26 - Curación técnica (segundo pase) y publicación en GitHub Pages]]), Carlos dio dos indicaciones nuevas en la misma conversación: (1) una aclaración de proceso — una semana del curso puede tener más de un material, así que la documentación del vault no debe asumir una relación 1:1 entre semana y archivo; y (2) feedback directo sobre el material de la Semana 01: "el diseño no es el mejor de todos", pidiendo una mejora sin especificar qué exactamente.

**Qué se hizo:**

*Aclaración de multi-material:* se actualizaron [[Sistema de Diseño - Tema R Notebook]] (sección "Formato de entrega") y [[Registro de Materiales]] (intro de la tabla + sección de publicación) para dejar explícito que una semana puede generar más de un archivo, con la convención de nombre a usar si dos materiales de la misma semana comparten título (sufijo `a`/`b`) y la convención equivalente para `docs/semana-NN-a/`, `docs/semana-NN-b/` en el sitio publicado.

*Diagnóstico de diseño:* se invocó el framework de `design-critique` sobre capturas de pantalla frescas de las 4 pestañas del material de Semana 01, con el contexto explícito de que paleta, tipografía, sistema XP, badges de IA y estructura de pestañas son fijos (no se podían tocar). El diagnóstico: el archivo pasaba toda la higiene técnica pero se sentía plano y monótono — 9 secciones numeradas con el mismo patrón de tarjeta repetido sin variación de ritmo, tarjetas con relleno uniforme sin sensación de profundidad, y el hero sin ningún elemento gráfico propio más allá de texto (el "diagrama del ciclo" que pide el documento maestro solo existía como fila de píldoras).

*Implementación* (detalle técnico completo en [[Sistema de Diseño - Tema R Notebook]], sección "Elevación visual"): diagrama orbital SVG decorativo en el hero principal; degradado sutil de profundidad en tarjetas/ejercicios/cheat-cards; numeral editorial de fondo por sección vía contador CSS (sin tocar el HTML de cada sección individualmente); barra de progreso del laboratorio segmentada en 5 marcas. Todo dentro de los tokens de color y tipografía ya fijos — no se agregó ningún color, fuente ni componente nuevo.

*Verificación:* Playwright en escritorio y móvil (sin desbordamiento horizontal), prueba de interacción completa repetida (textarea → revelar respuesta → XP → checkbox por label, todas funcionando igual que antes), y prueba de `reducedMotion:'reduce'`. Se regeneró `docs/semana-01/index.html` a partir del archivo corregido y se verificó la navegación de directorio contra un servidor HTTP local (no `file://`).

**Qué funcionó:**
- Pedir la crítica explícitamente "sin tocar paleta/tipografía/XP/badges/pestañas" mantuvo las sugerencias enfocadas en composición real (profundidad, ritmo, identidad gráfica del hero) en vez de reabrir decisiones de marca ya cerradas.
- Usar un contador CSS para el numeral editorial de fondo evitó tener que tocar el HTML de las 9 secciones una por una — un solo cambio en la hoja de estilos generó el efecto en las 9 a la vez, con menor superficie de error.
- Verificar con Playwright inmediatamente después del cambio (no solo mirar capturas) detectó que el numeral de fondo se pintaba *encima* del contenido en vez de detrás, un bug de orden de apilamiento invisible en una revisión solo visual rápida si el navegador hubiera compuesto las capas de otra forma.

**Qué no funcionó / qué se ajustó:**
- La primera corrida de verificación con Playwright después de estos cambios reportó (falsamente) toda la pestaña Guía como vacía en la captura de página completa. No era un bug del archivo: el script de prueba esperó solo 400ms antes de capturar, menos que el `setTimeout` de seguridad de 1500ms que el propio archivo usa como red de respaldo del `fade-in` (documentado en el pase anterior). Aumentar la espera a ~1800ms resolvió la falsa alarma. Ajuste para la próxima vez: cualquier prueba automatizada de este archivo debe esperar más que su propio `setTimeout` de seguridad documentado, no un valor arbitrario corto.
- Un selector de prueba genérico (`.exercise textarea.answer` sin acotar a `#panel-lab`) coincidió primero con un `.exercise` de la pestaña Guía (sección "Repaso activo" también usa esa clase), que estaba oculto por ser una pestaña inactiva — causó un timeout de Playwright que parecía un bug del archivo pero era un error del selector de prueba. Ajuste: acotar siempre los selectores de prueba al panel de pestaña activo cuando una clase se reutiliza en más de una pestaña.

**Ajuste para la próxima vez:** antes de dar por buena (o por rota) una captura de pantalla automatizada de este archivo, confirmar que el tiempo de espera del script de prueba sea mayor al `setTimeout` de seguridad de 1500ms documentado en el propio archivo, y que cualquier selector de una clase reutilizada en varias pestañas (`.exercise`, `.card`, etc.) esté acotado al `id` del panel activo.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[Registro de Materiales]] · [[Home]] · [[2026-08-26 - Primer material HTML (Semana 01)]] · [[2026-08-26 - Curación técnica (segundo pase) y publicación en GitHub Pages]]
