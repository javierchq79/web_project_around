// ./scripts/PopupWithForm.js

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // callback para el submit
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('input'));
  }

  // Método privado: obtiene los valores de todos los inputs
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Sobrescribimos setEventListeners para incluir submit del formulario
  setEventListeners() {
    super.setEventListeners(); // escucha clics en overlay y botón cerrar

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Sobrescribimos close para reiniciar el formulario al cerrar
  close() {
    super.close();
    this._form.reset();
  }
}
