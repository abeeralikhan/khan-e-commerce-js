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
        throw new Error("Entered email is already in use!");
      }
    }),

  // validation logic for password
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  // validation logic for password confirmation
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .custom((passwordConfirmation, { req }) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error("Passwords must match!");
      }
    }),
};
