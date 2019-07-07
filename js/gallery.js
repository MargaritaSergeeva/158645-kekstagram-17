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
    if (evt.target.classList.contains('picture__img')) {
      window.picture.renderTargetUserPhoto(evt);
    }
  });
})();


