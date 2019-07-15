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
    inputCustomValidation.invalidities = [];
    inputCustomValidation.checkValidityArray(hashtags);

    if (inputCustomValidation.checkValidityArray(hashtags)) {
      input.setCustomValidity('');
      input.style.borderColor = '#ffffff';
    } else {
      var customValidityMessage = inputCustomValidation.getInvalidities();
      input.setCustomValidity(customValidityMessage);
      input.style.borderColor = '#f48346';
    }
  };

  window.variables.imageHashtags.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.checkHashTagInputValidity(window.variables.imageHashtags);
  });
})();
