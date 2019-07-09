'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;

  var uploadImageForm = window.variables.usersPhotosSection.querySelector('.img-upload__form');
  var hashtagsArr = [];

  var CustomValidation = function () {};

  CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function (element) {
      var isValidity = true;

      if (element[0] !== '#') {
        isValidity = false;
        this.addInvalidity('Хэш-тег должен начинаться с символа # (решётка)');
      }

      if (element.substring(1) === '') {
        isValidity = false;
        this.addInvalidity('Хэш-тег не должен состоять из одной решётки');
      }

      if (element[0] === '#' && element.match(/#/g)[1]) {
        isValidity = false;
        this.addInvalidity('Хэш-теги должны разделяться с помощью пробела');
      }

      if (element.length > MAX_HASHTAG_LENGTH) {
        isValidity = false;
        this.addInvalidity('Максимальная длина одного хэш-тега должна быть не более 20-ти символов, включая решётку');
      }

      return isValidity;
    },

    checkValidityArray: function (arr) {
      var sameElements = arr.filter(function (it, index) {
        return arr.indexOf(it) !== index;
      });


      for (var i = 0; i < arr.length; i++) {
        var isValidity = this.checkValidity(arr[i]);
      }

      if (sameElements[0]) {
        isValidity = false;
        this.addInvalidity('Хэш-теги не должны повторяться');
      }

      if (arr.length > MAX_HASHTAG_COUNT) {
        isValidity = false;
        this.addInvalidity('Не должно быть больше 5-ти хэш-тегов');
      }

      return isValidity;
    },

    addInvalidity: function (message) {
      var isDoubleMessage = this.invalidities.some(function (it) {
        return it === message;
      });

      if (!isDoubleMessage) {
        this.invalidities.push(message);
      }
    },

    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var addCustomValidityMessageFromArray = function (arr, input) {
    var inputCustomValidation = new CustomValidation();
    inputCustomValidation.invalidities = [];
    inputCustomValidation.checkValidityArray(arr);

    if (inputCustomValidation.checkValidityArray(arr) === false) {
      var customValidityMessage = inputCustomValidation.getInvalidities();
      input.setCustomValidity(customValidityMessage);
      input.style.backgroundColor = '#f48346';
    } else {
      input.setCustomValidity('');
      input.style.backgroundColor = '#ffffff';
    }
  };

  window.variables.hashtagsImg.addEventListener('change', function (evt) {
    evt.preventDefault();

    hashtagsArr = window.variables.hashtagsImg.value
    .split(' ')
    .map(function (it) {
      return it.toLowerCase();
    })
    .filter(function (it) {
      return it !== '';
    });

    addCustomValidityMessageFromArray(hashtagsArr, window.variables.hashtagsImg);
  });

  var onSuccess = function (idTemplate) {
    var successTemplate = document.querySelector(idTemplate).content.querySelector('.success');
    var successPopup = successTemplate.cloneNode(true);
    var successButton = successPopup.querySelector('.success__button');

    document.body.appendChild(successPopup);

    successButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.body.removeChild(successPopup);
    });
  };

  var onSuccessPostForm = function () {
    window.utils.closeElement(window.variables.uploadImage);
    onSuccess('#success');
  };

  var onErrorPostForm = function () {
    window.errors.onError('#error');
  };


  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.constants.Url.POST, new FormData(uploadImageForm), onSuccessPostForm, onErrorPostForm);
  });
})();
