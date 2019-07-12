'use strict';

(function () {
  var InputValue = {
    MIN: 25,
    STEP: 25
  };

  var imageZoomOut = window.variables.uploadImageModal.querySelector('.scale__control--smaller');
  var imageZoomIn = window.variables.uploadImageModal.querySelector('.scale__control--bigger');
  var imageZoomValue = window.variables.uploadImageModal.querySelector('.scale__control--value');


  var getNamberFromInputValue = function (element) {
    return element ? parseInt(element.value, 10) : 0;
  };

  var changeInputValueWithPercent = function (element, number, minValue, maxValue, step, raise) {
    minValue = minValue || InputValue.MIN;
    maxValue = maxValue || window.constants.MAX_PERCENT_INPUT_VALUE;
    step = step || InputValue.STEP;
    number = number || minValue;

    if (element) {
      if (raise) {
        if (number >= minValue && number < maxValue) {
          number += step;
        }
      } else {
        if (number > minValue && number <= maxValue) {
          number -= step;
        }
      }

      element.value = number + '%';
    }
  };

  var changeImgScale = function (element, number) {
    number = number || window.constants.MAX_PERCENT_INPUT_VALUE;

    if (element) {
      element.querySelector('img').style.transform = 'scale(' + number / window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
    }
  };

  imageZoomIn.addEventListener('click', function () {
    changeInputValueWithPercent(imageZoomValue, getNamberFromInputValue(imageZoomValue), InputValue.MIN, window.constants.MAX_PERCENT_INPUT_VALUE, InputValue.STEP, true);
    changeImgScale(window.variables.imagePreview, getNamberFromInputValue(imageZoomValue));
  });

  imageZoomOut.addEventListener('click', function () {
    changeInputValueWithPercent(imageZoomValue, getNamberFromInputValue(imageZoomValue), InputValue.MIN, window.constants.MAX_PERCENT_INPUT_VALUE, InputValue.STEP, false);
    changeImgScale(window.variables.imagePreview, getNamberFromInputValue(imageZoomValue));
  });
})();
