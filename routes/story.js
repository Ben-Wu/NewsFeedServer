/**
 * Created by bw964 on 2016-08-05.
 */
var express = require('express');
var router = express.Router();
var controller = require("../controllers/story");

router.get("/refresh", controller.refresh);

router.get('/', controller.getLineup);

router.get("/content", controller.getAllContent);

router.get('/:id', controller.getStory);

router.refresh = controller.refresh;

module.exports = router;