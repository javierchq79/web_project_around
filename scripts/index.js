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

// ---------------- USER INFO ----------------
const userInfo = new UserInfo({
  nameSelector: '.main__name',
  descriptionSelector: '.main__description',
  avatarSelector: '.main__avatar'
});

// ---------------- POPUPS ----------------
const imagePopupInstance = new PopupWithImage(imagePopupSelector);
const deletePopupInstance = new PopupWithConfirmation(deletePopupSelector);
deletePopupInstance.setEventListeners();

// ---------------- FUNCIONES ----------------
function handleCardClick(link, name) {
  imagePopupInstance.open(link, name);
}

function handleCardDelete(cardInstance) {
  deletePopupInstance.open(() => {
    deletePopupInstance.renderLoading(true, 'Eliminando...', 'Sí');
    api.deleteCard(cardInstance._id)
      .then(() => {
        // Quita del DOM y del array
        cardInstance.removeCard();
        cardsSection.removeItemById(cardInstance._id);
        deletePopupInstance.close();
      })
      .catch(err => console.log(err))
      .finally(() => deletePopupInstance.renderLoading(false));
  });
}


function handleCardLike(cardInstance) {
  const likeAction = cardInstance.isLiked() ? api.unlikeCard(cardInstance._id) : api.likeCard(cardInstance._id);
  likeAction
    .then(updatedCard => cardInstance.updateLikes(updatedCard))
    .catch(err => console.log(err));
}

// ---------------- SECCIÓN DE CARDS ----------------
const cardsSection = new Section(
  {
    items: [], // empezamos vacío
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        '#card-template',
        handleCardClick,
        handleCardDelete,
        handleCardLike
      );
      cardsSection.addItem(card.generateCard());
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

    // Renderizar las tarjetas desde API
    cardsSection.setItems(cards);
  })
  .catch(err => console.log(err));


// ---------------- POPUP PERFIL ----------------
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

// ---------------- POPUP NUEVA CARD ----------------
const addCardPopupForm = new PopupWithForm(addCardPopupSelector, (formData) => {
  addCardPopupForm.renderLoading(true, 'Creando...', 'Crear');
  api.addCard({ name: formData.title, link: formData.link })
    .then(newCardData => {
      // Usamos addItemToArray para mantener _items actualizado
      cardsSection.addItemToArray(newCardData, (cardData) => {
        const card = new Card(
          cardData,
          '#card-template',
          handleCardClick,
          handleCardDelete,
          handleCardLike
        );
        return card.generateCard();
      });
      addCardPopupForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => addCardPopupForm.renderLoading(false));
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

// ---------------- VALIDACIÓN ----------------
const profileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
profileValidator.enableValidation();
addCardValidator.enableValidation();

// ---------------- EVENTOS DE CIERRE ----------------
profilePopupForm.setEventListeners();
addCardPopupForm.setEventListeners();
imagePopupInstance.setEventListeners();
deletePopupInstance.setEventListeners();
