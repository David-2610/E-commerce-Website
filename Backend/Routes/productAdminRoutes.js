const express = require("express");
const mongoose = require('mongoose');
const Product = require("../Models/Product.js");
const {protect, admin} = require("../middleware/authmiddleware.js");

// @route GET /api/admin/products
// @desc Get all products (admin only) 
// @access Private/Admin

const router = express.Router();
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// @route   POST /api/admin/products/addproduct
// @desc    Add a new product (admin only)
// @access  Private/Admin
// POST /api/admin/products/addproduct
router.post('/addproduct', protect, admin, async (req, res) => {
  const userId = req.user._id; // Get the user ID from the authenticated user
  try {

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      rating,
      numReviews
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      rating,
      numReviews,
      user: userId 
    });

    

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;