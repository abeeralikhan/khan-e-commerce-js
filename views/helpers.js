module.exports = {
  getError(errors, prop) {
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
  },
};
