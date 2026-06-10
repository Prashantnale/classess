const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
