// управляет карточками объявлений и пинами: добавляет на страницу нужную карточку,
// отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;
  var MIN_VALUE = 130;
  var MAX_VALUE = 630;

  var mapPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapWidth = document.querySelector('.map__pins').offsetWidth;

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

      // if (mainPin.offsetTop - shift.y <= MIN_VALUE) {
      //   mainPin.style.top = MIN_VALUE + 'px';
      // } else if (mainPin.offsetTop - shift.y + PIN_HEIGHT >= MAX_VALUE) {
      //   mainPin.style.top = MAX_VALUE - PIN_HEIGHT;
      // } else {
      //   mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      // }
      var valueY = mainPin.offsetTop - shift.y;
      // mainPin.style.top = Math.max(MIN_VALUE, valueY) + 'px';
      // mainPin.style.top = Math.min((MAX_VALUE - PIN_HEIGHT), valueY) + 'px';
      mainPin.style.top = Math.min(Math.max((MIN_VALUE, valueY), MIN_VALUE), MAX_VALUE - PIN_HEIGHT - PIN_TIP_HEIGHT) + 'px';


      // var value = Math.max(MIN_VALUE, value);
      // value = Math.min(MAX_VALUE, value);
      // mainPin.style.top = value + 'px';

      if (mainPin.offsetLeft - shift.x <= 0) {
        mainPin.style.left = 0 + 'px';
      } else if (mainPin.offsetLeft - shift.x + PIN_WIDTH >= mapWidth) {
        mainPin.style.left = mapWidth - PIN_WIDTH + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
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
    renderPins: renderPins,
    openCard: openCard,
    mainPin: mainPin
  };
})();
