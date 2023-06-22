const express = require('express');
const router = express.Router();

const {
  getAllImages,
  getImage,
  deleteImage,
  imageUploadMsg,
  imageUpload,
} = require('../unsplashControllers/unsplashController');

router.route('/').get(getAllImages).post(imageUpload, imageUploadMsg);

router.route('/:filename').get(getImage).delete(deleteImage);

module.exports = router;
