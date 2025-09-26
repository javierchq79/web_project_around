class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Obtener info del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Actualizar info del usuario
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Actualizar avatar
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  

  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Crear nueva tarjeta
  addCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Eliminar tarjeta
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Dar "me gusta"
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  // Quitar "me gusta"
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }
}

// Token
export const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: '6f2d410c-e0cd-4788-883b-32bfa4f6716f',
    'Content-Type': 'application/json'
  }
});


