const productsRepo = require("../../repositories/products");
const cartsRepo = require("../../repositories/carts");

async function httpAddProduct(req, res) {
  // Figure out cart
  let cart;

  if (!req.session.cartId) {
    // create a new cart
    cart = await cartsRepo.create({ items: [] });

    // store the cart id in the req.session.cartId
    req.session.cartId = cart.id;
    console.log("IF BRANCH");
  } else {
    // get cart from repo
    cart = await cartsRepo.getOne(req.session.cartId);
    console.log("ELSE BRANCH");
  }

  console.log(cart);

  // --> Already exist or not

  // Add new product or increment existing quantity
  const { productId } = req.body;
  console.log(productId);

  res.send("Product Added to Cart");
}

module.exports = {
  httpAddProduct,
};
