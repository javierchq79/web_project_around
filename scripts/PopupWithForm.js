// ./scripts/PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._saveButton = this._form.querySelector('.popup__save-button');
    this._defaultButtonText = this._saveButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = 'Guardando...', defaultText = this._defaultButtonText) {
    if (!this._saveButton) return;
    this._saveButton.textContent = isLoading ? loadingText : defaultText;
    this._saveButton.disabled = isLoading;
    if (isLoading) this._saveButton.classList.add('popup__save-button_disabled');
    else this._saveButton.classList.remove('popup__save-button_disabled');
  }
}
