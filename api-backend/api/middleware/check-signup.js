const User = require("../models/user");

/*
middleware for "signup" data
res.status code:
400: Bad Request
409: Conflict
500: Internal Server Error
*/
module.exports = (req, res, next) => {
  req.check("email", "invalid email address").isEmail();
  req.check("username", "username is empty").notEmpty();
  req
    .check("username", "username is invalid")
    .matches(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/);
  req.check("password", "password is short").isLength({ min: 4 });
  req
    .check("password", "password is not match")
    .equals(req.body.confirmPassword);

  const validationErrors = req.validationErrors();

  if (validationErrors) {
    res.status(400).json({
      success: false,
      error: validationErrors
    });
  } else {
    User.find({ email: req.body.email })
      .exec()
      .then(result => {
        if (result.length >= 1) {
          res.status(409).json({
            success: false,
            error: [{ msg: "email is exists" }]
          });
          return;
        } else {
          User.find({ username: req.body.username })
            .exec()
            .then(result => {
              if (result.length >= 1) {
                res.status(409).json({
                  success: false,
                  error: [{ msg: "username is exists" }]
                });
                return;
              }

              next();
            })
            .catch(err => {
              res.status(500).json({
                success: false,
                error: err
              });
            });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err
        });
      });
  }
};
