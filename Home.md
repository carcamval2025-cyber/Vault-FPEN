
---
tags: [inicio, moc]
aliases: [Home, Índice, Inicio]
banner: "![[home.svg]]"
---

# Vault FPEN

**Repositorio:** [github.com/carcamval2025-cyber/Vault-FPEN](https://github.com/carcamval2025-cyber/Vault-FPEN) (público) — versionado desde el 25 de agosto de 2026.

Base de conocimiento persistente para **Fundamentos de Programación para Economía y Negocios** (ESEN · Ciclo III/2026 · catedrático Alvin Javier Portillo Tiliano) y para el trabajo conjunto entre Carlos Navas y Claude en la creación de materiales de estudio (guías, laboratorios, playgrounds de R y cheat sheets en HTML).

Este vault no reemplaza al Proyecto de Claude — el Proyecto sigue siendo la fuente de las instrucciones maestras y el lugar donde se generan los archivos `.html`. Este vault es la **memoria de largo plazo alrededor de ese trabajo**: qué dice el programa, qué se ha construido, qué funcionó, qué no, y qué se ajustó. Se abre en Obsidian junto al Proyecto, no en su lugar.

> [!info] ¿Usas Antigravity, Codex u otro agente que no sea Claude?
> Este vault también tiene [`AGENTS.md`](AGENTS.md) en la raíz — la misma orientación que esta nota, pero en markdown plano sin wikilinks ni Dataview, para que cualquier agente de IA la lea sin depender de plugins de Obsidian.

## Por qué existe

Cada sesión de Claude en el Proyecto empieza sin memoria de las sesiones anteriores más allá de lo que el documento maestro y el propio Proyecto contienen. Ese documento fija las reglas *a priori* (qué no hacer, qué badges usar, qué función no adelantar), pero no acumula lo que se **aprende haciendo**: qué analogía funcionó con Carlos, qué ejercicio quedó demasiado fácil, qué parte del tema de diseño hay que vigilar semana a semana. Este vault existe para cerrar ese ciclo: → [[Bitácora de Aprendizaje]].

La regla que gobierna todo el curso también gobierna este vault:

> ¿Qué queríamos saber? ¿Qué hicimos para averiguarlo? ¿Cómo sabemos que el resultado es correcto?

## Mapa del vault

- **[[Programa General]]** — contexto del curso, catedrático, horario, evaluación, entorno de trabajo
- **[[Mapa Curricular]]** — las 12 semanas, con enlace directo a cada nota semanal
- **[[Evaluación y Rúbricas]]** — pesos, reglas de tardanza, reglamento de proyecto grupal
- **[[Política de IA]]** — los 3 niveles (Sin IA / IA permitida / IA requerida) y cuándo aplica cada uno
- **[[Proyecto Grupal]]** — entregables, fases sugeridas, formato de registro de uso de IA, banco de preguntas de defensa
- **[[Sistema de Diseño - Tema R Notebook]]** — paleta, tipografía, componentes obligatorios del tema visual
- **01 Semanas/** — una nota por semana (`Semana 01` … `Semana 12`), cada una con su propio contenido, funciones nuevas permitidas y estado del material
- **02 Referencias/** — notas-resumen de los documentos originales de la carpeta del curso (programa oficial, guía de instalación de R)
- **[[Bitácora de Aprendizaje]]** — registro cronológico de qué funcionó y qué no en cada sesión de creación de materiales
- **[[Errores Comunes a Evitar]]** — checklist viva de errores, tanto los anticipados por el documento maestro como los observados en la práctica
- **[[Patrones que Funcionan Bien]]** — lo contrario: qué repetir porque dio buen resultado
- **[[Feedback de Carlos]]** — comentarios de Carlos sobre los materiales, en sus propias palabras
- **[[Registro de Materiales]]** — tabla de seguimiento de cada archivo `.html` generado, su estado y sus notas asociadas
- **05 Plantillas/** — plantillas para nota semanal, entrada de bitácora y revisión de material

## Cómo se usa este vault en el flujo de trabajo

1. **Antes de pedir un material a Claude**: abre la nota de la semana correspondiente (`01 Semanas/Semana NN`), revisa [[Errores Comunes a Evitar]] y la entrada más reciente de [[Bitácora de Aprendizaje]] para no repetir un ajuste que ya se hizo antes. Si vas a pedirle a Claude que lea este vault antes de generar el material, dile explícitamente qué notas debe revisar.
2. **Durante la revisión del material generado**: usa la [[Plantilla - Revisión de Material]] para evaluarlo contra las reglas del documento maestro.
3. **Después de la sesión**: registra el resultado en [[Registro de Materiales]], añade una entrada en [[Bitácora de Aprendizaje]] con la [[Plantilla - Entrada de Bitácora]], y si hubo un error nuevo o un patrón que funcionó, súmalo a [[Errores Comunes a Evitar]] o [[Patrones que Funcionan Bien]].
4. **Cuando Carlos da feedback directo** (verbal, por chat, o corrigiendo algo a mano), se registra tal cual en [[Feedback de Carlos]] — sin traducirlo a conclusiones todavía. Las conclusiones y ajustes derivados de ese feedback van en la Bitácora.

## Panel de estado (requiere el plugin Dataview)

```dataview
TABLE estado AS "Estado del material", fase_proyecto AS "Fase del proyecto"
FROM "01 Semanas"
SORT numero ASC
```

```dataview
TABLE fecha AS "Fecha", material AS "Material", tipo AS "Tipo"
FROM "03 Aprendizaje del Agente/Bitácora"
SORT fecha DESC
LIMIT 5
```

> Si no tienes instalado el plugin comunitario **Dataview**, estos dos bloques se muestran como texto sin formato — no rompen nada, simplemente no se actualizan solos. El resto del vault funciona igual sin el plugin.

## Complementos instalados

Confirmado 2026-08-25: Dataview, Homepage, Banners, Folder Notes e Iconize instalados en este vault (ver `.obsidian/community-plugins.json`). Cómo está aprovechado cada uno:

- **Dataview** — ya en uso en los paneles de esta nota, en [[Bitácora de Aprendizaje]], [[Feedback de Carlos]] y [[Registro de Materiales]].
- **Homepage** — su valor por defecto (`value: "Home"`, `openOnStartup: true`) ya coincide con el nombre de esta nota, así que no debería requerir configuración manual. Si al abrir el vault no abre esto automáticamente, confirma en *Configuración → Homepage* que la nota seleccionada sea `Home`.
- **Banners** — Home, [[Mapa Curricular]], [[Programa Oficial (ESEN)]], [[Bitácora de Aprendizaje]] y [[Registro de Materiales]] ya tienen un banner SVG en `assets/banners/` (paleta del tema, sin emojis). El resto de notas no lleva banner a propósito — ponerlo en cada nota semanal sería ruido visual, no señal.
- **Folder Notes** — no se preconfiguró automáticamente: la ubicación/nombre por defecto de este plugin no se pudo confirmar con certeza desde aquí, y ese plugin tiene un bug conocido si se usa "Rename existing folder notes" después de cambiar el patrón de nombre (ver issue #141 del repo). Si quieres que una carpeta abra directamente una nota al hacer clic, la forma segura es: clic derecho sobre la carpeta → crear/asignar nota de carpeta desde la propia UI del plugin, y mover el contenido de la nota-índice correspondiente ahí a mano (candidatas naturales: [[Bitácora de Aprendizaje]] para `Bitácora/`, [[Feedback de Carlos]] para `Feedback/`, [[Registro de Materiales]] para `04 Materiales Generados/`).
- **Iconize** — sin configurar automáticamente (su archivo de datos no existía todavía). Sugerencia de íconos Lucide (nativos de Obsidian, sin emoji) si quieres asignarlos a mano vía clic derecho → cambiar ícono: `00 Programa` → `book-open`; `01 Semanas` → `calendar-days`; `02 Referencias` → `library`; `03 Aprendizaje del Agente` → `brain`; `04 Materiales Generados` → `clipboard-list`; `05 Plantillas` → `layout-template`.

## Estado actual (26 de agosto de 2026)

Ya existe el primer material `.html` del curso — **[[Semana 01]]**, estado `borrador`, pendiente de revisión por Carlos. Es el estándar de calidad de referencia del vault (ver [[Sistema de Diseño - Tema R Notebook]] y [[Registro de Materiales]]); cualquier sesión nueva se compara contra ese archivo antes de darse por terminada. Detalle de cómo se construyó → [[2026-08-26 - Primer material HTML (Semana 01)]].
