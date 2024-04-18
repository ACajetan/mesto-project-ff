// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard, likeCard, addCardInList } from "./card.js";
import { openPopup, closePopupPopup } from "./modal.js";

const elementPlase = document.querySelector(".places__list");
const content = document.querySelector(".page");
const formElement = content.querySelector(".popup_type_edit");
const editPopup = content.querySelector(".popup_type_edit");
const newCard = content.querySelector(".popup_type_new-card");
const imagePopup = content.querySelector(".popup_type_image");
const contentImage = imagePopup.querySelector(".popup__image");
const captionImage = imagePopup.querySelector(".popup__caption");

initialCards.forEach(appendCard);

function appendCard(card) {
  elementPlase.append(createCard(card, deleteCard, likeCard, showImageCard));
}

function handleFormSubmit(evt) {
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const newName = document.querySelector(".profile__title");
  const newJob = document.querySelector(".profile__description");

  newName.textContent = nameValue;
  newJob.textContent = jobValue;

  closePopupPopup(editPopup);

  nameInput.value = "";
  jobInput.value = "";
}

export function showImageCard(card) {
  contentImage.src = card.link;
  contentImage.alt = card.name;
  captionImage.textContent = card.name;
}

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    openPopup(editPopup);
  }
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(newCard);
  }
  if (evt.target.classList.contains("card__image")) {
    openPopup(imagePopup);
  }
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopupPopup(openedPopup);
  }
});

formElement.addEventListener("submit", handleFormSubmit);
newCard.addEventListener("submit", addCardInList);

export { elementPlase, newCard, content };
