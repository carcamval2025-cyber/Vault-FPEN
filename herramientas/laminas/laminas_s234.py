from svg import Lamina, C

# ---------- S2: tres formas de indexar ----------
L = Lamina("s2-indexar", 760, 330, "El vector precios con los valores 10, 15, 20 y 35. Por posición, precios de c 1 y 3 da 10 y 20. Por exclusión, precios de menos 2 da 10, 20 y 35. Por condición, precios mayor que 15 produce la máscara FALSE, FALSE, TRUE, TRUE y solo pasan 20 y 35.")
vals = ["10", "15", "20", "35"]
L.text(20, 30, "precios", "m b", "start", C["blue"], 15)
for i, v in enumerate(vals):
    L.caja(100 + i * 70, 12, 62, 32, v)
    L.text(131 + i * 70, 58, "[%d]" % (i + 1), "s", "middle")
filas = [
    ("Por posición", "precios[c(1, 3)]", [True, False, True, False], None, "10  20"),
    ("Por exclusión", "precios[-2]", [True, False, True, True], None, "10  20  35"),
    ("Por condición", "precios[precios > 15]", [False, False, True, True], ["FALSE", "FALSE", "TRUE", "TRUE"], "20  35"),
]
for k, (tit, cod, sel, masc, res) in enumerate(filas):
    y = 86 + k * 80
    L.text(20, y + 14, tit, "t", "start", None, 14)
    L.text(20, y + 34, cod, "m", "start", C["mute"], 12)
    for i, v in enumerate(vals):
        x = 220 + i * 70
        if sel[i]:
            L.caja(x, y, 62, 32, v, None, C["greens"], C["green"])
        else:
            L.rect(x, y, 62, 32, "#ffffff", C["soft"], 8, 1.2, ' stroke-dasharray="4 3"')
            L.text(x + 31, y + 21, v, "m", "middle", C["line"])
        if masc:
            L.text(x + 31, y + 50, masc[i], "m", "middle", C["green"] if sel[i] else C["coral"], 11)
    L.flecha("M512 %g H 556" % (y + 16), "pg", C["green"], 1.8)
    L.rect(566, y, 174, 32, C["ambers"], C["amberk"], 8, 1.4)
    L.text(653, y + 21, res, "m b", "middle")
L.text(380, 318, "La máscara lógica tiene el mismo largo que el vector: solo cruzan las posiciones TRUE.", "s", "middle")
L.guardar()

# ---------- S2: data frame = vectores del mismo largo ----------
L = Lamina("s2-data-frame", 760, 300, "Tres vectores del mismo largo, sucursal de tipo character, ingresos de tipo double y meta_cumplida de tipo logical, se ponen lado a lado para formar un data frame de 3 filas y 3 columnas: cada fila es una observación y cada columna una variable.")
cols = [("sucursal", "chr", ["Centro", "Norte", "Sur"], C["greens"], C["green"]),
        ("ingresos", "dbl", ["4200", "3100", "5600"], C["ambers"], C["amberk"]),
        ("meta_cumplida", "lgl", ["TRUE", "FALSE", "TRUE"], C["violets"], C["violet"])]
L.text(20, 28, "Tres vectores del mismo largo…", "t")
for j, (n, t, vs, f, s) in enumerate(cols):
    x = 20 + j * 104
    L.text(x + 48, 52, n, "m b", "middle", None, 11.5)
    for i, v in enumerate(vs):
        L.caja(x, 62 + i * 40, 96, 32, v, None, f, s)
    L.text(x + 48, 200, "<%s>" % t, "m", "middle", s, 12)
L.flecha("M340 130 H 400", "p", None, 2.2)
L.text(370, 118, "lado a lado", "s", "middle")
L.text(420, 28, "…forman un data frame (3 × 3)", "t")
L.rect(420, 44, 320, 150, "#ffffff", C["boxs"], 10)
L.rect(420, 44, 320, 34, C["box"], C["boxs"], 10)
for j, (n, t, vs, f, s) in enumerate(cols):
    x = 430 + j * 104
    L.text(x + 46, 66, n, "m b", "middle", None, 11.5)
    for i, v in enumerate(vs):
        L.text(x + 46, 104 + i * 36, v, "m", "middle")
for i in range(2):
    L.linea("M420 %g H 740" % (116 + i * 36), C["soft"], 1)
L.rect(424, 88, 312, 26, "none", C["blue"], 6, 1.6)
L.text(748, 106, "", "s")
L.text(580, 234, "una fila = una observación (una sucursal)", "s", "middle", C["blue"])
L.rect(534, 46, 92, 146, "none", C["amberk"], 6, 1.6, ' stroke-dasharray="5 3"')
L.text(580, 256, "una columna = una variable, con su propio tipo", "s", "middle", C["amber"])
L.guardar()

