'use strict';

(function () {
  var openUploadImage = document.querySelector('#upload-file');
  var closeUploadImage = window.variables.uploadImage.querySelector('#upload-cancel');
  var descriptionImg = window.variables.uploadImage.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.utils.closeElement(window.variables.uploadImage);
      window.utils.resetInputValue(openUploadImage);
    }
  };

  openUploadImage.addEventListener('change', function () {
    window.utils.showElement(window.variables.uploadImage);
    document.addEventListener('keydown', onPopupEscPress);
  });

  closeUploadImage.addEventListener('click', function () {
    window.utils.closeElement(window.variables.uploadImage);
    window.utils.resetInputValue(openUploadImage);
    window.utils.resetElementStyle(window.variables.imgPreview.querySelector('img'), 'transform');
    window.utils.resetElementStyle(window.variables.imgPreview, 'filter');
    window.utils.assignElementClass(window.variables.imgPreview, 'img-upload__preview');
    window.utils.closeElement(window.variables.effectSlider);
    document.removeEventListener('keydown', onPopupEscPress);
  });

  descriptionImg.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  descriptionImg.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
})();
