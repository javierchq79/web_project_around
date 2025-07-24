// POP UP perfil
const popup = document.querySelector('.popup_type_edit-profile');
const openButton = document.querySelector('.main__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const form = popup.querySelector('.popup__form');

const nameInput = form.querySelector('.popup__input_type_name');
const descriptionInput = form.querySelector('.popup__input_type_description');

const mainName = document.querySelector('.main__name');
const mainDescription = document.querySelector('.main__description');

function openPopup() {
  nameInput.value = mainName.textContent;
  descriptionInput.value = mainDescription.textContent;
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

popup.addEventListener('mousedown', (evt) => {
  if (evt.target === popup) {
    closePopup();
  }
});

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

form.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  mainName.textContent = nameInput.value;
  mainDescription.textContent = descriptionInput.value;
  closePopup();
}

// Galería de tarjetas
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

const cardsContainer = document.querySelector('.main__gallery-list');
const cardTemplate = document.querySelector('#card-template').content;

function toggleLike(evt) {
  const button = evt.currentTarget;
  button.classList.toggle('main__like-button_active');
}

function removeCard(evt) {
  const deleteBtn = evt.target.closest('.main__delete-button');
  if (!deleteBtn) return;

  const card = deleteBtn.closest('.main__card');
  if (!card) return;

  card.classList.add('card_fly-away');
  card.addEventListener('animationend', () => {
    card.remove();
  }, { once: true });
}

// Función para abrir la imagen en popup
function openImagePopup(src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  imagePopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleImageEscClose);
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleImageEscClose);
}

function handleImageEscClose(evt) {
  if (evt.key === 'Escape') {
    closeImagePopup();
  }
}

// Renderiza tarjeta
function renderCard(cardData) {
  const cardElement = cardTemplate.querySelector('.main__card').cloneNode(true);
  const imageElement = cardElement.querySelector('.main__image');
  const likeButton = cardElement.querySelector('.main__like-button');
  const deleteButton = cardElement.querySelector('.main__delete-button');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  cardElement.querySelector('.main__title').textContent = cardData.name;

  likeButton.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', removeCard);

  // Abrir popup de imagen al hacer clic en la imagen
  imageElement.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  cardsContainer.prepend(cardElement);
}

// Tarjetas iniciales
initialCards.forEach(renderCard);

// AÑADIR TARJETA
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.main__add-button');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardTitleInput = addCardForm.querySelector('.popup__input_type_title');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_link');

function handleEscCloseForAdd(evt) {
  if (evt.key === 'Escape') {
    closeAddCardPopup();
  }
}

function openAddCardPopup() {
  addCardPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscCloseForAdd);
}

function closeAddCardPopup() {
  addCardPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscCloseForAdd);
}

addCardPopup.addEventListener('mousedown', (evt) => {
  if (evt.target === addCardPopup) {
    closeAddCardPopup();
  }
});

addCardButton.addEventListener('click', openAddCardPopup);
addCardCloseButton.addEventListener('click', closeAddCardPopup);

addCardForm.addEventListener('submit', function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  renderCard(newCard);
  addCardForm.reset();
  closeAddCardPopup();
});

// POPUP DE IMAGEN
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupCloseImage = imagePopup.querySelector('.popup__close-button');

popupCloseImage.addEventListener('click', closeImagePopup);

imagePopup.addEventListener('mousedown', (evt) => {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
});
