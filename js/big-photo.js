'use strict';

(function () {
  window.BigUserPhoto = function (photo) {
    this.url = photo.url;
    this.likes = photo.likes;
    this.comments = photo.comments;
    this.description = photo.description;
  };
})();
