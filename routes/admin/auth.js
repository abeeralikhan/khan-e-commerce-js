const express = require("express");
const { check, validationResult } = require("express-validator");

const usersRepo = require("../../repositories/users");
const signUpTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");

const router = express.Router();

router.get("/signup", async (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post(
  "/signup",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .custom(async (email) => {
        const doesUserExist = await usersRepo.getOneBy({ email });

        if (doesUserExist) {
          throw new Error("Entered email is already in use!");
        }
      }),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .custom((passwordConfirmation, { req }) => {
        if (req.body.password !== passwordConfirmation) {
          throw new Error("Passwords must match!");
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    console.log(errors);

    const { password, passwordConfirmation, email } = req.body;

    // Create a user in our repo to reperest this person
    // We need to get back the id that is assigned to the newly generated user, because we dont know what id is assigned to them, we randonly generated it
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the users cookie, so we can look upto to the cookie in the follow up requets
    // We will receive this user id inside the cookie later
    req.session.userId = user.id;

    res.send("<h1>Account has been created successfully!</h1>");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out succesfully!");
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    // if we did not find a matching email addres
    return res.send("Email not found!");
  }

  const isPassowrdValid = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!isPassowrdValid) {
    // if the password did not match
    return res.send("Invalid password!");
  }

  // starting a session
  req.session.userId = user.id;

  res.send("You are signed in!");
});

module.exports = router;
