// ./scripts/PopupWithConfirmation.js
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      if (this._handleConfirm) this._handleConfirm();
    });
  }
}
