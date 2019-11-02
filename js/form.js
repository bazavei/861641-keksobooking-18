'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name=address]');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelest = adForm.querySelector('#capacity');

  var filterForm = document.querySelector('.map__filters');

  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var type = adForm.querySelector('#type');

  var onCapacityChange = function () {
    var countRoom = parseInt(roomNumberSelect.value, 10);
    var countQuests = parseInt(capacitySelest.value, 10);

    if (countRoom < countQuests) {
      capacitySelest.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
    } else if (countRoom === 100 && countQuests !== 0) {
      capacitySelest.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
    } else if (countRoom !== 100 && countQuests === 0) {
      capacitySelest.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
    } else {
      capacitySelest.setCustomValidity('');
    }
  };

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var onPriceChange = function () {
    if (price.value > 1000000) {
      price.setCustomValidity('Цена слишком высока');
    }
  };

  var typeMinPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var onTypeChange = function () {
    var minPrice = typeMinPriceMap[type.value];
    price.placeholder = minPrice;
    price.min = minPrice;
  };

  var setDisabled = function (list, value) {
    list.forEach(function (item) {
      item.disabled = value;
    });
    adForm.querySelector('#description').disabled = value;
    adForm.querySelector('.ad-form__element--submit').disabled = value;
  };

  var inputs = adForm.querySelectorAll('input');
  var selects = adForm.querySelectorAll('select');
  var filterInputs = filterForm.querySelectorAll('input');
  var filterSelects = filterForm.querySelectorAll('select');

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    setDisabled(inputs, false);
    setDisabled(selects, false);
  };

  var filterFormActivate = function () {
    setDisabled(filterInputs, false);
    setDisabled(filterSelects, false);
  };

  var deactivate = function () {
    adForm.classList.add('ad-form--disabled');
    setDisabled(inputs, true);
    setDisabled(selects, true);
    setDisabled(filterInputs, true);
    setDisabled(filterSelects, true);
  };

  var setAddress = function (coordX, coordY) {
    addressInput.value = coordX + ', ' + coordY;
    addressInput.placeholder = coordX + ', ' + coordY;
  };

  var onSave = function () {
    adForm.reset();
    filterForm.reset();
    window.map.defaultPageStatus(false);
    window.message.setSuccess();
    window.pin.remove();
    window.card.remove();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSave, window.message.setError);
    evt.preventDefault();
  });

  adForm.addEventListener('change', onCapacityChange, true);
  type.addEventListener('change', onTypeChange);

  price.addEventListener('change', onPriceChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  adForm.addEventListener('reset', function () {
    window.map.defaultPageStatus(false);
  });

  onCapacityChange();
  onTypeChange();

  window.form = {
    activate: activate,
    setAddress: setAddress,
    deactivate: deactivate,
    filterActivate: filterFormActivate
  };
})();
