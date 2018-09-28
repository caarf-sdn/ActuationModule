var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
    res.render('Optimization', 
      { 
        title: 'Optimization Module'
      }
    );
});

module.exports = router;
