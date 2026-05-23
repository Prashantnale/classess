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
      error.errors.forEach((element) => {
        err = { ...err, [element.path]: element.message };
      });
    }
    res.status(422).json({ msg: "Validation error", errors: err });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["id", "DESC"]] });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
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
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const { name, description, price, tags } = req.body;

    if (req.file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, "../uploads/", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      product.image = req.file.filename;
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.tags = tags ? JSON.parse(tags) : [];

    await product.save();

    res.json({ product, msg: "Product updated successfully" });
  } catch (error) {
    var err = {};
    if (error.errors) {
      error.errors.forEach((element) => {
        err = { ...err, [element.path]: element.message };
      });
    }
    res.status(422).json({ msg: "Validation error", errors: err });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "../uploads/", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { create, getAll, getOne, update, remove };
