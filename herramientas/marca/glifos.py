import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
f = TTFont(os.path.join(os.path.dirname(os.path.abspath(__file__)), "SchibstedGrotesk-Black.woff2"))
if "fvar" in f:
    from fontTools.varLib.instancer import instantiateVariableFont
    f = instantiateVariableFont(f, {"wght": 900})
gs = f.getGlyphSet(); cmap = f.getBestCmap(); UPM = f["head"].unitsPerEm
CAP = f["OS/2"].sCapHeight
def palabra(texto, tam, x=0, y=0, track=-0.02):
    """Devuelve (path_d, ancho) del texto con altura de mayúscula = tam*CAP/UPM, línea base en y."""
    esc = tam / UPM
    pen = SVGPathPen(gs, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
    cx = 0
    for ch in texto:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (esc, 0, 0, -esc, x + cx, y))
        gs[g].draw(tp)
        cx += gs[g].width * esc + track * tam
    return pen.getCommands(), cx - track * tam
def ancho(ch, tam): return gs[cmap[ord(ch)]].width * tam / UPM
