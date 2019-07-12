'use strict';

(function () {
  window.checkHashTagInputValidity = function (input) {
    var hashtags = window.variables.imageHashtags.value
    .split(' ')
    .map(function (it) {
      return it.toLowerCase();
    })
    .filter(function (it) {
      return it !== '';
    });

    var inputCustomValidation = new window.CustomValidation();
    inputCustomValidation.checkValidityArray(hashtags);

    if (inputCustomValidation.checkValidityArray(hashtags) === false) {
      var customValidityMessage = inputCustomValidation.getInvalidities();
      input.setCustomValidity(customValidityMessage);
      input.style.borderColor = '#f48346';
    } else {
      input.setCustomValidity('');
      input.style.borderColor = '#ffffff';
    }
  };

  window.variables.imageHashtags.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.checkHashTagInputValidity(window.variables.imageHashtags);
  });
})();
