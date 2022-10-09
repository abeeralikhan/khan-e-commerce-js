const productsRepo = require("../../repositories/products");
const cartsRepo = require("../../repositories/carts");

async function httpAddProduct(req, res) {
  let cart;

  if (!req.session.cartId) {
    // Create a new cart & initialize the items array
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // Get the existing cart
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const productId = req.body.productId;
  const product = cart.items.find((item) => item.productId === productId);

  if (product) {
    // increment quantity & save cart
    product.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ productId, quantity: 1 });
  }

  // update the cart
  await cartsRepo.update(cart.id, { items: cart.items });

  res.send("Product Added to Cart");
}

module.exports = {
  httpAddProduct,
};
