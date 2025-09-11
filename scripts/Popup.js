// ./scripts/Popup.js

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método privado para manejar cierre con Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Método público para agregar listeners
  setEventListeners() {
    // Cierre al hacer clic en overlay
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });

    // Cierre al hacer clic en botón de cerrar
    const closeButton = this._popup.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
  }
}
