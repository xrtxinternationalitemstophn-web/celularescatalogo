/******************************************
 * 🔹 RAUDA SHOP - SCRIPT COMPLETO 🔹
 ******************************************/

// === LISTA DE PRODUCTOS ===
const products = [
  // === agregado 3 diciembre ===
  {
  name: "iPhone 8 Plus 256GB 100% BATERIA 10/10",
  price: 3600.00,
  categories: ["iPhone"],
  description: [
    "INCLUYE:",
    "Vidrio Templado pantalla, Cargador.",
    "Cobertor anticaidas reforzado."
  ],
  images: [
    "images/iphone84.jpg",
    "images/iphone81.jpg",
    "images/iphone82.jpg",
    "images/iphone83.jpg",
    "images/iphone85.jpg",
    "images/iphone86.jpg",
    "images/iphone87.jpg",
    "images/iphone88.jpg"
  ]
},
  {
  name: "Samsung S24 Ultra 256GB 10/10",
  price: 16899.00,
  categories: ["Android"],
  description: [
    "INCLUYE:",
    "Vidrio Full pantalla GRATIS.",
    "Cobertor anticaidas reforzado GRATIS.",
    "Si quiere cargador 20w +140 lps"
  ],
  images: [
    "images/s24x1.jpg",
    "images/s24x2.jpg",
    "images/s24x3.jpg",
    "images/s24x4.jpg",
    "images/s24x5.jpg",
    "images/s24x6.jpg"
  ]
},
  {
  name: "Vivo x200 Pro 1TB 97% 10/10",
  price: 40000.00,
  categories: ["Android"],
  description: [
    "INCLUYE:",
    "Vidrio Templado Pantalla, Cargador 90W Original.",
    "Cobertor Anticaidas Resistente y cubre incluso Camaras."
  ],
  images: [
    "images/x2001.png",
    "images/x2002.png",
    "images/x2003.png",
    "images/x2004.png"
  ]
},
  {
  name: "Infinix GT20 Pro 256GB 24RAM 9.5/10",
  price: 6600.00,
  categories: ["Android"],
  description: [
    "INCLUYE:",
    "Vidrio de Pantalla, Cargador Original de 45W",
    "Cobertor Resistente de los gruesos."
  ],
  images: [
    "images/gt204.png",
    "images/gt202.png",
    "images/gt203.png",
    "images/gt201.png",
    "images/gt205.jpg",
    "images/gt206.jpg"
  ]
},
 {
  name: "Samsung Tab S10 FE 128GB 6 MESES DE GARANTIA NUEVA CON SU S-PEN NUEVA DE CAJA",
  price: 9500.00,
  categories: ["Android", "Tablets y iPads"],
  description: [
    "Rendimiento superior y fluido, ideal para trabajo, estudio y entretenimiento con su procesador optimizado.",
    "Incluye S-Pen original, perfecta para tomar notas, dibujar y trabajar con precisión profesional.",
    "Garantía de 1 año y totalmente nueva en caja, ofreciéndote seguridad, estilo y tecnología Samsung de última generación."
  ],
  images: [
    "images/tabs101.jpg",
    "images/tabs102.jpg",
    "images/tabs103.jpg"
  ]
}





  
];

// === CONFIGURACIÓN ===
// === EMAILJS CONFIG ===
// === EMAILJS CONFIG ===
const EMAILJS_PUBLIC_KEY = "XwKAz-6miwjRCNBcd";
const EMAILJS_SERVICE_ID = "service_internathntop";

// Usa el template que ya te funcionó en tu página de prueba (pedidos):
const EMAILJS_PEDIDOS_TEMPLATE = "template_sx8s0c5";

// Crea uno en EmailJS para “Contacto” con variables: nombre, correo, mensaje
// y reemplaza este ID por el real que te dé EmailJS:
const EMAILJS_CONTACTO_TEMPLATE = "template_contacto";


if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
} else {
  console.error("Email no se cargó");
}


// === FORMATEADOR DE MONEDA ===
const formatLempiras = amount =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(amount);

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");
const closeCart = document.getElementById("close-cart");
const closeCheckout = document.getElementById("close-checkout");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutForm = document.getElementById("checkout-form");
const checkoutBtn = document.getElementById("checkout-btn");

// === BOTÓN FLOTANTE (DRAG + TAP FIABLE EN TODOS LOS DISPOSITIVOS) ===
const floatingCart = document.getElementById("floating-cart");
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let offset = { x: 0, y: 0 };

// Iniciar movimiento o detectar toque
floatingCart.addEventListener("pointerdown", e => {
  floatingCart.setPointerCapture(e.pointerId);
  isDragging = false;
  dragStart = { x: e.clientX, y: e.clientY };
  const rect = floatingCart.getBoundingClientRect();
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;
});

// Detectar movimiento real
floatingCart.addEventListener("pointermove", e => {
  if (e.pressure === 0) return; // dedo levantado
  const dx = Math.abs(e.clientX - dragStart.x);
  const dy = Math.abs(e.clientY - dragStart.y);
  if (dx > 5 || dy > 5) {
    isDragging = true;
    moveFloatingCart(e.clientX, e.clientY);
  }
});

// Finalizar movimiento o toque
floatingCart.addEventListener("pointerup", e => {
  floatingCart.releasePointerCapture(e.pointerId);
  if (!isDragging) {
    e.preventDefault();
    openCartModal(); // 👉 tap corto = abrir carrito
  } else {
    isDragging = false;
  }
});

