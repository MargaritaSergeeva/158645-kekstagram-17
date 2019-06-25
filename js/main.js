'use strict';

var ESC_KEYCODE = 27;
var AVATARS_COUNT = 6;
var PHOTOS_COUNT = 25;
var MIN_RANDOM_VALUE = 15;
var MAX_RANDOM_VALUE = 200;
var MIN_PERCENT_INPUT_VALUE = 25;
var MAX_PERCENT_INPUT_VALUE = 100;
var STEP_PERCENT_INPUT_VALUE = 25;
var DIVISOR_ON_THREE_PARTS = 34;
var DIVISOR_ON_FOUR_PARTS = 25;
var MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS = 100;
var NAMES = ['Виктор', 'Елена', 'Катя', 'Павел', 'Олеся', 'Инна', 'Алла'];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var usersPhotosSection = document.querySelector('.pictures');
var uploadImage = document.querySelector('.img-upload__overlay');
var openUploadImage = document.querySelector('#upload-file');
var closeUploadImage = uploadImage.querySelector('#upload-cancel');
var zoomOutImg = uploadImage.querySelector('.scale__control--smaller');
var zoomInImg = uploadImage.querySelector('.scale__control--bigger');
var zoomValueImg = uploadImage.querySelector('.scale__control--value');
var imgPreview = uploadImage.querySelector('.img-upload__preview');
var effectsListImg = uploadImage.querySelector('.effects__list');
var effectSliderLine = uploadImage.querySelector('.effect-level__line');
var effectsSliderPin = uploadImage.querySelector('.effect-level__pin');
var effectsLavelValue = uploadImage.querySelector('.effect-level__value');
var descriptionImg = uploadImage.querySelector('.text__description');

var usersPhotos = [];

var getRandomValue = function (arr) {
  if (arr.length > 0) {
    return arr[Math.round(-0.5 + Math.random() * arr.length)];
  }

  return 0;
};

var generateCommentObject = function (namesArr, commentsArr, count) {
  var userComment = {};
  count = count || AVATARS_COUNT;

  if (namesArr.length > 0 && commentsArr.length > 0) {
    userComment = {
      name: getRandomValue(namesArr),
      message: getRandomValue(commentsArr),
      avatar: 'img/avatar-' + Math.round(0.5 + Math.random() * count) + '.svg'
    };
  }

  return userComment;
};

var generateCommentsArray = function (min, max) {
  var userComments = [];
  min = min || 0;

  if (max) {
    for (var i = 0; i < Math.round(min - 0.5 + Math.random() * (max - min + 1)); i++) {
      userComments[i] = [
        generateCommentObject(NAMES, COMMENTS, AVATARS_COUNT)
      ];
    }
  }

  return userComments;
};

var generateUsersPhotos = function (min, max, count) {
  min = min || 0;
  count = count || PHOTOS_COUNT;

  if (max) {
    for (var i = 0; i < count; i++) {
      usersPhotos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: Math.round(min - 0.5 + Math.random() * (max - min + 1)),
        comments: generateCommentsArray(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)
      };
    }
  }

  return usersPhotos;
};

var createUserPhoto = function (photo) {
  var userPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var userPhotoElement = userPhotoTemplate.cloneNode(true);

  if (Object.keys(photo).length > 0) {
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return userPhotoElement;
  }

  return {};
};

var addUsersPhotos = function (photosArr) {
  var fragment = document.createDocumentFragment();

  if (photosArr.length > 0) {
    for (var i = 0; i < photosArr.length; i++) {
      fragment.appendChild(createUserPhoto(photosArr[i]));
    }

    return fragment;
  }

  return {};
};

var showElement = function (element) {
  if (element) {
    element.classList.remove('hidden');
  }
};

var closeElement = function (element) {
  if (element) {
    element.classList.add('hidden');
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeElement(uploadImage);
    resetInputValue(openUploadImage);
  }
};

var resetInputValue = function (input) {
  if (input) {
    input.value = '';
  }
};

var hideSlider = function (evt) {
  var originImgInput = uploadImage.querySelector('#effect-none');
  var effectSlider = uploadImage.querySelector('.effect-level');

  if (evt.target === originImgInput) {
    closeElement(effectSlider);
  } else {
    showElement(effectSlider);
  }
};

var getNamberFromInputValue = function (element) {
  return element ? parseInt(element.value, 10) : 0;
};

