'use strict';

(function () {
  var bigPhotoBlock = document.querySelector('.big-picture');
  var bigPhoto = bigPhotoBlock.querySelector('.big-picture__img img');
  var likesCount = bigPhotoBlock.querySelector('.likes-count');
  var bigPhotodescription = bigPhotoBlock.querySelector('.social__caption');
  var socialCommentsList = bigPhotoBlock.querySelector('.social__comments');
  var socialCommentsCount = bigPhotoBlock.querySelector('.social__comment-count');
  var socialCommentsLoader = bigPhotoBlock.querySelector('.comments-loader');
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

  window.picture = {
    renderBigUserPhoto: function (photo) {
      bigPhoto.src = photo.url;
      likesCount.textContent = photo.likes;
      bigPhotodescription.textContent = photo.description;

      photo.comments.forEach(function (it) {
        addSocialComments(it);
      });

      removeSocialComments();
      socialCommentsList.appendChild(fragment);
    }
  };

  socialCommentsCount.classList.add('visually-hidden');
  socialCommentsLoader.classList.add('visually-hidden');
})();
