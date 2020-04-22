export class FormValidator {
    constructor(popup) {
        this.popup = popup;
    }
    checkInputValidity(input, errorMessage) {
        if (input.validity.tooShort) {
            return errorMessage.textContent = "Должно быть от 2 до 30 символов";
        }
        if (input.validity.valueMissing) {
            return errorMessage.textContent = "Это обязательное поле";
        }
        errorMessage.textContent = "";
    }
    setSubmitButtonState(form, button) {
        if (!form.checkValidity()) {
            return button.setAttribute('disabled', true)
        }
        return button.removeAttribute('disabled', true)

    }
    setEventListeners() {
        this.form = this.popup.querySelector('.popup__form');
        this.button = this.form.querySelector('.popup__button');
        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error-message'));
            this.setSubmitButtonState(this.form, this.button);
        })
        this.setSubmitButtonState(this.form, this.button);
    }
}
