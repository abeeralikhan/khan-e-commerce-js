const layout = require("../layout");

const getError = (errors, prop) => {
  // prop === 'email' || 'password' || 'passwordConfirmation'
  // So, we can display error msgs right below these fields
  // If the corresponding field has no error, no error msg will be printed

  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    // If any of the property we're checking is undefined
    // we wanna return an empty string because no error exist
    return "";
  }
};

module.exports = ({ req, errors }) =>
  layout({
    content: `
      <div>
        Your id is: ${req.session.userId}
        <form method="POST">
          <input name="email" type="email" placeholder="Enter your email"/>
          ${getError(errors, "email")}
          <input name="password" type="password" placeholder="Enter your password"/>
          ${getError(errors, "password")}
          <input name="passwordConfirmation" type="password" placeholder="Enter your password again"/>
          ${getError(errors, "passwordConfirmation")}
          <button>Sign Up</button>
        </form>
      </div>
    `,
  });
