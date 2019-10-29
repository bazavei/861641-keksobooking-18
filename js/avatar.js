'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#avatar');
  var previewWrap = document.querySelector('.ad-form-header__preview');
  var preview = previewWrap.querySelector('img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var mathes = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (mathes) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
