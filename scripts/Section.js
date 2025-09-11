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
      this._renderer(item); // llama a la función pasada desde index.js
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
}
