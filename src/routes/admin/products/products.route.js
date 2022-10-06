const express = require("express");
const multer = require("multer");

const productsController = require("./products.controller");
const { requireTitle, requirePrice } = require("../validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// to get all products
router.get("/");

// to show the product creation form
router.get("/create", productsController.httpGetProductForm);

// to submit the product creation form
router.post(
  "/create",
  upload.single("image"),
  [requireTitle, requirePrice],
  productsController.httpSubmitProductForm
);

module.exports = router;
