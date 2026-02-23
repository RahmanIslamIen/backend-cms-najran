# ✍️ Backend CMS Blog - Najran

Aplikasi Backend Blog sederhana menggunakan **Express 5**, **Prisma 5**, dan **MySQL**.

## 🚀 Persiapan Awal

Sebelum menjalankan aplikasi, pastikan Anda sudah menginstal:

- **Node.js** (Rekomendasi v20 ke atas)
- **XAMPP** (Untuk menjalankan MySQL)
- **Git**

---

## 🛠️ Langkah-Langkah Instalasi

### 1. Clone Repositori

```bash
git clone [https://github.com/RahmanIslamIen/backend-cms-najran.git](https://github.com/RahmanIslamIen/backend-cms-najran.git)
cd backend-cms-najran
```

### 2. Instal Dependensi Terlebih Dahulu

```bash
npm install
```

### 3. Konfigurasi Environment Variables

```bash
# Koneksi Database (XAMPP Default)
DATABASE_URL="mysql://root:@localhost:3306/nama_database_lu"

# Keamanan JWT
JWT_SECRET="masukkan_kode_rahasia_bebas_di_sini"

# Port Server
PORT=5000
```

### 4. Sinkronisasi Database (Prisma)

```bash
# Push skema ke database
npx prisma db push

# Generate client prisma
npx prisma generate
```

### 5. Menjalankan Aplikasi

Mode Development

```bash
npm run dev
```

Mode Production

```bash
npm start
```

semua sudah aman silahkan mencoba !
