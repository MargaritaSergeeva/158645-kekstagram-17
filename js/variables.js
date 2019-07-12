'use strict';

(function () {
  var main = document.querySelector('main');
  var openerUploadImage = document.querySelector('#upload-file');
  var uploadImageModal = document.querySelector('.img-upload__overlay');
  var imagePreview = uploadImageModal.querySelector('.img-upload__preview');
  var effectsSlider = uploadImageModal.querySelector('.effect-level');
  var originImageInput = uploadImageModal.querySelector('#effect-none');
  var imageHashtags = uploadImageModal.querySelector('.text__hashtags');
  var imageDescription = uploadImageModal.querySelector('.text__description');
  var usersPhotosSection = document.querySelector('.pictures');
  var bigPhotoModal = document.querySelector('.big-picture');


  window.variables = {
    main: main,
    openerUploadImage: openerUploadImage,
    uploadImageModal: uploadImageModal,
    imagePreview: imagePreview,
    effectsSlider: effectsSlider,
    originImageInput: originImageInput,
    imageHashtags: imageHashtags,
    imageDescription: imageDescription,
    usersPhotosSection: usersPhotosSection,
    bigPhotoModal: bigPhotoModal,
    photos: []
  };
})();
