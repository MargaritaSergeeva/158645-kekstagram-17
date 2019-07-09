'use strict';

(function () {
  window.errors = {
    onError: function (idTemplate, errorMessage) {
      var errorStartPageTemplate = document.querySelector(idTemplate).content.querySelector('.error');
      var errorStartPagePopup = errorStartPageTemplate.cloneNode(true);
      var errorText = errorStartPagePopup.querySelector('.error__title');
      var errorButton = errorStartPagePopup.querySelector('.error__button');

      errorText.textContent = errorMessage;
      document.body.appendChild(errorStartPagePopup);

      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.body.removeChild(errorStartPagePopup);
      });
    }
  };
})();
