export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._button = formElement.querySelector(config.submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(
      `.popup__error_type_${input.name}`
    );
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `.popup__error_type_${input.name}`
    );
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    const isValid = this._inputs.every((input) => input.validity.valid);

    this._button.disabled = !isValid;
    this._button.classList.toggle(this._config.inactiveButtonClass, !isValid);
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
  }
}
