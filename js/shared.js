(function () {
  var cfg = CAPRICIOSA.CONFIG;
  var esc = CAPRICIOSA.helpers.escapeHtml;

  var favicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍰</text></svg>";

  var header = document.getElementById("cabecera");
  if (header) {
    header.innerHTML =
      '<div class="container header-inner">' +
      '  <a class="brand" href="index.html">' +
      '    <img class="brand-logo" src="' + esc(cfg.logoMinimal) + '" alt="Capricciosa" onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.brand-name\').style.display=\'inline\';this.removeAttribute(\'onerror\')">' +
      '    <span class="brand-name">Capricciosa</span>' +
      '  </a>' +
      '  <nav class="main-nav" aria-label="Principal">' +
      '    <ul>' +
      '      <li><a href="index.html">Inicio</a></li>' +
      '      <li><a href="index.html#menu">Menú</a></li>' +
      '      <li><a href="index.html#pedir">Cómo pedir</a></li>' +
      '      <li><a href="index.html#contacto">Contacto</a></li>' +
      '    </ul>' +
      '  </nav>' +
      '  <a class="wa-cta" target="_blank" rel="noopener" aria-label="Pedir por WhatsApp" href="' + CAPRICIOSA.helpers.waGeneralLink() + '">' +
      waIcon() + 'Pedir por WhatsApp</a>' +
      '</div>';
  }

  var footer = document.getElementById("contacto");
  if (footer) {
    footer.innerHTML =
      '<div class="container">' +
      '  <div class="footer-grid">' +
      '    <div class="footer-brand">' +
      '      <img class="footer-logo" src="' + esc(cfg.logoFull) + '" alt="Capricciosa" onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.brand-name\').style.display=\'inline\';this.removeAttribute(\'onerror\')">' +
      '      <span class="brand-name">Capricciosa</span>' +
      '      <p>Postres artesanales hechos con amor y un toque venezolano.</p>' +
      '    </div>' +
      '    <div>' +
      '      <h3>Contacto</h3>' +
      '      <ul>' +
      '        <li>📞 <a href="tel:+541168351885">' + esc(cfg.phone) + '</a></li>' +
      '        <li>🎂 <a href="https://wa.me/' + cfg.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
      '        <li>📸 <a href="' + cfg.instagramUrl + '" target="_blank" rel="noopener">@' + esc(cfg.instagram) + '</a></li>' +
      '      </ul>' +
      '    </div>' +
      '    <div>' +
      '      <h3>Retiro y envíos</h3>' +
      '      <ul>' +
      '        <li>📍 ' + esc(cfg.location) + '</li>' +
      '        <li>🧁 Pickup y envíos coordinados</li>' +
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

  function waIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2.1 22l4.95-1.5A9.93 9.93 0 1 0 12.04 2Zm5.83 14.13c-.24.69-1.42 1.32-1.98 1.36-.53.04-1.04.17-3.47-.72-2.92-1.07-4.78-3.85-4.93-4.03-.14-.18-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.83 2.01.9 2.15.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.17-.3.37-.43.5-.14.13-.29.28-.12.55.17.26.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.3.14.47.12.64-.07.17-.18.73-.85.93-1.15.19-.29.39-.24.65-.14.26.09 1.67.79 1.95.93.29.14.48.21.55.33.07.11.07.65-.17 1.33Z"/></svg>';
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