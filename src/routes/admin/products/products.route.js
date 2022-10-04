const express = require("express");

const router = express.Router();

const productsController = require("./products.controller");

// to get all products
router.get("/");

// to show a form to create a brand new product
router.get("/create", productsController.httpGetProductCreationForm);

module.exports = router;
