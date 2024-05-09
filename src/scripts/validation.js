export const enableOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

function showError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = errorMessage;
}

function hideError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, options) {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (inputElement.type === "text") {
    if (!inputElement.validity.valid || !nameRegex.test(inputElement.value)) {
      if (
        inputElement.validity.patternMismatch ||
        !nameRegex.test(inputElement.value)
      ) {
        showError(
          formElement,
          inputElement,
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
          options
        );
      } else {
        showError(
          formElement,
          inputElement,
          inputElement.validationMessage,
          options
        );
      }
    } else {
      hideError(formElement, inputElement, options);
    }
  } else if (inputElement.type === "url") {
    if (!inputElement.validity.valid) {
      showError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        options
      );
    } else {
      hideError(formElement, inputElement, options);
    }
  }
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

export function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}

export function clearValidation(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, options);
    toggleButtonState(inputList, buttonElement, options);
  });
}
