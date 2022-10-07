const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth/auth.route");
const productsRouter = require("./routes/admin/products/products.route");

const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["pq4gh3turiowp"],
  })
);

// redirect the root endpoint to the products list endpoint
app.get("/", (req, res) => res.redirect("/admin/products/list"));

// admin routers
app.use("/admin", authRouter);
app.use("/admin/products", productsRouter);

module.exports = app;
