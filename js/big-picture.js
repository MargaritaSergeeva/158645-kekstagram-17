'use strict';

(function () {
  var bigPhoto = window.variables.bigPhotoBlock.querySelector('.big-picture__img img');
  var likesCount = window.variables.bigPhotoBlock.querySelector('.likes-count');
  var bigPhotodescription = window.variables.bigPhotoBlock.querySelector('.social__caption');
  var socialCommentsList = window.variables.bigPhotoBlock.querySelector('.social__comments');
  var socialCommentsCount = window.variables.bigPhotoBlock.querySelector('.social__comment-count');
  var socialCommentsLoader = window.variables.bigPhotoBlock.querySelector('.comments-loader');
  var socialCommentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();


  var removeSocialComments = function () {
    while (socialCommentsList.firstChild) {
      socialCommentsList.removeChild(socialCommentsList.firstChild);
    }
  };

  var addSocialComments = function (it) {
    var socialComment = socialCommentTemplate.cloneNode(true);
    var socialCommentText = socialComment.querySelector('.social__text');
    var socialCommentAvatar = socialComment.querySelector('.social__picture');

    socialCommentAvatar.src = it.avatar;
    socialCommentText.textContent = it.message;

    fragment.appendChild(socialComment);
  };

  var renderBigUserPhoto = function (photo) {
    bigPhoto.src = photo.url;
    likesCount.textContent = photo.likes;
    bigPhotodescription.textContent = photo.description;

    photo.comments.forEach(function (it) {
      addSocialComments(it);
    });

    removeSocialComments();
    socialCommentsList.appendChild(fragment);
  };

  window.picture = {
    renderTargetUserPhoto: function (evt) {
      var photoAddress = evt.target.src;
      var targetPhotos = window.variables.photos.filter(function (it) {
        return photoAddress.endsWith(it.url);
      });

      renderBigUserPhoto(targetPhotos[0]);
    }
  };

  socialCommentsCount.classList.add('visually-hidden');
  socialCommentsLoader.classList.add('visually-hidden');
})();
