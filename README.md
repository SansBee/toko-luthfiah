# Toko Luthfiah - Aesthetic Modern Drinkware & Thermos

Website e-commerce modern bertema **Soft Pink / Pastel Aesthetic** untuk toko **Luthfiah**, yang menjual 10 item produk botol minum, termos stainless steel, tumbler, dan drinkware modern.

---

## 🎨 Palet Warna & Desain
- **Pink Muda (Lavender Blush):** `#FFF0F5`
- **Pink Sedang (Light Pink):** `#FFB6C1`
- **Pink Terang / Aksen (Deep Pink):** `#FF1493`
- **Tipografi:** *Plus Jakarta Sans* & *Playfair Display*
- **Ikon:** Lucide Icons

---

## 📁 Struktur File
```text
Toko Luthfiah/
├── index.html         # Struktur HTML5 + Tailwind CSS CDN + Desain Responsif
├── app.js             # Logika Vanilla JavaScript (State, Cart, LocalStorage, Live Search, WA Checkout)
├── products.json      # Data 10 produk drinkware Toko Luthfiah
├── images/            # Folder penyimpanan foto produk Anda sendiri (.jpg, .png, .webp)
└── README.md          # Petunjuk penggunaan & dokumentasi
```

---

## ✨ Fitur Utama
1. **Hero Banner Interaktif:**
   - Tagline menarik dengan tombol CTA *"Lihat Koleksi"* yang melakukan smooth scroll ke katalog.
   - Tombol cepat tanya Admin via WhatsApp.
   - Badge keunggulan: *BPA Free*, *Tahan 8-12 Jam*, *Pengiriman Aman*.

2. **Katalog 10 Produk:**
   - **Live Search:** Pencarian instan berdasarkan nama, kategori, atau deskripsi botol.
   - **Filter Kategori:** Filter cepat (*Semua, Tumbler, Thermos, Glassware, Sport Bottle, Coffee Mug, Kids Bottle, Infuser*).
   - **Grid Responsif:** 1 kolom di HP, 2 kolom di tablet kecil, 3 kolom di tablet medium, dan 4 kolom di desktop layar lebar.
   - **Kartu Produk:** Gambar produk resolusi tinggi, status ketersediaan stok, harga terformat Rupiah (`Rp`), dan tombol interaktif `+ Keranjang`.

3. **Keranjang Belanja (Drawer Slide-in):**
   - Modal drawer modern yang meluncur halus dari sisi kanan.
   - Badge jumlah produk di header yang terupdate real-time.
   - Kontrol kuantitas barang `(+)` dan `(-)`, tombol hapus `(trash icon)`, serta subtotal per produk.
   - Penghitungan total harga otomatis secara instan.
   - **Penyimpanan Otomatis (Local Storage):** Isi keranjang belanja tidak hilang saat halaman di-refresh.

4. **Form Data Pembeli & Checkout WhatsApp:**
   - Input Nama Lengkap (wajib), Alamat Pengiriman (wajib), dan Catatan Khusus (opsional).
   - Tombol *"Pesan via WhatsApp"* dengan validasi input.
   - Otomatis merangkai teks pesanan berformat rapi (Detail pesanan, kuantitas, subtotal, total harga, dan data penerima).
   - Membuka tautan resmi `https://wa.me/6281234567890` menggunakan `encodeURIComponent`.

---

## 🚀 Cara Menjalankan Website
Anda dapat menjalankan website ini dengan 2 cara mudah:

### Cara 1: Langsung Buka File (Tanpa Server)
Cukup klik dua kali (*double click*) file `index.html` di File Explorer Anda. Sistem telah dilengkapi fitur *fail-safe internal fallback* sehingga data produk tetap muncul sempurna meskipun dibuka langsung via protokol `file://`.

### Cara 2: Menggunakan Local Web Server (Direkomendasikan)
Jika Anda menggunakan VS Code / Anti-Gravity IDE, Anda dapat:
- Menggunakan ekstensi **Live Server**, klik kanan pada `index.html` lalu pilih **"Open with Live Server"**.
- Atau jalankan perintah berikut di terminal:
  ```bash
  npx serve .
  ```
  Lalu buka alamat `http://localhost:3000` di browser Anda.

---

## 💡 Tips Menggunakan Foto Produk Sendiri
Jika Anda ingin mengganti foto produk placeholder dengan foto Anda sendiri:
1. Simpan foto produk Anda di dalam folder `images/` (contoh: `images/tumbler-pink.jpg`).
2. Buka file [**`products.json`**](products.json).
3. Ganti nilai `"gambar"` pada produk yang diinginkan dengan nama file lokal Anda, misalnya:
   ```json
   "gambar": "images/tumbler-pink.jpg"
   ```
