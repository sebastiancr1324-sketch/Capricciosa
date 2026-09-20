(function () {
  var helpers = CAPRICIOSA.helpers;
  var CAT = CAPRICIOSA.CATEGORIES;
  var PRODUCTS = CAPRICIOSA.PRODUCTS;
  var esc = helpers.escapeHtml;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("producto");
  var product = helpers.getProduct(id);

  var hero = document.getElementById("product-hero");

  var waIcon =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2.1 22l4.95-1.5A9.93 9.93 0 1 0 12.04 2Zm5.83 14.13c-.24.69-1.42 1.32-1.98 1.36-.53.04-1.04.17-3.47-.72-2.92-1.07-4.78-3.85-4.93-4.03-.14-.18-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.83 2.01.9 2.15.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.17-.3.37-.43.5-.14.13-.29.28-.12.55.17.26.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.3.14.47.12.64-.07.17-.18.73-.85.93-1.15.19-.29.39-.24.65-.14.26.09 1.67.79 1.95.93.29.14.48.21.55.33.07.11.07.65-.17 1.33Z"/></svg>';

  if (!product) {
    document.title = "Postre no encontrado · Capricciosa";
    if (hero) {
      hero.innerHTML =
        '<div style="text-align:center;padding-block:40px">' +
        '  <div style="font-size:3rem">🍰</div>' +
        '  <h1>No encontramos ese capriccito</h1>' +
        '  <p style="font-weight:600">Puede que haya cambiado de lugar en el menú.</p>' +
        '  <a class="btn btn-primary" style="margin-top:18px" href="index.html">Volver al menú</a>' +
        '</div>';
    }
    return;
  }

  var cat = CAT[product.category] || { label: "", color: "#FD97D6" };
  var priceLabel = esc(helpers.formatPrice(product));
  var specs = [];
  if (product.size) { specs.push("⚖ " + product.size); }
  if (product.dimensions) { specs.push("📐 " + product.dimensions); }
  if (product.portions) { specs.push("🍰 " + product.portions); }
  var specChips = specs.map(function (s) {
    return '<span class="kw-chip">' + esc(s) + '</span>';
  }).join("");
  var aboutTitle = product.category === "bebidas" ? "🥤 Sobre esta bebida" : "📖 Sobre esta torta";

  document.title = product.name + " · Capricciosa";

  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDesc = document.querySelector('meta[property="og:description"]');
  var ogImage = document.querySelector('meta[property="og:image"]');
  if (ogTitle) { ogTitle.setAttribute("content", product.name + " · Capricciosa"); }
  if (ogDesc) { ogDesc.setAttribute("content", product.description); }
  if (ogImage) { ogImage.setAttribute("content", product.image); }

  if (hero) {
    hero.innerHTML =
      '<div class="product-hero-left">' +
      '  <a class="crumb" href="index.html">← Volver al menú</a>' +
      '  <div class="chip-row">' +
      '    <span>🏷 ' + esc(cat.label) + '</span>' +
      '    <span>🍽 ' + esc(product.subtitle) + '</span>' +
      (product.size ? '    <span>⚖ ' + esc(product.size) + '</span>' : "") +
      '  </div>' +
      '  <h1>' + esc(product.name) + '</h1>' +
      '  <p class="desc">' + esc(product.description) + '</p>' +
      '</div>' +
      '<div class="product-hero-right">' +
      '  <div class="product-hero-img-wrap">' +
      '    <img class="product-hero-img" src="' + esc(product.image) + '" alt="Foto de ' + esc(product.name) + '" data-pid="' + esc(product.id) + '" onerror="capriciosaImg(this)">' +
      '    <span class="brand-stamp hero-stamp" aria-hidden="true"><img src="img/EstampaVenezuela.jpg" alt="" onerror="this.parentElement.style.display=\'none\'"></span>' +
      '  </div>' +
      '  <div class="hero-price">' +
      '    <span class="note">' + esc(product.priceNote) + '</span>' +
      (product.price ? '<span class="amount">' + esc(product.price) + '</span>' : '<span class="amount">A consultar</span>') +
      (product.size ? '<span class="note">' + esc(product.size) + '</span>' : "") +
      '  </div>' +
      '</div>';
  }

  var detail = document.getElementById("detail-card");
  if (detail) {
    detail.innerHTML =
      '<h3>' + aboutTitle + '</h3>' +
      '<p>' + esc(product.description) + '</p>' +
      '<h3 style="margin-top:24px">📏 Tamaño y peso</h3>' +
      '<div class="kw-list">' + specChips + '</div>';
  }

  var waPanel = document.getElementById("wa-panel");
  if (waPanel) {
    waPanel.innerHTML =
      '<div class="wa-emoji">💬</div>' +
      '<h3>¿Te lo llevás?</h3>' +
      '<p>Contanos qué querés y coordinamos el <strong>pickup</strong> o el <strong>envío</strong> en San Cristóbal, CABA.</p>' +
      (product.price ? '<button type="button" class="btn btn-ghost add-inline" data-cart-add="' + esc(product.id) + '">🛒 Agregar al carrito</button>' : '') +
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + helpers.waOrderLink(product) + '">' +
      waIcon + 'Pedir por WhatsApp</a>' +
      '<p style="margin-top:18px;font-size:0.95rem;color:var(--ink)">También podés escribirnos a <a href="tel:+541168351885"><strong>' + esc(CAPRICIOSA.CONFIG.phone) + '</strong></a> o por <a href="' + CAPRICIOSA.CONFIG.instagramUrl + '" target="_blank" rel="noopener">Instagram</a>.</p>';
  }

  var relatedBox = document.getElementById("related-grid");
  if (relatedBox) {
    var sameCat = PRODUCTS.filter(function (p) {
      return p.id !== product.id && p.category === product.category;
    });
    var others = PRODUCTS.filter(function (p) {
      return p.id !== product.id && p.category !== product.category;
    });
    var related = sameCat.concat(others).slice(0, 3);

    if (!related.length) {
      document.getElementById("related").style.display = "none";
    } else {
      related.forEach(function (p) {
        var wrap = document.createElement("div");
        wrap.className = "card-wrap";
        var a = document.createElement("a");
        a.className = "product-card";
        a.href = helpers.productUrl(p.id);
        a.innerHTML =
          '<div class="card-img">' +
          '  <img src="' + esc(p.image) + '" alt="Foto de ' + esc(p.name) + '" loading="lazy" data-pid="' + esc(p.id) + '" onerror="capriciosaImg(this)">' +
          '</div>' +
          '<div class="card-body">' +
          '  <div class="card-top">' +
          '    <span class="card-badge">' + esc(p.subtitle) + '</span>' +
          '    <span class="card-sticker">' + esc(p.sticker) + '</span>' +
          '  </div>' +
          '  <h3>' + esc(p.name) + '</h3>' +
          '  <p class="p-desc">' + esc(p.description) + '</p>' +
          '  <div class="card-foot">' +
          '    <span class="price">' + esc(helpers.formatPrice(p)) + '</span>' +
          '    <span class="card-go">Ver detalle →</span>' +
          '  </div>' +
          '</div>';
        wrap.appendChild(a);
        var addHtml = helpers.addToCartButton(p);
        if (addHtml) {
          var tpl = document.createElement("div");
          tpl.innerHTML = addHtml;
          wrap.appendChild(tpl.firstChild);
        }
        relatedBox.appendChild(wrap);
      });
    }
  }
})();