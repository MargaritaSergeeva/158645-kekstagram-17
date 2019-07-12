'use strict';

(function () {
  window.inputValidity = {
    checkHashTagInputValidity: function (input) {
      var hashtagsArr = window.variables.hashtagsImg.value
      .split(' ')
      .map(function (it) {
        return it.toLowerCase();
      })
      .filter(function (it) {
        return it !== '';
      });

      var inputCustomValidation = new window.CustomValidation();
      inputCustomValidation.checkValidityArray(hashtagsArr);

      if (inputCustomValidation.checkValidityArray(hashtagsArr) === false) {
        var customValidityMessage = inputCustomValidation.getInvalidities();
        input.setCustomValidity(customValidityMessage);
        input.style.borderColor = '#f48346';
      } else {
        input.setCustomValidity('');
        input.style.borderColor = '#ffffff';
      }
    }
  };

  window.variables.hashtagsImg.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.inputValidity.checkHashTagInputValidity(window.variables.hashtagsImg);
  });
})();
