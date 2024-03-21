// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const elementPlase = document.querySelector(".places__list");
const elementTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (card) {
  elementPlase.append(createCard(card.name, card.link));
});

function createCard(name, link) {
  const cardElement = elementTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteBotton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  deleteBotton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}
