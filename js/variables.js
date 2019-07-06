'use strict';

(function () {
  var uploadImage = document.querySelector('.img-upload__overlay');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');
  var usersPhotosSection = document.querySelector('.pictures');

  window.variables = {
    uploadImage: uploadImage,
    imgPreview: imgPreview,
    effectSlider: effectSlider,
    usersPhotosSection: usersPhotosSection,
    photos: []
  };
})();
