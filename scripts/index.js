// index.js
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, setOverlayClose, setCloseButton } from './utils.js';

// ---------------- CONFIG DE VALIDACIÓN ----------------
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// ---------------- ELEMENTOS DEL DOM ----------------
// Perfil
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const mainName = document.querySelector('.main__name');
const mainDescription = document.querySelector('.main__description');
const openProfileBtn = document.querySelector('.main__edit-button');

// Añadir card
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardTitleInput = addCardForm.querySelector('.popup__input_type_title');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_link');
const openAddCardBtn = document.querySelector('.main__add-button');

// Popup imagen
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Galería
const cardsContainer = document.querySelector('.main__gallery-list');
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// ---------------- FUNCIONES ----------------
function handleCardClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

// Renderizar card
function renderCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  cardsContainer.prepend(card.generateCard());
}

// ---------------- EVENT LISTENERS ----------------
// Editar perfil
openProfileBtn.addEventListener('click', () => {
  nameInput.value = mainName.textContent;
  descriptionInput.value = mainDescription.textContent;
  profileValidator.resetValidation();
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  mainName.textContent = nameInput.value;
  mainDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
});

// Añadir tarjeta
openAddCardBtn.addEventListener('click', () => {
  addCardValidator.resetValidation();
  openPopup(addCardPopup);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  renderCard(newCard);
  addCardForm.reset();
  closePopup(addCardPopup);
});

// ---------------- INIT ----------------
// Render inicial de tarjetas
initialCards.forEach(renderCard);

// Validadores
const profileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
profileValidator.enableValidation();
addCardValidator.enableValidation();

// Configurar cierres de popups
[profilePopup, addCardPopup, imagePopup].forEach((popup) => {
  setOverlayClose(popup);
  setCloseButton(popup);
});
