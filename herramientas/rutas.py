"""Rutas comunes de las herramientas (todo es relativo a la raíz del repositorio) y opciones del navegador de pruebas."""
import os

HERR = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERR)
DOCS = os.path.join(REPO, "docs")
FUENTES = os.path.join(HERR, "fuentes")
IMG = os.path.join(DOCS, "assets", "img")
SERVIDOR = os.environ.get("FPEN_SERVIDOR", "http://127.0.0.1:8765/")


def navegador():
    """Opciones para chromium.launch(): usa el Chromium de Playwright o el de PW_CHROMIUM, y el proxy si existe."""
    op = {"args": ["--ignore-certificate-errors"]}
    exe = os.environ.get("PW_CHROMIUM", "/opt/pw-browsers/chromium")
    if os.path.exists(exe):
        op["executable_path"] = exe
    if os.environ.get("HTTPS_PROXY"):
        op["proxy"] = {"server": os.environ["HTTPS_PROXY"], "bypass": "127.0.0.1,localhost"}
    return op
