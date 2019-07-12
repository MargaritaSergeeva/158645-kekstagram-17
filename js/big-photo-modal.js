'use strict';

(function () {
  var MAX_COMMENTS = 5;

  var bigPhotoImg = window.variables.bigPhotoBlock.querySelector('.big-picture__img img');
  var likesCount = window.variables.bigPhotoBlock.querySelector('.likes-count');
  var bigPhotodescription = window.variables.bigPhotoBlock.querySelector('.social__caption');
  var commentsList = window.variables.bigPhotoBlock.querySelector('.social__comments');
  var commentsCountTotal = window.variables.bigPhotoBlock.querySelector('.comments-count--total');
  var commentsCountShowed = window.variables.bigPhotoBlock.querySelector('.comments-count--showed');
  var commentsLoader = window.variables.bigPhotoBlock.querySelector('.comments-loader');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var userComment = window.variables.bigPhotoBlock.querySelector('.social__footer-text');
  var closeBigPhotoBlock = window.variables.bigPhotoBlock.querySelector('.big-picture__cancel');
  var fragment = document.createDocumentFragment();

  var openedBigPhoto;

  var onBigImgPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      window.utils.closeElement(window.variables.bigPhotoBlock);
      document.body.classList.remove('modal-open');
      resetShowedComments();
      window.utils.resetInputValue(userComment);
      document.removeEventListener('keydown', onBigImgPopupEscPress);
    }
  };

  var removeComments = function () {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  };

  var addComments = function (it) {
    var comment = commentTemplate.cloneNode(true);
    var commentText = comment.querySelector('.social__text');
    var commentAvatar = comment.querySelector('.social__picture');

    commentAvatar.src = it.avatar;
    commentAvatar.alt = it.name;
    commentText.textContent = it.message;

    fragment.appendChild(comment);
  };

  var addCommentsByParts = function () {
    var commentsNodeCount = commentsList.childNodes.length;

    for (var i = commentsNodeCount; i < openedBigPhoto.comments.length && i < commentsNodeCount + MAX_COMMENTS; i++) {
      addComments(openedBigPhoto.comments[i]);
    }

    commentsList.appendChild(fragment);
    commentsCountShowed.textContent = commentsList.childNodes.length;

    if (commentsCountShowed.textContent === commentsCountTotal.textContent) {
      window.utils.closeElement(commentsLoader);
    }
  };

  var resetShowedComments = function () {
    commentsCountShowed.textContent = MAX_COMMENTS;
  };

  var renderBigUserPhoto = function (photo) {
    openedBigPhoto = new window.BigUserPhoto(photo);

    bigPhotoImg.src = openedBigPhoto.url;
    likesCount.textContent = openedBigPhoto.likes;
    bigPhotodescription.textContent = openedBigPhoto.description;
    commentsCountTotal.textContent = openedBigPhoto.comments.length;

    for (var i = 0; i < openedBigPhoto.comments.length && i < MAX_COMMENTS; i++) {
      addComments(openedBigPhoto.comments[i]);
    }

    if (openedBigPhoto.comments.length <= MAX_COMMENTS) {
      window.utils.closeElement(commentsLoader);
      commentsCountShowed.textContent = openedBigPhoto.comments.length;
    } else {
      window.utils.showElement(commentsLoader);
    }

    removeComments();
    commentsList.appendChild(fragment);
  };

  window.picture = {
    renderTargetUserPhoto: function (url) {
      var targetPhotos = window.variables.photos.filter(function (it) {
        return url.endsWith(it.url);
      });

      renderBigUserPhoto(targetPhotos[0]);
      document.body.classList.add('modal-open');
      window.utils.showElement(window.variables.bigPhotoBlock);
      document.addEventListener('keydown', onBigImgPopupEscPress);
    }
  };


  commentsLoader.addEventListener('click', function () {
    addCommentsByParts();
  });

  closeBigPhotoBlock.addEventListener('click', function () {
    window.utils.closeElement(window.variables.bigPhotoBlock);
    document.body.classList.remove('modal-open');
    resetShowedComments();
    window.utils.resetInputValue(userComment);
    document.removeEventListener('keydown', onBigImgPopupEscPress);
  });
})();
