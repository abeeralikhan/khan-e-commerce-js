const productsRepo = require("../../repositories/products");
const cartsRepo = require("../../repositories/carts");

async function httpAddProduct(req, res) {
  const { productId } = req.body;
  console.log(productId);

  res.send("Product Added to Cart");
}

module.exports = {
  httpAddProduct,
};
