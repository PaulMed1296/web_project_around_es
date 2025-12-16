let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileInfo = document.querySelector(".profile__info");
const editModal = document.querySelector("#edit-popup");
const cardTemplate = document.querySelector("#card__template");
let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
const cardContainer = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-popup");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const openNewCardModalButton = document.querySelector(".profile__add-button");
const openModal = profileInfo.querySelector(".profile__edit-button");
const closeModal = editModal.querySelector(".popup__close");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
let formElement = editModal.querySelector("#edit-profile-form");
const closeNewCardModalButton = newCardModal.querySelector(".popup__close");
const inputCardName = newCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = newCardForm.querySelector(".popup__input_type_url");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const saveButton = formElement.querySelector(".popup__button");
const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
const newCardButton = newCardForm.querySelector(".popup__button");
const newCardInputs = Array.from(newCardForm.querySelectorAll(".popup__input"));
const popups = Array.from(document.querySelectorAll(".popup"));

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function openModal1(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal1(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let newName = inputName.value;
  let newDescription = inputDescription.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal1(editModal);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardContainer.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  renderCard({ name, link });

  closeModal1(newCardModal);

  newCardForm.reset();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function getCardElement({ name, link }) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  function handleLikeClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  likeButton.addEventListener("click", handleLikeClick);

  function handleDeleteClick() {
    cardElement.remove();
  }
  deleteButton.addEventListener("click", handleDeleteClick);

  function openImagePopup() {
    imageModalImage.src = link;
    imageModalImage.alt = name;
    imageModalCaption.textContent = name;

    openModal1(imageModal);
  }

  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

function showInputError(form, input) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  errorElement.textContent = "";
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every((input) => input.validity.valid);

  if (isFormValid) {
    button.disabled = false;
    button.classList.remove("popup__button_disabled");
  } else {
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal1(evt.currentTarget);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal1(openedPopup);
    }
  }
}

function resetValidation(form, inputs, button) {
  inputs.forEach((input) => {
    hideInputError(form, input);
  });

  button.disabled = true;
  button.classList.add("popup__button_disabled");
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

openModal.addEventListener("click", () => {
  fillProfileForm();
  resetValidation(formElement, inputList, saveButton);
  openModal1(editModal);
});

closeModal.addEventListener("click", () => {
  closeModal1(editModal);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

openNewCardModalButton.addEventListener("click", () => {
  newCardForm.reset();
  resetValidation(newCardForm, newCardInputs, newCardButton);
  openModal1(newCardModal);
});

closeNewCardModalButton.addEventListener("click", () => {
  closeModal1(newCardModal);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", () => {
  closeModal1(imageModal);
});

inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(formElement, input);
    toggleButtonState(inputList, saveButton);
  });
});

newCardInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(newCardInputs, newCardButton);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});
