import { deleteCardAPI, likeCardAPI, dislikeCardAPI } from "./api.js";

export function createCard(card, deleteCard, likeCard, showImageCard) {
  const elementTemplate = document.querySelector("#card-template").content;
  const cardElement = elementTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeBotton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-number");
  const profileName = document.querySelector(".profile__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardElement.id = card._id;

  card.likes.forEach((like) => {
    if (like._id === profileName.id) {
      likeBotton.classList.add("card__like-button_is-active");
    }
  });

  if (card.likes) {
    cardLike.textContent = card.likes.length;
  } else {
    cardLike.textContent = 0;
  }

  if (card.owner._id === profileName.id) {
    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  }

  cardImage.addEventListener("click", function () {
    showImageCard(card);
  });

  likeBotton.addEventListener("click", function (evt) {
    likeCard(evt, card, cardLike);
  });

  return cardElement;
}

export function likeCard(evt, card, like) {
  evt.target.classList.toggle("card__like-button_is-active");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    likeCardAPI(card._id)
      .then((res) => res.json())
      .then((result) => {
        like.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    dislikeCardAPI(card._id)
      .then((res) => res.json())
      .then((result) => {
        like.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(cardElement) {
  cardElement.remove();
  deleteCardAPI(cardElement.id);
}