function moveFloatingCart(x, y) {
  const buttonWidth = floatingCart.offsetWidth;
  const buttonHeight = floatingCart.offsetHeight;
  let newX = x - offset.x;
  let newY = y - offset.y;

  // Limitar a bordes de pantalla
  const maxX = window.innerWidth - buttonWidth - 5;
  const maxY = window.innerHeight - buttonHeight - 5;
  newX = Math.min(Math.max(newX, 5), maxX);
  newY = Math.min(Math.max(newY, 5), maxY);

  floatingCart.style.left = `${newX}px`;
  floatingCart.style.top = `${newY}px`;
  floatingCart.style.right = "auto";
  floatingCart.style.bottom = "auto";
}

function openCartModal() {
  cartModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

// Mostrar/ocultar según scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) floatingCart.classList.remove("hidden");
  else floatingCart.classList.add("hidden");
});



const floatingCartCount = document.getElementById("floating-cart-count");

// Mostrar/ocultar según scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) floatingCart.classList.remove("hidden");
  else floatingCart.classList.add("hidden");
});





// Sincronizar cantidad del carrito
function updateFloatingCartCount() {
  // 🔹 Contador exacto: suma las cantidades de todos los productos
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  // 🔹 Actualiza el numerito rojo
  floatingCartCount.textContent = totalQty;

  // 🔹 Animación pequeña al cambiar
  floatingCartCount.classList.add("bounce");
  setTimeout(() => floatingCartCount.classList.remove("bounce"), 300);
}





let cart = [];

/* === RENDERIZAR PRODUCTOS CON SLIDER === */
function renderProducts(list = products) {
  productList.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <div class="slider" id="slider-${i}">
        <div class="slides-container">
          ${p.images.map((img, index) => `
            <img src="${img}" class="slide ${index === 0 ? "active" : ""}" alt="${p.name}">
          `).join("")}
        </div>
        <button class="prev" data-index="${i}">❮</button>
        <button class="next" data-index="${i}">❯</button>
      </div>
      <h3>${p.name}</h3>
      <p class="price">${formatLempiras(p.price)}</p>

      <ul class="description">
        ${(p.description || []).map(d => `<li>⭐ ${d}</li>`).join("")}
      </ul>

      <button class="add-btn" onclick="addToCart(${i})">Agregar al carrito</button>
    `;

    productList.appendChild(card);
  });

  initSliders();
}


/* === SLIDERS AUTOMÁTICOS Y MANUALES === */
let slideIndices = [];
let slideIntervals = [];

function initSliders() {
  products.forEach((_, i) => {
    slideIndices[i] = 0;
    const slides = document.querySelectorAll(`#slider-${i} .slide`);
    const prevBtn = document.querySelector(`#slider-${i} .prev`);
    const nextBtn = document.querySelector(`#slider-${i} .next`);

    // Mostrar flechas
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    // Botones manuales
    prevBtn.addEventListener("click", () => changeSlide(i, -1));
    nextBtn.addEventListener("click", () => changeSlide(i, 1));

    // Auto cambio cada 3 segundos
    clearInterval(slideIntervals[i]);
    slideIntervals[i] = setInterval(() => changeSlide(i, 1), 3000);
  });
}

function changeSlide(productIndex, direction) {
  const slides = document.querySelectorAll(`#slider-${productIndex} .slide`);
  if (!slides.length) return;
  slides[slideIndices[productIndex]].classList.remove("active");
  slideIndices[productIndex] =
    (slideIndices[productIndex] + direction + slides.length) % slides.length;
  slides[slideIndices[productIndex]].classList.add("active");
}

/* === CARRITO === */

// 🔹 Animación de rebote cuando se agrega un producto
function bounceFloatingCart() {
  floatingCart.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.25)" },
      { transform: "scale(1)" }
    ],
    { duration: 400, easing: "ease-out" }
  );
}

function addToCart(i) {
  const product = products[i];
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1; // 🔹 Incrementa cantidad
  } else {
    cart.push({ ...product, qty: 1 }); // 🔹 Nuevo producto con cantidad 1
  }

  updateCart();
  showToast("Producto agregado 🛒");
  bounceFloatingCart();
  updateFloatingCartCount(); // 🔹 fuerza actualización inmediata del contador flotante

}




function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div class="cart-item-info">
        <p><strong>${item.name}</strong></p>
        <p class="price">${formatLempiras(item.price)} × ${item.qty}</p>
      </div>
      <div class="cart-item-actions">
        <button onclick="changeQty(${i}, -1)">−</button>
        <input type="number" min="1" value="${item.qty}" onchange="setQty(${i}, this.value)">
        <button onclick="changeQty(${i}, 1)">+</button>
        <button class="remove" onclick="removeFromCart(${i})">🗑️</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  // ✅ Actualiza total con formato hondureño
  cartTotal.textContent = formatLempiras(total);

  // 💫 Pequeño efecto visual
  cartTotal.classList.add("highlight");
  setTimeout(() => cartTotal.classList.remove("highlight"), 400);

  // 🔹 Actualizar contadores
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
  updateFloatingCartCount();

  // 🔄 Mantener sincronizado el recuadro de envío (subtotal/envío/total)
  if (typeof updateCheckoutTotals === "function") updateCheckoutTotals();

  // 💾 Guardar carrito persistente
  try {
    if (typeof saveCart === 'function') saveCart();
    else localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {}
}




function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart[index].qty = 1;
  updateCart();
}

function setQty(index, value) {
  const val = parseInt(value);
  if (!isNaN(val) && val > 0) {
    cart[index].qty = val;
    updateCart();
  }
}



function removeFromCart(i) {
  cart.splice(i, 1);
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartModal.classList.toggle("hidden");
  document.body.classList.toggle("modal-open");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
});

