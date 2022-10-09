const express = require("express");

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExist,
  requireValidPassowrdForUser,
} = require("../validators");

const {
  httpGetSignUp,
  httpPostSignUp,
  httpGetSignOut,
  httpGetSignIn,
  httpPostSignIn,
  httpAdminRedirect,
} = require("./auth.controller");

const { handleErrors } = require("../middlewares");
const signUpTemplate = require("../../../views/admin/auth/signup");
const signInTemplate = require("../../../views/admin/auth/signin");

const router = express.Router();

router.get("/", httpAdminRedirect);

router.get("/signup", httpGetSignUp);

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signUpTemplate),
  httpPostSignUp
);

router.get("/signout", httpGetSignOut);

router.get("/signin", httpGetSignIn);

router.post(
  "/signin",
  [requireEmailExist, requireValidPassowrdForUser],
  handleErrors(signInTemplate),
  httpPostSignIn
);

module.exports = router;
