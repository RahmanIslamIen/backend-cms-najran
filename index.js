const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// --- 1. ENDPOINT REGISTER USER ---
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Field name, email, & password wajib diisi!",
    });
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "Email sudah terdaftar!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "USER", // Default ke USER kalau tidak diisi
    },
    select: { id: true, name: true, email: true, role: true },
  });

  res
    .status(201)
    .json({ success: true, message: "User berhasil dibuat!", data: newUser });
});

// --- 2. ENDPOINT LOGIN USER ---
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Email atau Password salah!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Email atau Password salah!" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, role: user.role },
  });
});

// --- 3. ENDPOINT GET ALL USERS (Optional buat ngecek) ---
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      _count: { select: { posts: true } },
    },
  });
  res.json({ success: true, data: users });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
});
