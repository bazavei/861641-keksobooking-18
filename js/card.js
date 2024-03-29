'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var housingTypeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = housingTypeMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ',' + ' выезд до ' + card.offer.checkout;
    var stringFeature = '';
    card.offer.features.forEach(function (item) {
      stringFeature += '<li class="popup__feature popup__feature--' + item + '"></li>';
    });
    cardElement.querySelector('.popup__features').innerHTML = stringFeature;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var photoElement = cardElement.querySelector('.popup__photos');
    photoElement.innerHTML = '';
    card.offer.photos.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = item;
      photoElement.appendChild(photo);
    });

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.remove();
    });

    var removeCardElement = function () {
      cardElement.remove();

      document.removeEventListener('keydown', removeCardElement);
    };

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeCardElement);
    });

    return cardElement;
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
