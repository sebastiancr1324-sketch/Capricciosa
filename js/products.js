window.CAPRICIOSA = window.CAPRICIOSA || {};

CAPRICIOSA.CONFIG = {
  brand: "Capricciosa",
  whatsapp: "5491168351885",
  phone: "(11) 6835 1885",
  instagram: "capricciosa_ve",
  instagramUrl: "https://www.instagram.com/capricciosa_ve",
  location: "Pickup y envíos · San Cristóbal, CABA",
  logoMinimal: "img/CapricciosaMinimalistaLogo.jpg",
  logoFull: "img/CapricciosaLogoCompleto.jpg"
};

CAPRICIOSA.CATEGORIES = {
  "nuvole":   { label: "Nuvole",   color: "#FFF7B4" },
  "clasicos": { label: "Clásicos", color: "#FFF7B4" },
  "premium":  { label: "Premium",  color: "#FD97D6" },
  "bebidas":  { label: "Bebidas",  color: "#FFDFEF" }
};

CAPRICIOSA.PRODUCTS = [
  {
    id: "tres-leches",
    name: "Tres Leches",
    subtitle: "Nuvola",
    category: "nuvole",
    price: "12.000",
    priceNote: "ARS",
    size: "495 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "6 porciones",
    description: "Bizcochuelo de vainilla humedecido con 3 leches, coronado con un merengue liviano y lluvia de canela.",
    keywords: ["vainilla", "3 leches", "merengue", "canela"],
    sticker: "3L",
    emoji: "🍰",
    image: "img/TresLeches.jpg",
    order: 1
  },
  {
    id: "nuvola-chocolate",
    name: "Nuvola Chocolate",
    subtitle: "Por encargo",
    category: "nuvole",
    price: null,
    priceNote: "Por encargo",
    size: "Aprox. 500 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "6 porciones",
    description: "Bizcochuelo de vainilla humedecido con 3 leches con un toque de chocolate.",
    keywords: ["vainilla", "3 leches", "chocolate"],
    sticker: "Nu",
    emoji: "🍫",
    image: "img/NuvolaChocolate.jpeg",
    order: 2
  },
  {
    id: "nuvola-nutella",
    name: "Nuvola Nutella",
    subtitle: "Por encargo",
    category: "nuvole",
    price: null,
    priceNote: "Por encargo",
    size: "Aprox. 500 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "6 porciones",
    description: "Bizcochuelo de vainilla relleno de Nutella, humedecido con 3 leches.",
    keywords: ["vainilla", "3 leches", "nutella"],
    sticker: "Nu",
    emoji: "🥜",
    image: "img/NuvolaNutella.jpg",
    order: 3
  },
  {
    id: "nuvola-xl",
    name: "Nuvola XL",
    subtitle: "Por encargo",
    category: "nuvole",
    price: null,
    priceNote: "Por encargo",
    size: "Aprox. 1 kg.",
    dimensions: "Molde XL de 24 cm",
    portions: "12 porciones",
    description: "Bizcochuelo de vainilla humedecido con 3 leches en versión XL para compartir.",
    keywords: ["vainilla", "3 leches", "XL"],
    sticker: "XL",
    emoji: "🍮",
    image: "img/NuvolaXl.jpg",
    order: 4
  },
  {
    id: "capriccio",
    name: "Capriccio",
    subtitle: "Marquesa clásica",
    category: "clasicos",
    price: "7.000",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Clásica torta marquesa venezolana elaborada con capas de galletas y una cremosa mezcla de chocolate.",
    keywords: ["galletas", "chocolate", "marquesa"],
    sticker: "C",
    emoji: "🍩",
    image: "img/Capriccio.jpg",
    order: 5
  },
  {
    id: "capriccio-lemon-pie",
    name: "Capriccio Lemon Pie",
    subtitle: "Cítrico",
    category: "clasicos",
    price: "7.000",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Delicada crema de limón con capas de galletas coronada con merengue y limón.",
    keywords: ["limón", "galletas", "merengue"],
    sticker: "LP",
    emoji: "🍋",
    image: "img/CapriccioLemonPie.jpg",
    order: 6
  },
  {
    id: "capriccio-oreo",
    name: "Capriccio Oreo",
    subtitle: "Marquesa con topping",
    category: "clasicos",
    price: "8.500",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Clásica torta marquesa venezolana con topping de alfajor de Oreo triple.",
    keywords: ["galletas", "oreo", "marquesa"],
    sticker: "Or",
    emoji: "🍪",
    image: "img/CapriccioOreo.jpg",
    order: 7
  },
  {
    id: "capriccio-samba",
    name: "Capriccio Samba",
    subtitle: "Marquesa con frutilla",
    category: "premium",
    price: "9.500",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Clásica torta marquesa venezolana con topping de Samba® de frutilla.",
    keywords: ["galletas", "frutilla", "samba"],
    sticker: "Sa",
    emoji: "🍓",
    image: "img/CapriccioSamba.jpg",
    order: 8
  },
  {
    id: "capriccio-cricri",
    name: "Capriccio Cricri®",
    subtitle: "Sabor venezolano",
    category: "premium",
    price: "9.500",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Clásica torta marquesa venezolana con chocolate savey Cricri® con sabor venezolano.",
    keywords: ["galletas", "cricri", "chocolate"],
    sticker: "Cr",
    emoji: "🍫",
    image: "img/CapriccioCricri.jpg",
    order: 9
  },
  {
    id: "capriccio-pirulin-nutella",
    name: "Capriccio Pirulín & Nutella",
    subtitle: "Edición premium",
    category: "premium",
    price: "12.500",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Clásica marquesa venezolana con capas de galletas, crema de chocolate y el inconfundible sabor del pirulín y la nutella.",
    keywords: ["galletas", "pirulín", "nutella"],
    sticker: "P&N",
    emoji: "🍬",
    image: "img/CapriccioPirulin.jpg",
    order: 10
  },
  {
    id: "capriccio-ferrero-nutella",
    name: "Capriccio Ferrero & Nutella",
    subtitle: "Edición premium",
    category: "premium",
    price: "12.500",
    priceNote: "ARS",
    size: "Aprox. 700 gr.",
    dimensions: "Molde redondo de 18 cm",
    portions: "8 porciones",
    description: "Inspirada en los amantes del chocolate intenso y las avellanas, combina capas suaves de crema de chocolate y galletas con topping de Ferrero Rocher.",
    keywords: ["galletas", "ferrero", "avellanas"],
    sticker: "F&N",
    emoji: "🍒",
    image: "img/CapricciosaFerrero.jpg",
    order: 11
  },
  {
    id: "malta-58",
    name: "Malta +58",
    subtitle: "Malta venezolana",
    category: "bebidas",
    price: "3.000",
    priceNote: "ARS",
    size: "473 ml",
    dimensions: "Botella individual",
    portions: null,
    description: "Malta venezolana sin alcohol: malteada, oscura y bien dulce, con notas de cereal tostado. Se toma bien fría.",
    keywords: ["malta", "sin alcohol", "venezolana"],
    sticker: "58",
    emoji: "🍺",
    image: "img/Malta58.jpeg",
    order: 12
  },
  {
    id: "rekolita",
    name: "Rekolita",
    subtitle: "Cola venezolana",
    category: "bebidas",
    price: "2.500",
    priceNote: "ARS",
    size: "500 ml",
    dimensions: "Botella individual",
    portions: null,
    description: "Gaseosa venezolana sabor kola de Reko Bebidas. Dulce, burbujeante y con sabor de casa.",
    keywords: ["gaseosa", "kola", "venezolana"],
    sticker: "Rk",
    emoji: "🥤",
    image: "img/Rekolita.jpeg",
    order: 13
  },
  {
    id: "rekopina",
    name: "Rekopiña",
    subtitle: "Sabor piña",
    category: "bebidas",
    price: "2.500",
    priceNote: "ARS",
    size: "500 ml",
    dimensions: "Botella individual",
    portions: null,
    description: "Gaseosa venezolana sabor piña de Reko Bebidas. Refrescante, chispeante y ligeramente ácida.",
    keywords: ["gaseosa", "piña", "venezolana"],
    sticker: "Rp",
    emoji: "🍍",
    image: "img/Rekopina.jpg",
    order: 14
  }
];

