'use strict';

(function () {
  var Hashtag = {
    MAX_LENGTH: 20,
    MAX__COUNT: 5
  };

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

      if (element.length > Hashtag.MAX_LENGTH) {
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

      if (arr.length > Hashtag.MAX__COUNT) {
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
})();
