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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
