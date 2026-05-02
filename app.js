const products = catalogProducts.map((product) => ({
  ...product,
  image: product.coverImage ?? product.images[0],
}));

const cartStorageKey = "lulu-cart";

const filterGroups = [
  { id: "all", label: "Todos", matches: () => true },
  {
    id: "ollas",
    label: "Ollas",
    matches: (product) =>
      productSearchText(product).includes("olla") ||
      productSearchText(product).includes("bateria"),
  },
  {
    id: "sartenes",
    label: "Sartenes",
    matches: (product) => productSearchText(product).includes("sarten"),
  },
  {
    id: "utensilios",
    label: "Utensilios",
    matches: (product) => productSearchText(product).includes("utensilio"),
  },
  {
    id: "favoritos",
    label: "Favoritos",
    matches: (product) => Boolean(product.badge),
  },
];

const productGrid = document.querySelector("[data-product-grid]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartBackdrop = document.querySelector("[data-cart-backdrop]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartButton = document.querySelector("[data-open-cart]");
const cartSubtotal = document.querySelector("[data-cart-subtotal]");
const whatsappCheckoutButton = document.querySelector(
  "[data-whatsapp-checkout]",
);
const productSearchInput = document.querySelector("[data-product-search]");
const productFilters = document.querySelector("[data-product-filters]");
const productSort = document.querySelector("[data-product-sort]");
const resultsSummary = document.querySelector("[data-results-summary]");
const header = document.querySelector(".site-header");
const catalogSection = document.querySelector("#catalog");
const productDetail = document.querySelector("[data-product-detail]");
const detailMainImage = document.querySelector("[data-detail-main-image]");
const detailThumbnails = document.querySelector("[data-detail-thumbnails]");
const detailBadge = document.querySelector("[data-detail-badge]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailPrice = document.querySelector("[data-detail-price]");
const detailDescription = document.querySelector("[data-detail-description]");
const detailVariant = document.querySelector("[data-detail-variant]");
const detailHighlights = document.querySelector("[data-detail-highlights]");
const detailAddButton = document.querySelector("[data-detail-add]");
const detailCategory = document.querySelector("[data-detail-category]");
const detailBreadcrumb = document.querySelector("[data-detail-breadcrumb]");
const stickyTitle = document.querySelector("[data-sticky-title]");
const stickyPrice = document.querySelector("[data-sticky-price]");
const stickyAddButton = document.querySelector("[data-sticky-add]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const liveRegion = document.querySelector("[data-live-region]");
const whatsappNumber = "598092092765";

let cart = loadCart();
let selectedProductId = products[0]?.id ?? null;
let selectedImageIndex = 0;
let activeFilter = "all";
let searchQuery = "";
let sortMode = "featured";
let lastFocusBeforeOverlay = null;
let productDetailVisible = false;

const currency = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function productSearchText(product) {
  return normalizeText(
    [
      product.name,
      product.category,
      product.badge,
      product.variant,
      product.shortDescription,
      product.description,
      ...(product.highlights ?? []),
    ].join(" "),
  );
}

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(cartStorageKey));
    if (!Array.isArray(stored)) {
      return [];
    }

    return stored
      .filter(
        (item) =>
          getProduct(item.id) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      )
      .map((item) => ({ id: item.id, quantity: item.quantity }));
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function announce(message) {
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 20);
}

function getFocusableElements(container) {
  return [
    ...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter(
    (element) =>
      !element.hasAttribute("hidden") && element.offsetParent !== null,
  );
}

function trapFocus(event, container) {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function getVisibleProducts() {
  const activeGroup =
    filterGroups.find((group) => group.id === activeFilter) ?? filterGroups[0];
  const query = normalizeText(searchQuery.trim());

  return products
    .filter((product) => activeGroup.matches(product))
    .filter((product) => !query || productSearchText(product).includes(query))
    .sort((firstProduct, secondProduct) => {
      if (sortMode === "price-asc") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortMode === "price-desc") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortMode === "photos-desc") {
        return secondProduct.images.length - firstProduct.images.length;
      }

      return products.indexOf(firstProduct) - products.indexOf(secondProduct);
    });
}

function renderFilterControls() {
  productFilters.innerHTML = filterGroups
    .map(
      (group) => `
        <button
          class="filter-chip ${group.id === activeFilter ? "is-active" : ""}"
          type="button"
          data-product-filter="${group.id}"
          aria-pressed="${group.id === activeFilter}"
        >${group.label}</button>
      `,
    )
    .join("");
}

function renderResultsSummary(count) {
  const label = count === 1 ? "producto" : "productos";
  const filterLabel =
    filterGroups.find((group) => group.id === activeFilter)?.label ?? "Todos";
  resultsSummary.textContent = `${count} ${label} · ${filterLabel}${searchQuery ? ` · "${searchQuery}"` : ""}`;
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  renderResultsSummary(visibleProducts.length);

  if (visibleProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-results">
        <span class="material-symbols-outlined" aria-hidden="true">search_off</span>
        <h3>No encontramos productos con esos filtros</h3>
          <p>Probá buscar por olla, sartén o utensilios, o volvé a ver todo el catálogo.</p>
        <button class="outline-button" type="button" data-clear-catalog>Limpiar filtros</button>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const photoLabel = product.images.length === 1 ? "foto" : "fotos";

      return `
      <article class="product-card ${productDetailVisible && product.id === selectedProductId ? "is-selected" : ""}">
        <div class="product-media">
          <img src="${product.image}" alt="${product.name}" width="480" height="600" loading="lazy" />
          ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
          <button class="quick-view" type="button" data-select-product="${product.id}" aria-label="Ver detalle de ${product.name}" title="Ver producto">
            <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
          </button>
        </div>
        <div class="product-card-content">
          <p class="product-meta">
            <span>${product.category}</span>
            <span>${product.images.length} ${photoLabel}</span>
          </p>
          <h3>${product.name}</h3>
          <div class="product-card-footer">
            <strong>${currency.format(product.price)}</strong>
            <button class="quick-add" type="button" data-add-product="${product.id}" aria-label="Agregar ${product.name} al carrito">
              <span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderProductDetail() {
  const product = getProduct(selectedProductId) ?? products[0];
  if (!product) {
    return;
  }

  const mainImage = product.images[selectedImageIndex] ?? product.images[0];

  detailMainImage.src = mainImage;
  detailMainImage.alt = `${product.name} - imagen ${selectedImageIndex + 1}`;
  detailBadge.textContent = product.badge ?? product.category;
  detailBadge.hidden = !product.badge && !product.category;
  detailTitle.textContent = product.name;
  detailPrice.textContent = currency.format(product.price);
  detailDescription.textContent = product.description;
  detailVariant.textContent = `${product.variant}. Coordinamos stock, entrega y forma de pago por WhatsApp.`;
  detailCategory.textContent = product.category;
  detailBreadcrumb.textContent = product.name;
  detailAddButton.dataset.addProduct = product.id;
  stickyTitle.textContent = product.name;
  stickyPrice.textContent = currency.format(product.price);
  stickyAddButton.dataset.addProduct = product.id;

  detailHighlights.innerHTML = product.highlights
    .map((highlight) => `<span class="highlight-chip">${highlight}</span>`)
    .join("");

  detailThumbnails.innerHTML = product.images
    .map(
      (image, index) => `
        <button
          class="thumbnail-button ${index === selectedImageIndex ? "is-active" : ""}"
          type="button"
          data-select-image="${index}"
          aria-label="Ver imagen ${index + 1} de ${product.name}"
        >
          <img src="${image}" alt="${product.name} miniatura ${index + 1}" loading="lazy" />
        </button>
      `,
    )
    .join("");
}

function getProductUrl(id) {
  return `#producto-${encodeURIComponent(id)}`;
}

function getProductIdFromHash() {
  const match = window.location.hash.match(/^#(?:producto|product)-(.+)$/);
  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function setProductDetailVisible(visible) {
  productDetailVisible = visible;
  productDetail.hidden = !visible;
  productDetail.setAttribute("aria-hidden", String(!visible));
  document.body.classList.toggle("product-detail-visible", visible);

  if (!visible && !lightbox.hidden) {
    setLightbox(false);
  }
}

function rememberCatalogState() {
  if (productDetailVisible) {
    return;
  }

  history.replaceState(
    { view: "catalog", scrollY: window.scrollY },
    "",
    window.location.href,
  );
}

function showCatalogFromHistory(scrollY = null) {
  setProductDetailVisible(false);
  renderProducts();
  window.requestAnimationFrame(() => {
    if (Number.isFinite(scrollY)) {
      window.scrollTo({ top: scrollY, behavior: "auto" });
    } else {
      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function selectProduct(id, options = {}) {
  const {
    pushHistory = false,
    scrollToDetail = true,
    focusTitle = false,
  } = options;
  if (!getProduct(id)) {
    return;
  }

  if (pushHistory) {
    rememberCatalogState();
  }

  selectedProductId = id;
  selectedImageIndex = 0;
  setProductDetailVisible(true);
  renderProducts();
  renderProductDetail();

  if (pushHistory) {
    history.pushState(
      { view: "product", productId: id },
      `${getProduct(id).name} | Lulu`,
      getProductUrl(id),
    );
  }

  if (scrollToDetail) {
    productDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (focusTitle) {
    window.setTimeout(() => detailTitle.focus({ preventScroll: true }), 280);
  }
}

function selectImage(index) {
  const product = getProduct(selectedProductId);
  if (!product || index < 0 || index >= product.images.length) {
    return;
  }

  selectedImageIndex = index;
  renderProductDetail();
}

function setDrawer(open, triggerElement = null) {
  if (open) {
    lastFocusBeforeOverlay = triggerElement ?? document.activeElement;
    cartDrawer.hidden = false;
    cartBackdrop.hidden = false;
    cartDrawer.inert = false;
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    window.requestAnimationFrame(() => {
      cartDrawer.classList.add("open");
    });
    cartDrawer.querySelector("[data-close-cart]").focus();
    return;
  }

  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.inert = true;
  cartBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    if (!cartDrawer.classList.contains("open")) {
      cartDrawer.hidden = true;
    }
  }, 260);

  if (lastFocusBeforeOverlay instanceof HTMLElement) {
    lastFocusBeforeOverlay.focus();
  }
}

function addToCart(id, triggerElement = null) {
  const product = getProduct(id);
  if (!product) {
    return;
  }

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
  saveCart();
  announce(`${product.name} agregado al carrito.`);
  setDrawer(true, triggerElement);
}

function updateQuantity(id, delta) {
  const product = getProduct(id);
  cart = cart
    .map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item,
    )
    .filter((item) => item.quantity > 0);
  renderCart();
  saveCart();
  if (product) {
    announce(
      delta > 0
        ? `Sumaste 1 ${product.name}.`
        : `Actualizaste ${product.name}.`,
    );
  }
}

function renderCart() {
  const enriched = cart
    .map((item) => ({ ...item, product: getProduct(item.id) }))
    .filter((item) => item.product);

  const totalItems = enriched.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = enriched.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  cartCount.textContent = totalItems;
  cartCount.hidden = totalItems === 0;
  cartCount.setAttribute("aria-hidden", String(totalItems === 0));
  const cartItemLabel =
    totalItems === 1 ? "1 producto" : `${totalItems} productos`;
  cartButton.setAttribute(
    "aria-label",
    totalItems === 0
      ? "Abrir carrito vacío"
      : `Abrir carrito con ${cartItemLabel}`,
  );
  cartSubtotal.textContent = currency.format(subtotal);
  whatsappCheckoutButton.disabled = enriched.length === 0;

  if (enriched.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div>
          <span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
          <p>Tu carrito está vacío por ahora.</p>
        </div>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = enriched
    .map(
      ({ product, quantity }) => `
      <article class="cart-line">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>${product.variant}</p>
          <div class="quantity-control" aria-label="Controles de cantidad para ${product.name}">
            <button type="button" aria-label="Disminuir cantidad de ${product.name}" data-quantity="${product.id}" data-delta="-1">
              <span class="material-symbols-outlined" aria-hidden="true">remove</span>
            </button>
            <span>${quantity}</span>
            <button type="button" aria-label="Aumentar cantidad de ${product.name}" data-quantity="${product.id}" data-delta="1">
              <span class="material-symbols-outlined" aria-hidden="true">add</span>
            </button>
          </div>
        </div>
        <strong class="line-price">${currency.format(product.price * quantity)}</strong>
        <button class="remove-line" type="button" aria-label="Quitar ${product.name}" data-remove-product="${product.id}">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </article>
    `,
    )
    .join("");
}

function removeFromCart(id) {
  const product = getProduct(id);
  cart = cart.filter((item) => item.id !== id);
  renderCart();
  saveCart();
  if (product) {
    announce(`${product.name} quitado del carrito.`);
  }
}

function buildWhatsAppMessage(items) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const lines = items.map(
    ({ product, quantity }) =>
      `- ${product.name} x${quantity} (${product.variant}) ${currency.format(product.price * quantity)}`,
  );

  return [
    "Hola Lulu, quiero pedir estos productos:",
    ...lines,
    "",
    `Total: ${currency.format(subtotal)}`,
    "",
    "Quedo atenta a confirmar stock, entrega y forma de pago.",
  ].join("\n");
}

function handleWhatsAppCheckout() {
  const enriched = cart
    .map((item) => ({ ...item, product: getProduct(item.id) }))
    .filter((item) => item.product);

  if (enriched.length === 0) {
    return;
  }

  const message = buildWhatsAppMessage(enriched);
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener");
}

function setLightbox(open, triggerElement = null) {
  if (open) {
    lastFocusBeforeOverlay = triggerElement ?? document.activeElement;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightbox.querySelector("[data-close-lightbox]").focus();
    return;
  }

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  if (lastFocusBeforeOverlay instanceof HTMLElement) {
    lastFocusBeforeOverlay.focus();
  }
}

function renderLightbox() {
  const product = getProduct(selectedProductId);
  if (!product) {
    return;
  }

  const image = product.images[selectedImageIndex] ?? product.images[0];
  lightboxImage.src = image;
  lightboxImage.alt = `${product.name} - imagen ampliada ${selectedImageIndex + 1}`;
  lightboxCaption.textContent = `${product.name} · imagen ${selectedImageIndex + 1} de ${product.images.length}`;
}

function moveLightbox(delta) {
  const product = getProduct(selectedProductId);
  if (!product) {
    return;
  }

  selectedImageIndex =
    (selectedImageIndex + delta + product.images.length) %
    product.images.length;
  renderProductDetail();
  renderLightbox();
}

function resetCatalogControls() {
  activeFilter = "all";
  searchQuery = "";
  sortMode = "featured";
  productSearchInput.value = "";
  productSort.value = sortMode;
  renderFilterControls();
  renderProducts();
}

function closeProductDetail() {
  if (history.state?.view === "product") {
    history.back();
    return;
  }

  history.replaceState(
    { view: "catalog", scrollY: window.scrollY },
    "",
    "#catalog",
  );
  showCatalogFromHistory(window.scrollY);
}

function initializeProductRoute() {
  const initialProductId = getProductIdFromHash();

  if (initialProductId && getProduct(initialProductId)) {
    history.replaceState({ view: "catalog", scrollY: 0 }, "", "#catalog");
    selectProduct(initialProductId, {
      pushHistory: true,
      scrollToDetail: false,
      focusTitle: true,
    });
    return;
  }

  if (window.location.hash === "#product") {
    history.replaceState({ view: "catalog", scrollY: 0 }, "", "#catalog");
  } else {
    history.replaceState(
      { view: "catalog", scrollY: window.scrollY },
      "",
      window.location.href,
    );
  }

  setProductDetailVisible(false);
  renderProducts();
  renderProductDetail();
}

renderFilterControls();
renderCart();
initializeProductRoute();

document.addEventListener("click", (event) => {
  const selectButton = event.target.closest("[data-select-product]");
  if (selectButton) {
    selectProduct(selectButton.dataset.selectProduct, {
      pushHistory: true,
      scrollToDetail: true,
      focusTitle: true,
    });
    return;
  }

  if (event.target.closest("[data-close-product]")) {
    closeProductDetail();
    return;
  }

  const catalogLink = event.target.closest('a[href="#catalog"]');
  if (catalogLink && productDetailVisible) {
    event.preventDefault();
    closeProductDetail();
    return;
  }

  const imageButton = event.target.closest("[data-select-image]");
  if (imageButton) {
    selectImage(Number(imageButton.dataset.selectImage));
    return;
  }

  const addButton = event.target.closest("[data-add-product]");
  if (addButton) {
    addToCart(addButton.dataset.addProduct, addButton);
    return;
  }

  const removeButton = event.target.closest("[data-remove-product]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.removeProduct);
    return;
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (quantityButton) {
    updateQuantity(
      quantityButton.dataset.quantity,
      Number(quantityButton.dataset.delta),
    );
    return;
  }

  if (event.target.closest("[data-open-cart]")) {
    setDrawer(true, event.target.closest("[data-open-cart]"));
    return;
  }

  if (event.target.closest("[data-whatsapp-checkout]")) {
    handleWhatsAppCheckout();
    return;
  }

  if (
    event.target.closest("[data-close-cart]") ||
    event.target === cartBackdrop
  ) {
    setDrawer(false);
    return;
  }

  const filterButton = event.target.closest("[data-product-filter]");
  if (filterButton) {
    activeFilter = filterButton.dataset.productFilter;
    renderFilterControls();
    renderProducts();
    return;
  }

  if (event.target.closest("[data-clear-catalog]")) {
    resetCatalogControls();
    productSearchInput.focus();
    return;
  }

  const lightboxTrigger = event.target.closest("[data-open-lightbox]");
  if (lightboxTrigger) {
    renderLightbox();
    setLightbox(true, lightboxTrigger);
    return;
  }

  if (
    event.target.closest("[data-close-lightbox]") ||
    event.target === lightbox
  ) {
    setLightbox(false);
    return;
  }

  if (event.target.closest("[data-lightbox-prev]")) {
    moveLightbox(-1);
    return;
  }

  if (event.target.closest("[data-lightbox-next]")) {
    moveLightbox(1);
    return;
  }
});

productSearchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderProducts();
});

productSort.addEventListener("change", (event) => {
  sortMode = event.target.value;
  renderProducts();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && !lightbox.hidden) {
    trapFocus(event, lightbox);
    return;
  }

  if (event.key === "Tab" && cartDrawer.classList.contains("open")) {
    trapFocus(event, cartDrawer);
    return;
  }

  if (event.key === "Escape") {
    if (!lightbox.hidden) {
      setLightbox(false);
      return;
    }

    setDrawer(false);
  }

  if (!lightbox.hidden && event.key === "ArrowLeft") {
    moveLightbox(-1);
  }

  if (!lightbox.hidden && event.key === "ArrowRight") {
    moveLightbox(1);
  }
});

window.addEventListener("scroll", () => {
  header.dataset.elevated = String(window.scrollY > 20);
});

window.addEventListener("popstate", (event) => {
  const state = event.state;

  if (state?.view === "product" && getProduct(state.productId)) {
    selectProduct(state.productId, {
      pushHistory: false,
      scrollToDetail: true,
      focusTitle: true,
    });
    return;
  }

  showCatalogFromHistory(state?.scrollY ?? null);
});
