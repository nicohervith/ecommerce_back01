// routes/product.routes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");
const {
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

router.post("/create", async (req, res) => {
  const { image, name, description, price, tags, productType } = req.body;

  const newProduct = new Product({
    image,
    name,
    productType,
    description,
    price,
    tags,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
});

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

module.exports = router;
