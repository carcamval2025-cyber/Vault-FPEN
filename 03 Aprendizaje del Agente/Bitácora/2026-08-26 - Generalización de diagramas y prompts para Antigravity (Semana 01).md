---
tags: [bitacora]
fecha: 2026-08-26
material: "Semana 01"
tipo: "diseño pedagógico + prompts de imagen"
---

# 2026-08-26 — Generalización de diagramas y prompts para Antigravity (Semana 01)

**Contexto:** Carlos aprobó el piloto de "Objetos y asignación" ([[2026-08-26 - Piloto de sustitución de lectura (Semana 01)]]) y pidió dos cosas en el mismo turno: (1) generalizar el tratamiento visual a más secciones de la Guía, y (2) 3 prompts de texto para pedirle a Antigravity (herramienta externa en su Mac, fuera de esta sesión) que genere 4 imágenes de apoyo. Antes de escribir los prompts se le preguntó qué debían mostrar las imágenes y cómo repartir 3 prompts en 4 imágenes: eligió "diagramas conceptuales de Semana 01" y "un prompt pide 2 imágenes relacionadas".

**Qué se hizo:**

*Generalización de diagramas (3 secciones más, además de "Objetos y asignación"):*
- **Tipos de datos**: se agregó un panel compacto mostrando los 3 valores de ejemplo (`3.75`, `"comercio"`, `TRUE`) cada uno con una etiqueta de tipo pegada encima, reforzando que el tipo es una propiedad del valor, no un paso aparte. Trato ligero a propósito, porque la cuadrícula de 3 tarjetas que ya existía cubre bien el resto de la explicación.
- **Operadores**: dos flujos horizontales (`.cflow`) — uno aritmético (dos números → operador → un número) y uno de comparación (dos valores → operador → `TRUE`/`FALSE`), visualizando la diferencia que antes solo estaba en el texto de las tarjetas ("devuelven TRUE o FALSE").
- **Vectores**: dos diagramas de antes/después en cuadrícula (`.vec-op-row`) — el primero muestra las 4 cajas del vector como un solo objeto (no cuatro objetos sueltos); el segundo muestra la misma operación aritmética aplicándose a las 4 posiciones a la vez, contrastando explícitamente con un ciclo secuencial (que todavía no se ha enseñado).

Se construyó un vocabulario CSS reutilizable (`.cpanel`, `.cflow`, `.cbox`, `.cop`, `.carrow`, `.cbool`, `.vec-op-row`) en vez de CSS a la medida por sección, para que las próximas semanas puedan usar las mismas piezas sin reinventar el patrón. Todo dentro de los tokens ya fijos, ninguna sección tocó paleta ni tipografía.

*Prompts para Antigravity (3 prompts, 4 imágenes):* documentados en un archivo aparte (`prompts_antigravity_semana01.md`, entregado a Carlos) cubriendo exactamente las mismas 3 secciones recién rediseñadas: Vectores (2 imágenes: estructura + operación vectorizada, mismo prompt), Tipos de datos (1 imagen), Operadores (1 imagen). Se dejó fuera "Funciones y argumentos" de esta ronda tanto en diagramas como en prompts, para mantener el alcance coherente entre ambas pistas de trabajo (visual propio del HTML + imágenes generadas externamente); queda como candidato natural para la próxima ronda.

**Verificación:** Playwright en escritorio y móvil (sin desbordamiento en ninguna de las 3 secciones nuevas), y se confirmó que el evaluador de juguete de "Objetos y asignación" (pieza del piloto anterior) sigue funcionando igual después de estos cambios. Se regeneró `docs/semana-01/index.html` y se verificó ahí también.

**Qué funcionó:** definir el vocabulario CSS reutilizable (`.cflow`/`.cbox`/etc.) antes de escribir la tercera sección hizo que Operadores y Vectores compartieran piezas visuales sin duplicar CSS, y visualmente se leen como una misma familia de diagramas aunque cada uno cuenta algo distinto (estructura vs. operación vs. comparación) — la variedad de contenido con vocabulario visual compartido evita tanto la monotonía (un solo patrón repetido sin variación, el problema que se corrigió en el pase de elevación visual) como la incoherencia (cada sección con un estilo propio inventado desde cero).

**Qué no funcionó / qué se ajustó:** ninguno — al reutilizar los patrones de profundidad y curación ya establecidos (degradado sutil, curva de easing, radios) en el nuevo CSS, no reaparecieron los problemas técnicos de pases anteriores.

**Pendiente:** Carlos va a correr los 3 prompts en Antigravity y avisar cuando tenga las 4 imágenes, para decidir si se insertan junto a los diagramas ya construidos (complementarios) o los reemplazan. También sigue pendiente "Funciones y argumentos" como siguiente sección a rediseñar, y la subida de los capítulos reales de R4DS a la Knowledge del proyecto para poder verificar cada sección contra el capítulo asignado.

**Relacionado:** [[Semana 01]] · [[Sistema de Diseño - Tema R Notebook]] · [[2026-08-26 - Piloto de sustitución de lectura (Semana 01)]] · [[Registro de Materiales]]
