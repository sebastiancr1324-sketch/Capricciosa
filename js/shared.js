(function () {
  var cfg = CAPRICIOSA.CONFIG;
  var esc = CAPRICIOSA.helpers.escapeHtml;
  var deco = CAPRICIOSA.helpers.deco;

  var favicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍰</text></svg>";

  var navLinks = [
    { href: "index.html", label: "Inicio" },
    { href: "index.html#menu", label: "Menú" },
    { href: "index.html#pedir", label: "Cómo pedir" },
    { href: "index.html#contacto", label: "Contacto" }
  ];

  function navItemsHtml() {
    var h = "";
    for (var i = 0; i < navLinks.length; i++) {
      h += '<li><a href="' + navLinks[i].href + '">' + navLinks[i].label + '</a></li>';
    }
    return h;
  }

  var header = document.getElementById("cabecera");
  if (header) {
    header.innerHTML =
      '<div class="container header-inner">' +
      '  <a class="brand" href="index.html">' +
      '    <img class="brand-logo" src="' + esc(cfg.logoMinimal) + '" alt="Capricciosa" onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.brand-name\').style.display=\'inline\';this.removeAttribute(\'onerror\')">' +
      '    <span class="brand-name">Capricciosa</span>' +
      '  </a>' +
      '  <button type="button" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">' +
      '    <span class="nav-toggle-bar"></span>' +
      '    <span class="nav-toggle-bar"></span>' +
      '    <span class="nav-toggle-bar"></span>' +
      '  </button>' +
      '  <nav class="main-nav" aria-label="Principal"><ul>' + navItemsHtml() + '</ul></nav>' +
      '  <nav class="mobile-nav" id="mobile-nav" aria-label="Principal"><ul>' + navItemsHtml() + '</ul></nav>' +
      '</div>';

    var toggle = header.querySelector(".nav-toggle");
    var mNav = header.querySelector(".mobile-nav");
    if (toggle && mNav) {
      var closeMenu = function (returnFocus) {
        // El menú cerrado deja de ser enfocable: si el foco estaba adentro, vuelve al botón
        var hadFocus = mNav.contains(document.activeElement);
        mNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        if (returnFocus && hadFocus) { toggle.focus(); }
      };
      toggle.addEventListener("click", function () {
        var open = mNav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });
      mNav.addEventListener("click", function (e) {
        if (e.target.closest("a")) { closeMenu(); }
      });
      document.addEventListener("click", function (e) {
        if (mNav.classList.contains("open") && !header.contains(e.target)) { closeMenu(); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mNav.classList.contains("open")) { closeMenu(true); }
      });
    }
  }

  var footer = document.getElementById("contacto");
  if (footer) {
    footer.innerHTML =
      '<div class="container">' +
      '  <div class="footer-grid">' +
      '    <div class="footer-brand">' +
      '      <div class="footer-brand-lockup">' +
      '        <img class="footer-logo" src="' + esc(cfg.logoFull) + '" alt="Capricciosa" onerror="this.style.display=\'none\';var n=this.closest(\'.footer-brand\').querySelector(\'.brand-name\');if(n){n.style.display=\'inline\'}this.removeAttribute(\'onerror\')">' +
      '        <span class="brand-stamp footer-stamp" aria-hidden="true"><img src="img/EstampaVenezuela.jpg" alt="" onerror="this.parentElement.style.display=\'none\'"></span>' +
      '      </div>' +
      '      <span class="brand-name">Capricciosa</span>' +
      '      <p>Postres artesanales hechos con amor y un toque venezolano.</p>' +
      '    </div>' +
      '    <div>' +
      '      <h2>Contacto</h2>' +
      '      <ul>' +
      '        <li>' + deco("📞") + ' <a href="tel:+541168351885">' + esc(cfg.phone) + '</a></li>' +
      '        <li>' + deco("🎂") + ' <a href="https://wa.me/' + cfg.whatsapp + '" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>' +
      '        <li>' + deco("📸") + ' <a href="' + cfg.instagramUrl + '" target="_blank" rel="noopener noreferrer">@' + esc(cfg.instagram) + '</a></li>' +
      '      </ul>' +
      '    </div>' +
      '    <div>' +
      '      <h2>Retiro y envíos</h2>' +
      '      <ul>' +
      '        <li>' + deco("📍") + ' ' + esc(cfg.location) + '</li>' +
      '        <li>' + deco("🧁") + ' Pickup y envíos coordinados</li>' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '  <div class="footer-legal">' +
      '    <a href="privacidad.html">Privacidad</a>' +
      '    <a href="terminos.html">Términos de uso</a>' +
      '    <a href="cookies.html">Política de cookies</a>' +
      '  </div>' +
      '  <p class="footer-note">© ' + new Date().getFullYear() + ' ' + esc(cfg.brand) + ' · Hecho con 💕 y mucha crema</p>' +
      '</div>';

    var fallbackNames = footer.querySelectorAll(".brand-name");
    for (var n = 0; n < fallbackNames.length; n++) {
      fallbackNames[n].style.color = "#fff";
      fallbackNames[n].style.fontFamily = 'var(--font-display)';
      fallbackNames[n].style.fontWeight = '700';
      fallbackNames[n].style.fontSize = '1.3rem';
    }
  }

  var cta = document.getElementById("cta-wa");
  if (cta) { cta.href = CAPRICIOSA.helpers.waGeneralLink(); }

  var probe = new Image();
  probe.onerror = function () {
    var links = document.querySelectorAll('link[rel="icon"]');
    for (var i = 0; i < links.length; i++) {
      links[i].href = favicon;
    }
  };
  probe.src = cfg.logoMinimal;
})();