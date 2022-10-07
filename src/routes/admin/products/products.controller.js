const productsRepo = require("../../../repositories/products");

const productsNewTemplate = require("../../../views/admin/products/new");
const productsIndexTemplate = require("../../../views/admin/products/index");
const productsEditTemplate = require("../../../views/admin/products/edit");

function httpGetProductForm(req, res) {
  res.send(productsNewTemplate({}));
}

async function httpSubmitProductForm(req, res) {
  const image = req.file.buffer.toString("base64");
  const { title, price } = req.body;

  await productsRepo.create({ title, price, image });

  // redirecting the user to the project listing page
  // after succesfully creation of a product
  res.redirect("/admin/products/list");
}

async function httpGetProducts(req, res) {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
}

async function httpGetProductEditForm(req, res) {
  const product = await productsRepo.getOne(req.params.id);

  if (!product) {
    return res.send("Product not found");
  }

  res.send(productsEditTemplate({ product }));
}

module.exports = {
  httpGetProductForm,
  httpSubmitProductForm,
  httpGetProducts,
  httpGetProductEditForm,
};
