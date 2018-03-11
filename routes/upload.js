var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploading = multer({dest: 'upload/'});

router.post('/', uploading.single('file'), function (req, res, next) {
    console.log(req.body);
    // res.end("Success");
});

module.exports = router;
