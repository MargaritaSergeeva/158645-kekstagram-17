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
    document.removeEventListener('keydown', onPopupEscPress);
  });

  descriptionImg.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  descriptionImg.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
})();
