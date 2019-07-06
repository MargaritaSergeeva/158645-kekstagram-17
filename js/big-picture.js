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


  var UserPhoto = function (url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  };

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
    renderBigUserPhoto: function (photoArr) {
      var bigUserPhoto = new UserPhoto(photoArr[0].url, photoArr[0].likes, photoArr[0].comments, photoArr[0].description);

      bigPhoto.src = bigUserPhoto.url;
      likesCount.textContent = bigUserPhoto.likes;
      bigPhotodescription.textContent = bigUserPhoto.description;

      bigUserPhoto.comments.forEach(function (it) {
        addSocialComments(it);
      });

      removeSocialComments();
      socialCommentsList.appendChild(fragment);
    }
  };

  window.utils.showElement(bigPhotoBlock);
  socialCommentsCount.classList.add('visually-hidden');
  socialCommentsLoader.classList.add('visually-hidden');
})();
