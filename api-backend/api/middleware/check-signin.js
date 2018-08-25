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
  req.check("password", "password is empty").notEmpty();
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    res.status(400).json({
      success: false,
      error: validationErrors
    });
  } else {
    User.findOne({ email: req.body.email })
      .exec()
      .then(result => {
        if (!result) {
          res.status(401).json({
            success: false,
            status: "Auth failed, email not exist"
          });
        } else {
          next(result);
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