# ---------- S2: importar ----------
L = Lamina("s2-importar", 760, 280, "El archivo datos/hogares.csv en el disco pasa por read_csv, que adivina el tipo de cada columna, y se guarda con la flecha de asignación en el objeto hogares dentro de la sesión de R. Después se audita con dim, names, head, glimpse y summary.")
L.text(20, 28, "En el disco", "t")
L.rect(20, 44, 190, 140, "#ffffff", C["boxs"], 8)
L.rect(20, 44, 190, 26, C["greens"], C["green"], 8, 1.2)
L.text(115, 62, "datos/hogares.csv", "m b", "middle", C["green"], 12)
for i, t in enumerate(["hogar,departamento,zona,…", "H01,San Salvador,urbana,…", "H02,San Salvador,urbana,…", "H03,La Libertad,urbana,…"]):
    L.text(30, 92 + i * 22, t, "m", "start", C["mute"], 10.5)
L.text(115, 206, "el archivo no cambia", "s", "middle")
L.rect(250, 86, 178, 56, C["code"], C["code"], 10)
L.text(339, 110, "read_csv()", "m b", "middle", C["codet"], 13)
L.text(339, 128, "adivina el tipo de cada columna", "s", "middle", "#aab4cc", 10)
L.flecha("M212 114 H 246", "p", None, 2)
L.flecha("M430 114 H 470", "pa", C["amber"], 2.2)
L.text(450, 104, "<-", "m b", "middle", C["amber"], 13)
L.text(480, 28, "En la sesión de R", "t")
L.rect(480, 44, 260, 140, C["ambers"], C["amberk"], 10, 1.4)
L.text(496, 70, "hogares", "m b", "start", None, 14)
L.text(724, 70, "tibble 12 × 7", "s", "end")
tipos = [("hogar", "chr"), ("miembros", "dbl"), ("ingreso_mensual", "dbl"), ("internet", "lgl")]
for i, (n, t) in enumerate(tipos):
    L.text(496, 98 + i * 20, n, "m", "start", None, 11.5)
    L.text(724, 98 + i * 20, "<%s>" % t, "m", "end", C["amber"], 11.5)
L.text(380, 240, "Auditar antes de confiar:", "t", "middle", None, 14)
x = 108
for f in ["dim()", "names()", "head()", "glimpse()", "summary()"]:
    w = L.pildora(x, 252, f, C["blues"], C["blue"])
    x += w + 12
L.guardar()

# ---------- S3: capas de ggplot ----------
L = Lamina("s3-capas", 760, 280, "Tres capas que se suman con más: ggplot con los datos salarios da un lienzo vacío; aes con x igual a educación e y igual a salario agrega los ejes; geom_point dibuja un punto por persona.")
paneles = [("1 · ggplot(salarios)", "datos: lienzo vacío"), ("2 · + aes(x, y)", "estéticas: ejes"), ("3 · + geom_point()", "geom: las marcas")]
import random
random.seed(3)
pts = [(random.uniform(0.05, 0.95), 0) for _ in range(16)]
pts = [(x, min(0.95, max(0.05, 0.15 + 0.7 * x + random.uniform(-0.15, 0.15)))) for x, _ in pts]
for k, (t, s) in enumerate(paneles):
    x0 = 20 + k * 250
    L.text(x0, 28, t, "m b", "start", C["blue"], 13)
    L.text(x0, 46, s, "s")
    L.rect(x0, 58, 220, 180, "#ebebeb" if k else "#f3f3f3", C["soft"], 6, 1)
    if k >= 1:
        for g in range(1, 4):
            L.linea("M%g 58 V 238" % (x0 + g * 55), "#ffffff", 1.4)
            L.linea("M%g %g H %g" % (x0, 58 + g * 45, x0 + 220), "#ffffff", 1.4)
        L.text(x0 + 110, 258, "educacion_anios", "m", "middle", C["mute"], 11)
        L.add('<text x="%g" y="148" class="m" text-anchor="middle" transform="rotate(-90 %g 148)" style="fill:%s;font-size:11px">salario_mensual</text>' % (x0 - 8, x0 - 8, C["mute"]))
    if k == 2:
        for px, py in pts:
            L.add('<circle cx="%g" cy="%g" r="4.2" fill="#111a30"/>' % (x0 + 10 + px * 200, 228 - py * 160))
    if k < 2:
        L.text(x0 + 233, 92, "+", "t", "middle", C["amber"], 26)
L.guardar()

# ---------- S3: elegir el gráfico ----------
L = Lamina("s3-elegir", 760, 330, "Tabla de decisión: para contar por categoría, geom_bar; para la distribución de un monto, geom_histogram; para comparar un monto entre grupos, geom_boxplot; para relacionar dos variables numéricas, geom_point; para la evolución en el tiempo, geom_line.")
L.text(20, 28, "La pregunta decide la geom", "t")
filas = [("¿Cuántos hay por categoría?", "1 categórica", "geom_bar()"),
         ("¿Cómo se reparte un monto?", "1 numérica", "geom_histogram()"),
         ("¿Qué grupo gana más?", "numérica + categórica", "geom_boxplot()"),
         ("¿Se mueven juntas dos variables?", "2 numéricas", "geom_point()"),
         ("¿Cómo evolucionó en el tiempo?", "tiempo + numérica", "geom_line()")]
