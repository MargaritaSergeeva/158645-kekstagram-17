'use strict';

(function () {
  var uploadImageForm = window.variables.usersPhotosSection.querySelector('.img-upload__form');


  var onSuccessSendForm = function () {
    window.popupMessages.showSuccess('#success');
    window.closeUploadImageModal();
  };

  var onErrorSendForm = function () {
    window.popupMessages.showError('#error');
    window.closeUploadImageModal();
  };


  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.checkHashTagInputValidity(window.variables.imageHashtags);
    window.popupMessages.showLoading();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageForm), onSuccessSendForm, onErrorSendForm);
  });
})();
