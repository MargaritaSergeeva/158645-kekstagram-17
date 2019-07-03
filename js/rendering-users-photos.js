'use strict';

(function () {
  var MAX_PHOTOS_COUNT = 25;
  var usersPhotosSection = document.querySelector('.pictures');
  var childrenCount = usersPhotosSection.childNodes.length;

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

  var removeUsersPhotos = function () {
    while (usersPhotosSection.childNodes.length !== childrenCount) {
      usersPhotosSection.removeChild(usersPhotosSection.lastChild);
    }
  };

  window.rendering = {
    addUsersPhotos: function (photosArr) {
      var fragment = document.createDocumentFragment();

      if (photosArr.length > 0) {
        photosArr
        .slice(0, MAX_PHOTOS_COUNT)
        .forEach(function (it) {
          fragment.appendChild(createUserPhoto(it));
        });

        removeUsersPhotos();
        usersPhotosSection.appendChild(fragment);
      }

      return {};
    }
  };
})();
