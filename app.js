/**
 * Toko Luthfiah - General & Beauty Store E-Commerce
 * Vanilla JavaScript Implementation
 */

// Dummy WhatsApp Admin Number
const WHATSAPP_NUMBER = '6282161899282';
const CART_STORAGE_KEY = 'luthfiah_cart_v1';

// Offline SVG Data URI fallback (immune to ad-blockers / Brave Shields, zero network requests)
const DEFAULT_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23FFF0F5'/%3E%3Ccircle cx='200' cy='180' r='70' fill='%23FFB6C1' opacity='0.7'/%3E%3Cpath d='M175 130h50v20h-50zm10 20h30v90h-30z' fill='%23FF1493'/%3E%3Ctext x='200' y='300' font-family='sans-serif' font-size='18' font-weight='bold' fill='%23FF1493' text-anchor='middle'%3ELuthfiah Store%3C/text%3E%3C/svg%3E";
window.DEFAULT_PLACEHOLDER = DEFAULT_PLACEHOLDER;

// Fallback products data (in case products.json is loaded directly via file:// protocol without a local web server)
const FALLBACK_PRODUCTS = [
  {
    id: "p001",
    name: "Colgate Total Plaque Release Toothpaste 95g",
    nama: "Colgate Total Plaque Release Toothpaste 95g",
    price: 45000,
    harga: 45000,
    category: "Perawatan Diri",
    kategori: "Perawatan Diri",
    description: "Pasta gigi pencegah plak dengan formula Gentle Fragrant Mint untuk gusi lebih kuat dan nafas segar tahan lama.",
    deskripsi: "Pasta gigi pencegah plak dengan formula Gentle Fragrant Mint untuk gusi lebih kuat dan nafas segar tahan lama.",
    image: "images/colgate.jpg",
    gambar: "images/colgate.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p002",
    name: "OMG / Lip Tint Gloss Rose Gold",
    nama: "OMG / Lip Tint Gloss Rose Gold",
    price: 25000,
    harga: 25000,
    category: "Kosmetik",
    kategori: "Kosmetik",
    description: "Lip tint bertekstur glossy ringan memberikan warna bibir segar, berkilau, dan tahan lama tanpa rasa lengket.",
    deskripsi: "Lip tint bertekstur glossy ringan memberikan warna bibir segar, berkilau, dan tahan lama tanpa rasa lengket.",
    image: "images/liptint.jpg",
    gambar: "images/liptint.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p003",
    name: "Amaterasun UV Skin Tint SPF 35 PA++++",
    nama: "Amaterasun UV Skin Tint SPF 35 PA++++",
    price: 65000,
    harga: 65000,
    category: "Skincare",
    kategori: "Skincare",
    description: "Sunscreen hybrid skin tint ringan dengan perlindungan Intelligent DNA Guardian dari sinar UV dan blue light harian.",
    deskripsi: "Sunscreen hybrid skin tint ringan dengan perlindungan Intelligent DNA Guardian dari sinar UV dan blue light harian.",
    image: "images/amaterasun.jpg",
    gambar: "images/amaterasun.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p004",
    name: "Kipas Portable Goojodoq Pink",
    nama: "Kipas Portable Goojodoq Pink",
    price: 100000,
    harga: 100000,
    category: "Elektronik & Aksesoris",
    kategori: "Elektronik & Aksesoris",
    description: "Kipas angin genggam mini portable praktis, hembusan angin kencang, dan mudah dibawa ke mana saja.",
    deskripsi: "Kipas angin genggam mini portable praktis, hembusan angin kencang, dan mudah dibawa ke mana saja.",
    image: "images/kipas-goojodoq.jpg",
    gambar: "images/kipas-goojodoq.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p005",
    name: "Tumbler Ecentio Aesthetic",
    nama: "Tumbler Ecentio Aesthetic",
    price: 95000,
    harga: 95000,
    category: "Drinkware",
    kategori: "Drinkware",
    description: "Botol minum tumbler Ecentio aesthetic berkapasitas besar, tahan suhu panas dan dingin.",
    deskripsi: "Botol minum tumbler Ecentio aesthetic berkapasitas besar, tahan suhu panas dan dingin.",
    image: "images/tumbler-ecentio.jpg",
    gambar: "images/tumbler-ecentio.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p006",
    name: "Tisu Basah Mitu Baby Wipes 50s",
    nama: "Tisu Basah Mitu Baby Wipes 50s",
    price: 15000,
    harga: 15000,
    category: "Kebutuhan Harian",
    kategori: "Kebutuhan Harian",
    description: "Tisu basah lembut ganti popok / pembersih serbaguna yang wangi segar dan aman bagi kulit sensitif.",
    deskripsi: "Tisu basah lembut ganti popok / pembersih serbaguna yang wangi segar dan aman bagi kulit sensitif.",
    image: "images/tisu-mitu.jpg",
    gambar: "images/tisu-mitu.jpg",
    inStock: true,
    stok: "Tersedia"
  },
  {
    id: "p007",
    name: "Highlighter / Stabilo Montana Set",
    nama: "Highlighter / Stabilo Montana Set",
    price: 10000,
    harga: 10000,
    category: "Alat Tulis",
    kategori: "Alat Tulis",
    description: "Spidol penanda warna pastel cantik untuk menandai catatan penting sekolah, kuliah, dan kantor.",
    deskripsi: "Spidol penanda warna pastel cantik untuk menandai catatan penting sekolah, kuliah, dan kantor.",
    image: "images/stabilo-montana.jpg",
    gambar: "images/stabilo-montana.jpg",
    inStock: true,
    stok: "Tersedia"
  }
];

