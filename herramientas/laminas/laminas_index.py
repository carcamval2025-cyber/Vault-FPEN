from svg import Lamina, C
L = Lamina("ruta-ciclo", 760, 300, "Ruta de las 12 semanas del ciclo: el temario del Control 01 cubre las semanas 1 a 3, el primer examen parcial es en la semana 6 y el segundo en la semana 12; el proyecto grupal avanza en fases desde la semana 1 hasta la 11.")
L.text(20, 28, "Ruta del ciclo III/2026", "t")
x0, paso = 74, 58
L.linea("M%g 120 H %g" % (x0, x0 + 11 * paso), C["boxs"], 3)
fases = {1: "equipo y tema", 2: "conocer la base", 3: "preparar", 4: "preparar", 5: "resumir", 7: "reestructurar", 8: "combinar", 9: "automatizar", 10: "explorar", 11: "cierre"}
for i in range(12):
    n = i + 1
    x = x0 + i * paso
    parcial = n in (6, 12)
    guia = n <= 5
    fill = C["corals"] if parcial else (C["ambers"] if guia else "#ffffff")
    stroke = C["coral"] if parcial else (C["amberk"] if guia else C["line"])
    L.add('<circle cx="%g" cy="120" r="19" fill="%s" stroke="%s" stroke-width="2"/>' % (x, fill, stroke))
    L.text(x, 125.5, str(n), "t", "middle", C["coral"] if parcial else C["ink"], 15)
    if parcial:
        L.text(x, 162, "Parcial %s" % ("I" if n == 6 else "II"), "b", "middle", C["coral"], 12)
    elif n in fases:
        L.add('<rect x="%g" y="150" width="8" height="8" rx="2" fill="%s"/>' % (x - 4, C["violet"]))
        L.add('<text x="%g" y="176" text-anchor="end" transform="rotate(-40 %g 176)" class="s" style="font-size:11px;fill:%s">%s</text>' % (x + 4, x + 4, C["violet"], fases[n]))
L.rect(x0 - 26, 60, 2 * paso + 52, 30, C["blues"], C["blue"], 15, 1.4)
L.text(x0 + paso, 80, "temario del Control 01", "b", "middle", C["blue"], 12)
for x, tipo, t in ((26, "g", "semana con guía publicada"), (236, "p", "examen parcial"), (380, "f", "fase del proyecto grupal (sugerida)")):
    if tipo == "g":
        L.add('<circle cx="%g" cy="258" r="7" fill="%s" stroke="%s" stroke-width="2"/>' % (x, C["ambers"], C["amberk"]))
    elif tipo == "p":
        L.add('<circle cx="%g" cy="258" r="7" fill="%s" stroke="%s" stroke-width="2"/>' % (x, C["corals"], C["coral"]))
    else:
        L.add('<rect x="%g" y="253" width="10" height="10" rx="2" fill="%s"/>' % (x - 5, C["violet"]))
    L.text(x + 14, 262, t, "s")
L.text(20, 286, "El segundo control se anuncia con anticipación; su fecha no está fija en el programa.", "s")
L.guardar()
