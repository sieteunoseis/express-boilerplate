var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var year = new Date().getFullYear();

  res.render('blank', { title: "Blank Template", year: year, script:"blank.js"});
});

module.exports = router;