// 🔹 Cerrar carrito al hacer clic fuera del contenido
cartModal.addEventListener("click", e => {
  if (e.target === cartModal) {
    cartModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
});


closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
});

// 🔹 Cerrar checkout tocando fuera del modal
checkoutModal.addEventListener("click", e => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío 🛒");
  } else {
    cartModal.classList.add("hidden");
    checkoutModal.classList.remove("hidden");
    document.body.classList.add("modal-open"); // 🔹 agrega esto
    try { updateCheckoutTotals(); } catch {}
  }
});

// Enlazar select de envío y preparar totales al abrir el checkout
const direccionSelect = document.getElementById("direccion_envio");
if (direccionSelect) {
  direccionSelect.addEventListener("change", updateCheckoutTotals);
}
// Refrescar totales cuando se abra el checkout
try { updateCheckoutTotals(); } catch {}


// === ABRIR CARRITO DESDE EL BOTÓN FLOTANTE (PC + MÓVILES) ===
// === ABRIR CARRITO DESDE EL BOTÓN FLOTANTE (PC + MÓVILES, SIN BUGS) ===
let touchStartTime = 0;

floatingCart.addEventListener("touchstart", () => {
  touchStartTime = Date.now();
});

floatingCart.addEventListener("touchend", e => {
  const touchDuration = Date.now() - touchStartTime;
  // Evitar activar si fue arrastre o toque muy largo
  if (isDragging || touchDuration > 250) return;
  e.preventDefault();
  openCartModal();
});

floatingCart.addEventListener("click", e => {
  if (isDragging) return;
  e.preventDefault();
  openCartModal();
});

function openCartModal() {
  if (navigator.vibrate) navigator.vibrate(40);
  cartModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}


// === ENVÍO (shipping) ===
const FREE_SHIPPING_THRESHOLD = 2500;

function getCartSubtotal(){
  try { return cart.reduce((s,i)=> s + (i.price * i.qty), 0) } catch { return 0; }
}

function getSelectedShipping(){
  const sel = document.getElementById('direccion_envio');
  if (!sel) return { area: "", cost: 0 };
  const opt = sel.options[sel.selectedIndex];
  const area = opt?.value || "";
  const cost = Number(opt?.dataset?.cost || 0);
  return { area, cost };
}

function computeShippingCost(subtotal, baseCost){
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return baseCost;
}

function updateCheckoutTotals(){
  const subtotal = getCartSubtotal();
  const { area, cost } = getSelectedShipping();
  const shipping = computeShippingCost(subtotal, cost);
  const total = subtotal + (area ? shipping : 0);

  const $ = s => document.querySelector(s);
  const put = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };

  put("#subtotal-checkout", typeof formatLempiras === "function" ? formatLempiras(subtotal) : subtotal);
  put("#envio-valor", area ? (typeof formatLempiras === "function" ? formatLempiras(shipping) : shipping) : "—");
  put("#total-checkout", typeof formatLempiras === "function" ? formatLempiras(total) : total);

  // Snapshot para otras páginas
  try {
    localStorage.setItem("shipping_snapshot", JSON.stringify({
      area, baseCost: cost, shipping, subtotal, total
    }));
  } catch {}
}

/* === ENVÍO: LISTAS POR VENDEDOR Y TOTALES === */
// Referencias del formulario (existen en index)
const vendedorSel = document.getElementById('vendedor_aten');
const dirSel      = document.getElementById('direccion_envio');

const vendedorOtro = document.getElementById('vendedor_otro');

function getVendedor() {
  const sel = vendedorSel?.value || "";
  if (sel === "Otro") {
    const nom = (vendedorOtro?.value || "").trim();
    return nom || "";
  }
  return sel;
}



