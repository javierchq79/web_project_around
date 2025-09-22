// ./scripts/PopupWithConfirmation.js
export default class PopupWithConfirmation {
  constructor(popupSelector) {
    // Guardar selector, pero no lanzar error si no existe en el DOM
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      console.error(`No se encontró el popup para el selector: ${popupSelector}`);
      return;
    }
    this._confirmButton = this._popup.querySelector('.popup__confirm-button');
  }

  setEventListeners() {
    if (!this._popup || !this._confirmButton) return;

    this._confirmButton.addEventListener('click', () => {
      if (this._handleConfirm) this._handleConfirm();
    });

    this._popup.querySelector('.popup__close-button')?.addEventListener('click', () => {
      this.close();
    });
  }

  open(handleConfirm) {
    if (!this._popup) return;
    this._handleConfirm = handleConfirm;
    this._popup.classList.add('popup_opened');
  }

  close() {
    if (!this._popup) return;
    this._popup.classList.remove('popup_opened');
  }

  renderLoading(isLoading, loadingText = 'Eliminando...', defaultText = 'Sí, eliminar') {
    if (!this._confirmButton) return;
    this._confirmButton.textContent = isLoading ? loadingText : defaultText;
  }
}
