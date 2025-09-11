// ./scripts/Card.js

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;       // nombre/título de la tarjeta
    this._link = data.link;       // URL de la imagen
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // función que abre el popup
  }

  // Clonar el template de la tarjeta
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.main__card')
      .cloneNode(true);
    return cardElement;
  }

  // Generar la tarjeta completa
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.main__image');
    this._deleteBtn = this._element.querySelector('.main__delete-button');
    this._title = this._element.querySelector('.main__title');
    this._likeBtn = this._element.querySelector('.main__like-button');


    // Asignar datos
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  // Configurar los eventos de la tarjeta
  _setEventListeners() {
    // Abrir popup al hacer clic en la imagen
    this._image.addEventListener('click', () => {
      console.log('Click en imagen:', this._link, this._name); // debug
      this._handleCardClick(this._link, this._name);
    });

    // Eliminar tarjeta
    this._deleteBtn.addEventListener('click', () => {
      this._element.remove();
      this._element = null; // opcional, libera memoria
    });

    // Like
  this._likeBtn.addEventListener('click', () => {
    this._likeBtn.classList.toggle('main__like-button_active');
  });
  }
}
