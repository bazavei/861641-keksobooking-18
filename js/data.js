'use strict';

(function () {
  var COUNT = 8;

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var time = ['12:00', '13:00', '14:00'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var pinWidth = document.querySelector('.map__pin').clientWidth;

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
              features: window.util.getRandomArr(features),
              description: '',
              photo: window.util.getRandomArr(photos)
            },
            location: {
              x: window.util.getRandom(0, maxX),
              y: window.util.getRandom(130, 630)
            }
          }
      );
    }
    return data;
  };

  var cards = getCardsArr(COUNT);

  window.data = {
    getCardsArr: getCardsArr,
    cards: cards
  };
})();
