const Product = require("../models/products.model");

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    name,
    productType,
    rating,
    description,
    price,
    tags,
    inStock,
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image,
        name,
        productType,
        rating,
        description,
        price,
        tags,
        inStock,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
};