// App State
let products = [];
let cart = [];
let currentCategory = 'Semua';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const productCountEl = document.getElementById('product-count');
const filterStatusEl = document.getElementById('filter-status');
const filterQueryEl = document.getElementById('filter-query');
const emptyStateEl = document.getElementById('empty-state');
const resetFilterBtn = document.getElementById('reset-filter-btn');

// Cart Drawer Elements
const cartBadge = document.getElementById('cart-badge');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const startShoppingBtn = document.getElementById('start-shopping-btn');
const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartCheckoutSection = document.getElementById('cart-checkout-section');
const cartBuyerFormSection = document.getElementById('cart-buyer-form-section');
const cartItemCountLabel = document.getElementById('cart-item-count-label');
const cartSubtotalPriceEl = document.getElementById('cart-subtotal-price');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const checkoutWaBtn = document.getElementById('checkout-wa-btn');

// Mobile Floating Cart Bar Elements
const mobileFloatingCart = document.getElementById('mobile-floating-cart');
const mobileCartCount = document.getElementById('mobile-cart-count');
const mobileCartTotal = document.getElementById('mobile-cart-total');

// Buyer Inputs
const buyerNameInput = document.getElementById('buyer-name');
const buyerAddressInput = document.getElementById('buyer-address');
const buyerNotesInput = document.getElementById('buyer-notes');

// Toast Element
const toastEl = document.getElementById('toast');
const toastMessageEl = document.getElementById('toast-message');
let toastTimeout = null;

// ================= UTILITY FUNCTIONS =================

/**
 * Format number to Indonesian Rupiah (Rp)
 * @param {number} amount 
 * @returns {string} e.g. "Rp 45.000"
 */
function formatRupiah(amount) {
  const num = Number(amount) || 0;
  return 'Rp ' + num.toLocaleString('id-ID');
}

/**
 * Display toast notification
 * @param {string} message 
 */
function showToast(message) {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastMessageEl.textContent = message;
  toastEl.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-24', '-translate-y-12');
  toastEl.classList.add('opacity-100', 'translate-y-0');

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('opacity-100', 'translate-y-0');
    toastEl.classList.add('opacity-0', 'pointer-events-none');
    if (window.innerWidth < 640) {
      toastEl.classList.add('-translate-y-12');
    } else {
      toastEl.classList.add('translate-y-24');
    }
  }, 2400);
}

