'use strict';

(function () {
  var closureUploadImage = window.variables.uploadImageModal.querySelector('#upload-cancel');


  var resetChangesUploadImageModal = function () {
    window.utils.resetInputValue(window.variables.openerUploadImage);
    window.utils.resetInputValue(window.variables.imageHashtags);
    window.utils.resetInputValue(window.variables.imageDescription);
    window.utils.resetElementStyle(window.variables.imagePreview.querySelector('img'), 'transform');
    window.utils.resetElementStyle(window.variables.imagePreview, 'filter');
    window.utils.assignOneClassToElement(window.variables.imagePreview, 'img-upload__preview');
    window.utils.closeElement(window.variables.effectsSlider);
    window.variables.originImageInput.checked = true;
    window.utils.resetElementStyle(window.variables.imageHashtags, 'borderColor');
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  };

  var onUploadImageModalEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      resetChangesUploadImageModal();
      window.utils.closeElement(window.variables.uploadImageModal);
    }
  };

  window.closeUploadImageModal = function () {
    resetChangesUploadImageModal();
    window.utils.closeElement(window.variables.uploadImageModal);
  };

  window.variables.openerUploadImage.addEventListener('change', function () {
    window.loadUserImage();
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });

  closureUploadImage.addEventListener('click', function () {
    window.closeUploadImageModal();
  });

  window.variables.imageDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadImageModalEscPress);
  });

  window.variables.imageHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadImageModalEscPress);
  });
})();
