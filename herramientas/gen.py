"""Genera las páginas de docs/ a partir de fragmentos de contenido (voz "tabloide económico").
Uso: python3 herramientas/gen.py [nombre ...]   (sin argumentos genera todas, más assets/buscar.json y las series de fondo)
Cada fragmento (herramientas/fuentes/<nombre>.html) trae solo las <section> de la página; este script pone la barra
(cinta de semanas, índice de la página, lectura), la portada con su gráfico, los tramos de color por
momento de estudio, el pie y los scripts, iguales en todas las páginas."""
import sys, os, re, html, json

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
from rutas import DOCS, FUENTES as DIR_FUENTES  # noqa: E402
from portadas import grafico, serie_svg  # noqa: E402

FUENTES = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
           '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
           '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700'
           '&family=Schibsted+Grotesk:wght@400..900'
           '&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..800;1,8..60,300..800&display=swap" rel="stylesheet">')
TEMA = '<script>try{var t=localStorage.getItem("fpen-guia-v1-tema");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>'
PRISM = ('<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>\n'
         '<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-r.min.js"></script>\n'
         '<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>')

SEMANAS_CON_GUIA = {1: "semana-01", 2: "semana-02", 3: "semana-03", 4: "semana-04", 5: "semana-05"}
CORTOS = ["R para pensar", "Valores a datos", "Visualizar", "Transformar", "Pipe y verbos", "Parcial I",
          "Datos tidy", "Combinar tablas", "Automatizar", "Explorar", "R con IA", "Parcial II"]
CICLO = ["importar", "ordenar", "transformar", "visualizar", "modelar", "comunicar"]
NOMBRES_TRAMO = {1: "Antes de clase", 2: "Aprender", 3: "Practicar", 4: "Proyecto y evaluación"}


def cinta(raiz, actual):
    items = []
    for n in range(1, 13):
        if n in SEMANAS_CON_GUIA:
            cur = ' aria-current="page"' if actual == "s%d" % n else ""
            items.append('<a class="tk" href="%s%s/index.html" data-tk="s%d"%s><b>S%d</b><span class="tk-tit">%s</span><span class="tk-pct" data-estado="cero">■ 0 %%</span></a>'
                         % (raiz, SEMANAS_CON_GUIA[n], n, cur, n, CORTOS[n - 1]))
        else:
            items.append('<span class="tk futura" title="Semana %d: sin guía todavía"><b>S%d</b><span class="tk-tit">%s</span><span class="tk-pct">sin guía</span></span>' % (n, n, CORTOS[n - 1]))
        if n == 3:  # el Control 01 va después de la semana 3, como en el temario
            cur = ' aria-current="page"' if actual == "c1" else ""
            items.append('<a class="tk" href="%scontrol-01/guia/index.html" data-tk="c1" data-control="Control 01: lectura, repaso y simulacro"%s><b>C1</b><span class="tk-tit">Control 01</span><span class="tk-pct" data-estado="cero">■ 0 %%</span></a>' % (raiz, cur))
    return "\n        ".join(items)


def indice(p):
    """Fila del índice de la página + panel desplegable con los tramos."""
    if not p.get("toc"):
        return ""
    filas, n, grupo, k = [], 0, 0, 0
    tramos = p.get("tramos", [1, 2, 3, 4])
    for item in p["toc"]:
        if isinstance(item, str):
            t = tramos[k]; k += 1
            filas.append('      <li class="grupo" data-mom="%d">%s</li>' % (t, item))
            grupo = t
        else:
            n += 1
            filas.append('      <li><a href="#%s" data-mom="%d"><span class="n">%d</span>%s</a></li>' % (item[0], grupo, n, item[1]))
    return ('  <div class="indice-fila">\n'
            '    <button class="indice-btn" type="button" aria-expanded="false" aria-controls="indice-pop">'
            '<span class="indice-num">§ 1/%d</span><span class="indice-tit">%s</span><span class="indice-mom" data-mom="1"></span><span class="flecha" aria-hidden="true"></span></button>\n'
            '    <span class="indice-tiempo" aria-live="off"></span>\n'
            '    <nav class="indice-pop" id="indice-pop" aria-label="Índice de la página" hidden>\n    <ol>\n%s\n    </ol>\n    </nav>\n'
            '  </div>\n') % (n, html.escape(p.get("toc_titulo", "")), "\n".join(filas))


