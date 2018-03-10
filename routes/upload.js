var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploading = multer({ dest: '/tmp/' });

router.post('/', uploading.single(), function (req, res) {
    console.log(req.body);
    console.log(req.body, 'Body');
    console.log(req.file, 'file');
    res.end();
});

module.exports = router;
