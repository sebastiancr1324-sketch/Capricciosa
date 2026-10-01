(function () {
  var CAT = CAPRICIOSA.CATEGORIES;
  var PRODUCTS = CAPRICIOSA.PRODUCTS.slice().sort(function (a, b) { return a.order - b.order; });
  var helpers = CAPRICIOSA.helpers;
  var esc = helpers.escapeHtml;

  function card(product) {
    var price = esc(helpers.formatPrice(product));
    var addBtn = helpers.addToCartButton(product);
    return (
      '<div class="card-wrap">' +
      '<a class="product-card" href="' + helpers.productUrl(product.id) + '" data-cat="' + product.category + '">' +
      '  <div class="card-img">' +
      '    <img src="' + esc(helpers.photo(product)) + '" alt="Foto de ' + esc(product.name) + '" loading="lazy" data-pid="' + esc(product.id) + '" onerror="capriciosaImg(this)">' +
      '  </div>' +
      '  <div class="card-body">' +
      '    <div class="card-top">' +
      '      <span class="card-badge">' + esc(product.subtitle) + '</span>' +
      '      <span class="card-sticker">' + esc(product.sticker) + '</span>' +
      '    </div>' +
      '    <h3>' + esc(product.name) + '</h3>' +
      '    <p class="p-desc">' + esc(product.description) + '</p>' +
      '    <div class="card-foot">' +
      '      <span class="price">' + price + '</span>' +
      '      <span class="card-go">Ver detalle →</span>' +
      '    </div>' +
      '  </div>' +
      '</a>' +
      addBtn +
      '</div>');
  }

  var grid = document.getElementById("menu-grid");
  PRODUCTS.forEach(function (p) {
    var col = document.createElement("div");
    col.innerHTML = card(p);
    grid.appendChild(col.firstChild);
  });

  var wrap = document.getElementById("filters");
  var keys = Object.keys(CAT);

  var allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "chip active";
  allBtn.dataset.cat = "all";
  allBtn.setAttribute("aria-pressed", "true");
  allBtn.innerHTML = 'Todo el menú <span aria-hidden="true">🎂</span>';
  wrap.appendChild(allBtn);

  keys.forEach(function (key) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.dataset.cat = key;
    btn.setAttribute("aria-pressed", "false");
    btn.textContent = CAT[key].label;
    wrap.appendChild(btn);
  });

  function applyFilter(cat) {
    var cards = grid.querySelectorAll(".product-card");
    cards.forEach(function (card) {
      var show = cat === "all" || card.dataset.cat === cat;
      var wrapEl = card.closest(".card-wrap") || card;
      wrapEl.classList.toggle("hidden", !show);
    });
  }

  wrap.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    // aria-pressed le dice al lector de pantalla qué filtro está activo
    wrap.querySelectorAll(".chip").forEach(function (c) {
      c.classList.remove("active");
      c.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    applyFilter(btn.dataset.cat);
  });
})();