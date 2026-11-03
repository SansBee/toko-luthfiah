/**
 * Toko Luthfiah - Modern Drinkware & Thermos E-Commerce
 * Vanilla JavaScript Implementation
 */

// Dummy WhatsApp Admin Number
const WHATSAPP_NUMBER = '6281234567890';
const CART_STORAGE_KEY = 'luthfiah_cart_v1';

// Offline SVG Data URI fallback (immune to ad-blockers / Brave Shields, zero network requests)
const DEFAULT_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23FFF0F5'/%3E%3Ccircle cx='200' cy='180' r='70' fill='%23FFB6C1' opacity='0.7'/%3E%3Cpath d='M175 130h50v20h-50zm10 20h30v90h-30z' fill='%23FF1493'/%3E%3Ctext x='200' y='300' font-family='sans-serif' font-size='18' font-weight='bold' fill='%23FF1493' text-anchor='middle'%3ELuthfiah Drinkware%3C/text%3E%3C/svg%3E";
window.DEFAULT_PLACEHOLDER = DEFAULT_PLACEHOLDER;

// Fallback products data (in case products.json is loaded directly via file:// protocol without a local web server)
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    nama: "Pastel Matte Tumbler 500ml",
    harga: 79000,
    kategori: "Tumbler",
    deskripsi: "Tumbler stainless steel SUS 304 anti karat dengan finishing matte warna soft pink elegan. Tahan suhu dingin & panas hingga 8 jam.",
    gambar: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 2,
    nama: "Sweet Peach Thermos Flask 450ml",
    harga: 89000,
    kategori: "Thermos",
    deskripsi: "Thermos modern dengan teknologi isolasi vakum ganda, penutup anti bocor 360°, dan gantungan silikon pastel yang manis.",
    gambar: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 3,
    nama: "Aesthetic Glass Tumbler with Straw 400ml",
    harga: 65000,
    kategori: "Glassware",
    deskripsi: "Gelas borosilikat transparan tebal tahan panas & dingin, lengkap dengan sedotan kaca higienis dan sleeve pelindung pink.",
    gambar: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 4,
    nama: "Blossom Gradient Sport Bottle 1000ml",
    harga: 75000,
    kategori: "Sport Bottle",
    deskripsi: "Botol minum motivasi 1 Liter dengan penanda waktu, sedotan pop-up otomatis, dan gradasi warna pink-peach yang menyegarkan.",
    gambar: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 5,
    nama: "Mini Pocket Vacuum Cup 280ml",
    harga: 69000,
    kategori: "Thermos",
    deskripsi: "Thermos saku berukuran praktis yang pas dimasukkan ke dalam tas tangan. Ideal untuk menjaga kopi atau teh hangat kesayangan.",
    gambar: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 6,
    nama: "Ceramic Insulated Coffee Mug 380ml",
    harga: 95000,
    kategori: "Coffee Mug",
    deskripsi: "Mug termal berpelapis keramik murni di bagian dalam sehingga rasa kopi tetap autentik tanpa aroma logam. Tutup anti tumpah.",
    gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 7,
    nama: "Rose Gold Smart Thermos LED 500ml",
    harga: 99000,
    kategori: "Thermos",
    deskripsi: "Thermos pintar dengan sensor layar sentuh LED pada tutup untuk memantau suhu minuman secara real-time. Mewah dan canggih.",
    gambar: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 8,
    nama: "Pastel Bear Kids Sippy Bottle 550ml",
    harga: 82000,
    kategori: "Kids Bottle",
    deskripsi: "Botol minum anak bermotif beruang imut dengan sedotan silikon lembut, tali selempang panjang, dan material 100% BPA Free aman.",
    gambar: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 9,
    nama: "Crystal Infuser Water Bottle 600ml",
    harga: 72000,
    kategori: "Infuser",
    deskripsi: "Botol infused water dengan saringan buah berbahan food-grade. Bantu penuhi hidrasi harian dengan racikan buah favorit.",
    gambar: "https://images.unsplash.com/photo-1559839914-1b346d71b3e8?auto=format&fit=crop&w=600&q=80",
    stok: "Tersedia"
  },
  {
    id: 10,
    nama: "Double-Wall Glitter Tumbler 650ml",
    harga: 85000,
    kategori: "Tumbler",
    deskripsi: "Tumbler dinding ganda berisi glitter cair gemerlap warna pink pastel. Dilengkapi sedotan reusable dan anti keringat di dinding luar.",
    gambar: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=600&q=80",
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
const categoryButtons = document.querySelectorAll('.category-btn');

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
const cartItemCountLabel = document.getElementById('cart-item-count-label');
const cartSubtotalPriceEl = document.getElementById('cart-subtotal-price');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const checkoutWaBtn = document.getElementById('checkout-wa-btn');

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
 * @returns {string} e.g. "Rp 79.000"
 */
function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
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
  toastEl.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toastEl.classList.add('translate-y-0', 'opacity-100');

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('translate-y-0', 'opacity-100');
    toastEl.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
  }, 2600);
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
    console.warn('Gagal fetch products.json (mungkin dibuka via file://), menggunakan data cadangan internal:', error);
    products = [...FALLBACK_PRODUCTS];
  }
  renderCatalog();
}

/**
 * Filter and render products to grid
 */
