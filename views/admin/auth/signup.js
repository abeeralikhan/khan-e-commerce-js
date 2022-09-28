module.exports = ({ req }) => `
  <div>
    Your id is: ${req.session.userId}
    <form method="POST">
      <input name="email" type="email" placeholder="Enter your email"/>
      <input name="password" type="password" placeholder="Enter your password"/>
      <input name="passwordConfirmation" type="password" placeholder="Enter your password again"/>
      <button>Sign Up</button>
    </form>
  </div>
`;
