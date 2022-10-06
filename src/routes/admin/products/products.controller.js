const { validationResult } = require("express-validator");

const productsRepo = require("../../../repositories/products");
const productsNewTemplate = require("../../../views/admin/products/new");

function httpGetProductForm(req, res) {
  res.send(productsNewTemplate({}));
}

async function httpSubmitProductForm(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send(productsNewTemplate({ errors }));
  }

  const image = req.file.buffer.toString("base64");
  const { title, price } = req.body;

  await productsRepo.create({ title, price, image });

  res.send("Submitted");
}

module.exports = { httpGetProductForm, httpSubmitProductForm };
