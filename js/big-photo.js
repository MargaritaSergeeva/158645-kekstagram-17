'use strict';

(function () {
  window.BigPhoto = function (photo) {
    this.url = photo.url;
    this.likes = photo.likes;
    this.comments = photo.comments;
    this.description = photo.description;
  };
})();
