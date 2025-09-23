// ./scripts/Section.js

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || []; // array de datos
    this._renderer = renderer; // función para crear el markup
    this._container = document.querySelector(containerSelector); // contenedor en el DOM
  }

  // Renderiza todos los elementos en _items
  renderItems() {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  // Agrega un elemento al DOM
  addItem(element) {
    this._container.append(element);
  }

  // Limpia el contenedor
  clear() {
    this._container.innerHTML = "";
  }

  // Agrega un item al array y al DOM
  addItemToArray(itemData, createElementCallback) {
    this._items.unshift(itemData); // agregar al inicio
    const element = createElementCallback(itemData);
    this.addItem(element);
  }

  // Elimina un item del array (por id) y vuelve a renderizar
  removeItemById(itemId) {
    this._items = this._items.filter(item => item._id !== itemId);
    this.renderItems();
  }

  // Reemplaza todos los items (ej. al cargar desde API)
  setItems(itemsArray) {
    this._items = itemsArray;
    this.renderItems();
  }
}
