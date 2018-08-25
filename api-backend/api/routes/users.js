//ad modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../../config/config");

const checkSignup = require("../middleware/check-signup");
const checkSignin = require("../middleware/check-signin");

//add url model
const User = require("../models/user");

/*
POST request for "signup" URL
res.status code:
201: Created
202: Accepted
500: Internal Server Error
*/
router.post("/signup", checkSignup, (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    } else {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            success: true,
            userCreated: result
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            error: err
          });
        });
    }
  });
});

/*
POST request for "signin" URL
res.status code:
200: OK
202: Accepted
500: Internal Server Error
*/
router.post("/signin", checkSignin, (result, req, res, next) => {
  bcrypt.compare(req.body.password, result.password, (err, accept) => {
    if (err) {
      res.status(401).json({
        success: false,
        status: "Auth failed"
      });
    } else if (accept) {
      const token = jwt.sign(
        {
          userId: result._id,
          email: result.email,
          username: result.username
        },
        config.secret,
        {
          expiresIn: "1h"
        }
      );

      res.status(202).json({
        success: true,
        status: "Auth succssful",
        token: token,
        user: {
          _id: result._id,
          email: result.email,
          username: result.username
        }
      });
    } else {
      res.status(401).json({
        success: false,
        status: "Auth failed"
      });
    }
  });
});

module.exports = router;