function renderCatalog() {
  const filtered = products.filter(item => {
    const matchesCategory = currentCategory === 'Semua' || item.kategori.toLowerCase() === currentCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' || 
      item.nama.toLowerCase().includes(query) || 
      item.deskripsi.toLowerCase().includes(query) || 
      item.kategori.toLowerCase().includes(query);
    
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

  // Render product cards
  productsGrid.innerHTML = filtered.map(item => `
    <article class="group bg-white rounded-3xl overflow-hidden border border-pink-100 hover:border-brand-medium/50 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      <!-- Image Container -->
      <div class="relative w-full h-56 bg-brand-light/60 overflow-hidden">
        <img 
          src="${item.gambar}" 
          alt="${item.nama}" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onerror="this.onerror=null; this.src=DEFAULT_PLACEHOLDER;"
        />
        
        <!-- Category Pill Badge -->
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-brand-accent shadow-sm border border-pink-100">
          ${item.kategori}
        </div>

        <!-- In Stock Badge -->
        <div class="absolute top-3 right-3 bg-emerald-500/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shadow-sm flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>${item.stok}</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-5 flex flex-col flex-grow">
        
        <h3 class="font-bold text-base text-brand-dark mb-1 group-hover:text-brand-accent transition-colors line-clamp-1" title="${item.nama}">
          ${item.nama}
        </h3>

        <p class="text-xs text-brand-muted line-clamp-2 mb-4 leading-relaxed flex-grow">
          ${item.deskripsi}
        </p>

        <!-- Price & Action -->
        <div class="pt-3 border-t border-pink-100/70 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span class="text-[10px] text-brand-muted uppercase font-medium block">Harga</span>
            <span class="text-base font-extrabold text-brand-accent">
              ${formatRupiah(item.harga)}
            </span>
          </div>

          <button 
            type="button" 
            onclick="addToCart(${item.id})"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-light text-brand-accent hover:bg-brand-accent hover:text-white font-bold text-xs transition-all duration-200 active:scale-95 shadow-sm"
            title="Tambah ke Keranjang"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Keranjang</span>
          </button>
        </div>

      </div>

    </article>
  `).join('');

  // Reinitialize Lucide icons for dynamically added elements
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ================= CART DRAWER & STATE LOGIC =================

/**
 * Add product to cart
 * @param {number} productId 
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      nama: product.nama,
      harga: product.harga,
      gambar: product.gambar,
      kategori: product.kategori,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`"${product.nama}" ditambahkan ke keranjang! ✨`);
}

/**
 * Change item quantity (+ or -)
 * @param {number} productId 
 * @param {number} delta 
 */
function updateItemQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
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
 * @param {number} productId 
 */
function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  if (item) {
    showToast(`"${item.nama}" dihapus dari keranjang`);
  }
}

// Make cart functions available globally for inline onclick attributes
window.addToCart = addToCart;
window.updateItemQuantity = updateItemQuantity;
window.removeFromCart = removeFromCart;

/**
 * Update all cart UI components (badge, list, totals)
 */
function updateCartUI() {
  const totalItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  // Update Badges & Labels
  cartBadge.textContent = totalItemCount;
  cartItemCountLabel.textContent = totalItemCount;

  // Toggle Cart Empty / Filled state
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmptyMessage.classList.remove('hidden');
    cartCheckoutSection.classList.add('hidden');
    cartSubtotalPriceEl.textContent = formatRupiah(0);
    cartTotalPriceEl.textContent = formatRupiah(0);
    return;
  }

  cartEmptyMessage.classList.add('hidden');
  cartCheckoutSection.classList.remove('hidden');

  // Render Cart Item Cards
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="flex items-center gap-3.5 bg-brand-bg/60 p-3 rounded-2xl border border-pink-100">
      
      <!-- Thumbnail -->
      <img 
        src="${item.gambar}" 
        alt="${item.nama}" 
        class="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-pink-100"
        onerror="this.onerror=null; this.src=DEFAULT_PLACEHOLDER;"
      />

      <!-- Item Info -->
      <div class="flex-grow min-w-0">
        <h4 class="font-bold text-xs text-brand-dark truncate" title="${item.nama}">
          ${item.nama}
        </h4>
        <p class="text-[11px] text-brand-muted">
          ${formatRupiah(item.harga)}
        </p>
        <p class="text-xs font-bold text-brand-accent mt-0.5">
          ${formatRupiah(item.harga * item.qty)}
        </p>
      </div>

      <!-- Quantity Controls & Delete -->
      <div class="flex flex-col items-end gap-2 shrink-0">
        
        <button 
          onclick="removeFromCart(${item.id})"
          class="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Hapus produk"
        >
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>

        <div class="flex items-center gap-1.5 bg-white border border-pink-200 rounded-full px-1.5 py-0.5 shadow-sm">
          <button 
            onclick="updateItemQuantity(${item.id}, -1)"
            class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-brand-light text-brand-muted hover:text-brand-accent transition-colors font-bold text-xs"
            title="Kurangi kuantitas"
          >
            -
          </button>
          
          <span class="w-6 text-center text-xs font-bold text-brand-dark">
            ${item.qty}
          </span>

          <button 
            onclick="updateItemQuantity(${item.id}, 1)"
            class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-brand-light text-brand-muted hover:text-brand-accent transition-colors font-bold text-xs"
            title="Tambah kuantitas"
          >
            +
          </button>
        </div>

      </div>

    </div>
  `).join('');

  // Update total prices
  cartSubtotalPriceEl.textContent = formatRupiah(totalPrice);
  cartTotalPriceEl.textContent = formatRupiah(totalPrice);

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
  const totalPrice = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  // Build items list
  const itemsText = cart.map((item, index) => {
    const subtotal = item.harga * item.qty;
    return `${index + 1}. *${item.nama}*\n   - Jumlah: ${item.qty} pcs\n   - Subtotal: ${formatRupiah(subtotal)}`;
  }).join('\n\n');

  // Format message text
  const message = 
`*PESANAN BARU - TOKO LUTHFIAH*
----------------------------------------
Halo Admin Toko Luthfiah, saya ingin memesan produk drinkware berikut:

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
