export default class PopupWithImage {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
    this._closeBtn = this._popup.querySelector('.popup__close-button');
  }

  open(link, name) {
    this._image.src = link;      // URL de la imagen
    this._image.alt = name;      // Texto alternativo
    this._caption.textContent = name; // caption
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) this.close();
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') this.close();
    });
  }
}
