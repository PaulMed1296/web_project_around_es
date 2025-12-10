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
const openModal = profileInfo.querySelector(".profile__edit-button");
const closeModal = editModal.querySelector(".popup__close");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let formElement = editModal.querySelector("#edit-profile-form");

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  editModal.classList.add("popup_is-opened");
  fillProfileForm();
}

function handleCloseEditModal() {
  editModal.classList.remove("popup_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let newName = inputName.value;
  let newDescription = inputDescription.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  handleCloseEditModal();
}

openModal.addEventListener("click", handleOpenEditModal);

closeModal.addEventListener("click", handleCloseEditModal);

formElement.addEventListener("submit", handleProfileFormSubmit);
