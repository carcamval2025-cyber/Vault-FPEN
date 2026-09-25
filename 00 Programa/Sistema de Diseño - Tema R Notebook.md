---
tags: [programa, diseno, guia-fpen]
---

# Sistema de Diseño — Guía FPEN, voz de tabloide económico (vigente desde el 25 de septiembre de 2026)

> El nombre del archivo se conserva para no romper los enlaces del vault. Historia: el tema "R Notebook" (oscuro, Fraunces + Literata, 4 pestañas) fue reemplazado el 25/09 por un sistema derivado de la guía de IDS; ese mismo día Carlos pidió **una voz propia** y, con la skill de diseño `impeccable`, eligió entre tres prototipos la dirección **"Tabloide ámbar"**, con color por momento de estudio, portada con gráfico y lupa, cinta de semanas y número gigante. Las versiones anteriores de este archivo están en el historial de git.

## La idea

Cada semana es **la edición de un tabloide económico**: portada con número gigante, titular, pregunta orientadora en una franja y un gráfico real de los datos de la semana que se lee con una lupa. Los temas son las noticias y el fondo cambia según el momento de estudio.

## Dónde vive

Todo el diseño está en `docs/assets/` y lo comparten todas las páginas. Una página nueva **no** trae CSS ni JS propios.

| Archivo | Qué hace |
|---|---|
| `guia.css` | Tokens, tramos de color, papeles de imprenta, vidrio ahumado, barra, portada y gráfico, código estilo RStudio, modo oscuro, accesibilidad |
| `guia.js` | Progreso (`localStorage`, clave `fpen-guia-v1`), quizzes, trazas, bloqueo de soluciones, simulacro, **cinta de semanas, índice de la página, barra de lectura, buscador Ctrl K, lupa del gráfico**, menú, tema, láminas SVG incrustadas |
| `ejecutar-r.js` | Ejecutar y Editar código R con webR, bloques previos, CSV, gráficos, tiempo límite |
| `buscar.json` | Índice del buscador: semanas, secciones, ejercicios y funciones de R (cada función en la semana que la enseña). Lo genera el script de construcción |
| `icons/` | Íconos SVG (incluye `buscar`, `pausa`, `reproducir`) |
| `img/` | Láminas SVG; `img/graficos/` tiene los gráficos de resultado hechos con R; `img/serie-*.svg` son las series de cada semana que se ven, tenues, en el fondo |

## Identidad

| Token | Valor | Uso |
|---|---|---|
| Ámbar (`--ambar`) | `oklch(0.83 0.155 76)` | Suelo de la portada y de "Antes de clase", semana actual en la cinta, filo del vidrio |
| Azul noche (`--noche`) | `#111a30` | Tinta, franja de la pregunta, barra, marcos y sombras de imprenta, suelo de "Practicar" |
| Blanco frío (`--frio`) | `oklch(0.982 0.007 255)` | Suelo de "Aprender" (lectura larga) |
| Azul R intenso (`--azul-r`) | `oklch(0.49 0.19 260)` | Suelo de "Proyecto y evaluación" |
| Coral | `--bad` | **Sin IA**, errores, número del gráfico |
| Verde | `--ok` | **IA permitida**, respuestas correctas, avance |
| Violeta | `--violet` | **IA requerida** y proyecto grupal |

- Tipografías: **Schibsted Grotesk** (titulares, cifras, etiquetas y gráficos), **Source Serif 4** (lectura) y **JetBrains Mono** (código, sin ligaduras). Fraunces y Atkinson dejaron de usarse.
- Logo y favicon FPEN en la barra.
- El fondo **no** es papel crema: es color de marca por tramo.

## Tramos (momentos de estudio)

Las secciones de cada página se agrupan según su índice en cuatro tramos, cada uno con su suelo:

| Tramo | Momento | Suelo claro | Suelo oscuro |
|---|---|---|---|
| 1 | Antes de clase | ámbar | azul noche con acentos ámbar |
| 2 | Aprender | blanco frío | azul noche profundo |
| 3 | Practicar | azul noche (papeles oscuros, sombra ámbar) | casi negro |
| 4 | Proyecto y evaluación | azul R intenso (papeles blancos) | azul R nocturno |

Cada tramo abre con un rótulo grande ("Momento 2 de 4 · Aprender"). En el índice del sitio los tramos son "La guía", "Cómo estudiar" y "El curso". Detrás del texto corre, muy tenue, la serie de datos de la semana (la misma del gráfico de portada), que el vidrio desenfoca.

## Componentes

- **Barra** en azul noche:
  - **cinta de semanas**: cada semana cotiza su avance ("S2 ▲ 42 %"). Corre despacio, se detiene con el cursor, con el foco o con el botón de pausa (que se recuerda), y queda quieta con "reducir movimiento";
  - **índice de la página**: muestra la sección actual (§ n/total), su momento y el tiempo de lectura restante, y se despliega para saltar;
  - **buscador Ctrl K**; tema claro u oscuro; menú a pantalla completa;
  - **barra de lectura** ámbar.
