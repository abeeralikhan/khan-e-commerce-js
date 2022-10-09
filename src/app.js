const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const cartsRouter = require("./routes/carts/carts.route");
const authRouter = require("./routes/admin/auth/auth.route");
const productsRouter = require("./routes/products/products.route");
const adminProductsRouter = require("./routes/admin/products/products.route");

const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["pq4gh3turiowp"],
  })
);

// redirect the root endpoint to the products endpoint
app.get("/", (req, res) => res.redirect("/products"));

// admin routers
app.use("/admin", authRouter);
app.use("/admin/products", adminProductsRouter);

// products router
app.use("/products", productsRouter);

// carts router
app.use("/cart", cartsRouter);

module.exports = app;
