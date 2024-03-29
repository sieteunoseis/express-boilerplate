var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var year = new Date().getFullYear();
  res.render('index', { title: "Express Boilerplate", year: year, script:"index.js"});
});

module.exports = router;