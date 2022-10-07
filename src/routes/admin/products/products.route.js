const multer = require("multer");
const express = require("express");

const { handleErrors } = require("../middlewares");
const { requireTitle, requirePrice } = require("../validators");
const productsController = require("./products.controller");
const productsNewTemplate = require("../../../views/admin/products/new");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// to get all products
router.get("/list", productsController.httpGetProducts);

// to show the product creation form
router.get("/create", productsController.httpGetProductForm);

// to submit the product creation form
router.post(
  "/create",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  productsController.httpSubmitProductForm
);

module.exports = router;
