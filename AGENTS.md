# AGENTS.md — Vault FPEN

Este archivo es el punto de entrada agnóstico de herramienta: cualquier agente de IA
(Claude, Antigravity, Codex, Cursor, Aider, etc.) que abra esta carpeta debe leerlo
primero. A diferencia de `Home.md` (pensado para Obsidian: usa `[[wikilinks]]`,
banners y bloques Dataview que solo se renderizan con esos plugins), este documento
usa únicamente markdown plano y rutas de archivo relativas, para que funcione igual
sin Obsidian.

## Qué es esto

Base de conocimiento persistente para **Fundamentos de Programación para Economía y
Negocios** (ESEN, Ciclo III/2026, Secciones 1 y 2, catedrático Alvin Javier Portillo
Tiliano — aportillo@esen.edu.sv). Estudiante: Carlos Navas, primer curso de
programación, nunca ha usado R ni RStudio antes de este curso.

**Las instrucciones maestras completas del curso viven en un Claude Project separado,
no en este repositorio.** Este vault es la memoria de largo plazo alrededor de ese
trabajo (qué dice el programa, qué se ha construido, qué funcionó, qué no) — ver
`Home.md` para el detalle de por qué existe. Un agente sin acceso a ese Project no
puede leer las instrucciones maestras directamente; las reglas que sí importan para
no romper nada están resumidas más abajo y en `00 Programa/`. Ante cualquier duda,
es mejor preguntar al usuario que inventar contenido nuevo.

## Reglas que nunca se rompen (independientes del Project)

1. **Progresión estricta**: nunca usar en una semana una función de R que se enseña
   en una semana posterior (ver la secuencia completa en `00 Programa/Mapa
   Curricular.md` y el detalle semana a semana en `01 Semanas/`). Un adelanto, si es
   necesario, se marca explícitamente como "adelanto opcional", nunca como parte de
   un ejercicio evaluado.
2. **Nunca inventar contenido de R4DS** (número de página, contenido específico de
   capítulo) si no existe un extracto real en `02 Referencias/`. Sin ese extracto, se
   trabaja a nivel conceptual.
3. **Cada actividad evaluada debe declarar su nivel de IA** (Sin IA / IA permitida /
   IA requerida — colores semánticos fijos en `00 Programa/Política de IA.md`: coral,
   verde, violeta respectivamente). La ausencia de etiqueta no es válida.
4. Analogías y ejemplos siempre conectados a economía/negocios (crecimiento,
   ingresos, costos, ventas, empleo, precios, indicadores) — nunca ejemplos
   genéricos sin relación económica.
5. Cualquier página de la guía debe usar los componentes compartidos de `docs/assets/`
   (`guia.css`, `guia.js`, `ejecutar-r.js`) y seguir
   `00 Programa/Sistema de Diseño - Tema R Notebook.md` (desde el 2026-09-25 describe el
   sistema vigente, "Guía FPEN" con voz de tabloide económico: color por momento de estudio,
   portada con gráfico y lupa, cinta de semanas, índice y buscador Ctrl K; el tema
   "R Notebook" quedó reemplazado). No inventar una
   paleta ni tipografía nueva ni copiar CSS suelto en una página: los cambios de diseño
   van en `docs/assets/`.
6. Antes de generar cualquier material, preguntar si hay ambigüedad.

## Estructura de carpetas

- `00 Programa/` — contexto del curso, mapa curricular (12 semanas), evaluación y
  rúbricas, política de IA, proyecto grupal, sistema de diseño vigente
  (`Sistema de Diseño - Tema R Notebook.md`, que hoy describe la Guía FPEN).
- `01 Semanas/` — una nota por semana (`Semana 01` … `Semana 12`), con su propio
  contenido, funciones nuevas permitidas y estado del material.
- `02 Referencias/` — notas-resumen de los documentos originales del curso (programa
  oficial, guía de instalación de R, extractos de R4DS). `Fuentes/` contiene los
  documentos originales mismos (`.docx`, capturas) que esas notas resumen.
- `03 Aprendizaje del Agente/` — `Bitácora de Aprendizaje.md` (registro cronológico de
  qué funcionó y qué no), `Errores Comunes a Evitar.md`, `Patrones que Funcionan
  Bien.md`, `Feedback de Carlos.md`. Revisar antes de generar material nuevo.
