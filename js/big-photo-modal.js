'use strict';

(function () {
  var MAX_COMMENTS = 5;

  var bigPhotoImage = window.variables.bigPhotoModal.querySelector('.big-picture__img img');
  var likesCount = window.variables.bigPhotoModal.querySelector('.likes-count');
  var bigPhotoDescription = window.variables.bigPhotoModal.querySelector('.social__caption');
  var commentsList = window.variables.bigPhotoModal.querySelector('.social__comments');
  var totalCommentsCount = window.variables.bigPhotoModal.querySelector('.comments-count--total');
  var showedCommentsCount = window.variables.bigPhotoModal.querySelector('.comments-count--showed');
  var commentsLoader = window.variables.bigPhotoModal.querySelector('.comments-loader');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var userComment = window.variables.bigPhotoModal.querySelector('.social__footer-text');
  var closureBigPhotoModal = window.variables.bigPhotoModal.querySelector('.big-picture__cancel');
  var fragment = document.createDocumentFragment();

  var openedBigPhoto;

  var onBigImageModalEscPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      window.utils.closeElement(window.variables.bigPhotoModal);
      document.body.classList.remove('modal-open');
      resetShowedComments();
      window.utils.resetInputValue(userComment);
      document.removeEventListener('keydown', onBigImageModalEscPress);
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
    showedCommentsCount.textContent = commentsList.childNodes.length;

    if (showedCommentsCount.textContent === totalCommentsCount.textContent) {
      window.utils.closeElement(commentsLoader);
    }
  };

  var resetShowedComments = function () {
    showedCommentsCount.textContent = MAX_COMMENTS;
  };

  var renderBigUserPhoto = function (photo) {
    openedBigPhoto = new window.BigUserPhoto(photo);

    bigPhotoImage.src = openedBigPhoto.url;
    likesCount.textContent = openedBigPhoto.likes;
    bigPhotoDescription.textContent = openedBigPhoto.description;
    totalCommentsCount.textContent = openedBigPhoto.comments.length;

    for (var i = 0; i < openedBigPhoto.comments.length && i < MAX_COMMENTS; i++) {
      addComments(openedBigPhoto.comments[i]);
    }

    if (openedBigPhoto.comments.length <= MAX_COMMENTS) {
      window.utils.closeElement(commentsLoader);
      showedCommentsCount.textContent = openedBigPhoto.comments.length;
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
      window.utils.showElement(window.variables.bigPhotoModal);
      document.addEventListener('keydown', onBigImageModalEscPress);
    }
  };


  commentsLoader.addEventListener('click', function () {
    addCommentsByParts();
  });

  closureBigPhotoModal.addEventListener('click', function () {
    window.utils.closeElement(window.variables.bigPhotoModal);
    document.body.classList.remove('modal-open');
    resetShowedComments();
    window.utils.resetInputValue(userComment);
    document.removeEventListener('keydown', onBigImageModalEscPress);
  });
})();
