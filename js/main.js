'use strict';

var COUNT = 8;

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var pinWidth = document.querySelector('.map__pin').clientWidth;
var pinHeight = document.querySelector('.map__pin').clientHeight;
var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var maxX = getRandom(0, mapWidth) - pinWidth / 2;
var maxY = getRandom(130, 630) - pinHeight;

var getCardsArr = function (count) {
  var data = [];
  var offerType = types[Math.floor(Math.random() * types.length)];
  var checkTime = time[Math.floor(Math.random() * time.length)];
  for (var i = 0; i < count; i++) {
    data.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },

          offer: {
            title: 'title',
            address: 'location.x, location.y',
            price: Number,
            type: offerType,
            rooms: Number,
            guests: Number,
            checkin: checkTime,
            checkout: checkTime,
            features: 'featuresArr',
            description: String,
            photo: 'photoArr'
          },
          location: {
            x: getRandom(0, maxX),
            y: getRandom(130, maxY)
          }
        }
    );
  }
  return data;
};

var cards = getCardsArr(COUNT);

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
  listPins.appendChild(fragment);
};

document.querySelector('.map').classList.remove('map--faded');
renderPins(cards);
