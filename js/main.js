'use strict';

var AVATARS_COUNT = 6;
var PHOTOS_COUNT = 25;
var MIN_RANDOM_VALUE = 15;
var MAX_RANDOM_VALUE = 200;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Виктор', 'Елена', 'Катя', 'Павел', 'Олеся', 'Инна', 'Алла'];

var usersPhotosSection = document.querySelector('.pictures');
var userPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var fragment = document.createDocumentFragment();

var usersPhotos = [];

var getRandomValue = function (arr) {
  return arr[Math.round(-0.5 + Math.random() * arr.length)];
};

var generateCommentObject = function (namesArr, commentsArr, count) {
  var userComment = {
    name: getRandomValue(namesArr),
    message: getRandomValue(commentsArr),
    avatar: 'img/avatar-' + Math.round(0.5 + Math.random() * count) + '.svg'
  };

  return userComment;
};

var generateCommentsArray = function (min, max) {
  var userComments = [];

  for (var i = 0; i < Math.round(min - 0.5 + Math.random() * (max - min + 1)); i++) {
    userComments[i] = [
      generateCommentObject(NAMES, COMMENTS, AVATARS_COUNT)
    ];
  }

  return userComments;
};

var generateUsersPhotos = function (min, max, count) {
  for (var i = 0; i < count; i++) {
    usersPhotos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.round(min - 0.5 + Math.random() * (max - min + 1)),
      comments: generateCommentsArray(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)
    };
  }

  return usersPhotos;
};

var createUserPhoto = function (photo) {
  var userPhotoElement = userPhotoTemplate.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = photo.url;
  userPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
  userPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return userPhotoElement;
};

var addUsersPhotos = function (photosArr) {
  for (var i = 0; i < photosArr.length; i++) {
    fragment.appendChild(createUserPhoto(photosArr[i]));
  }

  return fragment;
};

usersPhotos = generateUsersPhotos(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, PHOTOS_COUNT);
usersPhotosSection.appendChild(addUsersPhotos(usersPhotos));
