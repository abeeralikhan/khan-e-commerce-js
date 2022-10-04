const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

const PORT = 3000;

app.use(express.static("public"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["pq4gh3turiowp"],
  })
);

// admin routers
app.use("/admin", authRouter);
app.use("/admin", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
