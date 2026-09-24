---
tags: [bitacora]
fecha: 2026-08-25
material: "vault"
tipo: "ajuste"
---

# 2026-08-25 — Vault subido a GitHub

**Contexto:** Carlos pidió subir el vault a GitHub para tener versionado.

**Qué se hizo:**
- Se inicializó git dentro de `Vault FPEN/` en su Mac (vía el puente al dispositivo, sin necesitar red — `git init`/`add`/`commit` no la requieren), con un `.gitignore` que ignora el estado de UI de Obsidian y el código descargable de los plugins, conservando la configuración real (`data.json`) de cada uno.
- Se descubrió que ni el canal remoto hacia el Mac de Carlos ni este contenedor en la nube pueden autenticar como la cuenta personal de Carlos en GitHub: el Mac tiene github.com bloqueado a nivel de proxy de red (`blocked-by-allowlist`), y el contenedor en la nube tiene su propio proxy de salida que fuerza una identidad de GitHub fija distinta a la de Carlos, sin importar qué token se le pase.
- Se dejó el repositorio local completamente listo (commit + remoto `origin` apuntando a `https://github.com/carcamval2025-cyber/Vault-FPEN.git`) y se le devolvieron a Carlos solo los pasos finales para ejecutar desde su propia Terminal (fuera del entorno de Claude), donde sí tiene salida a internet normal.
- Carlos creó el repo vacío en GitHub, borró un `.git/HEAD.lock` que quedó atascado (Claude no pudo borrarlo por permisos del puente al dispositivo) y ejecutó `git push -u origin master` — **funcionó al primer intento**.

**Qué funcionó:**
- Diagnosticar la restricción de red *antes* de insistir en automatizarlo todo, y pasar la última milla a Carlos con instrucciones exactas de copiar/pegar, en vez de seguir intentando rodear una restricción de seguridad real.
- Preparar el commit y el remoto de antemano redujo el trabajo de Carlos a "crear repo vacío + un `git push`".

**Qué no funcionó / qué se ajustó:**
- Un intento de usar un token de GitHub que Carlos pegó en el chat no funcionó desde el contenedor en la nube (el proxy de salida lo ignoró y mantuvo su propia identidad) — quedó claro que ese token solo sirve desde el propio equipo de Carlos, nunca desde este entorno.
- `git commit` a través del puente al dispositivo dejó un `.git/HEAD.lock` huérfano porque ese canal no puede borrar archivos por defecto — el commit igual se completó bien (`git fsck` limpio), pero el lock bloqueaba operaciones futuras hasta que Carlos lo borró a mano.

**Ajuste para la próxima vez:** si se necesita hacer más de un `git commit` a través del puente al dispositivo, avisar de entrada que puede quedar un `HEAD.lock` huérfano y dar el comando para borrarlo junto con el resto de instrucciones, en vez de descubrirlo después. Y nunca intentar autenticar con un token pegado en el chat desde el contenedor en la nube — su proxy de salida a GitHub no lo respeta.

**Relacionado:** [[Home]] · [[2026-08-25 - Configuración de complementos de Obsidian]]
