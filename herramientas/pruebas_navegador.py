import asyncio, os, json
from playwright.async_api import async_playwright
import sys as _sys
_sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rutas import navegador, SERVIDOR  # noqa: E402
PAGS = ["index.html", "semana-01/index.html", "semana-02/index.html", "semana-03/index.html", "semana-04/index.html",
        "semana-05/index.html", "control-01/guia/index.html", "control-01/repaso/index.html"]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(**navegador())
        try:
            fallos = 0
            for ancho in (390, 1280):
                ctx = await b.new_context(viewport={"width": ancho, "height": 850})
                for ruta in PAGS:
                    pg = await ctx.new_page()
                    errs = []
                    pg.on("pageerror", lambda e: errs.append("pageerror " + str(e)))
                    pg.on("console", lambda m: errs.append("console " + m.text) if m.type == "error" else None)
                    await pg.goto(SERVIDOR + ruta, wait_until="networkidle")
                    sw = await pg.evaluate("document.documentElement.scrollWidth")
                    anchos = await pg.evaluate("""() => { const w = document.documentElement.clientWidth; return [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > w + 1 && !e.closest('pre, .table-wrap, .placa-core, .ventana, .barra, .lupa, .lupa-nota') }).slice(0,5).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right)) }""")
                    res = {"ancho": ancho, "pag": ruta, "scrollW": sw, "errores": errs}
                    if ancho == 1280:
                        res.update(await pg.evaluate("""() => {
                          const out = {};
                          const qq = [...document.querySelectorAll('.qq')];
                          qq.forEach(q => q.querySelector('.quiz-opt[data-ok]').click());
                          out.quiz = qq.length + ' preguntas, ' + document.querySelectorAll('.quiz-opt.correcta').length + ' correctas, ' + document.querySelectorAll('.quiz-opt.incorrecta').length + ' incorrectas';
                          const tz = [...document.querySelectorAll('.traza')];
                          out.trazas = tz.map(t => { t.querySelector('[data-solucion]').click(); t.querySelector('[data-comprobar]').click(); return t.querySelector('.resultado').textContent.slice(0, 40); });
                          const bloq = document.querySelectorAll('details.bloqueado').length;
                          const tas = document.querySelectorAll('.respuesta textarea').length;
                          out.bloqueo = tas + ' respuestas, ' + bloq + ' soluciones bloqueadas al inicio';
                          const ta = document.querySelector('.respuesta textarea');
                          if (ta) { ta.value = 'x'.repeat(200); ta.dispatchEvent(new Event('input')); out.desbloquea = !ta.closest('.ejercicio').querySelector('details.solucion').classList.contains('bloqueado'); ta.value=''; ta.dispatchEvent(new Event('input')); }
                          const cb = document.querySelector('input[data-track]'); if (cb) { cb.click(); }
                          out.progreso = (document.querySelector('[data-progreso-pagina] .progress-label') || {}).textContent;
                          out.ventanas = document.querySelectorAll('.ventana:not(.terminal)').length + ' ventanas, ' + document.querySelectorAll('.btn-correr').length + ' con Ejecutar, ' + document.querySelectorAll('.ventana.terminal').length + ' consolas';
                          if (cb) cb.click();
                          return out; }"""))
                        # panel Edición y tema
                        await pg.click(".edicion-btn")
                        await pg.wait_for_timeout(400)
                        res["edicion"] = await pg.evaluate("[!document.getElementById('edicion').hidden, document.querySelectorAll('.ed-lista li').length, document.activeElement.textContent.slice(0,20)]")
                        await pg.click(".ed-ajuste[data-ajuste='tema'] button[data-valor='dark']")
                        res["tema"] = await pg.evaluate("document.documentElement.getAttribute('data-theme')")
                        await pg.click(".ed-ajuste[data-ajuste='tema'] button[data-valor='system']")
                        res["tema_sistema"] = await pg.evaluate("document.documentElement.getAttribute('data-theme')")
                        await pg.keyboard.press("Escape")
                        res["edicion_cerrada"] = await pg.evaluate("[document.getElementById('edicion').hidden, document.activeElement.className]")
                    if anchos: res["desbordan"] = anchos
                    if sw > ancho or errs: fallos += 1
                    print(json.dumps(res, ensure_ascii=False))
                    await pg.close()
                await ctx.close()
            print("páginas con problemas:", fallos)
        finally:
            await b.close()
import sys
if "viejo" in sys.argv: asyncio.run(main())

async def nuevo():
    async with async_playwright() as p:
        b = await p.chromium.launch(**navegador())
        try:
            ctx = await b.new_context(viewport={"width": 1280, "height": 850})
            for ruta in PAGS:
                pg = await ctx.new_page(); errs = []
                pg.on("pageerror", lambda e: errs.append(str(e)))
                await pg.goto(SERVIDOR + ruta, wait_until="networkidle")
                r = {"pag": ruta}
                # índice
                await pg.click(".indice-btn"); await pg.wait_for_timeout(200)
                r["indice_abierto"] = await pg.evaluate("!document.getElementById('indice-pop').hidden")
                enl = pg.locator("#indice-pop a").nth(2)
                href = await enl.get_attribute("href")
                await enl.click(); await pg.wait_for_timeout(900)
                r["indice_salto"] = [href, await pg.evaluate("location.hash"), await pg.evaluate("document.querySelector('.indice-tit').textContent")]
                # buscador
                await pg.keyboard.press("Control+k"); await pg.wait_for_timeout(400)
                await pg.keyboard.type("filter("); await pg.wait_for_timeout(300)
                r["busqueda"] = await pg.evaluate("[...document.querySelectorAll('.buscador-res a')].slice(0,2).map(a=>a.textContent.slice(0,40)+' -> '+a.getAttribute('href'))")
                await pg.keyboard.press("Escape")
                # lupa
                lz = pg.locator(".graf-lienzo").first
                await lz.focus(); await pg.keyboard.press("ArrowLeft"); await pg.wait_for_timeout(500)
                r["lupa"] = await pg.evaluate("document.querySelector('.graf-lectura').textContent")
                r["lupa_nota"] = await pg.evaluate("document.querySelector('.lupa-nota').textContent")
                # cinta
                await pg.click(".edicion-btn"); await pg.wait_for_timeout(300)
                await pg.click(".ed-ajuste[data-ajuste='cinta'] button[data-valor='quieta']")
                r["cinta_quieta"] = await pg.evaluate("[document.querySelector('.barra').classList.contains('pausada'), getComputedStyle(document.querySelector('.cinta-pista')).animationPlayState]")
                await pg.click(".ed-ajuste[data-ajuste='cinta'] button[data-valor='corre']")
                await pg.evaluate("document.getElementById('contenido').click()"); await pg.wait_for_timeout(200)
                r["clic_fuera_cierra"] = await pg.evaluate("document.getElementById('edicion').hidden")
                r["errores"] = errs
                print(json.dumps(r, ensure_ascii=False))
                await pg.close()
            # buscar y navegar con Enter
            pg = await ctx.new_page()
            await pg.goto(SERVIDOR + "semana-02/index.html", wait_until="networkidle")
            await pg.keyboard.press("Control+k"); await pg.wait_for_timeout(300)
            await pg.keyboard.type("arrange"); await pg.wait_for_timeout(500)
            await pg.keyboard.press("Enter"); await pg.wait_for_timeout(1500)
            print("Enter lleva a:", pg.url)
            await ctx.close()
        finally:
            await b.close()
if "nuevo" in sys.argv: asyncio.run(nuevo())
