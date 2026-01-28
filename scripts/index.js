import Section from "./Section.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const profileInfo = document.querySelector(".profile__info");
const editModal = document.querySelector("#edit-popup");
const imageModal = document.querySelector("#image-popup");
const newCardModal = document.querySelector("#new-card-popup");

const openModal = profileInfo.querySelector(".profile__edit-button");
const openNewCardModalButton = document.querySelector(".profile__add-button");

const formElement = editModal.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description",
);

const saveButton = formElement.querySelector(".popup__button");
const newCardButton = newCardForm.querySelector(".popup__button");

const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
const newCardInputs = Array.from(newCardForm.querySelectorAll(".popup__input"));

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  token: "17f38003-d2f2-4abe-89f4-fd336a117a58",
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      description: data.about,
    });
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const editProfileValidator = new FormValidator(validationConfig, formElement);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

const inputCardName = newCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = newCardForm.querySelector(".popup__input_type_url");

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  api
    .setUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        description: data.about,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  api
    .addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    })
    .then((cardData) => {
      createCard({
        name: cardData.name,
        link: cardData.link,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function createCard(item) {
  const card = new Card(item, "#card__template", (name, link) => {
    imagePopup.open(name, link);
  });

  const cardElement = card.getView();
  cardSection.addItem(cardElement);
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

function resetValidation(form, inputs, button) {
  inputs.forEach((input) => {
    hideInputError(form, input);
  });

  button.disabled = true;
  button.classList.add("popup__button_disabled");
}

const cardSection = new Section(
  {
    renderer: createCard,
  },
  ".cards__list",
);

//cardSection.renderItems();

openNewCardModalButton.addEventListener("click", () => {
  resetValidation(newCardForm, newCardInputs, newCardButton);
  newCardPopup.open();
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

imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();
openModal.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputDescription.value = userData.description;

  resetValidation(formElement, inputList, saveButton);
  editPopup.open();
});
