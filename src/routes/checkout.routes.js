const express = require("express");
const Products = require("../models/products");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Products.find();
  console.log(products);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  res.json(product);
});

router.post("/", async (req, res) => {
  const { products } = req.body;

  try {
    // Iterar sobre el array de productos y guardarlos en la base de datos
    const savedProducts = [];
    for (const product of products) {
      const { name, price } = product;
      if (!name || !price) {
        throw new Error(
          "Product validation failed: name and price are required"
        );
      }
      const newProduct = new Products({ name, price });
      const savedProduct = await newProduct.save();
      savedProducts.push(savedProduct);
    }

    return res.json({ status: "Successful payment", products: savedProducts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, price } = req.body;
  const newProduct = { name, price };
  await Products.findByIdAndUpdate(req.params.id, newProduct);
  res.json({ status: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  await Products.findByIdAndRemove(req.params.id);
  res.json({ status: "Product deleted" });
});

module.exports = router;
