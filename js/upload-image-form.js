'use strict';

(function () {
  var uploadImageFormElement = window.variables.usersPhotosSectionElement.querySelector('.img-upload__form');


  var onSuccessSendForm = function () {
    window.popupMessages.showSuccess('#success');
    window.closeUploadImageModal();
  };

  var onErrorSendForm = function () {
    window.popupMessages.showError('#error');
    window.closeUploadImageModal();
  };


  uploadImageFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.checkHashTagInputValidity(window.variables.imageHashtagsElement);
    window.popupMessages.showLoading();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageFormElement), onSuccessSendForm, onErrorSendForm);
  });
})();
