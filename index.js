const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World!</h1>");
});

app.get("/loginForm", (req, res) => {
  res.send(`
    <form method="POST">
      <input name="email" type="email" placeholder="Enter your email"/>
      <input name="password" type="password" placeholder="Enter your password"/>
      <button>Sign in</button>
    </form>
  `);
});

app.post("/loginForm", (req, res) => {
  console.log(req.body);
  res.send("<h1>Form has been submitted succesfully!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