def barra(raiz, p):
    return ('<a class="saltar" href="#contenido">Saltar al contenido</a>\n'
            '<header class="barra">\n'
            '  <div class="barra-fila">\n'
            '    <a class="marca" href="%sindex.html"><img src="%sassets/brand/fpen-favicon.svg" alt="" width="26" height="26">FPEN<small>Guía de estudio</small></a>\n'
            '    <nav class="cinta" aria-label="Semanas del curso y tu avance">\n      <div class="cinta-pista">\n        %s\n      </div>\n    </nav>\n'
            '    <button class="barra-btn cinta-pausa" type="button" aria-pressed="false" aria-label="Pausar la cinta de semanas"><span class="ico" aria-hidden="true"></span></button>\n'
            '    <button class="barra-btn buscar-btn" type="button" aria-haspopup="dialog" aria-keyshortcuts="Control+K"><span class="ico" aria-hidden="true"></span><span>Buscar</span> <kbd>Ctrl K</kbd></button>\n'
            '    <button class="barra-btn theme-btn" type="button" aria-label="Cambiar tema claro u oscuro"><span class="ico" aria-hidden="true"></span></button>\n'
            '    <button class="barra-btn menu-btn" type="button" aria-expanded="false" aria-controls="menu-completo"><span class="hb" aria-hidden="true"></span><span class="hb" aria-hidden="true"></span><span class="sr">Menú</span></button>\n'
            '  </div>\n%s'
            '  <div class="lectura" aria-hidden="true"><i></i></div>\n'
            '</header>\n'
            '<div class="menu-completo" id="menu-completo" hidden></div>\n') % (raiz, raiz, cinta(raiz, p.get("semana")), indice(p))


def ciclo_fpen(aqui):
    items = []
    for i, c in enumerate(CICLO):
        if i:
            items.append('<li class="sep" aria-hidden="true">→</li>')
        items.append('<li%s>%s</li>' % (' class="aqui"' if c in aqui else "", c))
    return '<ul class="ciclo-fpen" aria-label="Ciclo de trabajo con datos del curso; resaltadas las etapas de esta semana">%s</ul>' % "".join(items)


def portada(p):
    meta = "".join('<div%s><dt>%s</dt><dd>%s</dd></div>' % (' class="eval"' if k.startswith("!") else "", k.lstrip("!"), v) for k, v in p["meta"])
    ev = [v for k, v in p["meta"] if k.startswith("!")][0]
    ev_a, _, ev_b = ev.partition(":") if ":" in ev else ev.partition("·")
    fig, _ = grafico(p["semana"])
    num_sub = p["mod"].split("·")[0].strip()
    return ('<header class="portada-semana">\n  <div class="portada-in">\n'
            '    <p class="portada-num" aria-hidden="true">%s</p>\n'
            '    <div class="portada-txt">\n      <p class="portada-mod"><span class="sr">%s · </span>%s</p>\n      <h1>%s</h1>\n      <p class="lead">%s</p>\n    </div>\n'
            '    <p class="sello" aria-label="Evaluación: %s"><span class="sello-top">EVALÚA</span><b>%s</b><span>%s</span></p>\n'
            '    <p class="pregunta"><span class="pregunta-lbl">Pregunta orientadora</span><mark>%s</mark></p>\n'
            '    <div class="graf-fila">\n%s\n'
            '      <aside class="ficha" aria-label="Ficha de la semana">\n        <h2>Ficha de la edición</h2>\n        <dl class="hero-meta">%s</dl>\n        %s\n'
            '        <div class="progress" data-progreso-pagina>\n          <div class="progress-bar"><span></span></div>\n          <div class="progress-label"></div>\n        </div>\n      </aside>\n'
            '    </div>\n  </div>\n</header>\n') % (
                p["num"], p["sr"], p["mod"], p["h1"], p["lead"],
                html.escape(ev, quote=True), ev_a.strip(), ev_b.strip(), p["pregunta"],
                fig, meta, ciclo_fpen(p.get("ciclo", [])))


