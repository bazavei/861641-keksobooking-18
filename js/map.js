// управляет карточками объявлений и пинами: добавляет на страницу нужную карточку,
// отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;

  var mapPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(window.pin.renderPin(array[j]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var openCard = function (card) {
    var cardElement = window.card.render(card);
    filtersContainer.prepend(cardElement);
  };

  var setPinCoordinate = function (activePage) {
    var locationMainPin = {
      x: null,
      y: null
    };
    if (activePage) {
      locationMainPin.x = Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2 + PIN_TIP_HEIGHT);
      locationMainPin.y = Math.floor(mainPin.offsetTop + PIN_HEIGHT + PIN_TIP_HEIGHT);

    } else {
      locationMainPin.y = Math.floor(mainPin.offsetTop + PIN_HEIGHT / 2 + PIN_TIP_HEIGHT);
    }
    window.form.setAddress(locationMainPin.x, locationMainPin.y);
  };

  var onMainPinClick = function () {
    renderPins(window.data.cards);
    document.querySelector('.map').classList.remove('map--faded');
    window.form.activate();
    setPinCoordinate(true);
  };

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  });

  window.map = {
    renderPins: renderPins,
    openCard: openCard,
    mainPin: mainPin
  };
})();
