// ./scripts/Section.js
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los elementos actuales
  renderItems() {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item); // renderer ahora devuelve el elemento
      this.addItem(element);
    });
  }

  // Agrega un elemento al DOM y opcionalmente al array _items
  addItem(element, itemData = null) {
    this._container.prepend(element);
    if (itemData) this._items.unshift(itemData); // actualiza _items si hay data
  }

  // Limpia el contenedor
  clear() {
    this._container.innerHTML = "";
  }

  // Elimina un item por ID
  removeItemById(itemId) {
    this._items = this._items.filter(item => item._id !== itemId);
    this.renderItems();
  }

  // Reemplaza el array _items y renderiza
  setItems(itemsArray) {
    this._items = itemsArray;
    this.renderItems();
  }

  // Método extra para agregar una tarjeta nueva desde API
  addItemToSection(itemData) {
    const element = this._renderer(itemData); // renderer devuelve el elemento
    this.addItem(element, itemData); // agrega al DOM y al array
  }
}
