# Toko Luthfiah - General & Beauty Store

Website e-commerce modern bertema **Soft Pink / Pastel Aesthetic** untuk toko **Luthfiah**, yang menyediakan berbagai pilihan produk kecantikan, perawatan diri (*skincare*, *kosmetik*, pasta gigi), dan kebutuhan sehari-hari.

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
├── index.html         # Struktur HTML5 + Tailwind CSS Play CDN + Desain Responsif
├── app.js             # Logika Vanilla JavaScript (State, Cart, LocalStorage, Live Search, WA Checkout)
├── products.json      # Data produk toko Luthfiah (7 item produk)
├── images/            # Folder penyimpanan foto produk lokal
│   ├── colgate.jpg            # Foto pasta gigi Colgate Total Plaque Release
│   ├── liptint.jpg            # Foto OMG Lip Tint Gloss Rose Gold
│   ├── amaterasun.jpg         # Foto Amaterasun UV Skin Tint SPF 35
│   ├── kipas-goojodoq.jpg     # Foto Kipas Portable Goojodoq Pink
│   ├── tumbler-ecentio.jpg    # Foto Tumbler Ecentio Aesthetic
│   ├── tisu-mitu.jpg          # Foto Tisu Basah Mitu Baby Wipes
│   └── stabilo-montana.jpg    # Foto Highlighter / Stabilo Montana
└── README.md          # Petunjuk penggunaan & dokumentasi lengkap
```

---

## ✨ Fitur Utama
1. **Hero Banner Interaktif:**
   - Tagline menarik dengan tombol CTA *"Lihat Produk"* yang melakukan smooth scroll ke katalog.
   - Tombol cepat tanya Admin via WhatsApp (`+62 821-6189-9282`).
   - Badge keunggulan: *100% Original*, *Harga Hemat*, *Kirim Aman*.

2. **Katalog Produk & Filter Kategori:**
   - **Live Search:** Pencarian instan berdasarkan nama, kategori, atau deskripsi produk.
   - **Filter Kategori Cepat:** *Semua, Skincare, Kosmetik, Perawatan Diri, Kebutuhan Rumah*.
   - **Grid Responsif:** 2 kolom di HP (seperti standar Tokopedia/Shopee/Zara), 3 kolom di tablet, dan 4 kolom di desktop layar lebar.
   - **Kartu Produk:** Menampilkan foto produk asli, status stok, harga terformat Rupiah (`Rp`), dan tombol interaktif `+ Beli` / `+ Keranjang`.

3. **Keranjang Belanja (Drawer Slide-in):**
   - Modal drawer modern yang meluncur halus dari sisi kanan.
   - Badge jumlah produk di header yang terupdate real-time.
   - Kontrol kuantitas barang `(+)` dan `(-)`, tombol hapus `(trash icon)`, serta subtotal per produk.
   - Form Data Pembeli (Nama, Alamat, Catatan) diletakkan di dalam area scrollable agar tidak terpotong saat keyboard virtual HP terbuka.
   - **Penyimpanan Otomatis (Local Storage):** Isi keranjang belanja tidak hilang saat halaman di-refresh.

4. **Floating Mobile Cart Bar:**
   - Di layar HP, bar melayang estetik muncul otomatis saat ada item di keranjang agar pembeli dapat langsung membuka keranjang belanja kapan saja.

5. **Checkout via WhatsApp:**
   - Input Nama Lengkap (wajib), Alamat Pengiriman (wajib), dan Catatan Khusus (opsional).
   - Tombol *"Pesan via WhatsApp"* dengan validasi form.
   - Otomatis merangkai teks pesanan berformat rapi (Detail pesanan, kuantitas, subtotal, total harga, dan data penerima).
   - Membuka tautan resmi `https://wa.me/6282161899282` menggunakan `encodeURIComponent`.

---

## 🚀 Cara Menjalankan Website
Anda dapat menjalankan website ini dengan 2 cara mudah:

### Cara 1: Langsung Buka File (Tanpa Server)
Cukup klik dua kali (*double click*) file `index.html` di File Explorer Anda. Sistem telah dilengkapi fitur *fail-safe internal fallback* sehingga data produk tetap muncul sempurna meskipun dibuka langsung via protokol `file://`.

### Cara 2: Menggunakan Local Web Server (Direkomendasikan)
Jika Anda menggunakan VS Code / Anti-Gravity IDE:
- Klik kanan pada `index.html` lalu pilih **"Open with Live Server"**.
- Atau jalankan perintah berikut di terminal:
  ```bash
  npx serve .
  ```
  Lalu buka alamat `http://localhost:3000` di browser Anda.
