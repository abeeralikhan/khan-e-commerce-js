const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
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
