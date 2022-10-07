const multer = require("multer");
const express = require("express");

const {
  httpGetProducts,
  httpGetProductForm,
  httpSubmitProductForm,
  httpGetProductEditForm,
} = require("./products.controller");

const { requireTitle, requirePrice } = require("../validators");
const { handleErrors, checkAuthentication } = require("../middlewares");
const productsNewTemplate = require("../../../views/admin/products/new");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// to get all products
router.get("/list", checkAuthentication, httpGetProducts);

// to show the product creation form
router.get("/create", checkAuthentication, httpGetProductForm);

// to submit the product creation form
router.post(
  "/create",
  checkAuthentication,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  httpSubmitProductForm
);

router.get("/:id/edit", checkAuthentication, httpGetProductEditForm);

module.exports = router;
