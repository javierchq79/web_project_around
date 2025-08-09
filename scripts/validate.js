// validate.js

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    function showInputError(input, errorElement) {
      input.classList.add(config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(config.errorClass);
    }

    function hideInputError(input, errorElement) {
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(config.errorClass);
    }

    function validateInput(input) {
      const errorElement = form.querySelector(`#${input.name}-error`);
      if (!input.validity.valid) {
        showInputError(input, errorElement);
      } else {
        hideInputError(input, errorElement);
      }
    }

    function toggleButtonState() {
      if (form.checkValidity()) {
        button.disabled = false;
        button.classList.remove(config.inactiveButtonClass);
      } else {
        button.disabled = true;
        button.classList.add(config.inactiveButtonClass);
      }
    }

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
        toggleButtonState();
      });
    });

    // Inicializar estado
    toggleButtonState();
  });
}
