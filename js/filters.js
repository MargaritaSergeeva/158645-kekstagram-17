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
    .sort(compareRandom)
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
      return compareNumbersGoDown(left.comments.length, right.comments.length);
    });

    window.debounce(function () {
      window.rendering.addUsersPhotos(discussedUsersPhotos);
    });
  };

  var addClassToElement = function (element, className) {
    element.classList.add(className);
  };

  var removeClassFromElement = function (element, className) {
    element.classList.remove(className);
  };

  window.variables.xhr.addEventListener('load', function () {
    if (window.variables.xhr.status === window.constants.SUCСESS__STATUS) {
      photosFilters.classList.remove('img-filters--inactive');
    }
  });

  popularPhotosFilterBtn.addEventListener('click', function () {
    renderPopularPhotos(window.variables.photos);
    windowaddClassToElement(popularPhotosFilterBtn, 'img-filters__button--active');
    removeClassFromElement(newPhotosFilterBtn, discussedPhotosFilterBtn);
  });

  newPhotosFilterBtn.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    addClassToElement(newPhotosFilterBtn);
    removeClassFromElement(popularPhotosFilterBtn, discussedPhotosFilterBtn);
  });

  discussedPhotosFilterBtn.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    addClassToElement(discussedPhotosFilterBtn);
    removeClassFromElement(popularPhotosFilterBtn, newPhotosFilterBtn);
  });
})();
