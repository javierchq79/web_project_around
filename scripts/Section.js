// ./scripts/Section.js
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element); // al inicio
  }

  addItemToSection(itemData) {
    const card = this._renderer(itemData); // genera el elemento
    this._items.unshift(itemData); // agrega al array _items
    this.addItem(card); // agrega al DOM
  }

  removeItemById(itemId) {
    this._items = this._items.filter(item => item._id !== itemId);
    this.renderItems();
  }

  setItems(itemsArray) {
    this._items = itemsArray;
    this.renderItems();
  }

  clear() {
    this._container.innerHTML = "";
  }
}
