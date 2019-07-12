'use strict';

(function () {
  var uploadImageForm = window.variables.usersPhotosSection.querySelector('.img-upload__form');


  var onSuccessSendForm = function () {
    window.messages.showSuccessMessage('#success');
    window.uploadImageModal.close();
  };

  var onErrorSendForm = function () {
    window.messages.showErrorMessage('#error');
    window.uploadImageModal.close();
  };


  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.validity.checkHashTagInput(window.variables.imageHashtags);
    window.messages.showLoadingMessage();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageForm), onSuccessSendForm, onErrorSendForm);
  });
})();
