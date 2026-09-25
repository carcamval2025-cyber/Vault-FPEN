"""Ejecuta cada bloque de R de una página y compara con la salida que muestra la página.
- Un bloque es <pre><code class="language-r"> sin data-norun ni clase mini.
- Su salida esperada es el primer <pre> que le sigue en el documento, si es un <pre class="salida"> sin data-parcial.
- data-previo: esos bloques se ejecutan antes, en silencio, en el mismo ambiente.
- data-archivos: se copian a la carpeta de trabajo.
- Los ejercicios rápidos (pre.mini dentro de .taladro) se comparan con la primera alternativa de data-a.
Uso: python3 verificar_r.py docs/semana-01/index.html [...]"""
import sys, os, re, subprocess, tempfile, shutil
from bs4 import BeautifulSoup

PRELUDIO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prelude.R")


def correr(codigo, previos, archivos, base):
    d = tempfile.mkdtemp()
    for a in archivos:
        destino = a[a.rfind("datos/"):] if "datos/" in a else os.path.basename(a)
        os.makedirs(os.path.join(d, os.path.dirname(destino)), exist_ok=True)
        shutil.copy(os.path.normpath(os.path.join(base, a)), os.path.join(d, destino))
    guion = os.path.join(d, "_v.R")
    with open(guion, "w") as f:
        f.write('source("%s")\nsuppressPackageStartupMessages(NULL)\n.env <- new.env(parent = globalenv())\n' % PRELUDIO)
        for p in previos:
            f.write('invisible(capture.output(.fpen_correr(%s, .env), type = "output"))\n' % rlit(p))
        f.write('.con <- file("%s/_out.txt", open = "wt")\nsink(.con); sink(.con, type = "message")\n' % d)
        f.write('.fpen_correr(%s, .env)\n' % rlit(codigo))
        f.write('sink(type = "message"); sink(); close(.con)\n')
    r = subprocess.run(["Rscript", "--vanilla", guion], cwd=d, capture_output=True, text=True, timeout=120,
                       env=dict(os.environ, LANG="en_US.UTF-8", LC_ALL="C.UTF-8"))
    try:
        out = open(os.path.join(d, "_out.txt")).read()
    except FileNotFoundError:
        out = "<<sin salida>> " + r.stderr
    shutil.rmtree(d)
    return out


def rlit(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n") + '"'


def norm(s):
    s = s.replace("\u2139", "i").replace("\u2716", "x").replace("\u2715", "x").replace("\u00d7", "x")
    lineas = [l.rstrip() for l in s.strip("\n").split("\n")]
    return "\n".join(lineas).strip()


def main(rutas):
    fallos = total = 0
    for ruta in rutas:
        base = os.path.dirname(os.path.abspath(ruta))
        sopa = BeautifulSoup(open(ruta, encoding="utf-8").read(), "lxml")
        pres = sopa.find_all("pre")
        porid = {p.get("id"): p for p in pres if p.get("id")}
        for i, pre in enumerate(pres):
            code = pre.find("code")
            if not code or "language-r" not in (code.get("class") or []):
                continue
            if "mini" in (pre.get("class") or []):
                tr = pre.find_parent("tr")
                esperado = tr.find("input")["data-a"].split("|")[0]
                obtenido = correr(code.get_text(), [], [], base)
                got = re.sub(r"^\[1\]\s*", "", norm(obtenido))
                got = re.sub(r"\s+", " ", got).replace('"', "")
                exp = esperado.replace(",", "").strip()
                total += 1
                if got.replace(",", "") != exp and got != exp:
                    fallos += 1
                    print("✗ MINI %s | %r → R dice %r (esperado %r)" % (ruta, code.get_text(), got, esperado))
                continue
            if pre.has_attr("data-norun"):
                continue
            sig = pres[i + 1] if i + 1 < len(pres) else None
            tiene_salida = sig and "salida" in (sig.get("class") or []) and not sig.has_attr("data-parcial")
            if not tiene_salida and not TODOS:
                continue
            previos, visto = [], set()

            def agregar(p):
                for pid in (p.get("data-previo") or "").split():
                    if pid in visto:
                        continue
                    visto.add(pid)
                    agregar(porid[pid])
                    previos.append(porid[pid])
            agregar(pre)
            archivos = []
            for p in previos + [pre]:
                archivos += (p.get("data-archivos") or "").split()
            obtenido = correr(code.get_text(), [p.find("code").get_text() for p in previos], archivos, base)
            total += 1
            if not tiene_salida:
                errores = [l for l in obtenido.split("\n") if l.startswith("Error") or l.startswith("<<sin salida")]
                if errores:
                    print("⚠ %s [%s] sin salida en la página, R da: %s" % (ruta, pre.get("data-file"), errores[0][:160]))
                continue
            esperado = sig.get_text()
            if norm(obtenido) != norm(esperado):
                fallos += 1
                print("✗ %s [%s]\n--- página:\n%s\n--- R:\n%s\n" % (ruta, pre.get("data-file"), norm(esperado), norm(obtenido)))
    print("%d bloques comparados, %d con diferencias" % (total, fallos))
    return fallos


TODOS = False
if __name__ == "__main__":
    args = sys.argv[1:]
    if "--todos" in args:
        TODOS = True; args.remove("--todos")
    sys.exit(1 if main(args) else 0)
