'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;

  var photosFiltersElement = document.querySelector('.img-filters');
  var popularPhotosFilterButtonElement = photosFiltersElement.querySelector('#filter-popular');
  var newPhotosFilterButtonElement = photosFiltersElement.querySelector('#filter-new');
  var discussedPhotosFilterButtonElement = photosFiltersElement.querySelector('#filter-discussed');


  window.showUsersPhotosFilters = function () {
    photosFiltersElement.classList.remove('img-filters--inactive');
  };

  var renderPopularPhotos = function (photosArr) {
    window.debounce(function () {
      window.addUsersPhotos(photosArr);
    });
  };

  var renderNewPhotos = function (photosArr) {
    var newUsersPhotos = photosArr
    .slice()
    .sort(window.utils.compareRandom)
    .slice(0, NEW_PHOTOS_COUNT);

    window.debounce(function () {
      window.addUsersPhotos(newUsersPhotos);
    });
  };

  var renderDiscussedPhotos = function (photosArr) {
    var discussedUsersPhotos = photosArr
    .slice()
    .sort(function (left, right) {
      var sort = window.utils.compareNumbersGoDown(left.comments.length, right.comments.length);

      if (left.comments.length === right.comments.length) {
        sort = window.utils.compareNumbersGoDown(left.likes, right.likes);
      }

      return sort;
    });

    window.debounce(function () {
      window.addUsersPhotos(discussedUsersPhotos);
    });
  };

  popularPhotosFilterButtonElement.addEventListener('click', function () {
    renderPopularPhotos(window.variables.photos);
    popularPhotosFilterButtonElement.classList.add('img-filters__button--active');
    newPhotosFilterButtonElement.classList.remove('img-filters__button--active');
    discussedPhotosFilterButtonElement.classList.remove('img-filters__button--active');
  });

  newPhotosFilterButtonElement.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    newPhotosFilterButtonElement.classList.add('img-filters__button--active');
    popularPhotosFilterButtonElement.classList.remove('img-filters__button--active');
    discussedPhotosFilterButtonElement.classList.remove('img-filters__button--active');
  });

  discussedPhotosFilterButtonElement.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    discussedPhotosFilterButtonElement.classList.add('img-filters__button--active');
    popularPhotosFilterButtonElement.classList.remove('img-filters__button--active');
    newPhotosFilterButtonElement.classList.remove('img-filters__button--active');
  });
})();
