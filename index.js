const cors = require("cors");
app.use(cors());
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

console.log("✅ Starting skincare tracker server...");

console.log("Mongo URI is:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Import product routes
const productRoutes = require("./backend/routes/products");

// Use the product routes under /api/products
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Skincare Tracker API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
});