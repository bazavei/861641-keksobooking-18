// управляет карточками объявлений и пинами: добавляет на страницу нужную карточку,
// отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;
  var MIN_Y = 130;
  var MAX_VALUE = 630;
  var MAX_Y = MAX_VALUE - PIN_HEIGHT - PIN_TIP_HEIGHT;
  var MAX_X = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;

  var mapPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');

  // var renderPins = function (array) {
  //   var fragment = document.createDocumentFragment();
  //   for (var j = 0; j < array.length; j++) {
  //     fragment.appendChild(window.pin.renderPin(array[j]));
  //   }
  //   mapPinsElement.appendChild(fragment);
  // };

  var onLoad = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(window.pin.renderPin(cards[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var onError = function () {
    var errorNode = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorNode);
    main.appendChild(fragment);
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
    // renderPins(window.data.cards);
    window.backend.load(onLoad, onError);
    document.querySelector('.map').classList.remove('map--faded');
    window.form.activate();
    setPinCoordinate(true);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var valueY = mainPin.offsetTop - shift.y;

      valueY = Math.min(valueY, MAX_Y);
      valueY = Math.max(valueY, MIN_Y);
      mainPin.style.top = valueY + 'px';

      var valueX = mainPin.offsetLeft - shift.x;
      valueX = Math.min(valueX, MAX_X);
      valueX = Math.max(valueX, 0);
      mainPin.style.left = valueX + 'px';

      window.form.setAddress(valueX, valueY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  });

  window.map = {
    // renderPins: renderPins,
    openCard: openCard,
    mainPin: mainPin
  };
})();
