'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;

  var photosFilters = document.querySelector('.img-filters');
  var popularPhotosFilterBtn = photosFilters.querySelector('#filter-popular');
  var newPhotosFilterBtn = photosFilters.querySelector('#filter-new');
  var discussedPhotosFilterBtn = photosFilters.querySelector('#filter-discussed');


  window.filters = {
    showPhotosFilters: function () {
      photosFilters.classList.remove('img-filters--inactive');
    }
  };

  var renderPopularPhotos = function (photosArr) {
    window.debounce(function () {
      window.rendering.addUsersPhotos(photosArr);
    });
  };

  var renderNewPhotos = function (photosArr) {
    var newUsersPhotos = photosArr
    .slice()
    .sort(window.utils.compareRandom)
    .slice(0, NEW_PHOTOS_COUNT);

    window.debounce(function () {
      window.rendering.addUsersPhotos(newUsersPhotos);
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
      window.rendering.addUsersPhotos(discussedUsersPhotos);
    });
  };

  popularPhotosFilterBtn.addEventListener('click', function () {
    renderPopularPhotos(window.variables.photos);
    popularPhotosFilterBtn.classList.add('img-filters__button--active');
    newPhotosFilterBtn.classList.remove('img-filters__button--active');
    discussedPhotosFilterBtn.classList.remove('img-filters__button--active');
  });

  newPhotosFilterBtn.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    newPhotosFilterBtn.classList.add('img-filters__button--active');
    popularPhotosFilterBtn.classList.remove('img-filters__button--active');
    discussedPhotosFilterBtn.classList.remove('img-filters__button--active');
  });

  discussedPhotosFilterBtn.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    discussedPhotosFilterBtn.classList.add('img-filters__button--active');
    popularPhotosFilterBtn.classList.remove('img-filters__button--active');
    newPhotosFilterBtn.classList.remove('img-filters__button--active');
  });
})();
