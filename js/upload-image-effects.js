'use strict';

(function () {
  var DIVISOR_ON_THREE_PARTS = 34;
  var DIVISOR_ON_FOUR_PARTS = 25;
  var MIN_PROPORTION = 0;
  var MAX_PROPORTION = 100;

  var effectsListImg = window.variables.uploadImage.querySelector('.effects__list');
  var effectSliderLine = window.variables.uploadImage.querySelector('.effect-level__line');
  var effectsSliderPin = window.variables.uploadImage.querySelector('.effect-level__pin');
  var effectsSliderDepthScale = window.variables.uploadImage.querySelector('.effect-level__depth');
  var effectsLavelValue = window.variables.uploadImage.querySelector('.effect-level__value');


  var hideSlider = function (evt) {
    var originImgInput = window.variables.uploadImage.querySelector('#effect-none');
    var effectSlider = window.variables.uploadImage.querySelector('.effect-level');

    if (evt.target === originImgInput) {
      window.utils.closeElement(effectSlider);
    } else {
      window.utils.showElement(effectSlider);
    }
  };

  var getClassPrefix = function (evt) {
    var prefixArr = evt.target.id.split('-');

    return prefixArr[1];
  };

  var addImgClass = function (evt, element) {
    var prefix = getClassPrefix(evt);

    if (element) {
      element.className = 'img-upload__preview';
      element.style.filter = '';

      if (prefix !== 'none' && prefix !== undefined) {
        element.classList.add('effects__preview--' + prefix);
      }
    }
  };

  var getBlockLeftPosition = function (element) {
    return element ? element.getBoundingClientRect().left : '';
  };

  var getBlockRightPosition = function (element) {
    return element ? element.getBoundingClientRect().right : '';
  };

  var getLengthBlock = function (element) {
    return element ? getBlockRightPosition(element) - getBlockLeftPosition(element) : '';
  };

  var getProportion = function (evt, element) {
    var offsetpositionX = 0;
    var proportion = 0;

    if (element) {
      offsetpositionX = evt.clientX - getBlockLeftPosition(element);
      proportion = (offsetpositionX / getLengthBlock(element)) * window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS;
      proportion = (proportion < MIN_PROPORTION) ? 0 : proportion;
      proportion = (proportion > MAX_PROPORTION) ? 100 : proportion;
    }

    return proportion;
  };

  var changeSaturationValue = function (evt) {
    effectsLavelValue.value = Math.round(getProportion(evt, effectSliderLine));
  };

  var resetSaturationValue = function () {
    effectsLavelValue.value = window.constants.MAX_PERCENT_INPUT_VALUE;
  };

  var changeSliderDepthScale = function (evt, element, scaleElement) {
    element.style.width = Math.round(getProportion(evt, scaleElement)) + '%';
  };

  var resetSliderDepthScale = function (element) {
    element.style.width = '';
  };

  var changeBlockFilterStyle = function (evt, element, scaleElement) {
    var prefixArr = [];
    var prefix = '';
    var proportion = getProportion(evt, scaleElement);

    if (element && scaleElement) {
      prefixArr = element.className.split('--');
      prefix = prefixArr[1];

      element.style.filter = '';

      switch (prefix) {
        case 'chrome':
          element.style.filter = 'grayscale(' + Math.round(proportion) / window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
          break;
        case 'sepia':
          element.style.filter = 'sepia(' + Math.round(proportion) / window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
          break;
        case 'marvin':
          element.style.filter = 'invert(' + Math.round(proportion) + '%)';
          break;
        case 'phobos':
          element.style.filter = (proportion !== MAX_PROPORTION) ? 'blur(' + Math.floor(proportion / DIVISOR_ON_FOUR_PARTS) + 'px)' : 'blur(3px)';
          break;
        case 'heat':
          element.style.filter = (proportion !== MIN_PROPORTION) ? 'brightness(' + Math.ceil(proportion / DIVISOR_ON_THREE_PARTS) + ')' : 'brightness(1)';
          break;
        default:
          element.style.filter = 'none';
      }
    }
  };

  var changePositionBlockX = function (evt, element, scaleElement) {
    var startCoordX = getBlockLeftPosition(element) + (element.getBoundingClientRect().width / 2);
    var leftLimit = getBlockLeftPosition(scaleElement);
    var rightLimit = getBlockRightPosition(scaleElement);
    var shiftX = startCoordX - evt.clientX;

    if (evt.clientX >= leftLimit && evt.clientX <= rightLimit) {
      startCoordX = evt.clientX;

      element.style.left = (element.offsetLeft - shiftX) + 'px';
    }
  };

  var mouseMoveBlockX = function (element, scaleElement, changeElement, sliderDepthScaleElement) {
    if (element && scaleElement && changeElement) {
      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        isDragged = true;

        changePositionBlockX(moveEvt, element, scaleElement);
        changeSliderDepthScale(moveEvt, sliderDepthScaleElement, scaleElement);
        changeBlockFilterStyle(moveEvt, changeElement, scaleElement);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (isDragged) {
          changeSaturationValue(upEvt);
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  effectsSliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mouseMoveBlockX(effectsSliderPin, effectSliderLine, window.variables.imgPreview, effectsSliderDepthScale);
  });

  effectSliderLine.addEventListener('click', function (evt) {
    evt.preventDefault();
    changePositionBlockX(evt, effectsSliderPin, effectSliderLine);
    changeSliderDepthScale(evt, effectsSliderDepthScale, effectSliderLine);
    changeBlockFilterStyle(evt, window.variables.imgPreview, effectSliderLine);
    changeSaturationValue(evt);
  });

  effectsListImg.addEventListener('click', function (evt) {
    addImgClass(evt, window.variables.imgPreview);
    hideSlider(evt);
    resetSaturationValue();
    window.utils.resetBlockPosition(effectsSliderPin);
    resetSliderDepthScale(effectsSliderDepthScale);
  });
})();
