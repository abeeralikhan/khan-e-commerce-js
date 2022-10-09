const express = require("express");

const { httpAddProduct } = require("./carts.controller");

const router = express.Router();

// Receive a POST request to add an item to a cart
router.post("/products", httpAddProduct);

// Receive a GET request to show all items in cart

// Receive a POST request to delete an item from a cart

module.exports = router;
