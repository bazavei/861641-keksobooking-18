'use strict';

(function () {
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var housingType = mapFilterContainer.querySelector('#housing-type');

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

  var sortData = function (data) {
    var filteredData = filterType(data);

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
