"""Ayudas para dibujar las láminas SVG de la guía FPEN (fondo claro, como un apunte impreso)."""
import html, os

SALIDA = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "docs", "assets", "img")
C = dict(ink="#111a30", mute="#56607a", line="#8792ae", soft="#c9d1e3",
         box="#eef2fb", boxs="#2b3a5c", blue="#2f6fd6", blues="#e3edff", teal="#0f8f84", teals="#daf5f1",
         amber="#b86e00", ambers="#fff0d6", amberk="#f5a623", coral="#c9403f", corals="#ffe6e6",
         violet="#6b4fd1", violets="#eee8ff", green="#138a5e", greens="#dcf5ea", code="#111a30", codet="#edf1fa", night="#0a0f1c")

ESTILO = """<style>
  text { font-family: 'Schibsted Grotesk', Arial, sans-serif; font-size: 14px; fill: #111a30; }
  .t { font-family: 'Schibsted Grotesk', 'Arial Narrow', Arial, sans-serif; font-weight: 700; font-size: 16px; }
  .m { font-family: 'JetBrains Mono', Menlo, Consolas, monospace; font-size: 13px; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
  .s { font-size: 12px; fill: #56607a; }
  .b { font-weight: 700; }
  .w { fill: #ffffff; }
  .cw { fill: #edf1fa; }
  .ln { stroke: #56607a; stroke-width: 1.6; fill: none; }
</style>"""


def e(t):
    return html.escape(str(t), quote=False)


def marcadores():
    out = []
    for n, col in (("p", C["mute"]), ("pb", C["blue"]), ("pg", C["green"]), ("pa", C["amber"]), ("pc", C["coral"]), ("pt", C["teal"]), ("pv", C["violet"])):
        out.append('<marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="%s"/></marker>' % (n, col))
    return "<defs>" + "".join(out) + "</defs>"


class Lamina:
    def __init__(self, nombre, w, h, titulo):
        self.nombre, self.w, self.h, self.titulo = nombre, w, h, titulo
        self.p = []

    def add(self, s):
        self.p.append(s)

    def rect(self, x, y, w, h, fill=C["box"], stroke=C["boxs"], rx=8, sw=1.5, extra=""):
        self.add('<rect x="%g" y="%g" width="%g" height="%g" rx="%g" fill="%s" stroke="%s" stroke-width="%g"%s/>' % (x, y, w, h, rx, fill, stroke, sw, extra))

    def text(self, x, y, t, cls="", anchor="start", fill=None, size=None, weight=None):
        attrs = ' class="%s"' % cls if cls else ""
        if anchor != "start":
            attrs += ' text-anchor="%s"' % anchor
        if fill:
            attrs += ' style="fill:%s%s%s"' % (fill, ";font-size:%spx" % size if size else "", ";font-weight:%s" % weight if weight else "")
        elif size or weight:
            attrs += ' style="%s%s"' % ("font-size:%spx;" % size if size else "", "font-weight:%s" % weight if weight else "")
        self.add('<text x="%g" y="%g"%s>%s</text>' % (x, y, attrs, e(t)))

    def flecha(self, d, col="p", color=None, sw=1.6, dash=False):
        self.add('<path d="%s" fill="none" stroke="%s" stroke-width="%g"%s marker-end="url(#%s)"/>' % (d, color or C["mute"], sw, ' stroke-dasharray="5 4"' if dash else "", col))

    def linea(self, d, color=None, sw=1.2, dash=False):
        self.add('<path d="%s" fill="none" stroke="%s" stroke-width="%g"%s/>' % (d, color or C["soft"], sw, ' stroke-dasharray="5 4"' if dash else ""))

    def caja(self, x, y, w, h, t, sub=None, fill=C["box"], stroke=C["boxs"], cls="m", tfill=None):
        self.rect(x, y, w, h, fill, stroke)
        if sub:
            self.text(x + w / 2, y + h / 2 - 3, t, cls + " b", "middle", tfill)
            self.text(x + w / 2, y + h / 2 + 15, sub, "s", "middle")
        else:
            self.text(x + w / 2, y + h / 2 + 5, t, cls, "middle", tfill)

    def pildora(self, x, y, t, fill, color, cls="m b"):
        w = 11 + 7.9 * len(t)
        self.rect(x, y, w, 24, fill, color, 12, 1.2)
        self.text(x + w / 2, y + 16.5, t, cls, "middle", color)
        return w

    def guardar(self):
        cuerpo = "\n".join(self.p)
        svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" role="img" aria-label="%s">\n<title>%s</title>\n%s\n%s\n%s\n</svg>\n'
               % (self.w, self.h, self.w, self.h, html.escape(self.titulo, quote=True), e(self.titulo), ESTILO, marcadores(), cuerpo))
        os.makedirs(SALIDA, exist_ok=True)
        open(os.path.join(SALIDA, self.nombre + ".svg"), "w", encoding="utf-8").write(svg)
        print("lámina", self.nombre)
