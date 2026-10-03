"""Comprobación de los 30 candados y reproductores. Servir docs/ en localhost:8765."""
import asyncio
from playwright.async_api import async_playwright
from rutas import navegador, SERVIDOR

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(**navegador())
        page = await browser.new_page(reduced_motion="reduce")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        # Las pruebas locales no dependen de fuentes ni scripts remotos.
        await page.route("https://**/*", lambda route: route.abort())
        await page.goto(SERVIDOR + "parcial-01/index.html", wait_until="domcontentloaded")
        await page.wait_for_function("window.__fpen")
        for width in (1280, 390):
            await page.set_viewport_size({"width": width, "height": 900})
            await page.wait_for_timeout(250)
            assert await page.locator("article.ex").count() == 30
            for n in range(1, 31):
                card = page.locator(f"#ej{n}")
                await card.locator(".ex-head").click()
                gate = card.locator(".gate")
                if await gate.is_visible():
                    assert await gate.locator("button").is_disabled()
                    await gate.locator("textarea").fill("Primero reviso las variables, luego transformo y verifico el resultado.")
                    await gate.locator("button").click()
                await page.evaluate("""async n => {
                    const p = document.getElementById('body' + n)._player;
                    for (let i = 0; i < p.N; i++) await p.goto(i);
                    p.pause();
                }""", n)
                assert await page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), (width, n)
                await card.locator(".ex-head").click()
            print(width, "px: 30 reproductores, todos los pasos y sin desbordamiento")
        assert not errors, errors
        await browser.close()

asyncio.run(main())