// 🧭 Listas
const DIRECCIONES_MAYRA_OTRO = [
  { text: "15 DE SEPTIEMBRE", cost: 80 },
  { text: "ALTOS DE LOARQUE (MIRADOR)", cost: 90 },
  { text: "ALTOS DE TONCONTIN", cost: 80 },
  { text: "AMERICA", cost: 80 },
  { text: "CASCADAS CITY", cost: 80 },
  { text: "CIUDAD NUEVA", cost: 80 },
  { text: "COLONIA LOARQUE", cost: 90 },
  { text: "COLONIA SATELITE", cost: 90 },
  { text: "EL SAUCE", cost: 90 },
  { text: "LA ARBOLEDA", cost: 100 },
  { text: "LA CATOLICA", cost: 90 },
  { text: "LA CONCEPCION", cost: 100 },
  { text: "LA GODOY", cost: 80 },
  { text: "LA MIRAFLores", cost: 80 },
  { text: "LAS CASITAS", cost: 100 },
  { text: "LAS COLINAS", cost: 80 },
  { text: "LAS HADAS", cost: 80 },
  { text: "LAS LOMAS", cost: 80 },
  { text: "LAS MINITAS", cost: 80 },
  { text: "LAS UVAS", cost: 90 },
  { text: "LOMA LINDA", cost: 80 },
  { text: "LOMA VERDE", cost: 80 },
  { text: "LOMAS DE TILOARQUE", cost: 80 },
  { text: "LOMAS DEL TONCONTIN", cost: 80 },
  { text: "MIRADOR DE LOS ANGELES", cost: 100 },
  { text: "MIRAMONTES", cost: 80 },
  { text: "PALMA REAL", cost: 90 },
  { text: "PERIODISTA", cost: 80 },
  { text: "PRADOS UNIVERSITARIOS", cost: 90 },
  { text: "RESIDENCIA PLAZA", cost: 80 },
  { text: "RESIDENCIAL CENTROAMERICA", cost: 80 },
  { text: "RESIDENCIAL EUCALIPTO", cost: 90 },
  { text: "RESIDENCIAL LAS CASITAS", cost: 120 },
  { text: "RESIDENCIAL LOS HIDALGOS", cost: 100 },
  { text: "RESIDENCIAL LOS ROBLES", cost: 90 },
  { text: "RESIDENCIAL VENECIA", cost: 80 },
  { text: "ROBLE OESTE", cost: 90 },
  { text: "SAN IGNACIO", cost: 80 },
  { text: "SAN SEBASTIAN", cost: 130 },
  { text: "VICTOR F. ARDON", cost: 80 },
  { text: "ALTOS DE LA GRANJA", cost: 80 },
  { text: "ALTOS DE LA JOYA", cost: 80 },
  { text: "BELLA ORIENTE", cost: 90 },
  { text: "BLV JUAN PABLO SEGUNDO", cost: 80 },
  { text: "BO EL CENTRO", cost: 80 },
  { text: "BO LA BOLSA", cost: 80 },
  { text: "BO MORAZAN", cost: 80 },
  { text: "BOULERVAR KUWAIT", cost: 80 },
  { text: "COL 3 CAMINOS", cost: 80 },
  { text: "COL 15 DE SEPTIEMBRE", cost: 80 },
  { text: "COL BERNARDO DACI", cost: 80 },
  { text: "COL KENNEDY", cost: 80 },
  { text: "COL LUIS LANDA", cost: 80 },
  { text: "COL MAYANGLE", cost: 80 },
  { text: "COL SAN ANGEL", cost: 80 },
  { text: "COL TEPEYAC", cost: 80 },
  { text: "COL SATELITE", cost: 90 },
  { text: "COLONIA LA VEGA", cost: 80 },
  { text: "ECOVIVIENDA", cost: 90 },
  { text: "EL ALAMO", cost: 80 },
  { text: "EL HOGAR", cost: 80 },
  { text: "EL PRADO", cost: 80 },
  { text: "LA ALAMEDA", cost: 80 },
  { text: "LA FLORENCIA", cost: 80 },
  { text: "LA GRANJA", cost: 80 },
  { text: "LA HUMUYA", cost: 80 },
  { text: "LA MARADIAGA", cost: 80 },
  { text: "VENECIA", cost: 90 },
 { text: "EL LADO DE LA QUESADA", cost: 100 },
{ text: "LA ULLOA", cost: 100 },
{ text: "ORILLA DEL ANILLO EL DIVINO PARAISO", cost: 100 },
{ text: "LA SAN MIGUEL", cost: 100 },
{ text: "LA TRAVESÍA (CALLE PRINCIPAL, NO SE PASA DEL PALO)", cost: 100 },
{ text: "CERRO GRANDE ZONA 1/2/3", cost: 90 },
{ text: "CERRO GRANDE ZONA 4", cost: 100 },
{ text: "CERRO GRANDE ZONA 8", cost: 120 },
{ text: "LA RONDA", cost: 90 },
{ text: "EL BOSQUE", cost: 100 },
{ text: "BUENOS AIRES (CALLE PRINCIPAL)", cost: 100 },
{ text: "EL MANCHEN", cost: 90 },
{ text: "21 DE OCTUBRE", cost: 100 }
];

const DIRECCIONES_EDITH_RIGO = [
  { text: "15 DE SEPTIEMBRE", cost: 80 },
  { text: "ALTOS DE TONCONTIN", cost: 80 },
  { text: "CASCADAS CITY", cost: 80 },
  { text: "COLONIA LOARQUE", cost: 100 },
  { text: "EL SAUCE", cost: 100 },
  { text: "LA CATOLICA", cost: 80 },
  { text: "LA GODOY", cost: 80 },
  { text: "LAS CASITAS", cost: 100 },
  { text: "LAS HADAS", cost: 100 },
  { text: "LAS MINITAS", cost: 80 },
  { text: "LOMA LINDA", cost: 80 },
  { text: "LOMAS DE TILOARQUE", cost: 80 },
  { text: "MIRADOR DE LOS ANGELES", cost: 100 },
  { text: "MONTELIMAR", cost: 80 },
  { text: "PERIODISTA", cost: 80 },
  { text: "RESIDENCIA PLAZA", cost: 80 },
  { text: "RESIDENCIAL EUCALIPTO", cost: 100 },
  { text: "RESIDENCIAL LOS HIDALGOS", cost: 100 },
  { text: "RESIDENCIAL VENECIA", cost: 100 },
  { text: "SAN IGNACIO", cost: 80 },
  { text: "VICTOR F. ARDON", cost: 80 },
  { text: "ALTOS DE LOARQUE (MIRADOR)", cost: 100 },
  { text: "AMERICA", cost: 80 },
  { text: "CIUDAD NUEVA", cost: 80 },
  { text: "COLONIA SATELITE", cost: 100 },
  { text: "LA ARBOLEDA", cost: 100 },
  { text: "LA CONCEPCION", cost: 80 },
  { text: "LA MIRAFLores", cost: 80 },
  { text: "LAS COLINAS", cost: 80 },
  { text: "LAS LOMAS", cost: 80 },
  { text: "LAS UVAS", cost: 100 },
  { text: "LOMA VERDE", cost: 100 },
  { text: "LOMAS DEL TONCONTIN", cost: 80 },
  { text: "MIRAMONTES", cost: 80 },
  { text: "PALMA REAL", cost: 100 },
  { text: "PRADOS UNIVERSITARIOS", cost: 100 },
  { text: "RESIDENCIAL CENTROAMERICA", cost: 100 },
  { text: "RESIDENCIAL LAS CASITAS", cost: 100 },
  { text: "RESIDENCIAL LOS ROBLES", cost: 100 },
  { text: "ROBLE OESTE", cost: 100 },
  { text: "SAN SEBASTIAN", cost: 120 },
  { text: "ALTOS DE LA GRANJA", cost: 80 },
  { text: "ALTOS DE LA JOYA", cost: 80 },
  { text: "BELLA ORIENTE", cost: 80 },
  { text: "BLV JUAN PABLO SEGUNDO", cost: 80 },
  { text: "BO EL CENTRO", cost: 80 },
  { text: "BO LA BOLSA", cost: 80 },
  { text: "BO MORAZAN", cost: 80 },
  { text: "BOULERVAR KUWAIT", cost: 80 },
  { text: "COL 3 CAMINOS", cost: 80 },
  { text: "COL 15 DE SEPTIEMBRE", cost: 80 },
  { text: "COL BERNARDO DACI", cost: 80 },
  { text: "COL KENNEDY", cost: 80 },
  { text: "COL LUIS LANDA", cost: 80 },
  { text: "COL MAYANGLE", cost: 80 },
  { text: "COL SAN ANGEL", cost: 80 },
  { text: "COL TEPEYAC", cost: 80 },
  { text: "COLONIA LA VEGA", cost: 80 },
  { text: "ECOVIVIENDA", cost: 100 },
  { text: "EL ALAMO", cost: 80 },
  { text: "EL PRADO", cost: 80 },
  { text: "LA ALAMEDA", cost: 80 },
  { text: "LA FLORENCIA", cost: 80 },
  { text: "LA GRANJA", cost: 80 },
  { text: "LA HUMUYA", cost: 80 },
  { text: "LA MARADIAGA", cost: 80 },
  { text: "VENECIA", cost: 100 },
  { text: "GERMANIA", cost: 120 }
];