def partir(cuerpo):
    """Devuelve [(id, texto)] con cada <section id> de primer nivel; lo que queda entre secciones va con la anterior."""
    pos = [(m.start(), m.group(1)) for m in re.finditer(r'(?m)^<section id="([^"]+)"', cuerpo)]
    trozos = []
    for i, (ini, sid) in enumerate(pos):
        fin = pos[i + 1][0] if i + 1 < len(pos) else len(cuerpo)
        trozos.append((sid, cuerpo[ini:fin]))
    return cuerpo[:pos[0][0]] if pos else cuerpo, trozos


def tramos(p, cuerpo, pie):
    cabeza, trozos = partir(cuerpo)
    tramos_n = p.get("tramos", [1, 2, 3, 4])
    grupos, k = {}, -1
    nombres = []
    for item in p["toc"]:
        if isinstance(item, str):
            k += 1
            nombres.append(item)
        else:
            grupos[item[0]] = k
    salida, actual = [cabeza], None
    total = len(nombres)
    for sid, txt in trozos:
        g = grupos.get(sid, actual)
        if g != actual:
            if actual is not None:
                salida.append("</div>\n</div>\n")
            t = tramos_n[g]
            etiqueta = ("Momento %d de %d" % (g + 1, total)) if p.get("momentos", True) else "Sección %d de %d" % (g + 1, total)
            salida.append('<div class="tramo" data-tramo="%d" data-mom="%d" id="tramo-%d">\n<div class="tramo-in">\n'
                          '<header class="tramo-cab"><p class="tramo-n">%s</p><p class="tramo-tit">%s</p></header>\n' % (t, t, g + 1, etiqueta, nombres[g]))
            actual = g
        salida.append(txt)
    salida.append(pie + "</div>\n</div>\n")
    return "".join(salida)


def ids_ejercicios(cuerpo):
    n = [0]

    def pon(m):
        n[0] += 1
        return '<article id="ej-%d" class="%s"' % (n[0], m.group(1))
    return re.sub(r'<article class="(ejercicio[^"]*)"', pon, cuerpo)


PIE = ('<footer class="pie">Guía de estudio · Fundamentos de Programación para Economía y Negocios · ESEN · Ciclo III/2026 · '
       'Catedrático: Alvin Javier Portillo Tiliano. Material de apoyo no oficial: no sustituye la lectura ni la clase; '
       'ante cualquier diferencia, mandan el programa del curso y Moodle.</footer>\n')