// ================= STORAGE FUNCTIONS =================

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (err) {
    console.error('Gagal memuat keranjang dari localStorage:', err);
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error('Gagal menyimpan keranjang ke localStorage:', err);
  }
}

// ================= PRODUCT CATALOG LOGIC =================

/**
 * Fetch products from products.json or use fallback
 */
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    products = await response.json();
  } catch (error) {
    console.warn('Gagal fetch products.json, menggunakan data cadangan internal:', error);
    products = [...FALLBACK_PRODUCTS];
  }
  renderCatalog();
}

/**
 * Filter and render products to grid (2 columns on mobile, 4 on desktop)
 */
function renderCatalog() {
  const filtered = products.filter(item => {
    const itemCat = (item.category || item.kategori || '').toLowerCase();
    const itemTitle = (item.name || item.nama || '').toLowerCase();
    const itemDesc = (item.description || item.deskripsi || '').toLowerCase();

    const matchesCategory = currentCategory === 'Semua' ||
      itemCat === currentCategory.toLowerCase() ||
      itemCat.includes(currentCategory.toLowerCase()) ||
      currentCategory.toLowerCase().includes(itemCat);
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ||
      itemTitle.includes(query) ||
      itemDesc.includes(query) ||
      itemCat.includes(query);

    return matchesCategory && matchesSearch;
  });

  productCountEl.textContent = filtered.length;

  // Filter Query Status indicator
  if (searchQuery.trim() !== '') {
    filterStatusEl.classList.remove('hidden');
    filterQueryEl.textContent = searchQuery.trim();
    clearSearchBtn.classList.remove('hidden');
  } else {
    filterStatusEl.classList.add('hidden');
    clearSearchBtn.classList.add('hidden');
  }

  // Handle empty state
  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    emptyStateEl.classList.remove('hidden');
    return;
  }

  emptyStateEl.classList.add('hidden');

  // Render product cards (Compact 2-col on mobile, full-featured on desktop)
  productsGrid.innerHTML = filtered.map(item => {
    const name = item.name || item.nama || '';
    const price = item.price !== undefined ? item.price : (item.harga || 0);
    const category = item.category || item.kategori || '';
    const description = item.description || item.deskripsi || '';
    const image = item.image || item.gambar || '';
    const isAvailable = item.inStock !== false && item.stok !== 'Habis';

    return `
    <article class="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-pink-100 hover:border-brand-medium/50 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      <!-- Image Container (Square on mobile, aspect 4:5 on desktop) -->
      <div class="relative w-full aspect-square sm:aspect-[4/5] bg-brand-light/60 overflow-hidden">
        <img 
          src="${image}" 
          alt="${name}" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onerror="this.onerror=null; this.src=DEFAULT_PLACEHOLDER;"
        />
        
        <!-- Category Pill Badge -->
        <div class="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold text-brand-accent shadow-sm border border-pink-100">
          ${category}
        </div>

        <!-- In Stock Badge -->
        <div class="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-emerald-500/90 text-white backdrop-blur-md px-1.5 py-0.5 sm:px-2 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wide shadow-sm flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span class="hidden xs:inline sm:inline">${isAvailable ? 'Tersedia' : 'Habis'}</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-2.5 sm:p-4 flex flex-col flex-grow">
        
        <h3 class="font-bold text-xs sm:text-sm text-brand-dark mb-0.5 group-hover:text-brand-accent transition-colors line-clamp-1" title="${name}">
          ${name}
        </h3>

        <!-- Description (hidden on mobile for compact neatness, shown on tablet/desktop) -->
        <p class="hidden sm:block text-[11px] sm:text-xs text-brand-muted line-clamp-2 mt-1 mb-3 leading-relaxed flex-grow">
          ${description}
        </p>

        <!-- Price & Action -->
        <div class="pt-2 sm:pt-3 border-t border-pink-100/70 flex items-center justify-between gap-1 sm:gap-2 mt-auto">
          <div>
            <span class="text-[8px] sm:text-[10px] text-brand-muted uppercase font-medium block">Harga</span>
            <span class="text-xs sm:text-sm md:text-base font-extrabold text-brand-accent leading-tight">
              ${formatRupiah(price)}
            </span>
          </div>

          <button 
            type="button" 
            onclick="addToCart('${item.id}')"
            class="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-brand-light text-brand-accent hover:bg-brand-accent hover:text-white font-bold text-[10px] sm:text-xs transition-all duration-200 active:scale-95 shadow-sm"
            title="Tambah ke Keranjang"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Keranjang</span>
            <span class="sm:hidden">Beli</span>
          </button>
        </div>

      </div>

    </article>
    `;
  }).join('');

  // Reinitialize Lucide icons for dynamically added elements
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ================= CART DRAWER & STATE LOGIC =================

