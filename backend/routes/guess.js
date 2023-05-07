var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const g = Math.round((Math.random() * 100));
    res.send({target: g});
});

module.exports = router;
