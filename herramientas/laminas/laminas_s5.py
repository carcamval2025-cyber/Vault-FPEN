from svg import Lamina, C

# 1. El pipe
L = Lamina("s5-pipe", 760, 300, "Arriba, la regla: x pipe f de y equivale a f de x coma y. Abajo, un pipeline: ventas entra a filter, el resultado entra a arrange y ese resultado entra a select; la misma operación anidada se lee de adentro hacia afuera.")
L.text(20, 28, "La regla: lo de la izquierda entra como primer argumento", "t")
L.caja(20, 44, 70, 44, "x", None, C["ambers"], C["amberk"])
L.text(112, 72, "|>", "m b", "middle", C["blue"], 18)
L.caja(134, 44, 110, 44, "f(y)")
L.text(274, 72, "=", "t", "middle", None, 24)
L.rect(304, 44, 150, 44, C["box"], C["boxs"])
L.add('<text x="379" y="71" text-anchor="middle" class="m">f(<tspan style="fill:#b86e00;font-weight:700">x</tspan>, y)</text>')
L.flecha("M55 96 C 55 120, 350 124, 352 94", "pa", C["amber"], 1.6, True)
L.text(20, 162, "Con pipe: cada paso en el orden en que ocurre", "t")
xs = [20, 190, 360, 530]
etq = [("ventas", "8 × 6"), ("filter()", "quita filas"), ("arrange()", "ordena filas"), ("select()", "elige columnas")]
for i, (x, (a, b)) in enumerate(zip(xs, etq)):
    if i == 0:
        L.caja(x, 178, 140, 56, a, b, C["ambers"], C["amberk"])
    else:
        L.caja(x, 178, 140, 56, a, b)
    if i < 3:
        L.flecha("M%g 206 H %g" % (x + 142, x + 168), "pb", C["blue"], 2)
        L.text(x + 155, 198, "|>", "m b", "middle", C["blue"], 12)
L.text(20, 270, "Anidado: select(arrange(filter(ventas, …), …), …) se lee de adentro hacia afuera.", "s")
L.guardar()

# 2. Y contra O sobre la misma columna
L = Lamina("s5-y-o", 760, 280, "Cinco vuelos con su mes. Con month igual a 1 Y month igual a 2 no pasa ninguna fila, porque cada fila tiene un solo mes. Con month igual a 1 O month igual a 2 pasan las filas de enero y de febrero.")
L.text(20, 28, "5 vuelos de ejemplo", "t")
meses = [1, 2, 1, 3, 2]
for i, m in enumerate(meses):
    y = 44 + i * 44
    L.caja(20, y, 160, 36, "month = %d" % m)
# Y
L.text(300, 28, "month == 1 & month == 2", "m b", "middle", C["coral"], 13)
L.rect(210, 44, 180, 212, C["corals"], C["coral"], 10, 1.4)
L.text(300, 130, "0 filas", "t", "middle", C["coral"], 22)
L.text(300, 158, "ninguna fila tiene", "s", "middle")
L.text(300, 176, "dos meses a la vez", "s", "middle")
# O
L.text(560, 28, "month == 1 | month == 2", "m b", "middle", C["green"], 13)
L.rect(420, 44, 320, 212, C["greens"], C["green"], 10, 1.4)
k = 0
for i, m in enumerate(meses):
    y = 44 + i * 44
    if m in (1, 2):
        L.caja(440 + (k % 2) * 150, 60 + (k // 2) * 50, 140, 36, "month = %d" % m, None, "#ffffff", C["green"])
        k += 1
L.text(580, 200, "4 filas: basta con cumplir una", "s", "middle")
L.text(580, 220, "%in% c(1, 2) da lo mismo", "m", "middle", C["green"], 12)
for i, m in enumerate(meses):
    y = 62 + i * 44
    L.linea("M182 %g H 206" % y, C["coral"] if True else C["soft"], 1.2, True)
L.guardar()
