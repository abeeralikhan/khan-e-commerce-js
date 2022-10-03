const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) =>
  layout({
    content: `
      <form method="POST">
        <input name="email" type="email" placeholder="Enter your email"/>
        ${getError(errors, "email")}
        <input name="password" type="password" placeholder="Enter your password"/>
        ${getError(errors, "password")}
        <button>Sign In</button>
      </form>
    `,
  });
