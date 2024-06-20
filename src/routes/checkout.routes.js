const express = require("express");
const products = require("../models/products");
const router = express.Router();

const Products = require("../models/products");

router.get("/", async (req, res) => {
  const Products = await Products.find();
  console.log(Products);
  res.json(Products);
});

router.get("/:id", async (req, res) => {
  const products = await Products.findById(req.params.id);
  res.json(Products);
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const products = new products({ name, price });
  await products.save();

  res.json({ status: "Product saved" });
});

router.put("/:id", async (req, res) => {
  const { name, price } = req.body;
  const newProducts= { name, price };
  await Products.findByIdAndUpdate(req.params.id, newProducts);
  res.json({ status: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  await Products.findByIdAndRemove(req.params.id);
  res.json({ status: "Product deleted" });
});

module.exports = router;
