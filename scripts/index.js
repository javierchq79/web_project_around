// Elementos clave
const popup = document.querySelector('.popup_type_edit-profile');
const openButton = document.querySelector('.main__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const form = popup.querySelector('.popup__form');

const nameInput = form.querySelector('.popup__input_type_name');
const descriptionInput = form.querySelector('.popup__input_type_description');

const mainName = document.querySelector('.main__name');
const mainDescription = document.querySelector('.main__description');

// Función para abrir el popup y precargar los valores
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

// Cerrar al hacer clic fuera del contenedor
popup.addEventListener('mousedown', (evt) => {
  if (evt.target === popup) {
    closePopup();
  }
});

// Eventos
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Al enviar el formulario
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  mainName.textContent = nameInput.value;
  mainDescription.textContent = descriptionInput.value;
  closePopup();
});
