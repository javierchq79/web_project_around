// ./scripts/Card.js
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.main__card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.main__image');
    this._deleteBtn = this._element.querySelector('.main__delete-button');
    this._title = this._element.querySelector('.main__title');
    this._likeBtn = this._element.querySelector('.main__like-button');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    if (this._isLiked) {
      this._likeBtn.classList.add('main__like-button_active');
    }

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._deleteBtn.addEventListener('click', () => this._handleDeleteClick(this));
    this._likeBtn.addEventListener('click', () => this._handleLikeClick(this));
  }

  updateLikes(updatedCard) {
    this._isLiked = updatedCard.isLiked;
    if (this._isLiked) this._likeBtn.classList.add('main__like-button_active');
    else this._likeBtn.classList.remove('main__like-button_active');
  }

  isLiked() {
    return this._isLiked;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
