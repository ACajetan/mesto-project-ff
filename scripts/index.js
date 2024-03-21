// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const elementPlase = document.querySelector(".places__list");
const elementTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (card) {
  addCard(card, deleteCard);
});

function addCard(data, deleteCard) {
  const cardElement = elementTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteBotton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__title").textContent = data.name;
  deleteBotton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  elementPlase.append(cardElement);
}

function deleteCard(cardElement) {
  cardElement.remove();
}
