# Prompts para Antigravity — 4 imágenes de apoyo, Semana 01 (FPEN)

Contexto para pegar antes de cada prompt si Antigravity lo permite (o al inicio de la conversación): estas imágenes son para un curso universitario de R para estudiantes de Economía y Negocios (ESEN), tema visual "R Notebook". Paleta fija: fondo azul casi negro `#0a0f1c`, paneles `#111a30`/`#182645`, acentos `#4c9aff` (azul), `#2dd4bf` (teal), `#f5a623` (ámbar), `#ff6b6b` (coral), `#a78bfa` (violeta), `#34d399` (verde). Estilo: ilustración vectorial plana, geométrica, editorial, minimalista — nada fotorrealista, nada de emojis, nada de clip-art genérico. Si puedes adjuntar como referencia visual alguno de los archivos ya existentes en `docs/assets/brand/` (`fpen-logo.svg`, `fpen-hero-data-lab.svg`, `fpen-programar.webp`), mejor: así Antigravity iguala el estilo exacto en vez de solo la paleta.

---

## Prompt 1 — Vectores (2 imágenes)

Genera 2 ilustraciones vectoriales planas, companion pieces de la misma serie, para explicar el concepto de "vector" en R a alguien que nunca ha programado. Fondo azul casi negro `#0a0f1c`. Sin texto largo ni palabras en español dentro de la imagen (como mucho, 2-3 números cortos si ayudan a la composición) — el texto real se agrega después por fuera de la imagen.

**Imagen 1 — "Vector como una fila de cajas":** cuatro cajas o contenedores idénticos, conectados entre sí en una sola fila horizontal (como vagones de un tren o piezas de un mismo objeto), cada uno con un tono ligeramente distinto dentro de la paleta azul/teal, sugiriendo que son cuatro valores pero forman una sola entidad. Composición limpia, centrada, con espacio negativo generoso alrededor.

**Imagen 2 — "Operación vectorizada, todo a la vez":** la misma fila de 4 cajas de la Imagen 1, pero ahora con 4 flechas paralelas idénticas (no una flecha en zigzag ni secuencial) bajando simultáneamente desde las 4 cajas hacia una segunda fila de 4 cajas transformadas (color acento distinto, ej. azul brillante), comunicando visualmente "esto pasa en las 4 posiciones al mismo tiempo, no una tras otra". Evitar cualquier flecha curva o numerada que sugiera secuencia/orden temporal.

---

## Prompt 2 — Tipos de datos

Ilustración vectorial plana, fondo azul casi negro `#0a0f1c`, para explicar que en R cada valor lleva su tipo de dato pegado, como una etiqueta física. Muestra 3 objetos pequeños y distintos (por ejemplo: una forma tipo "moneda o número" en tono ámbar `#f5a623`, una forma tipo "etiqueta de texto" en tono verde `#34d399`, una forma tipo "interruptor de dos posiciones" en tono violeta `#a78bfa`), cada uno con una pequeña etiqueta o tag colgando o adherida (como una etiqueta de equipaje), sugiriendo "numeric", "character" y "logical" sin necesariamente escribir las palabras completas (o con las palabras en tipografía monoespaciada muy discreta si se puede controlar la fuente). Composición horizontal, los tres elementos alineados con espacio uniforme entre ellos, nada de texto largo.

---

## Prompt 3 — Operadores

Ilustración vectorial plana, fondo azul casi negro `#0a0f1c`, dividida en dos mitades claramente diferenciadas (una arriba, una abajo, o una a la izquierda y otra a la derecha):

- **Mitad "aritmética"**: dos formas geométricas simples (representando números) fusionándose o combinándose a través de un símbolo de operación central (ej. un signo menos o más estilizado), y saliendo como una sola forma nueva del mismo tipo — comunica "dos números entran, un número sale".
- **Mitad "comparación"**: dos formas geométricas simples entrando a un símbolo de comparación central (ej. un signo mayor-que estilizado), pero saliendo como un pequeño indicador binario o semáforo de dos estados (verde `#34d399` encendido / apagado), comunicando "dos valores entran, un sí-o-no sale".

Separación visual clara entre ambas mitades (una línea divisoria sutil o un cambio de tono de fondo), pero manteniendo la misma familia visual (mismas formas base, mismo grosor de línea) para que se lean como parte de la misma ilustración.

---

## Cómo usarlas después

Una vez generadas, súbelas a `docs/assets/brand/` con nombres descriptivos (ej. `fpen-vector-estructura.svg`, `fpen-vector-operacion.svg`, `fpen-tipos-datos.svg`, `fpen-operadores.svg`) y avísame — las inserto en las secciones correspondientes de la Guía (Vectores, Tipos de datos, Operadores) junto a los diagramas que ya construí ahí, o en lugar de ellos si el resultado te convence más.
