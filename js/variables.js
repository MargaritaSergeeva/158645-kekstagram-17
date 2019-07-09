'use strict';

(function () {
  var body = document.querySelector('body');
  var uploadImage = document.querySelector('.img-upload__overlay');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');
  var hashtagsImg = uploadImage.querySelector('.text__hashtags');
  var usersPhotosSection = document.querySelector('.pictures');
  var bigPhotoBlock = document.querySelector('.big-picture');

  window.variables = {
    body: body,
    uploadImage: uploadImage,
    imgPreview: imgPreview,
    effectSlider: effectSlider,
    hashtagsImg: hashtagsImg,
    usersPhotosSection: usersPhotosSection,
    bigPhotoBlock: bigPhotoBlock,
    photos: []
  };
})();
