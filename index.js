const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

const PORT = 3000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["pq4gh3turiowp"],
  })
);

app.get("/signup", async (req, res) => {
  res.send(`
    <form method="POST">
      <input name="email" type="email" placeholder="Enter your email"/>
      <input name="password" type="password" placeholder="Enter your password"/>
      <input name="passwordConfirmation" type="password" placeholder="Enter your password again"/>
      <button>Sign Up</button>
    </form>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const doesUserExist = await usersRepo.getOneBy({ email });

  if (doesUserExist) {
    return res.send("Email already exist");
  }

  if (password !== passwordConfirmation) {
    return res.send("Password must match!");
  }

  // Create a user in our repo to reperest this person
  // We need to get back the id that is assigned to the newly generated user, because we dont know what id is assigned to them, we randonly generated it
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie, so we can look upto to the cookie in the follow up requets
  // We will receive this user id inside the cookie later
  req.session.userId = user.id;

  res.send("<h1>Account has been created successfully!</h1>");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out succesfully!");
});

app.get("/signin", (req, res) => {
  res.send(`
    <form method="POST">
      <input name="email" type="email" placeholder="Enter your email"/>
      <input name="password" type="password" placeholder="Enter your password"/>
      <button>Sign In</button>
    </form>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    // if we did not find a matching email addres
    return res.send("Email not found!");
  }

  if (user.password !== password) {
    // if the password did not match
    return res.send("Invalid password!");
  }

  // starting a session
  req.session.userId = user.id;

  res.send("You are signed in!");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
