'use strict';

(function () {
  var Proportion = {
    MIN: 0,
    MAX: 1
  };

  var effectsListImg = window.variables.uploadImage.querySelector('.effects__list');
  var effectSliderLine = window.variables.uploadImage.querySelector('.effect-level__line');
  var effectsSliderPin = window.variables.uploadImage.querySelector('.effect-level__pin');
  var effectsSliderDepthScale = window.variables.uploadImage.querySelector('.effect-level__depth');
  var effectsLavelValue = window.variables.uploadImage.querySelector('.effect-level__value');


  var hideSlider = function (evt) {
    var effectSlider = window.variables.uploadImage.querySelector('.effect-level');

    if (evt.target === window.variables.originImgInput) {
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
      window.utils.assignOneClassToElement(element, 'img-upload__preview');
      window.utils.resetElementStyle(element, 'filter');

      if (prefix !== 'none' && prefix !== undefined) {
        element.classList.add('effects__preview--' + prefix);
      }
    }
  };

  var getLengthBlock = function (element) {
    return element ? window.utils.getBlockRightPosition(element) - window.utils.getBlockLeftPosition(element) : '';
  };

  var getProportion = function (evt, element) {
    var offsetpositionX = 0;
    var proportion = 0;

    if (element) {
      offsetpositionX = evt.clientX - window.utils.getBlockLeftPosition(element);
      proportion = (offsetpositionX / getLengthBlock(element)).toFixed(2);
      proportion = (proportion < Proportion.MIN) ? 0 : proportion;
      proportion = (proportion > Proportion.MAX) ? 1 : proportion;
    }

    return proportion;
  };

  var changeSaturationValue = function (evt) {
    effectsLavelValue.value = getProportion(evt, effectSliderLine) * window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS;
  };

  var resetSaturationValue = function () {
    effectsLavelValue.value = window.constants.MAX_PERCENT_INPUT_VALUE;
  };

  var changeSliderDepthScale = function (evt, element, scaleElement) {
    element.style.width = getProportion(evt, scaleElement) * window.constants.MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + '%';
  };

  var resetSliderDepthScale = function (element) {
    element.style.width = '';
  };

  var changeBlockFilterStyle = function (evt, element, scaleElement) {
    var effectsStylesMap = {
      'chrome': ['grayscale', 0, 1, '', 1],
      'sepia': ['sepia', 0, 1, '', 1],
      'marvin': ['invert', 0, 100, '%', 0.01],
      'phobos': ['blur', 0, 3, 'px', 0.34],
      'heat': ['brightness', 1, 3, '', 0.5],
    };
    var prefixArr = element.className.split('--');
    var prefix = prefixArr[1];
    var proportion = getProportion(evt, scaleElement);

    window.utils.resetElementStyle(element, 'filter');

    if (prefix !== 'none') {
      if (proportion !== Proportion.MAX) {
        element.style.filter = effectsStylesMap[prefix][0] + '(' + (proportion / effectsStylesMap[prefix][4] + effectsStylesMap[prefix][1]).toFixed(2) + effectsStylesMap[prefix][3] + ')';
      } else {
        element.style.filter = effectsStylesMap[prefix][0] + '(' + effectsStylesMap[prefix][2] + effectsStylesMap[prefix][3] + ')';
      }
    } else {
      element.style.filter = 'none';
    }
  };

  var changePositionBlockX = function (evt, element, scaleElement) {
    var startCoordX = window.utils.getBlockLeftPosition(element) + (element.getBoundingClientRect().width / 2);
    var leftLimit = window.utils.getBlockLeftPosition(scaleElement);
    var rightLimit = window.utils.getBlockRightPosition(scaleElement);
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
