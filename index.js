const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <form method="POST">
      <input name="email" type="email" placeholder="Enter your email"/>
      <input name="password" type="password" placeholder="Enter your password"/>
      <input name="passwordConfirmation" type="password" placeholder="Enter your password again"/>
      <button>Sign Up</button>
    </form>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const doesUserExist = await usersRepo.getOneBy({ email });

  if (doesUserExist) {
    return res.send("Email already exist");
  }

  if (password !== passwordConfirmation) {
    return res.send("Password must match!");
  }

  res.send("<h1>Account has been created successfully!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
