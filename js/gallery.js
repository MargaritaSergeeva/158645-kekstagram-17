'use strict';

(function () {
  var usersPhotosSection = document.querySelector('.pictures');


  var onErrorStartPage = function (errorMessage) {
    var errorStartPageTemplate = document.querySelector('#error__start-page').content.querySelector('.error');
    var errorStartPagePopup = errorStartPageTemplate.cloneNode(true);
    var errorText = errorStartPagePopup.querySelector('.error__title');
    var errorButton = errorStartPagePopup.querySelector('.error__button');

    errorText.textContent = errorMessage;
    document.body.appendChild(errorStartPagePopup);

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.body.removeChild(errorStartPagePopup);
    });
  };

  var createUserPhoto = function (photo) {
    var userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
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

      usersPhotosSection.appendChild(fragment);
    }

    return {};
  };


  window.backend.load(window.constants.URL_GET, addUsersPhotos, onErrorStartPage);
})();
