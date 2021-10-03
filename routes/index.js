var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Citas. */
router.get('/citas', function(req, res, next) {
  res.render('citas', { title: 'Citas' });
});
 
/* Atenciones. */
router.get('/atenciones', function(req, res, next) {
  res.render('atenciones', { title: 'Atenciones' });
});
module.exports = router;
