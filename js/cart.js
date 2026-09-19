(function () {
  var CONFIG = CAPRICIOSA.CONFIG;
  var helpers = CAPRICIOSA.helpers;
  var esc = helpers.escapeHtml;
  var STORAGE_KEY = "capricciosa-cart-v1";

  var state = load();

  var fab, badge, overlay, drawer, bodyEl, totalEl, checkoutEl;

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : {};
      var items = {};
      if (data && data.items) {
        for (var id in data.items) {
          var p = helpers.getProduct(id);
          if (p && helpers.parsePrice(p) && data.items[id] >= 1) {
            items[id] = data.items[id];
          }
        }
      }
      return { items: items };
    } catch (e) {
      return { items: {} };
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function count() {
    var t = 0;
    for (var id in state.items) { t += state.items[id]; }
    return t;
  }

  function total() {
    var t = 0;
    for (var id in state.items) {
      var p = helpers.getProduct(id);
      var price = helpers.parsePrice(p);
      if (price) { t += price * state.items[id]; }
    }
    return t;
  }

  function priceNote() {
    for (var id in state.items) {
      var p = helpers.getProduct(id);
      if (p && p.price) { return p.priceNote; }
    }
    return "ARS";
  }

  function add(id) {
    var p = helpers.getProduct(id);
    if (!p || !helpers.parsePrice(p)) { return; }
    state.items[id] = (state.items[id] || 0) + 1;
    save();
    render();
  }

  function setQty(id, qty) {
    var p = helpers.getProduct(id);
    if (!p || !helpers.parsePrice(p) || qty < 1) {
      delete state.items[id];
    } else {
      state.items[id] = qty;
    }
    save();
    render();
  }

  function clear() {
    state.items = {};
    save();
    render();
  }

  function open() {
    overlay.classList.add("open");
    drawer.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function close() {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function flash(btn) {
    if (!btn) { return; }
    var original = btn.innerHTML;
    btn.innerHTML = "✓ Agregado";
    btn.classList.add("added");
    setTimeout(function () {
      btn.innerHTML = original;
      btn.classList.remove("added");
    }, 1200);
  }

  function waLink() {
    var ids = Object.keys(state.items).sort(function (a, b) {
      var pa = helpers.getProduct(a), pb = helpers.getProduct(b);
      return ((pa && pa.order) || 0) - ((pb && pb.order) || 0);
    });
    var lines = [];
    var subtotal = 0;
    ids.forEach(function (id) {
      var p = helpers.getProduct(id);
      if (!p) { return; }
      var qty = state.items[id];
      var price = helpers.parsePrice(p);
      var line = "• " + p.name + " × " + qty;
      if (price) {
        line += " — " + p.priceNote + " " + helpers.formatARS(price * qty);
        subtotal += price * qty;
      } else {
        line += " — " + p.priceNote;
      }
      lines.push(line);
    });
    var msg = "¡Hola " + CONFIG.brand + "! Quiero hacer un pedido:\n";
    msg += lines.join("\n");
    msg += "\n\nDirección de retiro o envío:\n";
    msg += "(completá acá tu dirección o avisá si es retiro)\n\n";
    msg += "Total: " + priceNote() + " " + helpers.formatARS(subtotal);
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  function waIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2.1 22l4.95-1.5A9.93 9.93 0 1 0 12.04 2Zm5.83 14.13c-.24.69-1.42 1.32-1.98 1.36-.53.04-1.04.17-3.47-.72-2.92-1.07-4.78-3.85-4.93-4.03-.14-.18-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.83 2.01.9 2.15.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.17-.3.37-.43.5-.14.13-.29.28-.12.55.17.26.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.3.14.47.12.64-.07.17-.18.73-.85.93-1.15.19-.29.39-.24.65-.14.26.09 1.67.79 1.95.93.29.14.48.21.55.33.07.11.07.65-.17 1.33Z"/></svg>';
  }

  function render() {
    var ids = Object.keys(state.items).sort(function (a, b) {
      var pa = helpers.getProduct(a), pb = helpers.getProduct(b);
      return ((pa && pa.order) || 0) - ((pb && pb.order) || 0);
    });

    if (!ids.length) {
      bodyEl.innerHTML =
        '<div class="cart-empty">' +
        '  <div class="ce-emoji">🍩</div>' +
        '  <h3 style="font-size:1.25rem;margin-bottom:6px">Tu carrito está vacío</h3>' +
        '  <p style="font-weight:600;color:var(--ink)">Agregá tus capriccitos favoritos y armá tu pedido.</p>' +
        '</div>';
    } else {
      var html = "";
      ids.forEach(function (id) {
        var p = helpers.getProduct(id);
        if (!p) { return; }
        var qty = state.items[id];
        var price = helpers.parsePrice(p);
        var lineTotal = price ? p.priceNote + " " + helpers.formatARS(price * qty) : p.priceNote;
        html +=
          '<div class="cart-item">' +
          '  <span class="ci-emoji">' + (p.emoji || "🍰") + '</span>' +
          '  <div class="ci-info">' +
          '    <span class="ci-name">' + esc(p.name) + '</span>' +
          '    <span class="ci-unit">' + esc(p.priceNote) + ' ' + esc(p.price) + ' c/u</span>' +
          '  </div>' +
          '  <button type="button" class="ci-del" data-cart-del="' + id + '" aria-label="Quitar ' + esc(p.name) + '">✕</button>' +
          '  <div class="ci-stepper">' +
          '    <button type="button" data-cart-dec="' + id + '" aria-label="Quitar una unidad">−</button>' +
          '    <span>' + qty + '</span>' +
          '    <button type="button" data-cart-inc="' + id + '" aria-label="Sumar una unidad">+</button>' +
          '  </div>' +
          '  <span class="ci-total">' + esc(lineTotal) + '</span>' +
          '</div>';
      });
      bodyEl.innerHTML = html;
    }

    var n = count();
    badge.textContent = String(n);
    badge.classList.toggle("hidden", n === 0);
    totalEl.textContent = priceNote() + " " + helpers.formatARS(total());
    checkoutEl.classList.toggle("disabled", n === 0);
    checkoutEl.href = n ? waLink() : "#";
  }

  function buildDOM() {
    var rootEl = document.createElement("div");
    rootEl.innerHTML =
      '<button type="button" class="cart-fab" data-cart-open aria-label="Abrir tu pedido">' +
      '  🛒' +
      '  <span class="cart-badge hidden" data-cart-badge>0</span>' +
      '</button>' +
      '<div class="cart-overlay" data-cart-close></div>' +
      '<aside class="cart-drawer" data-cart-drawer role="dialog" aria-modal="true" aria-label="Tu pedido">' +
      '  <div class="cart-head">' +
      '    <div>' +
      '      <span class="section-eyebrow">Carrito</span>' +
      '      <h3>Tu pedido 🍰</h3>' +
      '    </div>' +
      '    <button type="button" class="cart-close" data-cart-close aria-label="Cerrar">✕</button>' +
      '  </div>' +
      '  <div class="cart-body" data-cart-body></div>' +
      '  <div class="cart-foot-panel">' +
      '    <div class="cart-total-row">' +
      '      <span>Subtotal</span>' +
      '      <span class="cart-total-value" data-cart-total>ARS 0</span>' +
      '    </div>' +
      '    <a class="btn btn-wa cart-checkout" data-cart-checkout href="#" target="_blank" rel="noopener">' +
      waIcon() + 'Pedir por WhatsApp' +
      '    </a>' +
      '    <button type="button" class="cart-clear" data-cart-clear>Vaciar carrito</button>' +
      '    <p class="cart-note">Pickup y envíos coordinados por WhatsApp · San Cristóbal, CABA</p>' +
      '  </div>' +
      '</aside>';

    while (rootEl.firstChild) { document.body.appendChild(rootEl.firstChild); }

    fab = document.querySelector(".cart-fab");
    badge = document.querySelector("[data-cart-badge]");
    overlay = document.querySelector(".cart-overlay");
    drawer = document.querySelector("[data-cart-drawer]");
    bodyEl = document.querySelector("[data-cart-body]");
    totalEl = document.querySelector("[data-cart-total]");
    checkoutEl = document.querySelector("[data-cart-checkout]");
  }

  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest("[data-cart-add]");
    if (addBtn) {
      add(addBtn.getAttribute("data-cart-add"));
      flash(addBtn);
      return;
    }
    var inc = e.target.closest("[data-cart-inc]");
    if (inc) {
      var iId = inc.getAttribute("data-cart-inc");
      setQty(iId, (state.items[iId] || 0) + 1);
      return;
    }
    var dec = e.target.closest("[data-cart-dec]");
    if (dec) {
      var dId = dec.getAttribute("data-cart-dec");
      setQty(dId, (state.items[dId] || 0) - 1);
      return;
    }
    var del = e.target.closest("[data-cart-del]");
    if (del) {
      setQty(del.getAttribute("data-cart-del"), 0);
      return;
    }
    if (e.target.closest("[data-cart-open]")) { open(); return; }
    if (e.target.closest("[data-cart-close]")) { close(); return; }
    if (e.target.closest("[data-cart-clear]")) { clear(); return; }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(); }
  });

  buildDOM();
  render();

  window.CAPRICIOSA = window.CAPRICIOSA || {};
  window.CAPRICIOSA.cart = {
    add: add,
    count: count,
    total: total,
    clear: clear,
    open: open,
    close: close
  };
})();