- `04 Materiales Generados/Registro de Materiales.md` — tabla de seguimiento de cada
  `.html` generado, su estado y notas asociadas.
- `05 Plantillas/` — plantillas de nota semanal, entrada de bitácora y revisión de
  material.
- `06 Código R/` — código de R propio de Carlos (scripts de cada sesión de clase);
  `Entregas/` contiene las guías/entregas ya resueltas y evaluadas.
- `assets/banners/` — SVGs de banner para Obsidian (no relevantes fuera de Obsidian).
- `docs/` — sitio estático publicado en GitHub Pages (índice + `semana-NN/index.html`
  por semana disponible + `control-01/guia/` y `control-01/repaso/`). `docs/assets/` tiene
  el CSS, el JS, los íconos, las láminas SVG (`img/`) y los gráficos (`img/graficos/`);
  `docs/datos/` tiene los CSV de práctica. Repo: `github.com/carcamval2025-cyber/Vault-FPEN`
  (público), Pages sirve desde `main`, carpeta `/docs`. Descripción completa en `README.md`.
- `herramientas/` — de dónde sale `docs/`: `fuentes/` (contenido de cada página),
  `paginas.py` (portada e índice de cada página), `gen.py` (genera las páginas),
  `portadas.R` (datos de los gráficos de portada), láminas y verificadores. **No editar
  `docs/*/index.html` a mano**: se cambia la fuente y se regenera. Ver
  `herramientas/README.md`.

## Formato del material de cada sesión (resumen — la fuente completa es el Claude Project)

Una página por semana en `docs/semana-NN/index.html` (una sola página larga, sin
pestañas), con este orden: cómo usar la guía, qué puedes usar / todavía no, lecturas,
control de lectura (quiz), temas (cada uno abre con "En palabras simples" y se resuelve
con el ciclo pregunta → exploración → implementación → resultado → interpretación →
verificación), tablas de traza, ejercicios (cada uno con su etiqueta de nivel de IA,
cuadro de respuesta y solución desplegable; el laboratorio de 5 ejercicios va aquí),
playground cuando aplique, práctica intensiva (ejercicios rápidos + 3 problemas tipo
examen con casos de prueba y solución), proyecto (fase + preguntas de defensa), lista
"puedo…", cheat sheet y fuentes. Los bloques de R se ejecutan con webR; toda salida
mostrada debe salir de ejecutar el código de verdad (también los números del gráfico de
portada). Las secciones se agrupan en cuatro tramos de color según el índice de la página
(antes de clase, aprender, practicar, proyecto y evaluación). El estándar de referencia es
`docs/semana-01/index.html`. Los `.html` de `04 Materiales Generados/` son las versiones
anteriores (tema R Notebook) y se conservan como archivo.

## Cómo trabajar aquí

1. Antes de generar material de una semana: leer la nota de esa semana en
   `01 Semanas/`, `Errores Comunes a Evitar.md` y la entrada más reciente de
   `Bitácora de Aprendizaje.md`.
2. Si falta un dato del programa o una lectura de R4DS, preguntar al usuario — nunca
   asumir ni inventar.
3. Después de generar: registrar el resultado en `Registro de Materiales.md` y una
   nueva entrada en `03 Aprendizaje del Agente/Bitácora/` (misma plantilla que las
   existentes).
4. Para cambiar o crear páginas de la guía, editar `herramientas/fuentes/` y
   `herramientas/paginas.py`, y regenerar con `python3 herramientas/gen.py`.
5. Si el material incluye HTML, verificar contra el checklist de
   `00 Programa/Sistema de Diseño - Tema R Notebook.md` antes de darlo por terminado:
   salidas de R comparadas con R real, ids y anclas, SVG válidos, sin scroll horizontal
   a 390 y 1280 px y sin errores de JavaScript.

## Ver también (rutas de archivo, no wikilinks)

- `Home.md` — mapa del vault pensado para Obsidian (con Dataview).
- `00 Programa/Sistema de Diseño - Tema R Notebook.md`
- `00 Programa/Mapa Curricular.md`
- `03 Aprendizaje del Agente/Bitácora de Aprendizaje.md`
