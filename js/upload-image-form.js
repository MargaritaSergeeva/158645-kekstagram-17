'use strict';

(function () {
  var uploadImageForm = window.variables.usersPhotosSection.querySelector('.img-upload__form');


  var onSuccessSendForm = function () {
    window.messages.showSuccess('#success');
    window.uploadImageModal.close();
  };

  var onErrorSendForm = function () {
    window.messages.showError('#error');
    window.uploadImageModal.close();
  };


  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.validity.checkHashTagInput(window.variables.imageHashtags);
    window.messages.showLoading();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageForm), onSuccessSendForm, onErrorSendForm);
  });
})();
