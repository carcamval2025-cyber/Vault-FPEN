---
tags: [bitacora, moc]
banner: "![[aprendizaje.svg]]"
---

# Bitácora de Aprendizaje

Registro cronológico de qué funcionó y qué no en cada sesión de trabajo sobre este Proyecto — creación de materiales, revisión, o ajustes al propio vault. Cada entrada es una nota individual dentro de `03 Aprendizaje del Agente/Bitácora/`, nombrada `AAAA-MM-DD - Título breve.md`, construida con la [[Plantilla - Entrada de Bitácora]].

## Por qué entradas separadas y no un solo archivo

Cada entrada como nota propia (en vez de una sola bitácora gigante) permite que el panel de [[Home]] liste automáticamente las más recientes con Dataview, y que [[Errores Comunes a Evitar]] y [[Patrones que Funcionan Bien]] puedan enlazar hacia la entrada exacta donde se observó algo, sin tener que buscar dentro de un archivo cada vez más largo.

## Cuándo se agrega una entrada

- Después de generar un material nuevo (Guía/Laboratorio/Playground/Cheat Sheet de una semana).
- Después de revisar un material ya generado, con la [[Plantilla - Revisión de Material]].
- Cuando se ajusta algo del propio vault (como esta primera entrada).
- Cuando Carlos da feedback que lleva a un cambio concreto — la entrada de bitácora enlaza al feedback en `Feedback/`, pero no lo repite palabra por palabra ahí (eso vive en [[Feedback de Carlos]]).

## Todas las entradas

```dataview
TABLE fecha AS "Fecha", material AS "Material", tipo AS "Tipo"
FROM "03 Aprendizaje del Agente/Bitácora"
SORT fecha DESC
```

## Notas relacionadas

[[Home]] · [[Errores Comunes a Evitar]] · [[Patrones que Funcionan Bien]] · [[Feedback de Carlos]] · [[Plantilla - Entrada de Bitácora]]
