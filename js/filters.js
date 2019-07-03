'use strict';

(function () {
  var photosFilters = document.querySelector('.img-filters');
  var popularPhotosFilterBtn = photosFilters.querySelector('#filter-popular');
  var newPhotosFilterBtn = photosFilters.querySelector('#filter-new');
  var discussedPhotosFilterBtn = photosFilters.querySelector('#filter-discussed');

  window.variables.xhr.addEventListener('load', function () {
    if (window.variables.xhr.status === window.constants.SUCСESS__STATUS) {
      photosFilters.classList.remove('img-filters--inactive');
    }
  });

  var renderPopularPhotos = function (photosArr) {
    window.rendering.addUsersPhotos(photosArr);
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var renderNewPhotos = function (photosArr) {
    var newUsersPhotos = photosArr
    .slice()
    .sort(compareRandom)
    .slice(0, 10)
    .map(function (it) {
      return it;
    });

    window.rendering.addUsersPhotos(newUsersPhotos);
  };

  var compareNumbersGoDown = function (left, right) {
    if (left > right) {
      return -1;
    } else if (left < right) {
      return 1;
    } else {
      return 0;
    }
  };

  var renderDiscussedPhotos = function (photosArr) {
    var discussedUsersPhotos = photosArr
      .slice()
      .sort(function (left, right) {
        return compareNumbersGoDown(left.comments.length, right.comments.length);
      });

    window.rendering.addUsersPhotos(discussedUsersPhotos);
  };

  var addActiveClass = function (button) {
    button.classList.add('img-filters__button--active');
  };

  var removeActiveClass = function (button1, button2) {
    button1.classList.remove('img-filters__button--active');
    button2.classList.remove('img-filters__button--active');
  };


  popularPhotosFilterBtn.addEventListener('click', function () {
    renderPopularPhotos(window.variables.photos);
    addActiveClass(popularPhotosFilterBtn);
    removeActiveClass(newPhotosFilterBtn, discussedPhotosFilterBtn);
  });

  newPhotosFilterBtn.addEventListener('click', function () {
    renderNewPhotos(window.variables.photos);
    addActiveClass(newPhotosFilterBtn);
    removeActiveClass(popularPhotosFilterBtn, discussedPhotosFilterBtn);
  });

  discussedPhotosFilterBtn.addEventListener('click', function () {
    renderDiscussedPhotos(window.variables.photos);
    addActiveClass(discussedPhotosFilterBtn);
    removeActiveClass(popularPhotosFilterBtn, newPhotosFilterBtn);
  });
})();
