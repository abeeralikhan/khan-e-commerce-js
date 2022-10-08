const express = require("express");

const { httpGetAllProducts } = require("./products.controller");

const router = express.Router();

router.get("/", httpGetAllProducts);

module.exports = router;
