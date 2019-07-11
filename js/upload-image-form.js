'use strict';

(function () {
  var uploadImageForm = window.variables.usersPhotosSection.querySelector('.img-upload__form');


  var onSuccessSending = function () {
    window.messages.showSuccessMessage('#success');
    window.uploadImagePopup.closeUploadImagePopup();
  };

  var onErrorSending = function () {
    window.messages.showErrorMessage('#error');
    window.uploadImagePopup.closeUploadImagePopup();
  };


  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.inputValidity.checkHashTagInputValidity(window.variables.hashtagsImg);
    window.messages.showLoadingMessage();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageForm), onSuccessSending, onErrorSending);
  });
})();
