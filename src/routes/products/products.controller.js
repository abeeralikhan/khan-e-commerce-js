const productsRepo = require("../../repositories/products");
const productsIndexTemplate = require("../../views/products/index");

async function httpGetAllProducts(req, res) {
  const products = await productsRepo.getAll();

  res.send(productsIndexTemplate({ products }));
}

module.exports = {
  httpGetAllProducts,
};
