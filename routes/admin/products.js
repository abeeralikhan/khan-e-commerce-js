const express = require("express");

const router = express.Router();

// to get all products
router.get("/products", (req, res) => {});

// to show a form to create a brand new product
router.get("/products/new", (req, res) => {});

module.exports = router;
