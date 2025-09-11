// ---------------- IMPORTS ----------------
import Card from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import { 
  validationConfig, 
  initialCards 
} from './utils.js';

// ---------------- ELEMENTOS DEL DOM ----------------
// Perfil
const profilePopupSelector = '.popup_type_edit-profile';
const profileForm = document.querySelector(`${profilePopupSelector} .popup__form`);
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const openProfileBtn = document.querySelector('.main__edit-button');

// Añadir card
const addCardPopupSelector = '.popup_type_add-card';
const addCardForm = document.querySelector(`${addCardPopupSelector} .popup__form`);
const openAddCardBtn = document.querySelector('.main__add-button');

// Popup imagen
const imagePopupSelector = '.popup_type_image';

// ---------------- USER INFO ----------------
const userInfo = new UserInfo({
  nameSelector: '.main__name',
  descriptionSelector: '.main__description'
});

// ---------------- FUNCIONES ----------------
function handleCardClick(link, name) {
  imagePopupInstance.open(link, name);
}

// ---------------- SECCIÓN DE CARDS ----------------
const cardsSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, '#card-template', handleCardClick);
    cardsSection.addItem(card.generateCard());
  }
}, '.main__gallery-list');

cardsSection.renderItems();

// ---------------- POPUPS ----------------
const profilePopupForm = new PopupWithForm(profilePopupSelector, (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.about 
  });
  profilePopupForm.close();
});


const addCardPopupForm = new PopupWithForm(addCardPopupSelector, (formData) => {
  const newCardData = {
    name: formData.title,
    link: formData.link
  };
  const card = new Card(newCardData, '#card-template', handleCardClick);
  cardsSection.addItem(card.generateCard());
  addCardPopupForm.close();
});

const imagePopupInstance = new PopupWithImage(imagePopupSelector);

// ---------------- EVENT LISTENERS ----------------
openProfileBtn.addEventListener('click', () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  descriptionInput.value = currentUser.description;
  profilePopupForm.open();
});

openAddCardBtn.addEventListener('click', () => {
  addCardForm.reset();
  addCardPopupForm.open();
});

// ---------------- VALIDACIÓN ----------------
const profileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
profileValidator.enableValidation();
addCardValidator.enableValidation();

// ---------------- EVENTOS DE CIERRE ----------------
profilePopupForm.setEventListeners();
addCardPopupForm.setEventListeners();
imagePopupInstance.setEventListeners();
