'use strict';

(function () {
  var bigPhotoBlock = document.querySelector('.big-picture');

  var renderTargetUserPhoto = function (evt) {
    var photoAddress = evt.target.src;
    var targetPhotos = window.variables.photos.filter(function (it) {
      return photoAddress.endsWith(it.url);
    });

    window.picture.renderBigUserPhoto(targetPhotos[0]);
  };

  var onErrorLoading = function (errorMessage) {
    window.errors.onErrorStartPage(errorMessage);
  };

  var onSuccessLoading = function (photosArr) {
    window.variables.photos = photosArr;
    window.rendering.addUsersPhotos(window.variables.photos);
    window.filters.showPhotosFilters();
  };

  window.backend.load(window.constants.URL_GET, onSuccessLoading, onErrorLoading);

  window.variables.usersPhotosSection.addEventListener('click', function (evt) {
    renderTargetUserPhoto(evt);
    window.utils.showElement(bigPhotoBlock);
  });
})();


