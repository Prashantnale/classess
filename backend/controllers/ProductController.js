const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const create = async (req, res) => {
  try {
    const data = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      ...data,
      image: image,
      tags: data.tags ? JSON.parse(data.tags) : [],
    });

    res.status(201).json({ product, msg: "Product created successfully" });
  } catch (error) {
    console.log(error);

    var err = {};
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        err = { ...err, [key]: error.errors[key].message };
      });
    }
    res.status(422).json({ msg: "Validation error", errors: err });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, "../uploads/", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    if (updateData.tags) {
      updateData.tags = JSON.parse(updateData.tags);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ product: updatedProduct, msg: "Product updated successfully" });
  } catch (error) {
    var err = {};
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        err = { ...err, [key]: error.errors[key].message };
      });
    }
    res.status(422).json({ msg: "Validation error", errors: err });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "../uploads/", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { create, getAll, getOne, update, remove };
