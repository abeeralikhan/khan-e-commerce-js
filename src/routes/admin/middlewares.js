const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // initializing data with an empty object to avoid spreading an undefined value
        let data = {};
        if (dataCb) {
          // dataCb --> data callback
          // inside the dataCb, we will receive some additional properties to pass to the template
          // making the handleErrors middleware customizeable
          data = await dataCb(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }

      next();
    };
  },
  checkAuthentication(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/admin/signin");
    }

    next();
  },
};
