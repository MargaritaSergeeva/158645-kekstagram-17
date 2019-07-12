'use strict';

(function () {
  var closeUploadImage = window.variables.uploadImage.querySelector('#upload-cancel');
  var descriptionImg = window.variables.uploadImage.querySelector('.text__description');


  var resetChangesUploadImagePopup = function () {
    window.utils.closeElement(window.variables.uploadImage);
    window.utils.resetInputValue(window.variables.openUploadImage);
    window.utils.resetInputValue(window.variables.hashtagsImg);
    window.utils.resetElementStyle(window.variables.imgPreview.querySelector('img'), 'transform');
    window.utils.resetElementStyle(window.variables.imgPreview, 'filter');
    window.utils.assignOneClassToElement(window.variables.imgPreview, 'img-upload__preview');
    window.utils.closeElement(window.variables.effectSlider);
    window.variables.originImgInput.checked = true;
    window.utils.resetElementStyle(window.variables.hashtagsImg, 'borderColor');
  };

  var onUploadImgPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      resetChangesUploadImagePopup();
      document.removeEventListener('keydown', onUploadImgPopupEscPress);
    }
  };

  window.uploadImagePopup = {
    closeUploadImagePopup: function () {
      resetChangesUploadImagePopup();
      document.removeEventListener('keydown', onUploadImgPopupEscPress);
    }
  };

  window.variables.openUploadImage.addEventListener('change', function () {
    window.loading.userImage();
    document.addEventListener('keydown', onUploadImgPopupEscPress);
  });

  closeUploadImage.addEventListener('click', function () {
    window.uploadImagePopup.closeUploadImagePopup();
  });

  descriptionImg.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImgPopupEscPress);
  });

  descriptionImg.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImgPopupEscPress);
  });

  window.variables.hashtagsImg.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImgPopupEscPress);
  });

  window.variables.hashtagsImg.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImgPopupEscPress);
  });
})();
