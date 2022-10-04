const productsRepo = require("../../../repositories/products");
const productsNewTemplate = require("../../../views/admin/products/new");

function httpGetProductCreationForm(req, res) {
  res.send(productsNewTemplate({}));
}

module.exports = { httpGetProductCreationForm };
