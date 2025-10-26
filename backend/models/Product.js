const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: String,
  purchaseDate: Date,
  expiryDate: Date,
  openDate: Date,
  notes: String
});

module.exports = mongoose.model("Product", productSchema);