/**
 * Add product to cart
 * @param {string|number} productId 
 */
function addToCart(productId) {
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => String(item.id) === String(productId));
  const name = product.name || product.nama || '';
  const price = product.price !== undefined ? product.price : (product.harga || 0);
  const image = product.image || product.gambar || '';
  const category = product.category || product.kategori || '';

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      nama: name,
      name: name,
      harga: price,
      price: price,
      gambar: image,
      image: image,
      kategori: category,
      category: category,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`"${name}" ditambahkan! ✨`);
}

/**
 * Change item quantity (+ or -)
 * @param {string|number} productId 
 * @param {number} delta 
 */
function updateItemQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => String(item.id) === String(productId));
  if (itemIndex === -1) return;

  const newQty = cart[itemIndex].qty + delta;
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  cart[itemIndex].qty = newQty;
  saveCartToStorage();
  updateCartUI();
}

/**
 * Remove an item from cart
 * @param {string|number} productId 
 */
function removeFromCart(productId) {
  const item = cart.find(i => String(i.id) === String(productId));
  cart = cart.filter(item => String(item.id) !== String(productId));
  saveCartToStorage();
  updateCartUI();
  if (item) {
    const itemName = item.name || item.nama;
    showToast(`"${itemName}" dihapus dari keranjang`);
  }
}

// Make cart functions available globally for inline onclick attributes
window.addToCart = addToCart;
window.updateItemQuantity = updateItemQuantity;
window.removeFromCart = removeFromCart;

/**
 * Update all cart UI components (badge, list, totals, mobile bar)
 */
