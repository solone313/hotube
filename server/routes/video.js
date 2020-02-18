const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            console.log("err",err);
            return res.json({success:false, err})
        }
        return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

module.exports = router;
