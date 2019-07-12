'use strict';

(function () {
  var checkMainHasloadingModal = function () {
    var loadingMessageModal = document.querySelector('.img-upload__message--loading');
    var loadingMessageModalInMain = Array.from(window.variables.main.childNodes).some(function (it) {
      return it === loadingMessageModal;
    });

    if (loadingMessageModalInMain) {
      window.variables.main.removeChild(loadingMessageModal);
    }
  };

  window.messages = {
    showError: function (idTemplate, errorMessage) {
      var errorTemplate = document.querySelector(idTemplate).content.querySelector('.error');
      var errorModal = errorTemplate.cloneNode(true);
      var errorText = errorModal.querySelector('.error__title');

      var onErrorEscPress = function (evt) {
        if (evt.keyCode === window.constants.KeyCode.ESC) {
          window.variables.main.removeChild(errorModal);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      };

      checkMainHasloadingModal();

      if (errorMessage) {
        errorText.textContent = errorMessage;
      }

      window.variables.main.appendChild(errorModal);
      document.addEventListener('keydown', onErrorEscPress);

      errorModal.addEventListener('click', function (evt) {
        if (evt.target.className === 'error') {
          window.variables.main.removeChild(errorModal);
          document.removeEventListener('keydown', onErrorEscPress);
        }

        if (evt.target.classList.contains('error__button')) {
          evt.preventDefault();
          window.variables.main.removeChild(errorModal);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      });
    },

    showSuccess: function (idTemplate) {
      var successTemplate = document.querySelector(idTemplate).content.querySelector('.success');
      var successModal = successTemplate.cloneNode(true);

      var onSuccessEscPress = function (evt) {
        if (evt.keyCode === window.constants.KeyCode.ESC) {
          window.variables.main.removeChild(successModal);
          document.removeEventListener('keydown', onSuccessEscPress);
        }
      };

      checkMainHasloadingModal();
      window.variables.main.appendChild(successModal);
      document.addEventListener('keydown', onSuccessEscPress);

      successModal.addEventListener('click', function (evt) {
        if (evt.target.className === 'success') {
          evt.preventDefault();
          window.variables.main.removeChild(successModal);
          document.removeEventListener('keydown', onSuccessEscPress);
        }

        if (evt.target.classList.contains('success__button')) {
          evt.preventDefault();
          window.variables.main.removeChild(successModal);
          document.removeEventListener('keydown', onSuccessEscPress);
        }
      });
    },

    showLoading: function () {
      var loadingTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message--loading');
      var loadingModal = loadingTemplate.cloneNode(true);

      window.variables.main.appendChild(loadingModal);
    }
  };
})();
