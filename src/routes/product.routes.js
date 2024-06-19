// routes/product.routes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");
// Ruta para crear un producto
router.post("/create", async (req, res) => {
  const { image, name, description, price, tags ,productType } = req.body;

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

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

module.exports = router;

// routes/product.routes.js
/* const express = require('express');
const router = express.Router();
const Product = require('../models/catalog.model');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.post('/create', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { imgUrl, name, description, price, tags } = req.body;

  const newProduct = new Product({
    imgUrl,
    name,
    description,
    price,
    tags,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
});

module.exports = router; */