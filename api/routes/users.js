var express = require('express');
var router = express.Router();
const model = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  model.User.findAll().then(data => {
    res.json({
      error: false,
      data: data
    });
  }).catch(err => {
    res.json({
      error: true,
      data: [],
      error: err
    });
  });
});

module.exports = router;