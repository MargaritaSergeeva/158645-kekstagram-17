'use strict';

(function () {
  window.errors = {
    onErrorStartPage: function (errorMessage) {
      var errorStartPageTemplate = document.querySelector('#error__start-page').content.querySelector('.error');
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
