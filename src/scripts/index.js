import "../pages/index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

const elementPlase = document.querySelector(".places__list");
const content = document.querySelector(".page");
const formEditElement = content.querySelector(".popup_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const editPopup = content.querySelector(".popup_type_edit");
const formNewCard = content.querySelector(".popup_type_new-card");
const imagePopup = content.querySelector(".popup_type_image");
const contentImage = imagePopup.querySelector(".popup__image");
const captionImage = imagePopup.querySelector(".popup__caption");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlCardInput = document.querySelector(".popup__input_type_url");
const newName = document.querySelector(".profile__title");
const newJob = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add-button");

initialCards.forEach(appendCard);

function appendCard(card) {
  elementPlase.append(createCard(card, deleteCard, likeCard, showImageCard));
}

function editProfile(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  newName.textContent = nameValue;
  newJob.textContent = jobValue;

  closePopup(editPopup);

  nameInput.value = "";
  jobInput.value = "";
}

function showImageCard(card) {
  contentImage.src = card.link;
  contentImage.alt = card.name;
  captionImage.textContent = card.name;
  content.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__image")) {
      openPopup(imagePopup);
    }
  });
}

function addCardInList(evt) {
  evt.preventDefault();

  const nameCardValue = nameCardInput.value;
  const urlCardValue = urlCardInput.value;

  const newPair = {
    name: nameCardValue,
    link: urlCardValue,
  };

  const newCardElement = createCard(
    newPair,
    deleteCard,
    likeCard,
    showImageCard
  );

  const firstCard = elementPlase.firstChild;

  elementPlase.insertBefore(newCardElement, firstCard);

  closePopup(formNewCard);

  //Немного не понял как тут использовать reset. Везде выдает ошибку. Делал так:
  // nameCardInput.reset();
  // urlCardInput.reset();

  nameCardInput.value = "";
  urlCardInput.value = "";
}

editButton.addEventListener("click", function () {
  openPopup(editPopup);
});
addImageButton.addEventListener("click", function () {
  openPopup(formNewCard);
});
formEditElement.addEventListener("submit", editProfile);
formNewCard.addEventListener("submit", addCardInList);