for i, (q, v, g) in enumerate(filas):
    y = 46 + i * 54
    L.rect(20, y, 290, 42, C["box"], C["boxs"], 8)
    L.text(34, y + 26, q, "b", "start", None, 13.5)
    L.flecha("M312 %g H 346" % (y + 21), "p", None, 1.6)
    L.rect(350, y, 170, 42, "#ffffff", C["soft"], 8, 1.2)
    L.text(435, y + 26, v, "s", "middle")
    L.flecha("M522 %g H 556" % (y + 21), "pa", C["amber"], 1.8)
    L.rect(560, y, 180, 42, C["ambers"], C["amberk"], 8, 1.4)
    L.text(650, y + 26, g, "m b", "middle")
L.guardar()

# ---------- S4: filter ----------
L = Lamina("s4-filter", 760, 300, "Una tabla de seis empresas entra a filter con la condición sector igual a industria y empleados mayor o igual a 90; solo pasan Textiles del Norte y Metalúrgica Istmo, las demás filas quedan tachadas. Las columnas no cambian.")
filas = [("Café Cumbre", "agro", "35", False), ("Textiles del Norte", "industria", "120", True), ("Ferretería El Clavo", "comercio", "18", False),
         ("Plásticos Pacífico", "industria", "80", False), ("Software Maya", "servicios", "25", False), ("Metalúrgica Istmo", "industria", "95", True)]
L.text(20, 26, "empresas", "m b", "start", C["blue"], 14)
L.rect(20, 36, 350, 236, "#ffffff", C["boxs"], 8)
L.rect(20, 36, 350, 30, C["box"], C["boxs"], 8)
for x, t in ((32, "empresa"), (200, "sector")):
    L.text(x, 56, t, "m b", "start", None, 11.5)
L.text(358, 56, "empleados", "m b", "end", None, 11.5)
for i, (e, s, n, ok) in enumerate(filas):
    y = 90 + i * 30
    col = C["ink"] if ok else C["line"]
    if ok:
        L.rect(24, y - 18, 342, 26, C["greens"], C["greens"], 4, 1)
    L.text(32, y, e, "m", "start", col, 11.5)
    L.text(200, y, s, "m", "start", col, 11.5)
    L.text(356, y, n, "m", "end", col, 11.5)
    if not ok:
        L.linea("M30 %g H 360" % (y - 4), C["coral"], 1.1)
L.rect(392, 118, 196, 70, C["code"], C["code"], 10)
L.text(490, 144, "filter(sector == \"industria\",", "m", "middle", C["codet"], 11)
L.text(490, 164, "       empleados >= 90)", "m", "middle", C["codet"], 11)
L.flecha("M372 153 H 388", "p", None, 2)
L.flecha("M590 153 H 600", "pg", C["green"], 2)
L.rect(604, 106, 136, 94, C["greens"], C["green"], 10, 1.4)
L.text(672, 136, "2 filas", "t", "middle", C["green"], 18)
L.text(672, 158, "Textiles del Norte", "m", "middle", None, 10.5)
L.text(672, 176, "Metalúrgica Istmo", "m", "middle", None, 10.5)
L.text(672, 226, "mismas columnas", "s", "middle")
L.guardar()

# ---------- S4: NA ----------
L = Lamina("s4-na", 760, 300, "Un vector de ventas con los valores 465, NA y 185. sum de ventas da NA porque el desconocido contagia el resultado. sum con na.rm igual a TRUE da 650, la suma de los valores conocidos. is.na de ventas da FALSE, TRUE, FALSE y sum de is.na da 1 faltante.")
L.text(20, 28, "ventas", "m b", "start", C["blue"], 15)
for i, v in enumerate(["465", "NA", "185"]):
    if v == "NA":
        L.caja(100 + i * 76, 10, 68, 34, v, None, C["corals"], C["coral"], "m b", C["coral"])
    else:
        L.caja(100 + i * 76, 10, 68, 34, v)
rows = [("sum(ventas)", "NA", "el desconocido contagia el total", C["corals"], C["coral"]),
        ("sum(ventas, na.rm = TRUE)", "650", "suma solo los valores conocidos", C["greens"], C["green"]),
        ("is.na(ventas)", "FALSE  TRUE  FALSE", "¿falta? posición por posición", C["blues"], C["blue"]),
        ("sum(is.na(ventas))", "1", "¿cuántos faltan?", C["ambers"], C["amberk"])]
for i, (cod, res, txt, f, s) in enumerate(rows):
    y = 70 + i * 56
    L.rect(20, y, 300, 40, C["code"], C["code"], 8)
    L.text(36, y + 25, cod, "m", "start", C["codet"], 12.5)
    L.flecha("M322 %g H 356" % (y + 20), "p", None, 1.8)
    L.rect(360, y, 180, 40, f, s, 8, 1.4)
    L.text(450, y + 25, res, "m b", "middle", s if s != C["amberk"] else C["amber"], 13)
    L.text(556, y + 25, txt, "s")
L.guardar()
