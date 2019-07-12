'use strict';

(function () {
  var checkMainChildNodes = function () {
    var div = document.querySelector('.img-upload__message--loading');
    var mainHasloadingPopup = Array.from(window.variables.main.childNodes).filter(function (it) {
      return it === div;
    });

    if (mainHasloadingPopup[0]) {
      window.variables.main.removeChild(div);
    }
  };

  window.messages = {
    showErrorMessage: function (idTemplate, errorMessage) {
      var errorTemplate = document.querySelector(idTemplate).content.querySelector('.error');
      var errorPopup = errorTemplate.cloneNode(true);
      var errorText = errorPopup.querySelector('.error__title');

      var onErrorEscPress = function (evt) {
        if (evt.keyCode === window.constants.KeyCode.ESC) {
          window.variables.main.removeChild(errorPopup);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      };

      checkMainChildNodes();

      if (errorMessage) {
        errorText.textContent = errorMessage;
      }

      window.variables.main.appendChild(errorPopup);
      document.addEventListener('keydown', onErrorEscPress);

      errorPopup.addEventListener('click', function (evt) {
        if (evt.target.className === 'error') {
          window.variables.main.removeChild(errorPopup);
          document.removeEventListener('keydown', onErrorEscPress);
        }

        if (evt.target.classList.contains('error__button')) {
          evt.preventDefault();
          window.variables.main.removeChild(errorPopup);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      });
    },

    showSuccessMessage: function (idTemplate) {
      var successTemplate = document.querySelector(idTemplate).content.querySelector('.success');
      var successPopup = successTemplate.cloneNode(true);

      var onSucessEscPress = function (evt) {
        if (evt.keyCode === window.constants.KeyCode.ESC) {
          window.variables.main.removeChild(successPopup);
          document.removeEventListener('keydown', onSucessEscPress);
        }
      };


      checkMainChildNodes();
      window.variables.main.appendChild(successPopup);
      document.addEventListener('keydown', onSucessEscPress);

      successPopup.addEventListener('click', function (evt) {
        if (evt.target.className === 'success') {
          evt.preventDefault();
          window.variables.main.removeChild(successPopup);
          document.removeEventListener('keydown', onSucessEscPress);
        }

        if (evt.target.classList.contains('success__button')) {
          evt.preventDefault();
          window.variables.main.removeChild(successPopup);
          document.removeEventListener('keydown', onSucessEscPress);
        }
      });
    },

    showLoadingMessage: function () {
      var loadingTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message--loading');
      var loadingPopup = loadingTemplate.cloneNode(true);

      window.variables.main.appendChild(loadingPopup);
    }
  };
})();
