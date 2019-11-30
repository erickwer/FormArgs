var express = require('express');
var router = express.Router();
const model = require('../models');

/* POST argument */
router.post('/', function (req, res, next) {
  model.Argument.create(req.body).then(data => {
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

/* POST argument promise */
router.post('/premises', function (req, res, next) {
  if (req.body.type == 'CONCLUSION') {
    model.ArgumentPremise.findOne({
      where: {
        argument_id: req.body.argument_id,
        type: 'CONCLUSION'
      }
    }).then(item => {
      if (!item) {
        model.ArgumentPremise.create(req.body).then(data => {
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
      } else {
        return res.status(200).json({
          error: true,
          data: [],
          message: 'Já existe uma conclusão para este argumento!.'
        });
      }
    });
  } else {
    model.ArgumentPremise.create(req.body).then(data => {
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
  }
});

/* GET arguments listing. */
router.get('/', function (req, res, next) {
  model.Argument.findAll().then(data => {
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

/* GET argument by id */
router.get('/:argument_id', function (req, res, next) {
  model.Argument.findOne({
    include: [{
      model: model.ArgumentPremise,
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

router.delete('/premise/:premise_id', function (req, res, next) {
  model.ArgumentPremise.destroy({
    where: {
      id: req.params.premise_id
    }
  }).then(() => {
    res.json({
      error: false
    });
  }).catch(err => {
    res.json({
      error: true,
      error: err
    });
  });
});

router.delete('/:argument_id', function (req, res, next) {
  model.Argument.destroy({
    where: {
      id: req.params.argument_id
    }
  }).then(() => {
    res.json({
      error: false
    });
  }).catch(err => {
    res.json({
      error: true,
      error: err
    });
  });
});


module.exports = router;