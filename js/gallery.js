'use strict';

(function () {
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
    window.picture.renderTargetUserPhoto(evt);
    window.utils.showElement(window.variables.bigPhotoBlock);
  });
})();


