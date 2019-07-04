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
    .slice(0, NEW_PHOTOS_COUNT)
    .map(function (it) {
      return it;
    });

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
    window.utils.addClassToElement(popularPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(newPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(discussedPhotosFilterBtn, 'img-filters__button--active');
  });

  newPhotosFilterBtn.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    window.utils.addClassToElement(newPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(popularPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(discussedPhotosFilterBtn, 'img-filters__button--active');
  });

  discussedPhotosFilterBtn.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    window.utils.addClassToElement(discussedPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(popularPhotosFilterBtn, 'img-filters__button--active');
    window.utils.removeClassFromElement(newPhotosFilterBtn, 'img-filters__button--active');
  });
})();
