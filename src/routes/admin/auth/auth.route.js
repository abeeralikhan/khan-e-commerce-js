const express = require("express");

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExist,
  requireValidPassowrdForUser,
} = require("../validators");
const { handleErrors } = require("../middlewares");

const signUpTemplate = require("../../../views/admin/auth/signup");
const signInTemplate = require("../../../views/admin/auth/signin");
const authController = require("./auth.controller");

const router = express.Router();

router.get("/signup", authController.httpGetSignUp);

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signUpTemplate),
  authController.httpPostSignUp
);

router.get("/signout", authController.httpGetSignOut);

router.get("/signin", authController.httpGetSignIn);

router.post(
  "/signin",
  [requireEmailExist, requireValidPassowrdForUser],
  handleErrors(signInTemplate),
  authController.httpPostSignIn
);

module.exports = router;
