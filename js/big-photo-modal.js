'use strict';

(function () {
  var MAX_COMMENTS = 5;

  var bigPhotoImageElement = window.variables.bigPhotoModalElement.querySelector('.big-picture__img img');
  var likesCountElement = window.variables.bigPhotoModalElement.querySelector('.likes-count');
  var bigPhotoDescriptionElement = window.variables.bigPhotoModalElement.querySelector('.social__caption');
  var commentsListElement = window.variables.bigPhotoModalElement.querySelector('.social__comments');
  var totalCommentsCountElement = window.variables.bigPhotoModalElement.querySelector('.comments-count--total');
  var showedCommentsCountElement = window.variables.bigPhotoModalElement.querySelector('.comments-count--showed');
  var commentsLoaderElement = window.variables.bigPhotoModalElement.querySelector('.comments-loader');
  var commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
  var userCommentElement = window.variables.bigPhotoModalElement.querySelector('.social__footer-text');
  var closureBigPhotoModalElement = window.variables.bigPhotoModalElement.querySelector('.big-picture__cancel');
  var fragment = document.createDocumentFragment();

  var openedBigPhoto;

  var onBigImageModalEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      window.utils.closeElement(window.variables.bigPhotoModalElement);
      document.body.classList.remove('modal-open');
      resetShowedComments();
      window.utils.resetInputValue(userCommentElement);
      document.removeEventListener('keydown', onBigImageModalEscPress);
    }
  };

  var addComments = function (it) {
    var comment = commentTemplateElement.cloneNode(true);
    var commentTextElement = comment.querySelector('.social__text');
    var commentAvatarElement = comment.querySelector('.social__picture');

    commentAvatarElement.src = it.avatar;
    commentAvatarElement.alt = it.name;
    commentTextElement.textContent = it.message;

    fragment.appendChild(comment);
  };

  var addCommentsByParts = function () {
    var commentsNodeCount = commentsListElement.childNodes.length;

    for (var i = commentsNodeCount; i < openedBigPhoto.comments.length && i < commentsNodeCount + MAX_COMMENTS; i++) {
      addComments(openedBigPhoto.comments[i]);
    }

    commentsListElement.appendChild(fragment);
    showedCommentsCountElement.textContent = commentsListElement.childNodes.length;

    if (showedCommentsCountElement.textContent === totalCommentsCountElement.textContent) {
      window.utils.closeElement(commentsLoaderElement);
    }
  };

  var resetShowedComments = function () {
    showedCommentsCountElement.textContent = MAX_COMMENTS;
  };

  var renderBigUserPhoto = function (photo) {
    openedBigPhoto = new window.BigPhoto(photo);

    bigPhotoImageElement.src = openedBigPhoto.url;
    likesCountElement.textContent = openedBigPhoto.likes;
    bigPhotoDescriptionElement.textContent = openedBigPhoto.description;
    totalCommentsCountElement.textContent = openedBigPhoto.comments.length;

    for (var i = 0; i < openedBigPhoto.comments.length && i < MAX_COMMENTS; i++) {
      addComments(openedBigPhoto.comments[i]);
    }

    if (openedBigPhoto.comments.length <= MAX_COMMENTS) {
      window.utils.closeElement(commentsLoaderElement);
      showedCommentsCountElement.textContent = openedBigPhoto.comments.length;
    } else {
      window.utils.showElement(commentsLoaderElement);
    }

    commentsListElement.innerHTML = '';
    commentsListElement.appendChild(fragment);
  };

  window.renderTargetUserPhoto = function (url) {
    var targetPhotos = window.variables.photos.filter(function (it) {
      return url.endsWith(it.url);
    });

    renderBigUserPhoto(targetPhotos[0]);
    document.body.classList.add('modal-open');
    window.utils.showElement(window.variables.bigPhotoModalElement);
    document.addEventListener('keydown', onBigImageModalEscPress);
  };


  commentsLoaderElement.addEventListener('click', function () {
    addCommentsByParts();
  });

  closureBigPhotoModalElement.addEventListener('click', function () {
    window.utils.closeElement(window.variables.bigPhotoModalElement);
    document.body.classList.remove('modal-open');
    resetShowedComments();
    window.utils.resetInputValue(userCommentElement);
    document.removeEventListener('keydown', onBigImageModalEscPress);
  });
})();
