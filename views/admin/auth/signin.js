const layout = require("../layout");

module.exports = () =>
  layout({
    content: `
      <form method="POST">
        <input name="email" type="email" placeholder="Enter your email"/>
        <input name="password" type="password" placeholder="Enter your password"/>
        <button>Sign In</button>
      </form>
    `,
  });
