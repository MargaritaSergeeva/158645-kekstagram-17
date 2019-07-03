'use strict';

(function () {
  var uploadImage = document.querySelector('.img-upload__overlay');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');

  window.variables = {
    uploadImage: uploadImage,
    imgPreview: imgPreview,
    effectSlider: effectSlider,
    xhr: new XMLHttpRequest(),
    photos: []
  };
})();
