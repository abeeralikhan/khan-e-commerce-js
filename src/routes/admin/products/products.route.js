const express = require("express");

const router = express.Router();

const productsController = require("./products.controller");

// to get all products
router.get("/", (req, res) => {});

// to show a form to create a brand new product
router.get("/create", (req, res) => {});

module.exports = router;
