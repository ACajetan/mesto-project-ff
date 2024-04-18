import { content } from "./index.js";

export function openPopup(evt) {
  evt.classList.add("popup_is-opened");
  content.addEventListener("keydown", closePopupEsc);
}
//Закрытие попап
export function closePopupPopup(evt) {
  evt.classList.remove("popup_is-opened");
  content.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape" || evt.keycode === 27) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopupPopup(openedPopup);
  }
}