CAPRICIOSA.helpers = {
  getProduct: function (id) {
    return CAPRICIOSA.PRODUCTS.find(function (p) { return p.id === id; });
  },
  productUrl: function (id) {
    return "product.html?producto=" + encodeURIComponent(id);
  },
  formatPrice: function (product) {
    return product.price ? product.priceNote + " " + product.price : product.priceNote;
  },
  waMessage: function (product) {
    var base = "¡Hola " + CAPRICIOSA.CONFIG.brand + "! 🍰 Quiero hacer un pedido: ";
    var line = product ? product.name : "";
    var extra = product && !product.price ? " ¿Me pasás más información y precio?" : "";
    return encodeURIComponent(base + line + extra);
  },
  waOrderLink: function (product) {
    return "https://wa.me/" + CAPRICIOSA.CONFIG.whatsapp + "?text=" + CAPRICIOSA.helpers.waMessage(product);
  },
  waGeneralLink: function () {
    return "https://wa.me/" + CAPRICIOSA.CONFIG.whatsapp + "?text=" + encodeURIComponent("¡Hola " + CAPRICIOSA.CONFIG.brand + "! Quiero hacer un pedido.");
  },
  imgPlaceholder: function (product) {
    var cat = CAPRICIOSA.CATEGORIES[product.category] || { color: "#FD97D6" };
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">' +
      '<rect width="100%" height="100%" fill="' + cat.color + '"/>' +
      '<circle cx="320" cy="210" r="120" fill="#FFFFFF" opacity="0.9"/>' +
      '<text x="320" y="245" font-size="100" text-anchor="middle">' + product.emoji + '</text>' +
      '<text x="320" y="390" font-family="Anton, Arial, sans-serif" font-size="46" font-weight="400" text-anchor="middle" fill="#662F00">' + String(product.sticker).replace(/&/g, "&amp;") + '</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  },
  addToCartButton: function (product) {
    if (!product || !product.price) { return ""; }
    return '<button type="button" class="add-btn" data-cart-add="' + product.id + '" aria-label="Agregar ' + product.name + ' al carrito">+ Agregar</button>';
  },
  parsePrice: function (product) {
    if (!product || !product.price) { return null; }
    var n = parseInt(String(product.price).replace(/[^0-9]/g, ""), 10);
    return isNaN(n) ? null : n;
  },
  formatARS: function (n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  escapeHtml: function (str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
};

window.capriciosaImg = function (img) {
  var p = img && img.dataset ? CAPRICIOSA.helpers.getProduct(img.dataset.pid) : null;
  if (img) {
    img.onerror = null;
    if (p) { img.src = CAPRICIOSA.helpers.imgPlaceholder(p); }
  }
};

window.CAPRICIOSA.imgSweep = function () {
  var imgs = document.querySelectorAll("img[data-pid]");
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.src.indexOf("data:image/svg") === 0) { continue; }
    if (img.complete && img.naturalWidth === 0) {
      window.capriciosaImg(img);
    } else if (!img.complete) {
      img.addEventListener("error", function () { window.capriciosaImg(this); });
    }
  }
};

window.addEventListener("load", window.CAPRICIOSA.imgSweep);
setTimeout(window.CAPRICIOSA.imgSweep, 2500);