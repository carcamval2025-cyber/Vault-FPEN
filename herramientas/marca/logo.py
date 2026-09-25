"""Logo FPEN ▲ (voz de tabloide económico): el nombre como símbolo bursátil, con el triángulo
de la cotización que sube. Genera en docs/assets/brand/:
  fpen-logo.svg          tinta azul noche, triángulo ámbar (sobre fondos claros)
  fpen-logo-blanco.svg   tinta blanca, triángulo ámbar (sobre azul noche)
  fpen-logo-ambar.svg    tinta azul noche, triángulo blanco (sobre ámbar, como en la barra)
  fpen-favicon.svg       F blanca y triángulo ámbar en un cuadro azul noche
Las letras son trazos (Schibsted Grotesk Black convertida a curvas), así el logo no depende de fuentes.
Uso: python3 herramientas/marca/logo.py   (requiere fonttools y brotli)"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from glifos import palabra, CAP, UPM  # noqa: E402

SALIDA = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "docs", "assets", "brand")
NOCHE, AMBAR, BLANCO = "#111a30", "#ffb83d", "#ffffff"   # ámbar = oklch(0.83 0.155 76)
T = 100
capH = T * CAP / UPM


def svg(w, h, cuerpo, titulo="FPEN"):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.1f %.1f" role="img" aria-label="%s"><title>%s</title>%s</svg>\n'
            % (w, h, titulo, titulo, cuerpo))


def tri(cx, top, base, alto, color):
    return '<path d="M%.1f,%.1f L%.1f,%.1f L%.1f,%.1f Z" fill="%s"/>' % (cx - base / 2, top + alto, cx, top, cx + base / 2, top + alto, color)


def logo(tinta, acento):
    d, w = palabra("FPEN", T, 0, capH)
    return svg(w + 8 + 34, capH, '<path d="%s" fill="%s"/>' % (d, tinta) + tri(w + 8 + 17, 0, 34, 29, acento))


def favicon():
    d, _ = palabra("F", 64 * 0.78, 9, 53)
    return svg(64, 64, '<rect width="64" height="64" rx="6" fill="%s"/><path d="%s" fill="%s"/>' % (NOCHE, d, BLANCO) + tri(50, 9, 23, 20, AMBAR))


if __name__ == "__main__":
    archivos = {"fpen-logo.svg": logo(NOCHE, AMBAR), "fpen-logo-blanco.svg": logo(BLANCO, AMBAR),
                "fpen-logo-ambar.svg": logo(NOCHE, BLANCO), "fpen-favicon.svg": favicon()}
    for nombre, contenido in archivos.items():
        open(os.path.join(SALIDA, nombre), "w", encoding="utf-8").write(contenido)
        print("escrito", nombre)
