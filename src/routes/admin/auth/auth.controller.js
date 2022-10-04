const { validationResult } = require("express-validator");

const usersRepo = require("../../../repositories/users");
const signUpTemplate = require("../../../views/admin/auth/signup");
const signInTemplate = require("../../../views/admin/auth/signin");

async function httpGetSignUp(req, res) {
  res.send(signUpTemplate({ req }));
}

async function httpPostSignUp(req, res) {
  const errors = validationResult(req);

  // if there are some errors in the signup process
  if (!errors.isEmpty()) {
    return res.send(signUpTemplate({ req, errors }));
  }

  const { password, email } = req.body;

  // Create a user in our repo to reperest this person
  // We need to get back the id that is assigned to the newly generated user, because we dont know what id is assigned to them, we randonly generated it
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie, so we can look upto to the cookie in the follow up requets
  // We will receive this user id inside the cookie later
  req.session.userId = user.id;

  res.send("<h1>Account has been created successfully!</h1>");
}

async function httpGetSignIn(req, res) {
  res.send(signInTemplate({}));
}

async function httpPostSignIn(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send(signInTemplate({ errors }));
  }

  const { email } = req.body;

  const user = await usersRepo.getOneBy({ email });

  // starting a session
  req.session.userId = user.id;

  res.send("You are signed in!");
}

async function httpGetSignOut(req, res) {
  req.session = null;
  res.send("You are logged out succesfully!");
}

module.exports = {
  httpGetSignUp,
  httpGetSignIn,
  httpGetSignOut,
  httpPostSignUp,
  httpPostSignIn,
};