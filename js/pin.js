// отвечает за создание пина
'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    pinElement.addEventListener('click', function () {
      window.map.openCard(pin);
    });

    return pinElement;
  };

  var removePin = function () {
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.parentNode.removeChild(item);
      }
    });
  };

  window.pin = {
    render: renderPin,
    remove: removePin
  };
})();
