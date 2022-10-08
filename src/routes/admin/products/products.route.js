const multer = require("multer");
const express = require("express");

const {
  httpGetProducts,
  httpGetProductForm,
  httpGetProductEditForm,
  httpSubmitProductForm,
  httpSubmitProductEditForm,
} = require("./products.controller");

const { requireTitle, requirePrice } = require("../validators");
const { handleErrors, checkAuthentication } = require("../middlewares");
const productsNewTemplate = require("../../../views/admin/products/new");
const productsEditTemplate = require("../../../views/admin/products/edit");
const productsRepo = require("../../../repositories/products");

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

async function sendProductData(req) {
  const product = await productsRepo.getOne(req.params.id);

  return { product };
}

router.post(
  "/:id/edit",
  checkAuthentication,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, sendProductData),
  httpSubmitProductEditForm
);

module.exports = router;