def pagina(p):
    raiz = p["raiz"]
    cuerpo = open(os.path.join(DIR_FUENTES, p["fragmento"]), encoding="utf-8").read()
    cuerpo = ids_ejercicios(cuerpo.replace("{RAIZ}", raiz))
    clave = p.get("semana") or "inicio"
    estilo = ""
    partes = ['<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n',
              '<title>%s</title>\n<meta name="description" content="%s">\n' % (p["title"], html.escape(p["description"], quote=True)),
              '<meta name="theme-color" content="#111a30">\n',
              '<link rel="icon" href="%sassets/brand/fpen-favicon.svg" type="image/svg+xml">\n' % raiz,
              FUENTES + "\n", '<link rel="stylesheet" href="%sassets/guia.css">\n' % raiz, TEMA + "\n</head>\n",
              '<body%s%s data-raiz="%s"%s>\n' % (' data-semana="%s"' % p["semana"] if p.get("semana") else "", ' data-progreso="%s"' % p["progreso"] if p.get("progreso") else "", raiz, estilo),
              barra(raiz, p), "\n"]
    if p.get("portada"):
        cab, resto = cuerpo.split("<!--FIN-PORTADA-->", 1)
        fig, _ = grafico("inicio")
        partes.append(cab.replace("{GRAFICO}", fig))
        partes.append('<main id="contenido">\n' + tramos(p, resto, PIE) + "</main>\n")
    else:
        partes += [portada(p), '<main id="contenido">\n', tramos(p, cuerpo, PIE), "</main>\n"]
    partes += ["\n", PRISM + "\n" if p.get("codigo", True) else "",
               '<script src="%sassets/guia.js"></script>\n' % raiz,
               '<script src="%sassets/ejecutar-r.js"></script>\n' % raiz if p.get("codigo", True) else "",
               "</body>\n</html>\n"]
    salida = os.path.join(DOCS, p["ruta"])
    os.makedirs(os.path.dirname(salida), exist_ok=True)
    open(salida, "w", encoding="utf-8").write("".join(partes))
    print("escrito", p["ruta"])


def series():
    for clave in ["s1", "s2", "s3", "s4", "s5", "c1"]:
        _, serie = grafico(clave)
        open(os.path.join(DOCS, "assets/img/serie-%s.svg" % clave), "w", encoding="utf-8").write(serie_svg(serie))
    _, serie = grafico("s2")
    open(os.path.join(DOCS, "assets/img/serie-inicio.svg"), "w", encoding="utf-8").write(serie_svg(serie))


def buscador():
    """assets/buscar.json: semanas, secciones, ejercicios y funciones de R (cada función, en la semana que la enseña)."""
    from bs4 import BeautifulSoup
    entradas, vistas = [], set()
    orden = ["s1", "s2", "s3", "c1g", "c1r", "s4", "s5"]
    NO_FUNC = {"geom_algo()", "f()"}
    for n in orden:
        p = PAGINAS[n]
        url = p["ruta"]
        entradas.append({"k": "semana", "t": p["title"], "d": re.sub("<[^>]+>", "", p["lead"])[:140], "u": url})
        for item in p["toc"]:
            if not isinstance(item, str):
                entradas.append({"k": "sección", "t": item[1], "d": p["title"], "u": url + "#" + item[0]})
        s = BeautifulSoup(open(os.path.join(DOCS, url), encoding="utf-8"), "html.parser")
        for a in s.select("article.ejercicio[id]"):
            h = a.select_one("h3")
            if h:
                entradas.append({"k": "ejercicio", "t": h.get_text(" ", strip=True), "d": p["title"], "u": url + "#" + a["id"]})
        ch = s.select_one("#cheat")
        if ch and n.startswith("s"):
            for c in ch.select("code"):
                for m in re.findall(r"[A-Za-z_.][A-Za-z0-9_.]*\(", c.get_text()):
                    f = m + ")"
                    if f in vistas or f in NO_FUNC:
                        continue
                    vistas.add(f)
                    entradas.append({"k": "función", "t": f, "d": "Se enseña en la " + p["title"].split("·")[0].strip().lower(), "u": url + "#cheat"})
    entradas.insert(0, {"k": "semana", "t": "Inicio y temario", "d": "Portada de la guía, temario de las 12 semanas, evaluación y política de IA", "u": "index.html"})
    json.dump(entradas, open(os.path.join(DOCS, "assets/buscar.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print("escrito assets/buscar.json:", len(entradas), "entradas")


from paginas import PAGINAS  # noqa: E402

if __name__ == "__main__":
    nombres = sys.argv[1:] or list(PAGINAS)
    series()
    for n in nombres:
        pagina(PAGINAS[n])
    if not sys.argv[1:]:
        buscador()
