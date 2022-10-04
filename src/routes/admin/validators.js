const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");

// each key stores the result of each chain
module.exports = {
  // validation logic for email
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const doesUserExist = await usersRepo.getOneBy({ email });

      if (doesUserExist) {
        throw new Error("Email already in use!");
      }
    }),

  // validation logic for password
  requirePassword: check("password")
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  // validation logic for password confirmation
  requirePasswordConfirmation: check("passwordConfirmation")
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error("Passwords must match!");
      }
    }),

  requireEmailExist: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });

      if (!user) {
        // if we did not find a matching email addres
        throw new Error("Email not found!");
      }
    }),

  requireValidPassowrdForUser: check("password").custom(
    async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      // will throw invalid password error if the user doesnot exist to keep the consistency
      if (!user) {
        throw new Error("Invalid password");
      }
      const isPassowrdValid = await usersRepo.comparePasswords(
        user.password,
        password
      );

      if (!isPassowrdValid) {
        // if the password did not match
        throw new Error("Invalid password");
      }
    }
  ),
};
