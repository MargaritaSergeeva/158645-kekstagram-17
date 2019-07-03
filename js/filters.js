'use strict';

(function () {
  var photosFilters = document.querySelector('.img-filters');
  var popularPhotosFilterBtn = photosFilters.querySelector('#filter-popular');
  var newPhotosFilterBtn = photosFilters.querySelector('#filter-new');
  var discussedPhotosFilterBtn = photosFilters.querySelector('#filter-discussed');


  var renderPopularPhotos = function (photosArr) {
    window.debounce(function () {
      window.rendering.addUsersPhotos(photosArr);
    });
  };

  var renderNewPhotos = function (photosArr) {
    var newUsersPhotos = photosArr
    .slice()
    .sort(window.utils.compareRandom)
    .slice(0, 10)
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
      return window.utils.compareNumbersGoDown(left.comments.length, right.comments.length);
    });

    window.debounce(function () {
      window.rendering.addUsersPhotos(discussedUsersPhotos);
    });
  };

  window.variables.xhr.addEventListener('load', function () {
    if (window.variables.xhr.status === window.constants.SUCСESS__STATUS) {
      photosFilters.classList.remove('img-filters--inactive');
    }
  });

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
