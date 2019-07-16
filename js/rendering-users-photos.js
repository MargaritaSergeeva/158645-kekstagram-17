'use strict';

(function () {
  var MAX_PHOTOS_COUNT = 25;
  var childrenCount = window.variables.usersPhotosSectionElement.childNodes.length;

  var createUserPhoto = function (photo) {
    var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
    var userPhotoElement = userPhotoTemplateElement.cloneNode(true);

    if (Object.keys(photo).length > 0) {
      userPhotoElement.querySelector('.picture__img').src = photo.url;
      userPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
      userPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return userPhotoElement;
    }

    return {};
  };

  var removeUsersPhotos = function (element) {
    while (element.childNodes.length !== childrenCount) {
      element.removeChild(element.lastChild);
    }
  };

  window.addUsersPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    if (photos.length > 0) {
      photos
      .slice(0, MAX_PHOTOS_COUNT)
      .forEach(function (it) {
        fragment.appendChild(createUserPhoto(it));
      });

      removeUsersPhotos(window.variables.usersPhotosSectionElement);
      window.variables.usersPhotosSectionElement.appendChild(fragment);
    }

    return {};
  };
})();
