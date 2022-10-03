const layout = require("../layout");
const { getError } = require("../../helpers");

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