// Helpers
function HNL(v){ return (v||0).toLocaleString('es-HN',{style:'currency',currency:'HNL'}); }
function cartSubtotal(){
  try { return cart.reduce((s,i)=> s + (Number(i.price)||0)*(Number(i.qty)||1), 0); }
  catch { return 0; }
}
function buildOptions(list){
  if (!dirSel) return;
  dirSel.innerHTML = '<option value="">Selecciona tu colonia/sector</option>';
  list.forEach(({ text, cost }) => {
    const opt = document.createElement('option');
    opt.value = text;
    opt.dataset.cost = String(cost);
    opt.textContent = `${text} — L ${cost}`;
    dirSel.appendChild(opt);
  });
}
function refreshDireccionesPorVendedor(){
  if (!vendedorSel || !dirSel) return;
  const v = vendedorSel.value;
  if (v === 'Edith' || v === 'Rigo') buildOptions(DIRECCIONES_EDITH_RIGO);
  else buildOptions(DIRECCIONES_MAYRA_OTRO);
}
function envioSeleccionado(subtotal){
  if (!dirSel || !dirSel.value) return 0;
  const base = Number(dirSel.options[dirSel.selectedIndex].dataset.cost || 0);
  return subtotal >= 2500 ? 0 : base;
}
function updateCheckoutTotals(){
  const sub = cartSubtotal();
  const env = envioSeleccionado(sub);
  const subEl = document.getElementById('subtotal-checkout');
  const envEl = document.getElementById('envio-valor');
  const totEl = document.getElementById('total-checkout');
  if (subEl) subEl.textContent = HNL(sub);
  if (envEl) envEl.textContent = env === 0 ? 'GRATIS' : HNL(env);
  if (totEl) totEl.textContent = HNL(sub + env);
}

// Eventos iniciales
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar/ocultar campo "vendedor_otro" (ya lo tienes configurado) :contentReference[oaicite:5]{index=5}
  if (vendedorSel && dirSel) {
    refreshDireccionesPorVendedor();
    updateCheckoutTotals();
    vendedorSel.addEventListener('change', () => {
      refreshDireccionesPorVendedor();
      updateCheckoutTotals();
    });
    dirSel.addEventListener('change', updateCheckoutTotals);
  }
});

// Helper: lee el vendedor seleccionado, y si es "Otro" usa el texto del input
function getVendedor() {
  const sel = document.getElementById('vendedor_aten');
  const otro = document.getElementById('vendedor_otro');
  if (!sel) return '';
  const v = (sel.value || '').trim();
  if (v === 'Otro') return (otro?.value || '').trim() || 'Otro';
  return v;
}




/* === ENVÍO CON EMAILJS (incluye envío y redirección si es “Tarjeta”) === */
checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1) Validación rápida de obligatorios
  const required = checkoutForm.querySelectorAll("[required]");
  let ok = true;
  required.forEach(f => {
    const v = (f.value || "").trim();
    if (!v) { f.style.border = "2px solid red"; ok = false; }
    else { f.style.border = "1px solid #ccc"; }
  });
  if (!ok) { showToast("⚠️ Completa los campos obligatorios."); return; }
  if (!cart.length) { showToast("Tu carrito está vacío 🛒"); return; }

  // 2) Totales + envío según dirección
  const subtotal = cart.reduce((s,i)=> s + (i.price * i.qty), 0);

  const sel = document.getElementById("direccion_envio");
  if (!sel || !sel.value) { showToast("Selecciona la dirección de envío."); return; }
  const area = sel.value;
  const base = Number(sel.options[sel.selectedIndex].dataset.cost || 0);
  const shipping = subtotal >= 2500 ? 0 : base;
  const total = subtotal + shipping;

  // 3) Items del pedido como texto
  const itemsTxt = cart.map(i => `- ${i.name}: ${formatLempiras(i.price)} × ${i.qty}`).join("\n");

