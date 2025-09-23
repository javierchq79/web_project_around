// ./scripts/Section.js

export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;             // array de datos
    this._renderer = renderer;       // función para crear el markup
    this._container = document.querySelector(containerSelector); // contenedor en el DOM
  }

  // Renderiza todos los elementos
  renderItems() {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item);  // crea el DOM con la función renderer
      this.addItem(element);                 // agrega al DOM
    });
  }

  // Agrega un elemento al DOM
  addItem(element, itemData = null) {
    this._container.prepend(element);       // prepend para que quede al inicio
    if (itemData) this._items.unshift(itemData); // actualiza _items si se pasa itemData
  }

  // Método para agregar una nueva tarjeta desde los datos, manteniendo array y DOM consistentes
  addItemToSection(itemData) {
    const element = this._renderer(itemData); // genera el DOM de la tarjeta
    this.addItem(element, itemData);          // agrega al DOM y al array _items
  }

  // Elimina un elemento por su ID
  removeItemById(itemId) {
    this._items = this._items.filter(item => item._id !== itemId);
    this.renderItems();                       // vuelve a renderizar
  }

  // Reemplaza todos los items y los renderiza
  setItems(itemsArray) {
    this._items = itemsArray;
    this.renderItems();
  }

  // Limpia el contenedor
  clear() {
    this._container.innerHTML = "";
  }
}
