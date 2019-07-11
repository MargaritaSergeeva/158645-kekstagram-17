'use strict';

(function () {
  var main = document.querySelector('main');
  var openUploadImage = document.querySelector('#upload-file');
  var uploadImage = document.querySelector('.img-upload__overlay');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');
  var hashtagsImg = uploadImage.querySelector('.text__hashtags');
  var usersPhotosSection = document.querySelector('.pictures');
  var bigPhotoBlock = document.querySelector('.big-picture');
  var originImgInput = uploadImage.querySelector('#effect-none');

  window.variables = {
    main: main,
    openUploadImage: openUploadImage,
    uploadImage: uploadImage,
    imgPreview: imgPreview,
    effectSlider: effectSlider,
    originImgInput: originImgInput,
    hashtagsImg: hashtagsImg,
    usersPhotosSection: usersPhotosSection,
    bigPhotoBlock: bigPhotoBlock,
    photos: []
  };
})();
