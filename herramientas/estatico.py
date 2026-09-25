import os, re, glob, sys
from urllib.parse import urlparse, unquote
from bs4 import BeautifulSoup
import xml.dom.minidom as md
from rutas import DOCS
problemas = 0
paginas = sorted(glob.glob(DOCS + "/**/*.html", recursive=True))
ids_por = {}
for p in paginas:
    s = BeautifulSoup(open(p, encoding="utf-8").read(), "lxml")
    ids = [e["id"] for e in s.find_all(id=True)]
    dup = {i for i in ids if ids.count(i) > 1}
    if dup:
        problemas += 1; print("ID duplicado", p, dup)
    ids_por[os.path.realpath(p)] = set(ids)
    # data-track y data-q únicos
    for attr in ("data-track", "data-q", "data-id"):
        v = [e[attr] for e in s.find_all(attrs={attr: True})]
        d = {x for x in v if v.count(x) > 1}
        if d: problemas += 1; print("duplicado", attr, p, d)
    # label for → id existe
    for l in s.find_all("label", attrs={"for": True}):
        if l["for"] not in ids: problemas += 1; print("label sin control", p, l["for"])
    for pre in s.find_all("pre", attrs={"data-previo": True}):
        for pid in pre["data-previo"].split():
            if pid not in ids: problemas += 1; print("data-previo inexistente", p, pid)
    for pre in s.find_all("pre", attrs={"data-archivos": True}):
        for a in pre["data-archivos"].split():
            if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(p), a))): problemas += 1; print("archivo de datos falta", p, a)
    refs = [(t, a) for t in s.find_all(True) for a in ("href", "src") if t.has_attr(a)]
    for t, a in refs:
        u = t[a]
        if u.startswith(("http://", "https://", "mailto:", "data:")):
            continue
        pu = urlparse(u)
        destino = os.path.realpath(os.path.normpath(os.path.join(os.path.dirname(p), unquote(pu.path)))) if pu.path else os.path.realpath(p)
        if pu.path and not os.path.exists(destino):
            problemas += 1; print("no existe", p, u); continue
        if pu.fragment:
            if destino.endswith(".html") and destino in ids_por:
                pass
            ids_dest = ids_por.get(destino)
            if ids_dest is None and destino.endswith(".html"):
                sd = BeautifulSoup(open(destino, encoding="utf-8").read(), "lxml")
                ids_dest = {e["id"] for e in sd.find_all(id=True)}
                ids_por[destino] = ids_dest
            if ids_dest is not None and pu.fragment not in ids_dest:
                problemas += 1; print("ancla rota", p, u)
    # url() en CSS inline no aplica
# CSS url() y SVG
css = open(DOCS + "/assets/guia.css").read()
for u in re.findall(r'url\("([^"]+)"\)', css):
    if not os.path.exists(os.path.join(DOCS, "assets", u)): problemas += 1; print("CSS url falta", u)
for f in glob.glob(DOCS + "/assets/**/*.svg", recursive=True):
    try:
        md.parse(f)
    except Exception as e:
        problemas += 1; print("SVG inválido", f, e)
print(len(paginas), "páginas revisadas;", len(glob.glob(DOCS + "/assets/**/*.svg", recursive=True)), "SVG;", problemas, "problemas")
