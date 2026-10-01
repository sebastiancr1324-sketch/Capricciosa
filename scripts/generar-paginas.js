#!/usr/bin/env node
/*
 * Genera las páginas estáticas de producto (productos/<id>.html), sitemap.xml, robots.txt y
 * la ruta base de 404.html a partir de js/products.js.
 *
 * Por qué existe: WhatsApp, Instagram y Facebook no ejecutan JavaScript al armar la vista
 * previa de un link, así que cada producto necesita su propio HTML con título, descripción
 * y foto. El contenido visible lo sigue dibujando js/product.js con los datos de products.js
 * (precios, tamaños, etc.), así que esos datos se cambian en un solo lugar.
 *
 * Cuándo correrlo: después de agregar o quitar un producto, o de cambiarle el nombre, la
 * descripción o la foto, o si cambia CONFIG.siteUrl. Cambiar solo un precio no hace falta.
 *
 * Uso (Node 18 o más nuevo, sin dependencias):  node scripts/generar-paginas.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);

// Carga products.js igual que el navegador (window es el objeto global)
const sandbox = {};
sandbox.window = sandbox;
vm.runInNewContext(read("js/products.js").replace(/^﻿/, ""), sandbox);
const { CONFIG, PRODUCTS, helpers } = sandbox.CAPRICIOSA;
const SITE = CONFIG.siteUrl;
if (!/^https:\/\/.+\/$/.test(SITE)) {
  throw new Error("CONFIG.siteUrl tiene que empezar con https:// y terminar en /");
}

const esc = helpers.escapeHtml;

// Ancho y alto de un JPEG (para og:image:width/height) leyendo el marcador SOF
function jpegSize(file) {
  const b = fs.readFileSync(path.join(ROOT, file));
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("No pude leer el tamaño de " + file);
}

function productPage(p) {
  const title = `${p.name} · Capricciosa`;
  const url = `${SITE}productos/${p.id}.html`;
  const img = jpegSize(p.image);
  const price = p.price ? `${p.priceNote} ${p.price}` : p.priceNote;
  // Misma frase que la descripción de la portada
  const description = `${p.description} Pedí por WhatsApp. Pickup y envíos · San Cristóbal, CABA.`;
  return `<!DOCTYPE html>
<!-- Generado por scripts/generar-paginas.js a partir de js/products.js: no editar a mano -->
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/png" sizes="48x48" href="img/favicon-48.png">
  <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
  <meta property="og:site_name" content="Capricciosa">
  <meta property="og:locale" content="es_AR">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}${p.image}">
  <meta property="og:image:width" content="${img.width}">
  <meta property="og:image:height" content="${img.height}">
  <meta property="og:image:alt" content="Foto de ${esc(p.name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#FFDFEF">
  <link rel="preload" href="${esc(helpers.photo(p))}" as="image" type="image/webp" fetchpriority="high">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body data-producto="${esc(p.id)}">

  <header class="site-header" id="cabecera"></header>

  <main>
    <!-- Lo dibuja js/product.js con los datos de js/products.js -->
    <section class="product-hero">
      <div class="container" id="product-hero">
        <noscript>
          <div class="noscript-box">
            <a class="crumb" href="index.html#menu">← Volver al menú</a>
            <h1>${esc(p.name)}</h1>
            <p class="desc">${esc(p.description)}</p>
            <p class="desc"><strong>${esc(price)}</strong>${p.size ? " · " + esc(p.size) : ""}</p>
            <a class="btn btn-wa" href="${esc(helpers.waOrderLink(p))}" target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>
          </div>
        </noscript>
      </div>
    </section>

    <section class="section bone" id="product-detail">
      <div class="container product-detail">
        <div class="detail-card" id="detail-card"></div>
        <div class="detail-card wa-panel" id="wa-panel"></div>
      </div>
    </section>

    <section class="section bone" id="related">
      <div class="container">
        <div class="section-head">
          <span class="section-eyebrow">Seguro que también te gustan</span>
          <h2>Más capriccitos</h2>
        </div>
        <div class="related-grid" id="related-grid"></div>
      </div>
    </section>
  </main>

  <footer class="site-footer" id="contacto"></footer>

  <script src="js/products.js"></script>
  <script src="js/shared.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/product.js"></script>
</body>
</html>
`;
}

// 1) Páginas de producto (se borran las de productos que ya no existen)
fs.mkdirSync(path.join(ROOT, "productos"), { recursive: true });
const ids = new Set(PRODUCTS.map((p) => p.id));
for (const f of fs.readdirSync(path.join(ROOT, "productos"))) {
  if (f.endsWith(".html") && !ids.has(f.replace(/\.html$/, ""))) {
    fs.unlinkSync(path.join(ROOT, "productos", f));
    console.log("borrada  productos/" + f);
  }
}
const sorted = PRODUCTS.slice().sort((a, b) => a.order - b.order);
for (const p of sorted) {
  if (!/^[a-z0-9-]+$/.test(p.id)) { throw new Error(`id inválido: "${p.id}" (solo minúsculas, números y guiones)`); }
  write(`productos/${p.id}.html`, productPage(p));
}
console.log(`generadas ${sorted.length} páginas en productos/`);

// 2) sitemap.xml
const urls = [
  ["", "1.0"],
  ...sorted.map((p) => [`productos/${p.id}.html`, "0.8"]),
  ["privacidad.html", "0.3"],
  ["terminos.html", "0.3"],
  ["cookies.html", "0.3"],
];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/generar-paginas.js: no editar a mano -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `  <url>\n    <loc>${SITE}${u}</loc>\n    <priority>${pr}</priority>\n  </url>`).join("\n")}
</urlset>
`);
console.log(`sitemap.xml con ${urls.length} direcciones`);

// 3) 404.html: GitHub Pages la muestra para cualquier dirección que no existe, también dentro de
//    carpetas (/carpeta/x). Con rutas relativas los estilos y enlaces se rompían; <base> las fija
//    a la carpeta del sitio.
const basePath = new URL(SITE).pathname;
const page404 = read("404.html")
  .replace(/ {2}<!-- Lo escribe scripts\/generar-paginas\.js[^\n]*\n/g, "")
  .replace(/ {2}<base href="[^"]*">\n/g, "");
const base404 = page404.replace(
  '  <meta charset="UTF-8">\n',
  `  <meta charset="UTF-8">\n  <!-- Lo escribe scripts/generar-paginas.js según CONFIG.siteUrl -->\n  <base href="${basePath}">\n`
);
if (!base404.includes(`<base href="${basePath}">`)) { throw new Error("No pude escribir <base> en 404.html"); }
write("404.html", base404);
console.log(`404.html con <base href="${basePath}">`);

// 4) robots.txt
write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${SITE}sitemap.xml
`);
console.log("robots.txt actualizado");
