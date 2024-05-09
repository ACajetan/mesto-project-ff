import { deleteCardAPI, likeCardAPI, dislikeCardAPI } from "./api.js";

export function createCard(card, deleteCard, likeCard, showImageCard, userId) {
  const elementTemplate = document.querySelector("#card-template").content;
  const cardElement = elementTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeBotton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-number");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardElement.id = card._id;

  card.likes.forEach((like) => {
    if (like._id === userId) {
      likeBotton.classList.add("card__like-button_is-active");
    }
  });

  if (card.likes) {
    cardLike.textContent = card.likes.length;
  } else {
    cardLike.textContent = 0;
  }

  if (card.owner._id === userId) {
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
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    likeCardAPI(card._id)
      .then((result) => {
        evt.target.classList.toggle("card__like-button_is-active");
        like.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  } else {
    dislikeCardAPI(card._id)
      .then((result) => {
        evt.target.classList.toggle("card__like-button_is-active");
        like.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  }
}

export function deleteCard(cardElement) {
  deleteCardAPI(cardElement.id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка: ", err);
    });
}
