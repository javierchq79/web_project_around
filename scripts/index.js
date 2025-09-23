// ---------------- SECCIÓN DE CARDS ----------------
const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      return new Card(
        cardData,
        '#card-template',
        handleCardClick,
        handleCardDelete,
        handleCardLike
      );
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

// ---------------- POPUP NUEVA CARD ----------------
const addCardPopupForm = new PopupWithForm(addCardPopupSelector, (formData) => {
  addCardPopupForm.renderLoading(true, 'Creando...', 'Crear');
  api.addCard({ name: formData.title, link: formData.link })
    .then(newCardData => {
      const newCard = new Card(
        newCardData,
        '#card-template',
        handleCardClick,
        handleCardDelete,
        handleCardLike
      );
      cardsSection.addItemToSection(newCard, newCardData);
      addCardPopupForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => addCardPopupForm.renderLoading(false));
});
