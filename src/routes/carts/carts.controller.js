const productsRepo = require("../../repositories/products");
const cartsRepo = require("../../repositories/carts");

const cartShowTemplate = require("../../views/carts/show");

async function httpAddItem(req, res) {
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

  res.redirect("/cart");
}

async function httpGetAllItems(req, res) {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.productId);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
}

async function httpDeleteItem(req, res) {
  const cart = await cartsRepo.getOne(req.session.cartId);

  const item = cart.items.find((item) => item.productId === req.body.itemId);

  if (item.quantity > 1) {
    // decrement count if there are more than 1 item
    item.quantity--;
  } else {
    // completely remove an item if the quantity is 0
    cart.items = cart.items.filter(
      (item) => item.productId !== req.body.itemId
    );
  }

  await cartsRepo.update(req.session.cartId, { items: cart.items });
  res.redirect("/cart");
}

module.exports = {
  httpAddItem,
  httpGetAllItems,
  httpDeleteItem,
};
