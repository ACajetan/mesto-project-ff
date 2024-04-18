export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(card, deleteCard, likeCard, showImageCard) {
  const elementTemplate = document.querySelector("#card-template").content;
  const cardElement = elementTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteBottun = cardElement.querySelector(".card__delete-button");
  const likeBotton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteBottun.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", function () {
    showImageCard(card);
  });

  likeBotton.addEventListener("click", function (evt) {
    likeCard(evt);
  });

  return cardElement;
}

// .card__like-button_is-active
export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
