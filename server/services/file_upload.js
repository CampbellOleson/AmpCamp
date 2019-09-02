const aws = require("aws-sdk");
const keys = require("../../config/keys");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY_ID,
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});

// const app = express();
const s3 = new aws.S3({
  signatureVersion: "v4",
  region: "us-east-2"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.S3_BUCKET,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;