var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var year = new Date().getFullYear();
  res.render('handsontable', { title: "Handsontable Example", year: year, script:"hsHelper.js"});
});

module.exports = router;