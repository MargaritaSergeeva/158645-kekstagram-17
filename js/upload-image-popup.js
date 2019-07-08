'use strict';

(function () {
  var openUploadImage = document.querySelector('#upload-file');
  var closeUploadImage = window.variables.uploadImage.querySelector('#upload-cancel');
  var descriptionImg = window.variables.uploadImage.querySelector('.text__description');

  var onUploadImgPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      window.utils.closeElement(window.variables.uploadImage);
      window.utils.resetInputValue(openUploadImage);
      window.utils.resetElementStyle(window.variables.imgPreview.querySelector('img'), 'transform');
      window.utils.resetElementStyle(window.variables.imgPreview, 'filter');
      window.utils.assignOneClassToElement(window.variables.imgPreview, 'img-upload__preview');
      window.utils.closeElement(window.variables.effectSlider);
    }
  };

  openUploadImage.addEventListener('change', function () {
    window.utils.showElement(window.variables.uploadImage);
    document.addEventListener('keydown', onUploadImgPopupEscPress);
  });

  closeUploadImage.addEventListener('click', function () {
    window.utils.closeElement(window.variables.uploadImage);
    window.utils.resetInputValue(openUploadImage);
    window.utils.resetElementStyle(window.variables.imgPreview.querySelector('img'), 'transform');
    window.utils.resetElementStyle(window.variables.imgPreview, 'filter');
    window.utils.assignOneClassToElement(window.variables.imgPreview, 'img-upload__preview');
    window.utils.closeElement(window.variables.effectSlider);
    document.removeEventListener('keydown', onUploadImgPopupEscPress);
  });

  descriptionImg.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImgPopupEscPress);
  });

  descriptionImg.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImgPopupEscPress);
  });
})();
