'use strict';

(function () {
  var onErrorLoading = function (errorMessage) {
    window.messages.showErrorMessage('#error__start-page', errorMessage);
  };

  var onSuccessLoading = function (photosArr) {
    window.variables.photos = photosArr;
    window.rendering.addUsersPhotos(window.variables.photos);
    window.filters.showPhotosFilters();
  };


  window.backend.load(window.constants.Url.GET, onSuccessLoading, onErrorLoading);

  window.variables.usersPhotosSection.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var photoAddress = evt.target.src;
      window.picture.renderTargetUserPhoto(photoAddress);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ENTER) {
      if (evt.target.classList.contains('picture')) {
        var photoAddress = evt.target.querySelector('.picture__img').src;
        window.picture.renderTargetUserPhoto(photoAddress);
      }
    }
  });
})();


