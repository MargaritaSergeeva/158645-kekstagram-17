'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var effectsPreviewImage = window.variables.uploadImageModal.querySelectorAll('.effects__preview');

  window.loading = {
    userImage: function () {
      var file = window.variables.openerUploadImage.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          window.variables.imagePreview.querySelector('img').src = reader.result;
          effectsPreviewImage.forEach(function (it) {
            it.style.backgroundImage = 'url(' + reader.result + ')';
          });
          window.utils.showElement(window.variables.uploadImageModal);
        });

        reader.readAsDataURL(file);
      }
    }
  };
})();
