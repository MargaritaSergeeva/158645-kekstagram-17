'use strict';

(function () {
  var uploadImageModal = document.querySelector('.img-upload__overlay');

  window.variables = {
    main: document.querySelector('main'),
    openerUploadImage: document.querySelector('#upload-file'),
    uploadImageModal: uploadImageModal,
    imagePreview: uploadImageModal.querySelector('.img-upload__preview'),
    effectsSlider: uploadImageModal.querySelector('.effect-level'),
    originImageInput: uploadImageModal.querySelector('#effect-none'),
    imageHashtags: uploadImageModal.querySelector('.text__hashtags'),
    imageDescription: uploadImageModal.querySelector('.text__description'),
    usersPhotosSection: document.querySelector('.pictures'),
    bigPhotoModal: document.querySelector('.big-picture'),
    photos: []
  };
})();
