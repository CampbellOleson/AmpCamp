const express = require("express");
const router = express.Router();

const upload = require("../services/file_upload");

const singleUploadAudio = upload.single("audio");
const singleUploadImage = upload.single("image");

router.post("/upload-audio", (req, res) => {
  singleUploadAudio(req, res, function(err) {
    if (err) return res.status(422).send({ errors: err.message });
    return res.json({ audioUrl: req.file.location });
  });
});

router.post("/upload-image", (req, res) => {
  singleUploadImage(req, res, function(err) {
    if (err) return res.status(422).send({ errors: err.message });
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
