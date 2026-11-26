# Quita el fondo magenta (#FF00FF) y recorta al contenido: python3 recortar.py entrada.png salida.png
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA')
px = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = px[x, y]
        m = min(r, b) - g  # cuanto "magenta" tiene el pixel
        if m > 120: px[x, y] = (0, 0, 0, 0)
        elif m > 50:  # borde: semitransparente y sin tinte magenta
            k = (m - 50) / 70
            px[x, y] = (int(r - (r - g) * k), g, int(b - (b - g) * k), int(255 * (1 - k)))
im.crop(im.getbbox()).save(sys.argv[2])
