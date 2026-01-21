export function openModal1(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal1(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal1(openedPopup);
    }
  }
}

export function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal1(evt.currentTarget);
  }
}
