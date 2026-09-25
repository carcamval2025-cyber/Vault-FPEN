"""Gráficos de portada (uno por semana) con los datos que calcula portadas.R.
Cada marca de datos es un <g class="dato"> con data-x/data-y (unidades del viewBox), data-val, data-etq y data-nota;
guia.js los usa para mover la lupa. La serie también se exporta como SVG tenue (fondo de los tramos)."""
import json, os, html

AQUI = os.path.dirname(os.path.abspath(__file__))
DATOS = json.load(open(os.path.join(AQUI, "portadas.json"), encoding="utf-8"))
MESES_LARGOS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]


def miles(v):
    """29425 -> '29 425' (espacio fino no separable, solo para cifras de 5 o más dígitos)."""
    s = str(int(v)) if float(v).is_integer() else ("%.1f" % v)
    if len(s.split(".")[0]) >= 5:
        e = s.split(".")[0]
        s = e[:-3] + " " + e[-3:]
    return s


def pct(a, b):
    p = (a / b - 1) * 100
    return ("+" if p >= 0 else "−") + ("%.1f" % abs(p)) + " %"


def esc(x):
    return html.escape(str(x), quote=True)


def dato(i, x, y, val, etq, nota, extra=""):
    return '<g class="dato" data-i="%d" data-x="%.1f" data-y="%.1f" data-val="%s" data-etq="%s" data-nota="%s"%s>' % (
        i, x, y, esc(val), esc(etq), esc(nota), extra)


def ticks_y(W, l, r, Y, vals, fmt=str):
    s = []
    for v in vals:
        s.append('<line class="rejilla" x1="%d" x2="%d" y1="%.1f" y2="%.1f"/>' % (l, W - r, Y(v), Y(v)))
        s.append('<text class="eje" x="%d" y="%.1f" text-anchor="end">%s</text>' % (l - 8, Y(v) + 4.5, fmt(v)))
    return s


