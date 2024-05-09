import "../pages/index.css";
import { deleteCard, createCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  editProfileAPI,
  addNewCardAPI,
  editAvatrAPI,
  requestCards,
  requestUser,
} from "./api.js";

const elementPlase = document.querySelector(".places__list");
const content = document.querySelector(".page");
const formEditElement = content.querySelector(".popup_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const editAvatarPopup = content.querySelector(".popup_type_edit-avatar");
const formNewCard = content.querySelector(".popup_type_new-card");
const imagePopup = content.querySelector(".popup_type_image");
const formNewAvatar = content.querySelector(".popup_type_avatar");
const contentImage = imagePopup.querySelector(".popup__image");
const captionImage = imagePopup.querySelector(".popup__caption");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const urlCardInput = document.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add-button");

const enableOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

function appendCard(res, userId) {
  res.forEach((card) => {
    elementPlase.append(
      createCard(card, deleteCard, likeCard, showImageCard, userId)
    );
  });
}

function editProfile(evt) {
  evt.preventDefault();
  showSave(true, evt);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  editProfileAPI(nameValue, jobValue)
    .then(() => {
      profileName.textContent = nameValue;
      profileJob.textContent = jobValue;
      nameInput.value = "";
      jobInput.value = "";
      closePopup(formEditElement);
    })
    .catch((err) => {
      console.log("Ошибка: ", err);
    })
    .finally(() => {
      showSave(false, evt);
    });
}
formEditElement.addEventListener("submit", editProfile);

function editAvatar(evt) {
  showSave(true, evt);
  evt.preventDefault();
  const avatarValue = formNewAvatar.value;
  editAvatrAPI(avatarValue)
    .then(() => {
      profileImage.style["background-image"] = `url(${avatarValue})`;
      closePopup(editAvatarPopup);
      formNewAvatar.value = "";
    })
    .catch((err) => {
      console.log("Ошибка: ", err);
    })
    .finally(() => {
      showSave(false, evt);
    });
}

editAvatarPopup.addEventListener("submit", editAvatar);

function showImageCard(card) {
  contentImage.src = card.link;
  contentImage.alt = card.name;
  captionImage.textContent = card.name;
  openPopup(imagePopup);
}

function addCardInList(evt) {
  evt.preventDefault();

  showSave(true, evt);

  const nameCardValue = nameCardInput.value;
  const urlCardValue = urlCardInput.value;

  const newPair = {
    name: nameCardValue,
    link: urlCardValue,
  };

  addNewCardAPI(newPair.name, newPair.link)
    .then((res) => {
      closePopup(formNewCard);
      nameCardInput.value = "";
      urlCardInput.value = "";
      return res;
    })
    .then((newPair) => {
      const newCardElement = createCard(
        newPair,
        deleteCard,
        likeCard,
        showImageCard,
        newPair.owner._id
      );
      const firstCard = elementPlase.firstChild;
      elementPlase.insertBefore(newCardElement, firstCard);
    })
    .catch((err) => {
      console.log("Ошибка: ", err);
    })
    .finally(() => {
      showSave(false, evt);
    });
}

editButton.addEventListener("click", function () {
  clearValidation(formEditElement, enableOptions);
  openPopup(formEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addImageButton.addEventListener("click", function () {
  clearValidation(formNewCard, enableOptions);
  openPopup(formNewCard);
  nameCardInput.value = "";
  urlCardInput.value = "";
});

profileImage.addEventListener("click", function () {
  clearValidation(editAvatarPopup, enableOptions);
  openPopup(editAvatarPopup);
  formNewAvatar.value = "";
});

formNewCard.addEventListener("submit", addCardInList);

//-----------------------
enableValidation(enableOptions);

//-----------------------

function refreshProfile(res) {
  profileName.textContent = res.name;
  profileJob.textContent = res.about;
  profileImage.style.backgroundImage = `url(${res.avatar})`;
  profileName.id = res._id;
  console.log(res._id);
}

function showSave(save, evt) {
  if (save) {
    evt.submitter.textContent = "Сохранение...";
  } else {
    evt.submitter.textContent = "Сохранить";
  }
}

Promise.all([requestUser(), requestCards()])
  .then(([user, newCard]) => {
    refreshProfile(user)
    appendCard(newCard, user._id)
  })
  .catch((err) => {
    console.log("Ошибка: ", err);
  });
