'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 15;
  var START_COORD_X = 570;
  var START_COORD_Y = 375;
  var MIN_Y = 130;
  var MAX_VALUE = 630;
  var MAX_X = Math.floor(document.querySelector('.map__pins').offsetWidth - (PIN_WIDTH / 2));

  var mapPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');
  var data = [];

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(window.pin.render(item));
    });
    mapPinsElement.appendChild(fragment);
  };

  var mapFilterContainer = document.querySelector('.map__filters');
  var housingType = mapFilterContainer.querySelector('#housing-type');
  var housingPrice = mapFilterContainer.querySelector('#housing-price');
  var housingRooms = mapFilterContainer.querySelector('#housing-rooms');
  var housingGuests = mapFilterContainer.querySelector('#housing-guests');

  var filterByType = function (item) {
    return (housingType.value === 'any' ? true : housingType.value === item.offer.type);
  };

  var filterByPrice = function (item) {
    switch (housingPrice.value) {
      case 'low':
        return item.offer.price <= 10000;
      case 'middle':
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      case 'high':
        return item.offer.price >= 50000;
    }
    return (housingPrice.value === 'any' ? true : housingPrice.value === item.offer.price);
  };

  var filterByRooms = function (item) {
    return (housingRooms.value === 'any' ? true : item.offer.rooms === parseInt(housingRooms.value, 10));
  };

  var filterByGuests = function (item) {
    return (housingGuests.value === 'any' ? true : item.offer.guests === parseInt(housingGuests.value, 10));
  };

  var getFilterByFeatures = function () {
    var checkedList = Array.from(filtersContainer.querySelectorAll('.map__checkbox:checked'));

    return function (item) {
      return checkedList.every(function (feature) {
        return item.offer.features.includes(feature.value);
      });
    };
  };

  var filterData = function (pins) {
    var filtered = pins.filter(filterByType)
                        .filter(filterByPrice)
                        .filter(filterByRooms)
                        .filter(filterByGuests)
                        .filter(getFilterByFeatures())
                        .slice(0, 5);
    return filtered;
  };

  var onFilterFormChangeDebounce = window.util.debounce(function () {
    window.pin.remove();
    window.card.remove();
    renderPins(filterData(data));
  });

  mapFilterContainer.addEventListener('change', onFilterFormChangeDebounce);

  var onLoad = function (res) {
    data = res;
    renderPins(filterData(data));
    window.form.filterActivate();
  };

  var openCard = function (card) {
    window.card.remove();
    var cardElement = window.card.render(card);
    filtersContainer.prepend(cardElement);
  };

  var setPinCoordinate = function (activePage) {
    var locationMainPin = {
      x: null,
      y: null
    };
    if (activePage) {
      locationMainPin.x = Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2);
      locationMainPin.y = Math.floor(mainPin.offsetTop + PIN_HEIGHT + PIN_TIP_HEIGHT);

    } else {
      locationMainPin.x = Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2);
      locationMainPin.y = Math.floor(mainPin.offsetTop + PIN_HEIGHT / 2);
    }
    window.form.setAddress(locationMainPin.x, locationMainPin.y);
  };

  var setPinCoordinateDefault = function () {
    mainPin.style.top = START_COORD_Y + 'px';
    mainPin.style.left = START_COORD_X + 'px';
  };

  var isActivePage = false;

  var onMainPinClick = function (evt) {
    evt.preventDefault();
    if (!isActivePage) {
      defaultPageStatus(true);
      isActivePage = true;
    }
  };

  var defaultPageStatus = function (status) {
    if (status) {
      document.querySelector('.map').classList.remove('map--faded');
      window.form.activate();
      setPinCoordinate(true);
      window.backend.load(onLoad, window.message.setError);
    } else {
      document.querySelector('.map').classList.add('map--faded');
      window.form.deactivate();
      window.pin.remove();
      window.card.remove();
      setPinCoordinate(false);
      setPinCoordinateDefault();
    }
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

      valueY = Math.min(valueY, MAX_VALUE);
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

  defaultPageStatus();
  window.map = {
    renderPins: renderPins,
    openCard: openCard,
    defaultPageStatus: defaultPageStatus
  };
})();
