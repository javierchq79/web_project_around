// ---------------- IMPORTS ----------------
import Card from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import UserInfo from './UserInfo.js';
import { validationConfig } from './utils.js';
import { api } from './Api.js';

// ---------------- ELEMENTOS DEL DOM ----------------
const profilePopupSelector = '.popup_type_edit-profile';
const profileForm = document.querySelector(`${profilePopupSelector} .popup__form`);
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const openProfileBtn = document.querySelector('.main__edit-button');

const addCardPopupSelector = '.popup_type_add-card';
const addCardForm = document.querySelector(`${addCardPopupSelector} .popup__form`);
const openAddCardBtn = document.querySelector('.main__add-button');

const imagePopupSelector = '.popup_type_image';
const deletePopupSelector = '.popup_type_delete-card';

const avatarPopupSelector = '.popup_type_edit-avatar';
const avatarForm = document.querySelector(`${avatarPopupSelector} .popup__form`);
const avatarEditButton = document.querySelector('.main__avatar-edit-button');

// ---------------- USER INFO ----------------
const userInfo = new UserInfo({
  nameSelector: '.main__name',
  descriptionSelector: '.main__description',
  avatarSelector: '.main__avatar'
});

// ---------------- POPUPS ----------------
const imagePopup = new PopupWithImage(imagePopupSelector);
const deletePopup = new PopupWithConfirmation(deletePopupSelector);
deletePopup.setEventListeners();

// ---------------- FUNCIONES ----------------
function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

function handleCardDelete(cardInstance) {
  deletePopup.open(() => {
    deletePopup.renderLoading(true, 'Eliminando...', 'Sí');
    api.deleteCard(cardInstance._id)
      .then(() => {
        cardsSection.removeItemById(cardInstance._id);
        deletePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => deletePopup.renderLoading(false));
  });
}

function handleCardLike(cardInstance) {
  const likeAction = cardInstance.isLiked()
    ? api.unlikeCard(cardInstance._id)
    : api.likeCard(cardInstance._id);

  likeAction
    .then(updatedCard => cardInstance.updateLikes(updatedCard))
    .catch(err => console.log(err));
}

// ---------------- SECCIÓN DE CARDS ----------------
const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        '#card-template',
        handleCardClick,
        handleCardDelete,
        handleCardLike
      );
      return card.generateCard();
    }
  },
  '.main__gallery-list'
);

// ---------------- CARGA INICIAL DESDE API ----------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar
    });
    cardsSection.setItems(cards);
  })
  .catch(err => console.log(err));

// ---------------- POPUPS CON FORMULARIO ----------------
const profilePopupForm = new PopupWithForm(profilePopupSelector, (formData) => {
  profilePopupForm.renderLoading(true, 'Guardando...', 'Guardar');
  api.setUserInfo({ name: formData.name, about: formData.about })
    .then(updatedData => {
      userInfo.setUserInfo({
        name: updatedData.name,
        description: updatedData.about,
        avatar: updatedData.avatar
      });
      profilePopupForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => profilePopupForm.renderLoading(false));
});

const addCardPopupForm = new PopupWithForm(addCardPopupSelector, (formData) => {
  addCardPopupForm.renderLoading(true, 'Creando...', 'Crear');
  api.addCard({ name: formData.title, link: formData.link })
    .then(newCardData => {
      cardsSection.addItemToSection(newCardData);
      addCardPopupForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => addCardPopupForm.renderLoading(false));
});

const avatarPopupForm = new PopupWithForm(avatarPopupSelector, (formData) => {
  avatarPopupForm.renderLoading(true, 'Guardando...', 'Guardar');
  api.updateAvatar(formData.avatar)
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar
      });
      avatarPopupForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarPopupForm.renderLoading(false));
});

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

avatarEditButton.addEventListener('click', () => {
  avatarForm.reset();
  avatarPopupForm.open();
});

// ---------------- VALIDACIÓN ----------------
const profileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

profileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

// ---------------- EVENTOS DE CIERRE ----------------
profilePopupForm.setEventListeners();
addCardPopupForm.setEventListeners();
avatarPopupForm.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
