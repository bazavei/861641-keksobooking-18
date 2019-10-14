'use strict';

(function () {
  window.error = {
    show: function () {
      var errorNode = document.querySelector('#error').content.querySelector('.error');
      var main = document.querySelector('main');
      var fragment = document.createDocumentFragment();
      fragment.appendChild(errorNode);
      main.appendChild(fragment);
    }
  };
  // var message = function (mark) {
  //   var main = document.querySelector('main');
  //   var fragment = document.createDocumentFragment();
  //   fragment.appendChild(mark);
  //   main.appendChild(fragment);
  // };
  // var errorNode = document.querySelector('#error').content.querySelector('.error');
  // var successNode = document.querySelector('#success').content.querySelector('.success');

  // window.message = {
  //   error: message(errorNode),
  //   success: message(successNode)
  // };
})();
