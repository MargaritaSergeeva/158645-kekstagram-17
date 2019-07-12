'use strict';

(function () {
  var onErrorLoadData = function (errorMessage) {
    window.messages.showError('#error__start-page', errorMessage);
  };

  var onSuccessLoadData = function (photosArr) {
    window.variables.photos = photosArr;
    window.rendering.addUsersPhotos(window.variables.photos);
    window.filters.show();
  };


  window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);

  window.variables.usersPhotosSection.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var photoAddress = evt.target.src;
      window.picture.renderTargetUserPhoto(photoAddress);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      if (evt.target.classList.contains('picture')) {
        var photoAddress = evt.target.querySelector('.picture__img').src;
        window.picture.renderTargetUserPhoto(photoAddress);
      }
    }
  });
})();