def linea(etq, val, ymin, ymax, paso, notas, dest, fmt=str):
    W, H, l, r, t, b = 640, 300, 58, 22, 22, 34
    X = lambda i: l + (W - l - r) * i / (len(val) - 1)
    Y = lambda v: t + (H - t - b) * (1 - (v - ymin) / (ymax - ymin))
    s = ['<svg viewBox="0 0 %d %d" aria-hidden="true" focusable="false">' % (W, H)]
    s += ticks_y(W, l, r, Y, range(ymin, ymax + 1, paso), fmt)
    for i, e in enumerate(etq):
        s.append('<text class="eje-cat" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (X(i), H - 10, esc(e)))
    d = " L".join("%.1f,%.1f" % (X(i), Y(v)) for i, v in enumerate(val))
    s.append('<path class="area" d="M%s L%.1f,%.1f L%.1f,%.1f Z"/>' % (d, X(len(val) - 1), Y(ymin), X(0), Y(ymin)))
    s.append('<path class="serie dibuja" pathLength="1" d="M%s"/>' % d)
    for i, v in enumerate(val):
        s.append(dato(i, X(i), Y(v), fmt(v), etq[i], notas[i]) +
                 '<circle class="%s" cx="%.1f" cy="%.1f" r="%s"/></g>' % ("destacado" if i == dest else "punto", X(i), Y(v), "7.5" if i == dest else "4.5"))
    s.append("</svg>")
    return "\n".join(s), d


def barras(etq, val, ymax, paso, notas, dest, fmt=str):
    W, H, l, r, t, b = 640, 300, 58, 16, 26, 34
    n = len(val)
    ancho = (W - l - r) / n
    Y = lambda v: t + (H - t - b) * (1 - v / ymax)
    s = ['<svg viewBox="0 0 %d %d" aria-hidden="true" focusable="false">' % (W, H)]
    s += ticks_y(W, l, r, Y, range(0, ymax + 1, paso), fmt)
    for i, v in enumerate(val):
        x = l + ancho * i + ancho * .18
        w = ancho * .64
        s.append(dato(i, x + w / 2, Y(v), fmt(v), etq[i], notas[i], ' style="--k:%d"' % i) +
                 '<rect class="%s crece" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/>' % ("destacado" if i == dest else "barra-g", x, Y(v), w, Y(0) - Y(v)) +
                 '<text class="valor" x="%.1f" y="%.1f" text-anchor="middle">%s</text></g>' % (x + w / 2, Y(v) - 8, fmt(v)))
        s.append('<text class="eje-cat" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (x + w / 2, H - 10, esc(etq[i])))
    s.append('<line class="base" x1="%d" x2="%d" y1="%.1f" y2="%.1f"/>' % (l, W - r, Y(0), Y(0)))
    s.append("</svg>")
    serie = " L".join("%.1f,%.1f" % (l + ancho * (i + .5), Y(v)) for i, v in enumerate(val))
    return "\n".join(s), serie


def barras_h(etq, val, xmax, paso, notas, dest, falta_txt="NA"):
    W, fila, l, r, t, b = 640, 27, 196, 52, 12, 30
    n = len(val)
    H = t + fila * n + b
    X = lambda v: l + (W - l - r) * v / xmax
    s = ['<svg viewBox="0 0 %d %d" class="horiz" aria-hidden="true" focusable="false">' % (W, H)]
    for v in range(0, xmax + 1, paso):
        s.append('<line class="rejilla" x1="%.1f" x2="%.1f" y1="%d" y2="%d"/>' % (X(v), X(v), t, H - b + 4))
        s.append('<text class="eje" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (X(v), H - 8, v))
    pts = []
    for i, v in enumerate(val):
        y = t + fila * i + fila * .16
        h = fila * .68
        s.append('<text class="eje-cat" x="%d" y="%.1f" text-anchor="end">%s</text>' % (l - 10, y + h / 2 + 4.5, esc(etq[i])))
        if v is None:
            s.append(dato(i, X(0) + 34, y + h / 2, falta_txt, etq[i], notas[i], ' style="--k:%d"' % i) +
                     '<rect class="falta" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/>' % (X(0) + 1, y, 64, h) +
                     '<text class="falta-txt" x="%.1f" y="%.1f" text-anchor="middle">NA</text></g>' % (X(0) + 33, y + h / 2 + 4.5))
        else:
            s.append(dato(i, X(v), y + h / 2, v, etq[i], notas[i], ' style="--k:%d"' % i) +
                     '<rect class="%s crece-h" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/>' % ("destacado" if i == dest else "barra-g", X(0), y, X(v) - X(0), h) +
                     '<text class="valor" x="%.1f" y="%.1f">%s</text></g>' % (X(v) + 6, y + h / 2 + 4.5, v))
            pts.append((X(v), y + h / 2))
    s.append('<line class="base" x1="%.1f" x2="%.1f" y1="%d" y2="%d"/>' % (X(0), X(0), t - 2, H - b + 4))
    s.append("</svg>")
    serie = " L".join("%.1f,%.1f" % p for p in pts)
    return "\n".join(s), serie


def grafico(semana):
    d = DATOS.get(semana)
    if semana == "s1":
        e, v = d["etq"], d["val"]
        notas = ["mes 1 · punto de partida"] + ["%s · %s sobre el %s" % (e[i], pct(v[i], v[i - 1]), e[i - 1]) for i in range(1, len(v))]
        svg, serie = barras(e, v, 5000, 1000, notas, v.index(max(v)))
        cab = ("Gráfico 1.0", "El mes 4 trae el mayor ingreso del periodo", "Ingresos de una tienda por mes, en USD")
        fuente = "Fuente: el vector <code>ingresos &lt;- c(4200, 4550, 4100, 4800)</code> del playground de esta semana."
        ini = v.index(max(v))
    elif semana == "s2":
        e, v = d["etq"], d["val"]
        notas = ["enero · primer mes del año"] + ["%s · %s sobre %s" % (MESES_LARGOS[i], pct(v[i], v[i - 1]), MESES_LARGOS[i - 1]) for i in range(1, 12)]
        svg, serie = linea(e, v, 150, 325, 50, notas, 11)
        cab = ("Gráfico 2.0", "Las ventas cierran el año con su mejor mes", "Ventas mensuales de una tienda, miles de USD")
        fuente = "Fuente: <code>datos/ventas_mensuales.csv</code>, leído con <code>read_csv()</code>."
        ini = 11
    elif semana == "s3":
        e, v = d["etq"], [round(x) for x in d["val"]]
        base = v[0]
        notas = ["%s · promedio de %d personas%s" % (e[i], d["n"][i], "" if i == 0 else " · %+d USD sobre agro" % (v[i] - base)) for i in range(len(v))]
        svg, serie = barras(e, v, 800, 200, notas, v.index(max(v)))
        cab = ("Gráfico 3.0", "Servicios e industria superan al agro por más de 260 USD al mes", "Salario mensual promedio por sector, USD")
        fuente = "Fuente: <code>datos/salarios.csv</code>, 10 personas por sector; promedios calculados con R."
        ini = v.index(max(v))
    elif semana == "s4":
        e, v, a = d["etq"], d["val"], d["antes"]
        notas = []
        for i in range(len(v)):
            if v[i] is None:
                notas.append("%s · sin dato de 2024 (en 2023 vendió %d)" % (e[i], a[i]))
            else:
                notas.append("%s · %s frente a 2023" % (e[i], pct(v[i], a[i])))
        svg, serie = barras_h(e, v, 2000, 500, notas, 0)
        cab = ("Gráfico 4.0", "Textiles del Norte lidera las ventas de 2024; a Agroexport Lempa le falta el dato", "Ventas 2024 por empresa, miles de USD")
        fuente = "Fuente: <code>datos/empresas.csv</code>, ordenado de mayor a menor; <code>NA</code> marca el dato faltante."
        ini = v.index(None)
    elif semana == "s5":
        e, v = d["etq"], d["val"]
        notas = ["enero · primer mes de 2013"] + ["%s · %s sobre %s" % (MESES_LARGOS[i], pct(v[i], v[i - 1]), MESES_LARGOS[i - 1]) for i in range(1, 12)]
        svg, serie = linea(e, v, 24000, 30000, 2000, notas, v.index(max(v)), fmt=miles)
        cab = ("Gráfico 5.0", "Julio es el mes con más vuelos desde Nueva York", "Vuelos que salieron de los aeropuertos de NYC en 2013, por mes")
        fuente = "Fuente: <code>nycflights13::flights</code>, vuelos contados por mes con R."
        ini = v.index(max(v))
    elif semana == "c1":
        e, v = d["etq"], d["val"]
        notas = ["%s · ingreso %d − costo %d" % (e[i], d["ingreso"][i], d["costo"][i]) for i in range(len(v))]
        svg, serie = barras(e, v, 500, 100, notas, v.index(max(v)))
        cab = ("Gráfico C1", "Edificio A deja la mayor utilidad; Polideportivo, la menor", "Utilidad por punto de venta en 6 días (ingreso menos costo), USD")
        fuente = "Fuente: <code>datos/ventas_campus.csv</code>; sumas por punto calculadas con R."
        ini = v.index(max(v))
    elif semana == "inicio":
        e = ["S1", "S2", "S3", "S4", "S5", "C1"]
        frag = {"S1": ["s1"], "S2": ["s2"], "S3": ["s3"], "S4": ["s4"], "S5": ["s5"], "C1": ["c1g", "c1r"]}
        totales = {k: sum(open(os.path.join(AQUI, "fuentes", f + ".html"), encoding="utf-8").read().count("data-track=") for f in v) for k, v in frag.items()}
        W, H, l, r, t, b = 640, 300, 58, 16, 26, 34
        ancho = (W - l - r) / 6
        Y = lambda p: t + (H - t - b) * (1 - p / 100)
        s = ['<svg viewBox="0 0 %d %d" aria-hidden="true" focusable="false">' % (W, H)]
        s += ticks_y(W, l, r, Y, range(0, 101, 25), lambda p: "%d %%" % p)
        for i, x in enumerate(e):
            xx = l + ancho * i + ancho * .18
            w = ancho * .64
            s.append(dato(i, xx + w / 2, Y(0), "0 %", x, "%s · 0 de %d actividades" % (x, totales[x]),
                          ' data-semana="%s" data-total="%d" data-base="%.1f" data-tope="%.1f" style="--k:%d"' % (x.lower(), totales[x], Y(0), Y(100), i)) +
                     '<rect class="tubo" x="%.1f" y="%.1f" width="%.1f" height="%.1f"/>' % (xx, Y(100), w, Y(0) - Y(100)) +
                     '<rect class="barra-g" x="%.1f" y="%.1f" width="%.1f" height="0"/>' % (xx, Y(0), w) +
                     '<text class="valor" x="%.1f" y="%.1f" text-anchor="middle">0 %%</text></g>' % (xx + w / 2, Y(0) - 8))
            s.append('<text class="eje-cat" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (xx + w / 2, H - 10, x))
        s.append('<line class="base" x1="%d" x2="%d" y1="%.1f" y2="%.1f"/>' % (l, W - r, Y(0), Y(0)))
        s.append("</svg>")
        svg, serie = "\n".join(s), None
        cab = ("Gráfico 0", "Tu avance, semana por semana", "Porcentaje de actividades marcadas en cada guía; el tubo es el total")
        fuente = "Fuente: tu progreso, guardado solo en este navegador."
        ini = 0
    else:
        return None, None
    fig = ('<figure class="graf-portada" data-lupa data-inicial="%d"%s>\n'
           '  <figcaption class="graf-cab"><b><span class="n">%s</span> %s</b><span>%s</span></figcaption>\n'
           '  <div class="graf-lienzo" tabindex="0" role="group" aria-roledescription="gráfico interactivo" aria-label="%s. %s. Usa las flechas izquierda y derecha para recorrer los datos.">\n%s\n  </div>\n'
           '  <p class="graf-lectura sr" aria-live="polite"></p>\n'
           '  <p class="graf-fuente">%s</p>\n'
           '  <p class="graf-ayuda">Pasa el cursor, toca el gráfico o usa ← → para leer cada dato con la lupa.</p>\n'
           '</figure>') % (ini, ' data-progreso-grafico' if semana == "inicio" else "", cab[0], esc(cab[1]), esc(cab[2]), esc(cab[1]), esc(cab[2]), svg, fuente)
    return fig, serie


def serie_svg(serie):
    """SVG de fondo: la serie de la semana, gruesa, para la textura tenue de los tramos (se usa como máscara)."""
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" preserveAspectRatio="none">'
            '<path d="M%s" fill="none" stroke="#000" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/></svg>\n' % serie)
