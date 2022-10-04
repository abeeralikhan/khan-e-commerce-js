const express = require("express");

const productsController = require("./products.controller");
const { requireTitle, requirePrice } = require("../validators");

const router = express.Router();

// to get all products
router.get("/");

// to show the product creation form
router.get("/create", productsController.httpGetProductForm);

// to submit the product creation form
router.post(
  "/create",
  [requireTitle, requirePrice],
  productsController.httpSubmitProductForm
);

module.exports = router;