// 4) Parámetros para EmailJS (ajustado a tu nueva plantilla)
const vendedor = (() => {
  const vsel = checkoutForm.vendedor_aten?.value || "";
  if (vsel === "Otro") {
    const nom = (checkoutForm.vendedor_otro?.value || "").trim();
    return nom; // si está vacío, validamos abajo
  }
  return vsel;
})();

if (!vendedor) {
  showToast("⚠️ Escribe el nombre del vendedor (elegiste ‘Otro’).");
  return;
}

const telefono = [checkoutForm.telefono1?.value, checkoutForm.telefono2?.value]
  .map(v => (v || "").trim())
  .filter(Boolean)
  .join(" / ");

const direccion = area + (checkoutForm.referencia?.value
  ? " — " + checkoutForm.referencia.value.trim()
  : "");

const comentario = (checkoutForm.dia?.value === "Otro"
  ? (checkoutForm.dia_otro?.value || "Otro")
  : (checkoutForm.dia?.value || ""));

// Lo que tu plantilla espera: {{nombre}}, {{telefono}}, {{direccion}}, {{comentario}}, {{pedido}}, {{vendedor}}
const pedido = itemsTxt;

const params = {
  nombre:       checkoutForm.nombre?.value || "",
  telefono,     // 👈 combinado 1 y 2
  direccion,    // 👈 colonia/sector + referencia
  comentario,   // 👈 día solicitado
  vendedor,     // 👈 unificado (Mayra/Edith/Rigo u “Otro” escrito)
  metodo_pago:  checkoutForm.metodo_pago?.value || "",
  pedido,       // 👈 productos (antes era "items")
  subtotal:     formatLempiras(subtotal),
  costo_envio:  shipping === 0 ? "GRATIS" : formatLempiras(shipping),
  total:        formatLempiras(total)
};



  // 5) Enviar con EmailJS
  try {
    if (!window.emailjs) throw new Error("EmailJS no disponible");
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_PEDIDOS_TEMPLATE, params);
  } catch (err) {
    console.warn("EmailJS error:", err);
    showToast("⚠️ No se pudo enviar el pedido. Revisa tu conexión.");
    return;
  }

  // 6) Flujo según método de pago
  const metodo = (checkoutForm.metodo_pago?.value || "").toLowerCase();

  // Si luego agregas “Tarjeta” en el select, redirigimos a pago_integrado
  if (metodo === "tarjeta") {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cart_snapshot", JSON.stringify(cart));
      localStorage.setItem("cart_last_total", String(subtotal));
      localStorage.setItem("shipping_snapshot", JSON.stringify({ area, baseCost: base, shipping, subtotal, total }));
    } catch {}
    showToast("Procesando pago con tarjeta…");
    setTimeout(() => {
      const payload = encodeURIComponent(JSON.stringify(cart));
      window.location.href = "pago_integrado.html?c=" + payload;
    }, 1500);
    return;
  }

  // Efectivo / Transferencia
  showToast("✅ Pedido enviado. ¡Gracias!");
  checkoutForm.reset();
  cart = [];
  updateCart();
  try { updateCheckoutTotals(); } catch {}
  checkoutModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
});







/* === LIGHTBOX PARA AMPLIAR IMAGEN === */
const imageViewer = document.getElementById("image-viewer");
const viewerImg = document.getElementById("viewer-img");
const closeViewer = document.getElementById("close-viewer");

document.addEventListener("click", e => {
  if (e.target.classList.contains("slide")) {
    viewerImg.src = e.target.src;
    imageViewer.classList.remove("hidden");
  }
});

closeViewer.addEventListener("click", () => imageViewer.classList.add("hidden"));
imageViewer.addEventListener("click", e => {
  if (e.target === imageViewer) imageViewer.classList.add("hidden");
});

/* === NAVEGACIÓN DENTRO DEL VISOR === */
const viewerPrev = document.getElementById("viewer-prev");
const viewerNext = document.getElementById("viewer-next");

let currentProductIndex = null;
let currentSlideIndex = 0;

// Detectar qué producto y foto se amplía
document.addEventListener("click", e => {
  if (e.target.classList.contains("slide")) {
    const parentSlider = e.target.closest(".slider");
    if (!parentSlider) return;
    const id = parentSlider.id.split("-")[1];
    currentProductIndex = parseInt(id);
    const slides = parentSlider.querySelectorAll(".slide");
    currentSlideIndex = Array.from(slides).indexOf(e.target);
    viewerImg.src = e.target.src;
    imageViewer.classList.remove("hidden");
  }
});

// Cambiar imagen en el visor
function changeViewerImage(direction) {
  if (currentProductIndex === null) return;
  const slides = document.querySelectorAll(`#slider-${currentProductIndex} .slide`);
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
  viewerImg.src = slides[currentSlideIndex].src;
}

viewerPrev.addEventListener("click", e => {
  e.stopPropagation();
  changeViewerImage(-1);
});

viewerNext.addEventListener("click", e => {
  e.stopPropagation();
  changeViewerImage(1);
});

