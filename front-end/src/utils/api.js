import { configHeaders } from './utils';

class Api {
  constructor({ baseUrl, headers }) {
      this._url = baseUrl
      this._headers = headers
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      ...this.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  _getResponseData(res) {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getCardList() {
      return fetch(`${this._url}/cards`, {
              headers: this.getHeaders()
          })
          .then(this._getResponseData)
  }

  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
              headers: this.getHeaders()
          })
          .then(this._getResponseData)
  }

  setUserInfo({ name, about }) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this.getHeaders(),
          body: JSON.stringify({
              name: name,
              about: about
          })
      })
      .then(this._getResponseData)
  }

  setUserAvatar({ avatar }) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.getHeaders(),
          body: JSON.stringify({
              avatar: avatar
          })
      })
      .then(this._getResponseData)
  }

  postPhoto({ name, link }) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({
              name: name,
              link: link
          })
      })
      .then(this._getResponseData)
  }

  deletePhoto(id) {
      return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
      })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {
              method: isLiked ? 'PUT' : 'DELETE',
              headers: this.getHeaders()
          })
          .then(this._getResponseData)
  }
}

const api = new Api(configHeaders);

export default api
