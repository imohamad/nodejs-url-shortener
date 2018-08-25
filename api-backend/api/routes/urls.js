//ad modules
const express = require("express");
const router = express.Router();

const SHORTENER_URL = "http://localhost:3000/";
const Url = require("../models/url");
const chekAuth = require("../middleware/check-auth");

var PRE_HTTP = "http://";

//GET request
router.get("/", chekAuth, (req, res, next) => {
  Url.find({ creatorId: req.userData.userId })
    .select("_id url siteId")
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        count: result.length,
        urlData: result.map(result => {
          return {
            _id: result._id,
            siteId: result.siteId,
            orgUrl: result.url,
            short: {
              shortUrl: SHORTENER_URL + result.siteId
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//GET request
router.get("/:userId", chekAuth, (req, res, next) => {
  Url.find({ creatorId: req.params.userId })
    .select("_id url siteId")
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        count: result.length,
        username: req.userData.username,
        urlData: result.map(result => {
          return {
            _id: result._id,
            siteId: result.siteId,
            orgUrl: result.url,
            short: {
              shortUrl: SHORTENER_URL + result.siteId
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//POST request
router.post("/", chekAuth, (req, res, next) => {
  req.check("url", "invalid URL").isURL();
  const validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json({
      error: validationErrors
    });
  } else {
    if (!req.body.url.match(/^[a-zA-Z]+:\/\//)) {
      var reqUrl = PRE_HTTP + req.body.url;
    } else {
      var reqUrl = req.body.url;
    }
    const url = new Url({
      url: reqUrl,
      creatorId: req.userData.userId
    });
    url
      .save()
      .then(result => {
        res.status(201).json({
          success: true,
          urlCreated: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});

router.delete("/:urlId", (req, res, next) => {
  Url.findByIdAndRemove(req.params.urlId)
    .exec()
    .then(result => {
      res.status(202).json({
        message: "URL removed!"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
