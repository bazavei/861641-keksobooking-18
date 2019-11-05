'use strict';

(function () {
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = photoContainer.querySelector('#images');
  var photoWrap = photoContainer.querySelector('.ad-form__photo');

  var deleteEmptyPhoto = function () {
    if (!photoContainer.querySelector('.ad-form__photo img')) {
      photoContainer.querySelectorAll('.ad-form__photo').forEach(function (preview) {
        photoContainer.removeChild(preview);
      });
    }
  };

  var createPhoto = function (src) {
    var wrapper = photoWrap.cloneNode();
    var image = new Image(70, 70);
    image.src = src;
    image.alt = 'Фотография';
    image.style.borderRadius = '5px';

    wrapper.appendChild(image);

    return wrapper;
  };

  var showPhoto = function (files) {
    deleteEmptyPhoto();
    files.forEach(function (file) {
      var fileName = file.name.toLowerCase();
      var mathes = window.util.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (mathes) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = createPhoto(reader.result);
          photoContainer.appendChild(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  photoChooser.addEventListener('change', function () {
    var files = Array.from(photoChooser.files);
    showPhoto(files);
  });
})();
