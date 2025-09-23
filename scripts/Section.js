// ./scripts/Section.js

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // array de datos
    this._renderer = renderer; // función para crear el markup
    this._container = document.querySelector(containerSelector); // contenedor en el DOM
  }

  // Método público que renderiza todos los elementos
  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  // Método público para agregar un elemento al DOM
  addItem(element) {
    this._container.append(element);
  }

  // Método público para limpiar el contenedor
  clear() {
    this._container.innerHTML = "";
  }

  // Método público para establecer items desde un array (por ejemplo, desde API)
  setItems(itemsArray) {
    this._items = itemsArray;
    this.clear();
    this.renderItems();
  }

  // Método público para agregar un item al array y al DOM
  addItemToArray(itemData, createElementCallback) {
    this._items.unshift(itemData); // agregar al inicio del array
    const element = createElementCallback(itemData);
    this.addItem(element);
  }
}