- **Portada**:
  - número de semana gigante, rótulo inclinado, titular y entrada;
  - **sello** circular con la evaluación;
  - **pregunta orientadora** en franja azul noche con subrayado ámbar;
  - **gráfico de portada** (ver abajo) y **ficha de la edición**: lectura, proyecto, evaluación, ciclo de datos y avance.
- **Papeles de imprenta**: cajas, ejercicios, quiz, tablas, láminas, ventanas de código. Llevan marco de 2 px y sombra sólida desplazada, sin desenfoque. Nada de bordes laterales de color.
- **Vidrio ahumado** (azul noche translúcido con filo ámbar) solo en "En palabras simples", la nota de la lupa, el índice desplegable y el buscador. Con `prefers-reduced-transparency` pasa a sólido.
- **Código como en RStudio**: pestaña `.R` con filo ámbar, etiqueta R, Editar, Ejecutar, Copiar y números de línea. La salida es el panel **Console**.
- **Láminas** numeradas automáticamente ("Lámina 3 ·"), con Schibsted Grotesk y JetBrains Mono.
- **Se mantienen sin cambios de comportamiento**:
  - la caja "En palabras simples" y el ciclo pregunta → verificación;
  - control de lectura, trazas, ejercicios rápidos y ejercicios con etiqueta de IA;
  - cuadro de respuesta con solución bloqueada, problemas tipo examen y simulacro;
  - antes → después, defensa, lista "puedo…", cheat sheet y navegación entre semanas.

## Gráfico de portada con lupa

- Cada semana tiene uno, con datos reales calculados con R (`portadas.R` en el script de construcción):
  - S1: el vector `ingresos`;
  - S2: `ventas_mensuales.csv`;
  - S3: salario promedio por sector;
  - S4: ventas 2024 por empresa, con el `NA` marcado;
  - S5: vuelos por mes de `nycflights13`;
  - C1: utilidad por punto de `ventas_campus.csv`;
  - índice: tu avance por semana.
- Titular con la conclusión ("Gráfico 2.0 · Las ventas cierran el año con su mejor mes"), subtítulo con unidades y fuente al pie.
- La lupa es un clon del gráfico aumentado 2.2 veces dentro de un círculo. Se mueve con el cursor, al tocar o con las flechas ← → (Inicio y Fin también), y una región viva lee el dato.

## Código R en la página

- Bloque: `<pre data-file="nombre.R"><code class="language-r">…</code></pre>`; su salida, `<pre class="salida"><code>…</code></pre>` inmediatamente después.
- `data-previo="id"` ejecuta antes otro bloque; `data-archivos="../datos/x.csv"` deja el archivo en `datos/x.csv`; `data-norun` para fragmentos ilustrativos.
- **Toda salida mostrada debe salir de ejecutar el código de verdad.** Lo mismo vale para los números de los gráficos de portada.

## Higiene que sigue vigente

- Cero guiones largos (—) en el texto visible.
- `prefers-reduced-motion`: sin animaciones; la cinta queda quieta y el botón de pausa se oculta. `prefers-reduced-transparency`: vidrio sólido y sin serie de fondo.
- Contenido visible sin depender de animaciones (no hay revelado al hacer scroll).
- Elementos interactivos nativos y accesibles por teclado (`button`, `details`, `dialog`); el gráfico de portada es enfocable.
- Contraste AA en ambos temas y en los cuatro tramos; ancho de línea de la prosa limitado a 68ch.
- Sin scroll horizontal a 390 px; tablas, código y láminas se desplazan dentro de su contenedor, y la lupa no sale del gráfico.

## Checklist antes de publicar una página

1. Ejecutar todos los bloques de R y comparar con las salidas de la página; recalcular `portadas.R` si cambian los datos.
2. Revisar ids duplicados, anclas rotas, archivos inexistentes y que los SVG sean XML válido.
3. Con Playwright:
   - sin scroll horizontal a 390 y 1280 px y sin errores de JavaScript;
   - quizzes y trazas dan "correcto" con las soluciones;
   - Ejecutar y Editar funcionan;
   - el índice salta, Ctrl K encuentra y navega, la lupa responde a las flechas y la cinta se pausa.
4. Progresión estricta: nada de una semana posterior, salvo marcado como adelanto opcional.
5. Registrar el resultado en `Registro de Materiales.md` y en la bitácora.

## Notas relacionadas

[[Programa General]] · [[Política de IA]] · [[Patrones que Funcionan Bien]] · [[Errores Comunes a Evitar]] · [[Registro de Materiales]]
