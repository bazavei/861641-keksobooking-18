'use strict';
// ПЕРЕМЕННЫЕ
// константы
var COUNT = 8;
var ENTER_KEYCODE = 13;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;

// массивы
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// шаблоны
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = cardTemplate.querySelector('.popup__photo');

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var pinWidth = document.querySelector('.map__pin').clientWidth;
var pins = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = adForm.querySelector('input[name=address]');
var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelest = adForm.querySelector('#capacity');
// var mapPins = document.querySelectorAll('.map__pin');
// var mapPin = document.querySelector('.map__pin');
var popup = document.querySelector('#card');
var closeButton = cardTemplate.querySelector('.popup__close');

var price = adForm.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArr = function (array) {
  var randomLength = getRandom(0, array.length);
  var randomData = [];
  for (var j = 0; j <= randomLength; j++) {
    var index = Math.floor(Math.random() * (array.length - 1));
    var element = array[index];
    if (!randomData.includes(element)) {
      randomData.push(element);
    }
  }
  return randomData;
};

// получение массивов

var getCardsArr = function (count) {
  var maxX = mapWidth - pinWidth;
  var data = [];
  for (var i = 0; i < count; i++) {
    var offerType = types[Math.floor(Math.random() * types.length)];
    var checkTime = time[Math.floor(Math.random() * time.length)];

    data.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },

          offer: {
            title: '',
            address: '600, 350',
            price: 0,
            type: offerType,
            rooms: 0,
            guests: 0,
            checkin: checkTime,
            checkout: checkTime,
            features: getRandomArr(features),
            description: '',
            photo: getRandomArr(photos)
          },
          location: {
            x: getRandom(0, maxX),
            y: getRandom(130, 630)
          }
        }
    );
  }
  return data;
};

var cards = getCardsArr(COUNT);

// функции для отображения

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderPin(array[j]));
  }
  pins.appendChild(fragment);
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ',' + ' выезд до ' + card.offer.checkout;
  var stringFeature = '';
  for (var i = 0; i < card.offer.features.length; i++) {
    stringFeature += '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>';
  }
  cardElement.querySelector('.popup__features').innerHTML = stringFeature;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  var photoElement = cardElement.querySelector('.popup__photos');
  photoElement.innerHTML = '';
  for (var j = 0; j < card.offer.photo.length; j++) {
    var photo = photoTemplate.cloneNode(true);
    photo.src = card.offer.photo[j];
    photoElement.appendChild(photo);
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var openCard = function (card) {
  var cardElement = renderCard(card);
  filtersContainer.prepend(cardElement);
};

var closeCard = function () {
  popup.classList.add('hidden');
};

var getPinCoordinate = function (activePage) {
  var locationMainPin = {
    x: null,
    y: null
  };
  if (activePage) {
    locationMainPin.y = mainPin.offsetTop;
    locationMainPin.x = mainPin.offsetLeft;

  } else {
    locationMainPin.y = mainPin.offsetTop - PIN_HEIGHT;
    locationMainPin.x = mainPin.offsetLeft - PIN_WIDTH / 2;
  }

  addressInput.value = 'x:' + locationMainPin.x + ' ' + 'y:' + locationMainPin.y;
};

// ВАЛИДАЦИЯ

var dependCapacity = function () {
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
  timeIn.options.value = timeOut.options.value;
};

var onTimeOutChange = function () {
  timeOut.options.value = timeIn.options.value;
};

var onPriceChange = function () {
  if (price.value > 1000000) {
    price.setCustomValidity('Цена слишком высока');
  }
};

// обработчики

var onMainPinClick = function () {
  renderPins(cards);
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  getPinCoordinate(true);
};

// var onMapPinClick = function () {
//   if (mapPin.classList.contains('map__pin--main')) {
//     openCard(cards[0]);
//   }
// };

// var onMapPinClick = function () {
//   if (mapPin.classList.contains('map__pin--main')) {
//     renderPins(cards);
//     document.querySelector('.map').classList.remove('map--faded');
//     adForm.classList.remove('ad-form--disabled');
//     getPinCoordinate(true);

//   } else {
//     openCard(cards[0]);
//   }
// };

// for (var i = 0; i < mapPins.length; ++i) {
//   mapPins[i].addEventListener('click', onMapPinClick);
// }

// mapPin.addEventListener('mousedown', onMapPinClick(mapPins));

mainPin.addEventListener('mousedown', onMainPinClick);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onMainPinClick();
  }
});
adForm.addEventListener('change', dependCapacity, true);
price.addEventListener('change', onPriceChange, true);
timeIn.addEventListener('change', onTimeInChange, true);
timeOut.addEventListener('change', onTimeOutChange, true);

closeButton.addEventListener('click', function () {
  closeCard();
});

// вызовы

dependCapacity();
openCard(cards[0]);
