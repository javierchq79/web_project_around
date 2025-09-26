// ./scripts/Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }

  // 🔹 Método genérico de loading para TODOS los popups
  renderLoading(isLoading, loadingText = 'Guardando...', defaultText = 'Guardar') {
    const saveButton = this._popup.querySelector('.popup__save-button');
    if (!saveButton) return; // algunos popups no tienen botón de guardar
    saveButton.textContent = isLoading ? loadingText : defaultText;
    saveButton.disabled = isLoading;
    saveButton.classList.toggle('popup__save-button_disabled', isLoading);
  }
}