function updateCartUI() {
  const totalItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const p = item.price !== undefined ? item.price : item.harga;
    return sum + (p * item.qty);
  }, 0);

  // Update Badges & Labels
  if (cartBadge) cartBadge.textContent = totalItemCount;
  if (cartItemCountLabel) cartItemCountLabel.textContent = totalItemCount;

  // Toggle Cart Empty / Filled state
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmptyMessage.classList.remove('hidden');
    cartCheckoutSection.classList.add('hidden');
    if (cartBuyerFormSection) cartBuyerFormSection.classList.add('hidden');
    if (cartSubtotalPriceEl) cartSubtotalPriceEl.textContent = formatRupiah(0);
    if (cartTotalPriceEl) cartTotalPriceEl.textContent = formatRupiah(0);

    // Hide mobile floating bar
    if (mobileFloatingCart) {
      mobileFloatingCart.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      mobileFloatingCart.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }
    return;
  }

  cartEmptyMessage.classList.add('hidden');
  cartCheckoutSection.classList.remove('hidden');
  if (cartBuyerFormSection) cartBuyerFormSection.classList.remove('hidden');

  // Render Cart Item Cards
  cartItemsContainer.innerHTML = cart.map(item => {
    const name = item.name || item.nama;
    const price = item.price !== undefined ? item.price : item.harga;
    const image = item.image || item.gambar;

    return `
    <div class="flex items-center gap-2.5 sm:gap-3 bg-brand-bg/70 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-pink-100">
      
      <!-- Thumbnail -->
      <img 
        src="${image}" 
        alt="${name}" 
        class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover bg-white shrink-0 border border-pink-100"
        onerror="this.onerror=null; this.src=DEFAULT_PLACEHOLDER;"
      />

      <!-- Item Info -->
      <div class="flex-grow min-w-0 pr-1">
        <h4 class="font-bold text-xs sm:text-sm text-brand-dark truncate" title="${name}">
          ${name}
        </h4>
        <p class="text-[10px] sm:text-xs text-brand-muted">
          ${formatRupiah(price)}
        </p>
        <p class="text-xs sm:text-sm font-bold text-brand-accent mt-0.5">
          ${formatRupiah(price * item.qty)}
        </p>
      </div>

      <!-- Quantity Controls & Delete -->
      <div class="flex flex-col items-end gap-1.5 shrink-0">
        
        <button 
          onclick="removeFromCart('${item.id}')"
          class="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Hapus produk"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
        </button>

        <div class="flex items-center gap-1 bg-white border border-pink-200 rounded-full px-1.5 py-0.5 shadow-sm">
          <button 
            onclick="updateItemQuantity('${item.id}', -1)"
            class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full hover:bg-brand-light text-brand-muted hover:text-brand-accent transition-colors font-bold text-xs"
            title="Kurangi kuantitas"
          >
            -
          </button>
          
          <span class="w-5 text-center text-xs font-bold text-brand-dark">
            ${item.qty}
          </span>

          <button 
            onclick="updateItemQuantity('${item.id}', 1)"
            class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full hover:bg-brand-light text-brand-muted hover:text-brand-accent transition-colors font-bold text-xs"
            title="Tambah kuantitas"
          >
            +
          </button>
        </div>

      </div>

    </div>
    `;
  }).join('');

  // Update total prices
  if (cartSubtotalPriceEl) cartSubtotalPriceEl.textContent = formatRupiah(totalPrice);
  if (cartTotalPriceEl) cartTotalPriceEl.textContent = formatRupiah(totalPrice);

  // Update Mobile Floating Cart Bar
  if (mobileFloatingCart && mobileCartCount && mobileCartTotal) {
    mobileCartCount.textContent = totalItemCount;
    mobileCartTotal.textContent = formatRupiah(totalPrice);
    mobileFloatingCart.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    mobileFloatingCart.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Open cart drawer
 */
function openCart() {
  cartDrawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
  cartDrawerBackdrop.classList.add('opacity-100');
  cartDrawer.classList.remove('translate-x-full');
  cartDrawer.classList.add('translate-x-0');
  document.body.classList.add('overflow-hidden');
}

/**
 * Close cart drawer
 */
function closeCart() {
  cartDrawerBackdrop.classList.remove('opacity-100');
  cartDrawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
  cartDrawer.classList.remove('translate-x-0');
  cartDrawer.classList.add('translate-x-full');
  document.body.classList.remove('overflow-hidden');
}

window.openCart = openCart;
window.closeCart = closeCart;

// ================= CHECKOUT VIA WHATSAPP =================

/**
 * Compile order details and customer data, then open WhatsApp chat
 */
function checkoutWhatsApp() {
  if (cart.length === 0) {
    showToast('Keranjang belanja masih kosong! Pilih produk dulu yuk.');
    return;
  }

  const name = buyerNameInput.value.trim();
  const address = buyerAddressInput.value.trim();
  const notes = buyerNotesInput.value.trim();

  // Validate required fields
  if (!name) {
    buyerNameInput.focus();
    buyerNameInput.classList.add('ring-2', 'ring-red-400', 'border-red-400');
    showToast('Mohon lengkapi Nama Anda terlebih dahulu.');
    return;
  } else {
    buyerNameInput.classList.remove('ring-2', 'ring-red-400', 'border-red-400');
  }

  if (!address) {
    buyerAddressInput.focus();
    buyerAddressInput.classList.add('ring-2', 'ring-red-400', 'border-red-400');
    showToast('Mohon lengkapi Alamat Pengiriman Anda.');
    return;
  } else {
    buyerAddressInput.classList.remove('ring-2', 'ring-red-400', 'border-red-400');
  }

  // Calculate total
  const totalPrice = cart.reduce((sum, item) => {
    const p = item.price !== undefined ? item.price : item.harga;
    return sum + (p * item.qty);
  }, 0);

  // Build items list
  const itemsText = cart.map((item, index) => {
    const itemName = item.name || item.nama;
    const itemPrice = item.price !== undefined ? item.price : item.harga;
    const subtotal = itemPrice * item.qty;
    return `${index + 1}. *${itemName}*\n   - Jumlah: ${item.qty} pcs\n   - Subtotal: ${formatRupiah(subtotal)}`;
  }).join('\n\n');

  // Format message text
  const message =
    `*PESANAN BARU - TOKO LUTHFIAH*
----------------------------------------
Halo Admin Toko Luthfiah, saya ingin memesan produk berikut:

*DETAIL PESANAN:*
${itemsText}

----------------------------------------
*TOTAL PEMBAYARAN:* *${formatRupiah(totalPrice)}*
*(Belum termasuk ongkos kirim)*
----------------------------------------

*DATA PENGIRIMAN PEMBELI:*
• *Nama Lengkap:* ${name}
• *Alamat Pengiriman:* ${address}
${notes ? `• *Catatan:* ${notes}\n` : ''}
Mohon info ketersediaan stok & nomor rekening untuk pembayaran ya. Terima kasih! ✨`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank');
}

// ================= EVENT LISTENERS =================

function setupEventListeners() {
  const currentCategoryButtons = document.querySelectorAll('.category-btn');

  // Live Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    renderCatalog();
    searchInput.focus();
  });

  // Reset Filter Button on empty state
  resetFilterBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    currentCategory = 'Semua';
    currentCategoryButtons.forEach(btn => {
      if (btn.dataset.category === 'Semua') {
        btn.classList.add('bg-brand-accent', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-brand-bg', 'text-brand-muted', 'border');
      } else {
        btn.classList.remove('bg-brand-accent', 'text-white', 'shadow-sm');
        btn.classList.add('bg-brand-bg', 'text-brand-muted', 'border');
      }
    });
    renderCatalog();
  });

  // Category Filter Buttons
  currentCategoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategoryButtons.forEach(b => {
        b.classList.remove('bg-brand-accent', 'text-white', 'shadow-sm');
        b.classList.add('bg-brand-bg', 'text-brand-muted', 'border');
      });
      btn.classList.add('bg-brand-accent', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-brand-bg', 'text-brand-muted', 'border');

      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });

  // Cart Drawer open/close
  openCartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  startShoppingBtn.addEventListener('click', () => {
    closeCart();
    document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
  });

  // Close when clicking outside drawer
  cartDrawerBackdrop.addEventListener('click', (e) => {
    if (e.target === cartDrawerBackdrop) {
      closeCart();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
    }
  });

  // WhatsApp Checkout Button
  checkoutWaBtn.addEventListener('click', checkoutWhatsApp);

  // Clear validation error on input
  buyerNameInput.addEventListener('input', () => {
    buyerNameInput.classList.remove('ring-2', 'ring-red-400', 'border-red-400');
  });
  buyerAddressInput.addEventListener('input', () => {
    buyerAddressInput.classList.remove('ring-2', 'ring-red-400', 'border-red-400');
  });
}

// ================= INITIALIZATION =================

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadCartFromStorage();
  updateCartUI();
  loadProducts();

  // Initialize Lucide icons on load
  if (window.lucide) {
    lucide.createIcons();
  }
});