// Teclado (izquierda/derecha)
document.addEventListener("keydown", e => {
  if (imageViewer.classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") changeViewerImage(-1);
  if (e.key === "ArrowRight") changeViewerImage(1);
  if (e.key === "Escape") imageViewer.classList.add("hidden");
});


/* === TOAST (VERSIÓN MEJORADA CON TEXTO LARGO Y EMOJIS) === */
function showToast(message) {
  // Eliminar toast anterior si existe
  const oldToast = document.querySelector(".toast-msg");
  if (oldToast) oldToast.remove();

  // Crear nuevo contenedor
  const toast = document.createElement("div");
  toast.className = "toast-msg";

  // ✅ Usa innerHTML para soportar saltos de línea y emojis correctamente
  toast.innerHTML = message.replace(/\n/g, "<br>");

  // Agregar al body directamente
  document.body.appendChild(toast);

  // Animación de aparición
  setTimeout(() => toast.classList.add("show"), 10);

  // Desaparecer después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/************** 🔎 BUSCADOR – CÓDIGO NUEVO (no toca nada existente) **************/
const floatingSearch = document.getElementById("floating-search");
const searchModal = document.getElementById("search-modal");
const closeSearchModalBtn = document.getElementById("close-search-modal");
const fsInput = document.getElementById("fs-input");
const searchConfirm = document.getElementById("search-confirm");
const searchBanner = document.getElementById("search-banner");
const searchBannerText = document.getElementById("search-banner-text");
const clearSearchBtn = document.getElementById("clear-search");

/* Mostrar/ocultar el botón de la lupa con el scroll (igual que el carrito) */
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) floatingSearch.classList.remove("hidden");
  else floatingSearch.classList.add("hidden");
});

/* Drag seguro como el carrito */
let isDraggingSearch = false;
let dragStartSearch = { x: 0, y: 0 };
let offsetSearch = { x: 0, y: 0 };

floatingSearch.addEventListener("pointerdown", e => {
  floatingSearch.setPointerCapture(e.pointerId);
  isDraggingSearch = false;
  dragStartSearch = { x: e.clientX, y: e.clientY };
  const rect = floatingSearch.getBoundingClientRect();
  offsetSearch.x = e.clientX - rect.left;
  offsetSearch.y = e.clientY - rect.top;
});
floatingSearch.addEventListener("pointermove", e => {
  if (e.pressure === 0) return;
  const dx = Math.abs(e.clientX - dragStartSearch.x);
  const dy = Math.abs(e.clientY - dragStartSearch.y);
  if (dx > 5 || dy > 5) {
    isDraggingSearch = true;
    moveFloatingSearch(e.clientX, e.clientY);
  }
});
floatingSearch.addEventListener("pointerup", e => {
  floatingSearch.releasePointerCapture(e.pointerId);
  if (!isDraggingSearch) {
    e.preventDefault();
    openSearchModal();
  } else {
    isDraggingSearch = false;
  }
});
function moveFloatingSearch(x, y) {
  const w = floatingSearch.offsetWidth;
  const h = floatingSearch.offsetHeight;
  let nx = x - offsetSearch.x;
  let ny = y - offsetSearch.y;
  const maxX = window.innerWidth - w - 5;
  const maxY = window.innerHeight - h - 5;
  nx = Math.min(Math.max(nx, 5), maxX);
  ny = Math.min(Math.max(ny, 5), maxY);
  floatingSearch.style.left = `${nx}px`;
  floatingSearch.style.top = `${ny}px`;
  floatingSearch.style.right = "auto";
  floatingSearch.style.bottom = "auto";
}

/* Abrir / cerrar modal */
function openSearchModal() {
  searchModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  setTimeout(() => fsInput && fsInput.focus(), 50);
}
function closeSearchModal() {
  searchModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  const sb = document.querySelector(".search-bar");
  if (sb) sb.classList.remove("shake");
}
if (closeSearchModalBtn) closeSearchModalBtn.addEventListener("click", closeSearchModal);
if (searchModal) {
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) closeSearchModal();
  });
}

/* Normalización (quita acentos y pasa a minúsculas) */
const normalize = (str) => (str || "")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

/* --- Ajuste de similitud (0..1). Más bajo = MÁS resultados parecidos --- */
let SEARCH_THRESHOLD = 0.45; // Prueba 0.45 (más laxo). Si quieres aún más, usa 0.35

