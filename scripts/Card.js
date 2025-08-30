export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.main__card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('main__like-button_active');
    });

    this._deleteButton.addEventListener('click', () => {
      this._element.classList.add('card_fly-away');
      this._element.addEventListener('animationend', () => {
        this._element.remove();
      }, { once: true });
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.main__image');
    this._likeButton = this._element.querySelector('.main__like-button');
    this._deleteButton = this._element.querySelector('.main__delete-button');

    this._element.querySelector('.main__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
