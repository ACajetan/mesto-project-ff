

export function openPopup(evt) {
  evt.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("click", closePopupOverlay);
}
//Закрытие попап
export function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("click", closePopupOverlay);
}



export function closePopupEsc(evt) {
  if (evt.key === "Escape" || evt.keycode === 27) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function closePopupOverlay(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
