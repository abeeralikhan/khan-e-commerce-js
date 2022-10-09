const express = require("express");

const { httpAddProduct, httpGetAllItems } = require("./carts.controller");

const router = express.Router();

// Receive a GET request to show all items in cart
router.get("/", httpGetAllItems);

// Receive a POST request to add an item to a cart
router.post("/products", httpAddProduct);

// Receive a POST request to delete an item from a cart

module.exports = router;
