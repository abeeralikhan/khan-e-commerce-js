const express = require("express");

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExist,
  requireValidPassowrdForUser,
} = require("../validators");

const authController = require("./auth.controller");

const router = express.Router();

router.get("/signup", authController.httpGetSignUp);

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  authController.httpPostSignUp
);

router.get("/signout", authController.httpGetSignOut);

router.get("/signin", authController.httpGetSignIn);

router.post(
  "/signin",
  [requireEmailExist, requireValidPassowrdForUser],
  authController.httpPostSignIn
);

module.exports = router;
