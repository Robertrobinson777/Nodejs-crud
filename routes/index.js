var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Robert' });
// });
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Robert' });
});
module.exports = router;