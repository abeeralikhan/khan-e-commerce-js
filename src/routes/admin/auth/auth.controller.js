const usersRepo = require("../../../repositories/users");
const signUpTemplate = require("../../../views/admin/auth/signup");
const signInTemplate = require("../../../views/admin/auth/signin");

function httpAdminRedirect(req, res) {
  if (req.session.userId) {
    return res.redirect("/admin/products/list");
  }

  res.redirect("/admin/signin");
}

function httpGetSignUp(req, res) {
  res.send(signUpTemplate({ req }));
}

async function httpPostSignUp(req, res) {
  const { password, email } = req.body;

  // Create a user in our repo to reperest this person
  // We need to get back the id that is assigned to the newly generated user, because we dont know what id is assigned to them, we randonly generated it
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie, so we can look upto to the cookie in the follow up requets
  // We will receive this user id inside the cookie later
  req.session.userId = user.id;

  res.redirect("/admin/products/list");
}

function httpGetSignIn(req, res) {
  res.send(signInTemplate({}));
}

async function httpPostSignIn(req, res) {
  const { email } = req.body;

  const user = await usersRepo.getOneBy({ email });

  // starting a session
  req.session.userId = user.id;

  res.redirect("/admin/products/list");
}

function httpGetSignOut(req, res) {
  req.session = null;
  res.redirect("/admin/signin");
}

module.exports = {
  httpGetSignUp,
  httpGetSignIn,
  httpGetSignOut,
  httpPostSignUp,
  httpPostSignIn,
  httpAdminRedirect,
};
