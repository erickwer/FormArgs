var express = require('express');
var router = express.Router();
const model = require('../models');

/* POST response */
router.post('/', function (req, res, next) {
  model.Response.create(req.body).then(data => {
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

/* GET response */
router.get('/:argument_id', function (req, res, next) {
  model.Argument.findOne({
    include: [{
      model: model.Response,
    }],
    where: {
      id: req.params.argument_id
    }
  }).then(data => {
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

/* GET ALL response */
router.get('/', function (req, res, next) {
  model.Response.findAll().then(data => {
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