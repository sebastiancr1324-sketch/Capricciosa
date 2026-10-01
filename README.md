# Capricciosa.github.io

Página web de Capricciosa, un emprendimiento de postres venezolanos.

## Sitio en línea

🔗 https://sebastiancr1324-sketch.github.io/Capricciosa.github.io/

## Estructura

- `index.html`: portada y menú
- `productos/<id>.html`: una página por producto (las genera el script, ver abajo)
- `product.html`: redirige los links viejos (`product.html?producto=...`) a `productos/`
- `js/products.js`: **datos del sitio**: productos, precios, teléfono, WhatsApp, Instagram y dirección del sitio
- `js/`: lógica (`shared.js` header y pie, `menu.js` menú, `product.js` página de producto, `cart.js` carrito)
- `css/styles.css`: estilos
- `fonts/`: fuentes Anton y Nunito (licencia SIL OFL, ver `fonts/OFL-*.txt`)
- `img/`: fotos y logos. Cada foto de producto está en JPEG (original, se usa para la vista previa al compartir) y en WebP (la que ve el visitante)
- `privacidad.html`, `terminos.html`, `cookies.html`: páginas legales
- `404.html`: página de error
- `scripts/generar-paginas.js`: genera `productos/`, `sitemap.xml`, `robots.txt` y la ruta base de `404.html`

## Cambiar un precio

Editá el producto en `js/products.js`. No hace falta nada más.

## Agregar, quitar o renombrar un producto

1. Guardá la foto en `img/` en JPEG (por ejemplo `img/TortaNueva.jpg`) y también en WebP con el mismo nombre (`img/TortaNueva.webp`, calidad 80; se puede convertir en [squoosh.app](https://squoosh.app) o con `cwebp -q 80 TortaNueva.jpg -o TortaNueva.webp`). Si falta el WebP, el sitio muestra el JPEG.
2. Agregá o editá el producto en `js/products.js` (el `id` solo con minúsculas, números y guiones).
3. Corré `node scripts/generar-paginas.js` (Node 18 o más nuevo) y subí los cambios.

El paso 3 también hace falta si cambiás el nombre, la descripción o la foto de un producto: son los datos que muestran WhatsApp y las redes al compartir el link.

## Cambiar de dominio

1. Cambiá `siteUrl` en `js/products.js` (con `/` al final).
2. Buscá y reemplazá la dirección vieja en `index.html`, `privacidad.html`, `terminos.html` y `cookies.html` (canonical, Open Graph y datos estructurados).
3. Corré `node scripts/generar-paginas.js`.

Nota: en GitHub Pages dentro de una carpeta (`usuario.github.io/repo/`), los buscadores no leen `robots.txt`, porque tiene que estar en la raíz del dominio. Para que Google encuentre las páginas, cargá `sitemap.xml` en Google Search Console.
