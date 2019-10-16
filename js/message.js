'use strict';

(function () {
  var errorTemlpate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorTemlpate.querySelector('.error__button');
  var successTemlpate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var closeErrorMessage = function () {
    errorTemlpate.classList.add('hidden');
  };

  var closeSuccessMessage = function () {
    successTemlpate.classList.add('hidden');
  };

  window.message = {
    error: function (errorMessage) {
      main.insertAdjacentElement('afterbegin', errorTemlpate);
      errorButton.addEventListener('click', closeErrorMessage);
      var errorText = main.querySelector('.error__message');
      errorText.textContent = errorMessage;
      errorTemlpate.addEventListener('click', closeErrorMessage);
      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, closeErrorMessage);
      });
    },
    success: function () {
      main.insertAdjacentElement('afterbegin', successTemlpate);
      successTemlpate.addEventListener('click', closeSuccessMessage);
      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, closeSuccessMessage);
      });
    }
  };

})();
