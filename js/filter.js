'use strict';

(function () {
  var mapFilterContainer = document.querySelector('.map__filters-container');

  var pinsAmount = function (data, count) {
    if (!count || count <= 0) {
      count = 5;
    }
    if (data.length > count) {
      data = data.slice(0, count);
    }
    return data;
  };

  mapFilterContainer.addEventListener('change', function () {
    window.pin.remove();

    window.backend.load(function (xhr) {
      var data = xhr.response;

      // data = pinsAmount(data);

      // window.pin.render(data);
      window.map.renderPins(data);
    });

  }, true);

  window.filter = {
    pinsAmount: pinsAmount
  };
})();
