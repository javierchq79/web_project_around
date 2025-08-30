export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._button = formElement.querySelector(config.submitButtonSelector);
  }

  _showInputError(input, errorElement) {
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _validateInput(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._button.disabled = false;
      this._button.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._button.disabled = true;
      this._button.classList.add(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState(); // inicial
  }

  enableValidation() {
    this._setEventListeners();
  }

  // extra: resetear validación cuando se abre un popup
  resetValidation() {
    this._inputs.forEach(input => {
      const errorElement = this._formElement.querySelector(`#${input.name}-error`);
      this._hideInputError(input, errorElement);
    });
    this._toggleButtonState();
  }
}
