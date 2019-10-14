// работает с формой объявления

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name=address]');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelest = adForm.querySelector('#capacity');

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

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    var inputs = adForm.querySelectorAll('input');
    var selects = adForm.querySelectorAll('select');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled', 'disabled');
    }
    for (i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled', 'disabled');
    }
    adForm.querySelector('#description').removeAttribute('disabled', 'disabled');

  };

  var deactivate = function () {
    adForm.classList.add('ad-form--disabled');
    var inputs = adForm.querySelectorAll('input');
    var selects = adForm.querySelectorAll('select');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < selects.length; i++) {
      selects[i].setAttribute('disabled', 'disabled');
    }
    adForm.querySelector('#description').setAttribute('disabled', 'disabled');
  };

  var setAddress = function (coordX, coordY) {
    addressInput.value = coordX + ', ' + coordY;
  };

  var onSave = function () {
    adForm.reset();
    // deactivate();
    window.map.defaultPageStatus(false);
    window.message.success();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSave, window.error.show);
    evt.preventDefault();
  });

  adForm.addEventListener('change', onCapacityChange, true);
  type.addEventListener('change', onTypeChange);

  price.addEventListener('change', onPriceChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  onCapacityChange();
  onTypeChange();

  window.form = {
    activate: activate,
    setAddress: setAddress,
    deactivate: deactivate
  };
})();
