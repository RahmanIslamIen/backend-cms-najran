const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

// Inisialisasi
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ENDPOINT REGISTER ---
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, bio } = req.body;

  // 1. Validasi Input Dasar
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Isi semua field (username, email, password) ya!",
    });
  }

  // 2. Cek User Terdaftar (Gunakan findFirst untuk MySQL/XAMPP)
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Username atau Email sudah dipakai orang lain.",
    });
  }

  // 3. Hashing Password (Keamanan wajib)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Simpan ke MySQL via Prisma
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      bio: bio || null,
    },
    // Memilih data yang dikembalikan (Password jangan dikirim balik!)
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "User berhasil didaftarkan! 🚀",
    data: user,
  });
});

// --- GLOBAL ERROR HANDLER (Fitur Express 5) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Ada masalah di internal server!",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`
  ✅ Server Blog Aktif!
  🌍 URL: http://localhost:${PORT}
  🛠  Database: MySQL (XAMPP)
  `);
});
