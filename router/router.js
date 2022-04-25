const express = require ("express");
const router = express.Router();
const multer = require ("../controllers/controllers");
const upload = require("../controllers/multer");

router.post('/upload', upload.single("file"),multer.upload);
router.get('/findall',multer.findAll);



module.exports = router;