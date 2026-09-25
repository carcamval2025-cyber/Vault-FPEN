---
tags: [bitacora]
fecha: 2026-09-25
material: "sitio docs/ completo: logo, favicon y barra"
tipo: "ajuste de diseño"
---

# 2026-09-25 — Logo FPEN ▲ y panel Edición

**Contexto:** Carlos pidió darle más voz propia al logo y rediseñar la interfaz de "las tres barritas" (el botón de rayitas y el menú de pantalla completa, heredados de la guía de Python) para que fuera única y más limpia.

**Cómo se decidió:**

1. **Preguntas.** Carlos eligió:
   - un logo con la idea de cotización ("FPEN ▲"), empezando de cero sin conservar nada del logo anterior;
   - un botón "Edición" con un panel en lugar del menú;
   - menos botones en la barra.
2. **Prototipos.** Tres variantes del logo (A superíndice, B etiqueta inclinada, C la N sube), con su favicon a 64, 32 y 16 px, y el panel abierto en escritorio y en celular.
3. **Elección.** Carlos eligió A y aprobó el panel tal como estaba.

**Qué se hizo:**

- Logo **FPEN ▲** en tres versiones: sobre claro, sobre azul noche y sobre ámbar. Favicon SVG y PNG.
- Las letras son trazos generados desde Schibsted Grotesk Black con `herramientas/marca/logo.py`.
- La barra queda con logo, cinta, Buscar y **Edición**.
- El panel Edición baja desde la barra con tres bloques:
  - las doce ediciones con su avance;
  - tu avance total;
  - los ajustes: tema Claro, Oscuro o Sistema (antes solo alternaba) y cinta Corre o Quieta.
- Se retiraron el menú de pantalla completa, el botón de tema, el de pausa y sus íconos.
- La cabecera "FPEN" del índice lleva ahora el triángulo.
- Las pruebas de navegador se adaptaron: abrir el panel, cambiar el tema y la cinta, cerrar con Esc y con clic fuera.

**Qué funcionó:**

- Convertir el texto del logo a trazos: el logo se ve igual como `<img>`, como favicon y sin las fuentes cargadas.
- Mostrar el favicon a 16 px antes de elegir.

**Qué no funcionó / qué se ajustó:**

- `color-mix(in oklch, ámbar, blanco)` daba un tono rosado, porque el blanco no tiene tono en OKLCH: se cambió a `in srgb`. También se corrigió el resaltado de columnas nuevas en las tablas antes → después.
- El nombre de clase `.edicion` chocaba con la cabecera del índice: esa clase pasó a `.edicion-fecha`.
- El botón "Corre" presionado perdía contraste al pasar el cursor: el estado presionado ahora gana siempre.

**Ajuste para la próxima vez:** al introducir una clase genérica nueva, buscarla antes en las fuentes (`grep`) para no chocar con una existente.

**Relacionado:** [[Sistema de Diseño - Tema R Notebook]] · [[2026-09-25 - Voz propia - tabloide económico]] · [[Registro de Materiales]]