/* Levenshtein ratio normalizado */
function levenshtein(a, b) {
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  const dp = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) dp[j] = j;
  for (let i = 1; i <= al; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= bl; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,         // borrado
        dp[j - 1] + 1,     // inserción
        prev + (a[i - 1] === b[j - 1] ? 0 : 1) // sustitución
      );
      prev = tmp;
    }
  }
  return dp[bl];
}
function similarity(a, b) {
  a = normalize(a);
  b = normalize(b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = levenshtein(a, b);
  return 1 - dist / maxLen; // 0..1 (1 = idéntico)
}

/* Coincidencia difusa: incluye match directo y “palabra a palabra” */
function fuzzyContains(text, query, threshold = SEARCH_THRESHOLD) {
  text = normalize(text);
  query = normalize(query);
  if (!query) return true;
  if (text.includes(query)) return true; // atajo rápido

  const tWords = text.split(/\s+/).filter(Boolean);
  const qWords = query.split(/\s+/).filter(Boolean);

  // si cualquier palabra del query se parece a cualquier palabra del texto
  for (const qw of qWords) {
    for (const tw of tWords) {
      if (similarity(tw, qw) >= threshold) return true;
    }
  }
  return false;
}


/* Filtrar por nombre, descripción o precio */
function filterProductsByQuery(q) {
  const digits = q.replace(/[^\d.]/g, ""); // para precio
  return products.filter(p => {
    const nameMatch = fuzzyContains(p.name, q);
    const descMatch = (p.description || []).some(d => fuzzyContains(d, q));
    const priceMatch =
      digits && (
        String(p.price).includes(digits) ||
        formatLempiras(p.price).toLowerCase().includes(q.toLowerCase())
      );
    return nameMatch || descMatch || priceMatch;
  });
}


/* Ejecutar búsqueda */
function performSearch() {
  const bar = document.querySelector(".search-bar");
  const q = (fsInput?.value || "").trim();
  if (!q) {
    // pequeña vibración si está vacío
    if (bar) {
      bar.classList.remove("shake");
      void bar.offsetWidth; // reflow para reiniciar anim
      bar.classList.add("shake");
    }
    return;
  }

  const filtered = filterProductsByQuery(q);

  // Renderiza SOLO lo encontrado y avisa
  renderProducts(filtered);
  showSearchBanner(q, filtered.length);

  // Cerrar modal y hacer scroll a productos
  closeSearchModal();
  const prodSection = document.getElementById("productos");
  if (prodSection) {
    const top = prodSection.offsetTop - 60;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* Banner “Mostrando X resultados...” con botón X para limpiar */
function showSearchBanner(q, count) {
  if (!searchBanner) return;
  searchBannerText.textContent = `Mostrando ${count} resultado${count === 1 ? "" : "s"} para “${q}”.`;
  searchBanner.classList.remove("hidden");
}
function clearSearch() {
  if (searchBanner) searchBanner.classList.add("hidden");
  if (fsInput) fsInput.value = "";
  renderProducts(); // ← vuelve a todos los productos
  const prodSection = document.getElementById("productos");
  if (prodSection) {
    const top = prodSection.offsetTop - 60;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
if (clearSearchBtn) clearSearchBtn.addEventListener("click", clearSearch);

/* Eventos del buscador */
if (floatingSearch) floatingSearch.addEventListener("click", openSearchModal);
if (searchConfirm) searchConfirm.addEventListener("click", performSearch);
if (fsInput) {
  fsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });
}

/************** 🏷️ CATEGORÍAS – CONFIG FIJA **************/

/* 1) EDITA AQUÍ tus categorías visibles en la barra */
const CATEGORIES = [
  "Todos",
  "Android",
  "iPhone",
  "Tablets y iPads",
  "TV y Smart TV",
  "Otros"
 ];

/* Normaliza nombres con o sin acentos para que coincidan con CATEGORIES */
const canonicalMap = {
  "todos": "Todos",
"android": "Android",
"iphone": "iPhone",
"Tablets y iPads": "Tablets y iPads",
   "tv": "smart tv",
"otros" : "Otros"
};
function canonicalCategory(val) {
  if (!val) return "Otros";
  const key = val.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  return canonicalMap[key] || val;
}

/* Lee la categoría de cada producto (acepta varias claves) */
// Ahora lee 1..N categorías y siempre devuelve un array
function getCategories(p) {
  const raw = p.categories ?? p.categorias ?? p.category ?? p.categoria ?? p.cat ?? "Otros";
  const arr = Array.isArray(raw) ? raw : String(raw).split(","); // permite "Damas, Caballeros"
  return arr
    .map(s => s && s.toString().trim())
    .filter(Boolean)
    .map(canonicalCategory);
}


/* Si hay productos sin categoría conocida, agregamos “Otros” al final */
function computeCategories() {
  const hasOtros = products.some(p => getCategories(p).includes("Otros"));
  return hasOtros && !CATEGORIES.includes("Otros")
    ? [...CATEGORIES, "Otros"]
    : CATEGORIES;
}

const categoryBar = document.getElementById("category-bar");
let activeCategory = "Todos"; // 👈 por defecto “Todos”

function renderCategoryBar() {
  if (!categoryBar) return;
  categoryBar.innerHTML = "";

  const cats = computeCategories();
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      activeCategory = cat;
      [...categoryBar.querySelectorAll(".chip")].forEach(c => c.classList.remove("active"));
      btn.classList.add("active");

      if (cat === "Todos") {
        // si tienes buscador con banner, lo limpiamos si existe
        if (typeof clearSearch === "function") try { clearSearch(); } catch {}
        renderProducts();
      } else {
        const filtered = products.filter(p => getCategories(p).includes(cat));
        renderProducts(filtered);
        if (typeof showSearchBanner === "function") {
          try { showSearchBanner(`Categoría: ${cat}`, filtered.length); } catch {}
        }
      }

      const prodSection = document.getElementById("productos");
      if (prodSection) {
        window.scrollTo({ top: prodSection.offsetTop - 60, behavior: "smooth" });
      }
    });

    categoryBar.appendChild(btn);
  });
}

renderCategoryBar();

//VENDEDOR OTRO
// === Mostrar campo "Otro" si el usuario selecciona esa opción ===
document.addEventListener("DOMContentLoaded", () => {
  const vendedorSelect = document.getElementById("vendedor_aten");
  const vendedorOtroInput = document.getElementById("vendedor_otro");

  // Evita errores si el formulario no está en la página
  if (!vendedorSelect || !vendedorOtroInput) return;

  vendedorSelect.addEventListener("change", () => {
    if (vendedorSelect.value === "Otro") {
      vendedorOtroInput.style.display = "block";
      vendedorOtroInput.setAttribute("required", "required"); // obligatorio
    } else {
      vendedorOtroInput.style.display = "none";
      vendedorOtroInput.removeAttribute("required");
      vendedorOtroInput.value = ""; // limpia si cambia de opción
    }
  });
});



/* === INICIO === */
renderProducts();


/* === INICIO === */
/*renderProducts();*/














































