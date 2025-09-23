// ./scripts/Section.js
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = []; // array de {data, cardInstance}
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todas las tarjetas en _items
  renderItems() {
    this.clear();
    this._items.forEach(({ cardInstance }) => {
      this._container.append(cardInstance.generateCard());
    });
  }

  // Agrega una nueva tarjeta al inicio del DOM y al array _items
  addItemToSection(cardInstance, cardData) {
    this._container.prepend(cardInstance.generateCard());
    this._items.unshift({ data: cardData, cardInstance });
  }

  // Elimina tarjeta por ID
  removeItemById(itemId) {
    const index = this._items.findIndex(item => item.data._id === itemId);
    if (index !== -1) {
      this._items[index].cardInstance.removeCard();
      this._items.splice(index, 1);
    }
  }

  // Configura un array inicial de tarjetas
  setItems(itemsArray) {
    itemsArray.forEach(itemData => {
      const cardInstance = this._renderer(itemData); // renderer crea la instancia
      this.addItemToSection(cardInstance, itemData);
    });
  }

  // Limpia el contenedor
  clear() {
    this._container.innerHTML = "";
  }
}
