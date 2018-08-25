//ad modules
const express = require("express");
const router = express.Router();

const chekAuth = require("../middleware/check-auth");

const Url = require("../models/url");
const User = require("../models/user");

router.get("/", chekAuth, (req, res, next) => {
  User.count()
    .exec()
    .then(userCount => {
      Url.count().then(urlCount => {
        Url.count({ creatorId: req.userData.userId }).then(urUrl => {
          res.status(200).json({
            success: true,
            user: userCount,
            shortUrl: urlCount,
            youCreated: urUrl
          });
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
});

module.exports = router;
