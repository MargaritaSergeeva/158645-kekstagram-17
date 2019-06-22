'use strict';

var ESC_KEYCODE = 27;
var AVATARS_COUNT = 6;
var PHOTOS_COUNT = 25;
var MIN_RANDOM_VALUE = 15;
var MAX_RANDOM_VALUE = 200;
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
var usersPhotos = [];


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
  }
};

var getRandomValue = function (arr) {
  if (arr.length > 0) {
    return arr[Math.round(-0.5 + Math.random() * arr.length)];
  }

  return 0;
};

var generateCommentObject = function (namesArr, commentsArr, count) {
  var userComment = {};

  if (namesArr.length > 0 && commentsArr.length > 0 && count) {
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

  if (max) {
    min = min || 0;

    for (var i = 0; i < Math.round(min - 0.5 + Math.random() * (max - min + 1)); i++) {
      userComments[i] = [
        generateCommentObject(NAMES, COMMENTS, AVATARS_COUNT)
      ];
    }
  }

  return userComments;
};

var generateUsersPhotos = function (min, max, count) {
  if (max & count) {
    min = min || 0;

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

openUploadImage.addEventListener('change', function () {
  showElement(uploadImage);
  document.addEventListener('keydown', onPopupEscPress);
});

closeUploadImage.addEventListener('click', function () {
  closeElement(uploadImage);
  document.removeEventListener('keydown', onPopupEscPress);
  openUploadImage.value = '';
});

usersPhotos = generateUsersPhotos(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, PHOTOS_COUNT);
usersPhotosSection.appendChild(addUsersPhotos(usersPhotos));