var changeInputValueWithPercent = function (element, number, minValue, maxValue, step, raise) {
  minValue = minValue || MIN_PERCENT_INPUT_VALUE;
  maxValue = maxValue || MAX_PERCENT_INPUT_VALUE;
  step = step || STEP_PERCENT_INPUT_VALUE;
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
  number = number || MAX_PERCENT_INPUT_VALUE;

  if (element) {
    element.querySelector('img').style.transform = 'scale(' + number / MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
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
  var leftPosition = '';

  if (element) {
    leftPosition = element.getBoundingClientRect().left;
  }

  return leftPosition;
};

var getBlockRightPosition = function (element) {
  var rightPosition = '';

  if (element) {
    rightPosition = element.getBoundingClientRect().right;
  }

  return rightPosition;
};

var getLengthBlock = function (element) {
  var positionSliderLineLeft = 0;
  var positionSliderLineRight = 0;
  var lengthSliderLine = 0;

  if (element) {
    positionSliderLineLeft = getBlockLeftPosition(element);
    positionSliderLineRight = getBlockRightPosition(element);
    lengthSliderLine = positionSliderLineRight - positionSliderLineLeft;
  }

  return lengthSliderLine;
};

var getProportion = function (evt, element) {
  var offsetpositionX = 0;
  var proportion = 0;

  if (element) {
    offsetpositionX = evt.clientX - getBlockLeftPosition(element);
    proportion = (offsetpositionX / getLengthBlock(element)) * MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS;
  }

  return proportion;
};

var changeSaturationValue = function (evt) {
  effectsLavelValue.value = Math.round(getProportion(evt, effectSliderLine));
};

var resetSaturationValue = function () {
  effectsLavelValue.value = '100';
};

var changeBlockFilterStyle = function (evt, element, scaleElement) {
  var prefixArr = [];
  var prefix = '';

  if (element && scaleElement) {
    prefixArr = element.className.split('--');
    prefix = prefixArr[1];

    element.style.filter = '';

    if (prefix === 'chrome') {
      element.style.filter = 'grayscale(' + Math.round(getProportion(evt, scaleElement)) / MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
    } else if (prefix === 'sepia') {
      element.style.filter = 'sepia(' + Math.round(getProportion(evt, scaleElement)) / MULTIPLIER_DIVISOR_ON_HUNDRED_PARTS + ')';
    } else if (prefix === 'marvin') {
      element.style.filter = 'invert(' + Math.round(getProportion(evt, scaleElement)) + '%)';
    } else if (prefix === 'phobos') {
      element.style.filter = 'blur(' + Math.floor(getProportion(evt, scaleElement) / DIVISOR_ON_FOUR_PARTS) + 'px)';
    } else if (prefix === 'heat') {
      element.style.filter = 'brightness(' + Math.ceil(getProportion(evt, scaleElement) / DIVISOR_ON_THREE_PARTS) + ')';
    } else {
      element.style.filter = 'none';
    }
  }
};

usersPhotos = generateUsersPhotos(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, PHOTOS_COUNT);
usersPhotosSection.appendChild(addUsersPhotos(usersPhotos));

openUploadImage.addEventListener('change', function () {
  showElement(uploadImage);
  document.addEventListener('keydown', onPopupEscPress);
});

closeUploadImage.addEventListener('click', function () {
  closeElement(uploadImage);
  resetInputValue(openUploadImage);
  document.removeEventListener('keydown', onPopupEscPress);
});

zoomInImg.addEventListener('click', function () {
  changeInputValueWithPercent(zoomValueImg, getNamberFromInputValue(zoomValueImg), MIN_PERCENT_INPUT_VALUE, MAX_PERCENT_INPUT_VALUE, STEP_PERCENT_INPUT_VALUE, true);
  changeImgScale(imgPreview, getNamberFromInputValue(zoomValueImg));
});

zoomOutImg.addEventListener('click', function () {
  changeInputValueWithPercent(zoomValueImg, getNamberFromInputValue(zoomValueImg), MIN_PERCENT_INPUT_VALUE, MAX_PERCENT_INPUT_VALUE, STEP_PERCENT_INPUT_VALUE, false);
  changeImgScale(imgPreview, getNamberFromInputValue(zoomValueImg));
});

effectsSliderPin.addEventListener('mouseup', function (evt) {
  changeSaturationValue(evt);
  changeBlockFilterStyle(evt, imgPreview, effectSliderLine);
});

effectsListImg.addEventListener('click', function (evt) {
  addImgClass(evt, imgPreview);
  hideSlider(evt);
  resetSaturationValue();
});

descriptionImg.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

descriptionImg.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
