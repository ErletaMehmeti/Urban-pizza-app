const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// views folder
app.use("/views", express.static(path.join(__dirname, "views")));

/* ================= MONGODB ================= */
mongoose.connect("mongodb://127.0.0.1:27017/urbanpizza")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo error:", err));

/* ================= MODELS ================= */
const Application = require("./models/Application");

/* ================= ROUTES ================= */

// HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// APLIKO
app.post("/apliko", async (req, res) => {
  try {
    const appData = new Application(req.body);
    await appData.save();

    res.json({
      success: true,
      message: "Aplikimi u ruajt me sukses"
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ADMIN – shiko aplikimet
app.get("/admin/aplikime", async (req, res) => {
  const data = await Application.find().sort({ createdAt: -1 });
  res.json(data);
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});
