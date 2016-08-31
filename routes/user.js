var express = require('express');
var router = express.Router();
var controller = require("../controllers/user");

//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.post("/login", controller.login);

router.post("/", controller.signUp);

module.exports = router;
