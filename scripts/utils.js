export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => handleEscClose(evt, popup));
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => handleEscClose(evt, popup));
}

function handleEscClose(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// 🟢 utilidad extra: cerrar popup al dar clic fuera del contenido
export function setOverlayClose(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

// 🟢 utilidad extra: configurar botón de cerrar dentro de cada popup
export function setCloseButton(popup) {
  const closeBtn = popup.querySelector('.popup__close-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closePopup(popup));
  }
}
