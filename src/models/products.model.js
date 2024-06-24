const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    inStock: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
