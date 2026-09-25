---
tags: [aprendizaje, feedback, moc]
---

# Feedback de Carlos

Comentarios de Carlos sobre los materiales generados o sobre el propio vault, **en sus propias palabras** — sin traducirlos todavía a conclusiones o ajustes (eso se hace después, en una entrada de [[Bitácora de Aprendizaje]] que enlaza de vuelta aquí). Mantener esta nota como una fuente de "lo que dijo Carlos", separada de "lo que Claude decidió hacer con eso" evita que el feedback real se diluya en la interpretación.

## Por qué separado de la Bitácora

La Bitácora es la reflexión de Claude sobre qué funcionó y qué no — necesariamente ya interpretada. Esta nota es lo más cercano posible a una transcripción de lo que Carlos dijo. Cuando algo aquí lleva a un cambio, la entrada de Bitácora correspondiente cita esta nota (o la entrada individual dentro de `Feedback/`), no al revés.

## Cómo se registra una entrada nueva

Cada comentario sustancial de Carlos (verbal, por chat, o corrigiendo un material a mano) se agrega como una nota individual en `03 Aprendizaje del Agente/Feedback/`, nombrada `AAAA-MM-DD - Tema breve.md`, con esta forma mínima:

```
---
tags: [feedback]
fecha: AAAA-MM-DD
material: "[semana o parte del vault a la que se refiere]"
---

# AAAA-MM-DD — [Tema breve]

**Lo que dijo Carlos:** (cita o paráfrasis cercana, no interpretada)

**Contexto:** (qué material o situación lo provocó)

**Acción tomada:** (enlazar a la entrada de Bitácora si ya se procesó; dejar "pendiente" si no)
```

## Todas las entradas

```dataview
TABLE fecha AS "Fecha", material AS "Material"
FROM "03 Aprendizaje del Agente/Feedback"
SORT fecha DESC
```

## Estado actual

Ya existe feedback directo. Entrada más reciente: [[2026-09-25 - Voz propia del diseño aprobada]] (la guía con voz de tabloide económico quedó aprobada: "Está a otro nivel ahora"). Anterior: [[2026-08-26 - Aprobación de identidad visual FPEN]]. El historial completo se mantiene en `03 Aprendizaje del Agente/Feedback/`.

## Notas relacionadas

[[Home]] · [[Bitácora de Aprendizaje]] · [[Errores Comunes a Evitar]] · [[Patrones que Funcionan Bien]]
