'use strict';

var COUNT = 8;

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinWidth = document.querySelector('.map__pin').clientWidth;
var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var filtersContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = cardTemplate.querySelector('.popup__photo');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArr = function (array) {
  var randomLength = getRandom(0, array.length);
  var randomData = [];
  for (var j = 0; j < randomLength; j++) {
    var index = Math.floor(Math.random() * (array.length - 1));
    var element = array[index];
    if (!randomData.includes(element)) {
      randomData.push(element);
    }
  }
  return randomData;
};

var maxX = mapWidth - pinWidth;

var getCardsArr = function (count) {
  var data = [];
  for (var i = 0; i <= count; i++) {
    var offerType = types[Math.floor(Math.random() * types.length)];
    var checkTime = time[Math.floor(Math.random() * time.length)];

    data.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },

          offer: {
            title: '',
            address: 'location.x, location.y',
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

document.querySelector('.map').classList.remove('map--faded');
renderPins(cards);
openCard(cards[0]);
