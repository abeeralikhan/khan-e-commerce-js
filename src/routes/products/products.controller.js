const productsRepo = require("../../repositories/products");

async function httpGetAllProducts(req, res) {
  res.send("Products");
}

module.exports = {
  httpGetAllProducts,
};
