const { validationResult } = require("express-validator");

const productsRepo = require("../../../repositories/products");
const productsNewTemplate = require("../../../views/admin/products/new");

function httpGetProductForm(req, res) {
  res.send(productsNewTemplate({}));
}

async function httpSubmitProductForm(req, res) {
  const errors = validationResult(req);

  console.log(errors);

  res.send("Submitted");
}

module.exports = { httpGetProductForm, httpSubmitProductForm };
