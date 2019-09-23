'use strict';

var COUNT = 8;

document.querySelector('.map').classList.remove('map--faded');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];

var getCardsArr = function (array) {
  var offerType = types[Math.floor(Math.random() * types.length)];
  var checkTime = time[Math.floor(Math.random() * time.length)];
  for (var i = 0; i < COUNT; i++) {
    array.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (j + 1) + '.png'
          },

          offer: {
            title: 'title',
            address: 'location.x}, location.y',
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
            x: getRandom(0, mapWidth),
            y: getRandom(130, 630)
          }
        }
    );
  }
};

var cards = [];
getCardsArr(cards);
var mapWidth = document.querySelector('.map__pins').offsetWidth;

for (var j = 0; j <= 7; j++) {
  getCardsArr();
}


var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

for (var k = 0; k < cards.length; k++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + cards[k].location.x + 'px; top: ' + cards[k].location.y + 'px;';
  pinElement.querySelector('img').src = cards[k].author.avatar;
  pinElement.querySelector('img').alt = cards[k].offer.type;
  listPins.appendChild(pinElement);
}
