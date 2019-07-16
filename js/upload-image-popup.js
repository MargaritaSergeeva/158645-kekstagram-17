'use strict';

(function () {
  var closureUploadImageElement = window.variables.uploadImageModalElement.querySelector('#upload-cancel');


  var resetChangesUploadImageModal = function () {
    window.utils.resetInputValue(window.variables.openerUploadImageElement);
    window.utils.resetInputValue(window.variables.imageHashtagsElement);
    window.utils.resetInputValue(window.variables.imageDescriptionElement);
    window.utils.resetElementStyle(window.variables.imagePreviewElement.querySelector('img'), 'transform');
    window.utils.resetElementStyle(window.variables.imagePreviewElement, 'filter');
    window.utils.assignOneClassToElement(window.variables.imagePreviewElement, 'img-upload__preview');
    window.utils.closeElement(window.variables.effectsSliderElement);
    window.variables.originImageInputElement.checked = true;
    window.utils.resetElementStyle(window.variables.imageHashtagsElement, 'borderColor');
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  };

  var onUploadImageModalEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      resetChangesUploadImageModal();
      window.utils.closeElement(window.variables.uploadImageModalElement);
    }
  };

  window.closeUploadImageModal = function () {
    resetChangesUploadImageModal();
    window.utils.closeElement(window.variables.uploadImageModalElement);
  };

  window.variables.openerUploadImageElement.addEventListener('change', function () {
    window.loadUserImage();
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });

  closureUploadImageElement.addEventListener('click', function () {
    window.closeUploadImageModal();
  });

  window.variables.imageDescriptionElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageDescriptionElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageHashtagsElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageHashtagsElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });
})();
