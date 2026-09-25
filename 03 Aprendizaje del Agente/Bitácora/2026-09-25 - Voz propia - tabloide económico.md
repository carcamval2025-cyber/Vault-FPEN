---
tags: [bitacora]
fecha: 2026-09-25
material: "sitio docs/ completo; Semanas 01 a 05, Control 01 e índice"
tipo: "ajuste de diseño"
---

# 2026-09-25 — Voz propia: tabloide económico

**Contexto:** tras publicar el rediseño en `main`, Carlos lo vio "demasiado copia" de la guía de IDS y pidió una voz propia. Pidió que se le preguntara todo y que se usara la skill de diseño (se usó `impeccable`).

**Cómo se decidió:**

1. **Entrevista.** Carlos eligió la voz "informe económico", pero "algo más extravagante" que The Economist o Bloomberg; fondo de color de marca propio (no papel crema); Schibsted Grotesk + Source Serif 4 + JetBrains Mono; personalizar el vidrio en lugar de quitarlo; y una barra más interactiva con cinta, índice, Ctrl K y lectura.
2. **Prototipos.** Tres prototipos HTML con capturas: A · Tabloide ámbar, B · Gráfico vivo con lupa, C · Cuatro tintas por momento.
3. **Elección.** Carlos eligió A con ajustes y más color, y pidió llevar sí o sí la portada con gráfico y lupa, la cinta, el color por momento y el número gigante.
4. **Brief.** Carlos confirmó el brief.

**Qué se hizo:**

- Reescritura completa de `docs/assets/guia.css`: tokens por tramo, papeles de imprenta, vidrio ahumado, portada y gráfico.
- Nuevos bloques de `guia.js`:
  - cinta de semanas con avance y pausa;
  - índice de la página con tiempo restante;
  - barra de lectura;
  - buscador Ctrl K con `assets/buscar.json`;
  - lupa del gráfico de portada, con teclado y región viva;
  - avance del Control 01 separado entre guía y repaso.
- El generador ahora arma los tramos de color a partir del índice de cada página, pone ids a los ejercicios (para el buscador) y calcula los gráficos de portada con R (`portadas.R`). La portada del índice muestra tu avance por semana.
- Las láminas SVG pasaron a Schibsted Grotesk.
- No se perdió contenido: la ilustración del laboratorio de datos pasó de la portada del índice a la sección "Del código a una decisión".

**Qué funcionó:**

- Mostrar prototipos visuales antes de tocar la guía real: la elección fue rápida y concreta.
- Que el color de fondo signifique algo (el momento de estudio) en lugar de ser decoración.

**Qué no funcionó / qué se ajustó:**

- Una función `leer()` nueva del JS tapaba a la que carga el progreso: se renombró.
- Una URL en variable CSS en un atributo `style` resolvía distinto según la página: se movió al CSS.
- Algunos encabezados de tabla y botones quedaban oscuros sobre papel oscuro en "Practicar": se agregaron tokens `--th-*` y `--btn-*` por tono de papel.
- La lupa tapaba el titular del gráfico: se limitó a no salir del lienzo.

**Ajuste para la próxima vez:**

- Cuando se pida "identidad propia", preguntar primero por la referencia y mostrar prototipos antes de reescribir.
- Revisar cada tramo en tema claro y oscuro: los papeles cambian de tono y los tokens deben seguirlos.

**Relacionado:** [[Registro de Materiales]] · [[Sistema de Diseño - Tema R Notebook]] · [[2026-09-25 - Rediseño Guía FPEN y semanas 02 a 04]]
