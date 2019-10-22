'use strict';

(function () {
  var mapFilterContainer = document.querySelector('.map__filters');
  var housingType = mapFilterContainer.querySelector('#housing-type');
  var housingPrice = mapFilterContainer.querySelector('#housing-price');
  var housingRooms = mapFilterContainer.querySelector('#housing-rooms');
  var housingGuests = mapFilterContainer.querySelector('#housing-guests');
  var housingFeatures = mapFilterContainer.querySelector('#housing-features');

  var pinsAmount = function (data, count) {
    if (!count || count <= 0) {
      count = 5;
    }
    if (data.length > count) {
      data = data.slice(0, count);
    }
    return data;
  };

  var filterType = function (pins) {
    if (housingType.value === 'any') {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.type === housingType.value;
    });
  };

  var filterPrice = function (pins) {
    if (housingPrice.value === 'any') {
      return pins;
    }

    if (housingPrice.value === 'low') {
      return pins.filter(function (pin) {
        return pin.offer.price <= 10000;
      });
    }

    if (housingPrice.value === 'middle') {
      return pins.filter(function (pin) {
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      });
    }

    if (housingPrice.value === 'high') {
      return pins.filter(function (pin) {
        return pin.offer.price >= 50000;
      });
    }

    return pins;
  };

  var sortData = function (data) {
    var filteredData = filterType(data);
    filteredData = filterPrice(data);

    return filteredData;
  };

  window.onFilterFormChange = function (data) {
    mapFilterContainer.addEventListener('change', function () {
      window.pin.remove();
      window.map.renderPins(sortData(data));
    });
  };

  window.filter = {
    pinsAmount: pinsAmount
  };
})();
