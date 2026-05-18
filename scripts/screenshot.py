"""Take a screenshot of glp-planet.com for the case cover."""
from playwright.sync_api import sync_playwright
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "cases" / "glp-planet.jpg"
OUT.parent.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(
        viewport={"width": 1600, "height": 1000},
        device_scale_factor=2,
        color_scheme="dark",
        locale="ru-RU",
    )
    page = ctx.new_page()
    page.goto("https://glp-planet.com", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2500)
    page.screenshot(
        path=str(OUT),
        type="jpeg",
        quality=82,
        full_page=False,
        clip={"x": 0, "y": 0, "width": 1600, "height": 1000},
    )
    browser.close()

print(f"saved: {OUT}  size={OUT.stat().st_size} bytes")