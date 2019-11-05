'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    FILE_TYPES: FILE_TYPES,

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArr: function (array) {
      var randomLength = window.util.getRandom(0, array.length);
      var randomData = [];
      for (var j = 0; j <= randomLength; j++) {
        var index = Math.floor(Math.random() * (array.length - 1));
        var element = array[index];
        if (!randomData.includes(element)) {
          randomData.push(element);
        }
      }
      return randomData;
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
