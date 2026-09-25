import asyncio, os, time
from playwright.async_api import async_playwright
import sys as _sys
_sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rutas import navegador, SERVIDOR  # noqa: E402
async def esperar(pg, i, t=240000):
    await pg.wait_for_function("(i) => { const e = document.querySelectorAll('.ejecucion .estado')[i]; return e && /listo|error|detenido/.test(e.textContent) }", arg=i, timeout=t)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**navegador())
        try:
            ctx = await b.new_context(viewport={"width": 1280, "height": 900})
            pg = await ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            # S1: Ejecutar un bloque con previo, luego Editar → bucle infinito
            await pg.goto(SERVIDOR + "semana-01/index.html", wait_until="networkidle")
            v = pg.locator('.ventana:has(pre[data-file="proyeccion.R"])')
            await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("S1 proyeccion.R →", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip().replace("\n", " | "))
            await v.locator(".btn-editar").click()
            await v.locator("textarea.editor").fill("total <- 0\nwhile (TRUE) {\n  total <- total + 1\n}")
            t = time.time(); await v.locator(".btn-correr").click(); await esperar(pg, 0, 60000)
            print("S1 bucle infinito →", round(time.time() - t, 1), "s:", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip()[:90])
            await v.locator(".btn-editar").click()  # Restaurar
            t = time.time(); await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("S1 tras restaurar (sesión nueva) →", round(time.time() - t, 1), "s:", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip().replace("\n", " | "))
            # S2: CSV desde datos/
            await pg.goto(SERVIDOR + "semana-02/index.html", wait_until="networkidle")
            v = pg.locator('.ventana:has(pre[data-file="comprobar_traza2.R"])')
            await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("S2 hogares.csv →", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip().replace("\n", " | "))
            # S3: gráfico
            await pg.goto(SERVIDOR + "semana-03/index.html", wait_until="networkidle")
            v = pg.locator('.ventana:has(pre[data-file="boxplot.R"])')
            await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("S3 boxplot → canvas:", await pg.locator(".ejecucion canvas").count(), "estado:", await pg.locator(".ejecucion .estado").nth(0).inner_text())
            await pg.locator(".ejecucion").nth(0).screenshot(path=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "grafico_webr.png"))
            # S4: dplyr con NA
            await pg.goto(SERVIDOR + "semana-04/index.html", wait_until="networkidle")
            v = pg.locator('.ventana:has(pre[data-file="na.R"])')
            await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("S4 na.R →", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip().replace("\n", " | "))
            # Repaso: celda que usa actividad (previo con CSV) y simulacro
            await pg.goto(SERVIDOR + "control-01/repaso/index.html", wait_until="networkidle")
            v = pg.locator('.ventana:has(pre[data-previo="c1r-actividad"])').first
            await v.locator(".btn-correr").click(); await esperar(pg, 0)
            print("Repaso actividad →", (await pg.locator(".ejecucion pre").nth(0).inner_text()).strip().replace("\n", " | ")[:200])
            sim = await pg.evaluate("""async () => {
              const s = document.querySelector('.simulacro'); const out = [];
              const d = s.querySelector('details.solucion');
              out.push('antes: cerrado=' + d.classList.contains('cerrado-sim') + ' reloj=' + s.querySelector('.reloj').textContent);
              s.querySelector('[data-sim-iniciar]').click();
              await new Promise(r => setTimeout(r, 2200));
              out.push('en curso: reloj=' + s.querySelector('.reloj').textContent + ' finalizar visible=' + !s.querySelector('[data-sim-finalizar]').hidden);
              window.confirm = () => true; s.querySelector('[data-sim-finalizar]').click();
              out.push('al finalizar: cerrado=' + d.classList.contains('cerrado-sim') + ' estado=' + s.querySelector('.estado-sim').textContent.slice(0, 40));
              s.querySelector('[data-sim-reiniciar]').click();
              return out.join(' | '); }""")
            print("Simulacro →", sim)
            print("errores JS:", errs)
        finally:
            await b.close()
asyncio.run(main())
