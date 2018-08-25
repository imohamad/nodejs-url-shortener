//ad modules
const express = require("express");
const router = express.Router();

//add url model
const Url = require("../models/url");

/*
GET request for ":siteId" URL
res.status code:
404: Not Found
500: Internal Server Error
*/
router.get("/:siteId", (req, res, next) => {
  const siteId = req.params.siteId;
  Url.findOne({ siteId: siteId })
    .exec()
    .then(result => {
      if (result) {
        res.redirect(result.url);
      } else {
        res.status(404).json({
          error: "URL is invalid."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
