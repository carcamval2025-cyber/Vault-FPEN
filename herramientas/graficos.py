"""Genera las imágenes PNG de resultado: para cada <img src=".../graficos/X.png"> ejecuta el bloque de R anterior
(con sus data-previo) y guarda el último gráfico con ggsave. Uso: python3 herramientas/graficos.py s3.html semana-03"""
import sys, re, html, os, subprocess, tempfile, shutil
frag, carpeta = sys.argv[1], sys.argv[2]
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rutas import DOCS, FUENTES, IMG  # noqa: E402
base = os.path.join(DOCS, carpeta)
destino = os.path.join(IMG, "graficos")
if not os.path.exists(frag): frag = os.path.join(FUENTES, frag)
os.makedirs(destino, exist_ok=True)
texto = open(frag, encoding="utf-8").read()
bloque = re.compile(r'<pre([^>]*)><code class="language-r">(.*?)</code></pre>', re.S)
bloques = [(m.start(), m.group(1), html.unescape(m.group(2))) for m in bloque.finditer(texto)]
porid = {re.search(r'id="([^"]+)"', a).group(1): (a, c) for _, a, c in bloques if 'id="' in a}
def previos(attrs, visto):
    out = []
    m = re.search(r'data-previo="([^"]+)"', attrs)
    for pid in (m.group(1).split() if m else []):
        if pid in visto: continue
        visto.add(pid); a, c = porid[pid]; out += previos(a, visto); out.append((a, c))
    return out
for m in re.finditer(r'<img src="\{RAIZ\}assets/img/graficos/([\w-]+)\.png"', texto):
    nombre = m.group(1)
    _, attrs, cod = [b for b in bloques if b[0] < m.start()][-1]
    todos = previos(attrs, set()) + [(attrs, cod)]
    d = tempfile.mkdtemp()
    for a, _ in todos:
        mm = re.search(r'data-archivos="([^"]+)"', a)
        for f in (mm.group(1).split() if mm else []):
            dst = os.path.join(d, f[f.rfind("datos/"):] if "datos/" in f else os.path.basename(f))
            os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy(os.path.normpath(os.path.join(base, f)), dst)
    r = "\n".join(c for _, c in todos)
    guion = os.path.join(d, "g.R")
    open(guion, "w").write("suppressMessages({\n" + r + "\n})\nggplot2::ggsave('%s/%s.png', ggplot2::last_plot(), width = 7, height = 4.4, dpi = 150, bg = 'white')\n" % (destino, nombre))
    p = subprocess.run(["Rscript", "--vanilla", guion], cwd=d, capture_output=True, text=True, env=dict(os.environ, LC_ALL="C.UTF-8"))
    print(nombre, "OK" if p.returncode == 0 else p.stderr[-400:])
    shutil.rmtree(d)
