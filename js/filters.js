'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;

  var photosFilters = document.querySelector('.img-filters');
  var popularPhotosFilterButton = photosFilters.querySelector('#filter-popular');
  var newPhotosFilterButton = photosFilters.querySelector('#filter-new');
  var discussedPhotosFilterButton = photosFilters.querySelector('#filter-discussed');


  window.showUsersPhotosFilters = function () {
    photosFilters.classList.remove('img-filters--inactive');
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

  popularPhotosFilterButton.addEventListener('click', function () {
    renderPopularPhotos(window.variables.photos);
    popularPhotosFilterButton.classList.add('img-filters__button--active');
    newPhotosFilterButton.classList.remove('img-filters__button--active');
    discussedPhotosFilterButton.classList.remove('img-filters__button--active');
  });

  newPhotosFilterButton.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    newPhotosFilterButton.classList.add('img-filters__button--active');
    popularPhotosFilterButton.classList.remove('img-filters__button--active');
    discussedPhotosFilterButton.classList.remove('img-filters__button--active');
  });

  discussedPhotosFilterButton.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    discussedPhotosFilterButton.classList.add('img-filters__button--active');
    popularPhotosFilterButton.classList.remove('img-filters__button--active');
    newPhotosFilterButton.classList.remove('img-filters__button--active');
  });
})();
