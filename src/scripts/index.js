import "../pages/index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard, likeCard } from "./card.js";
import { openPopup, closePopup, showSave } from "./modal.js";
import { enableValidation, enableOptions } from "./validation.js";
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

function appendCard(res) {
  res.forEach((card) => {
    elementPlase.append(createCard(card, deleteCard, likeCard, showImageCard));
  });
}

function editProfile(evt) {
  evt.preventDefault();

  showSave(true, evt);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  editProfileAPI(nameValue, jobValue)
    .then(() => {
      showSave(false, evt), closePopup(formEditElement);
      nameInput.value = "";
      jobInput.value = "";
    })
    .catch((err) => {
      console.log(err);
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
    })
    .finally(() => {
      showSave(false, evt);
      closePopup(editAvatarPopup);
      formNewAvatar.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

editAvatarPopup.addEventListener("submit", editAvatar);

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

  showSave(true, evt);

  const nameCardValue = nameCardInput.value;
  const urlCardValue = urlCardInput.value;

  const newPair = {
    name: nameCardValue,
    link: urlCardValue,
  };

  addNewCardAPI(newPair.name, newPair.link)
    .then((res) => {
      showSave(false, evt);
      closePopup(formNewCard);
      nameCardInput.value = "";
      urlCardInput.value = "";
      return res.json();
    })
    .then((newPair) => {
      const newCardElement = createCard(newPair, deleteCard, likeCard);
      const firstCard = elementPlase.firstChild;
      elementPlase.insertBefore(newCardElement, firstCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

editButton.addEventListener("click", function () {
  openPopup(formEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addImageButton.addEventListener("click", function () {
  openPopup(formNewCard);
  nameCardInput.value = "";
  urlCardInput.value = "";
});

profileImage.addEventListener("click", function () {
  formNewAvatar.value = "";
  openPopup(editAvatarPopup);
});

formNewCard.addEventListener("submit", addCardInList);

//-----------------------
enableValidation(enableOptions);

//-----------------------

function refreshProfile(result) {
  profileName.textContent = result.name;
  profileJob.textContent = result.about;
  profileImage.style.backgroundImage = `url(${result.avatar})`;
  profileName.id = result._id;
}

Promise.all([requestUser(), requestCards()]).then(([user, newCard]) => {
  refreshProfile(user);
  appendCard(newCard);
});
