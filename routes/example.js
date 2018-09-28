var express = require('express');
var router = express.Router();
var auth = require('../classes/auth_module').Auth;
var request = require("request");
var mid = require('../classes/midAuth');



//Consultar obj user no banco
router.get('/getUser', function(req, res, next) {

    mid.getUser().then(function(items) { res.send(items) })

});

//Consulta a token no container (insere no container se == null)
router.get('/getToken', function(req, res, next) {

    mid.getToken(false).then(function(items) { res.send(items) })

});

//Atualiza token no banco e no container
router.get('/updateToken', async function(req, res, next) {

    mid.getToken(true).then(function(items) { res.send(items) }).catch(function() { console.log('erro') })

});


module.exports = router;