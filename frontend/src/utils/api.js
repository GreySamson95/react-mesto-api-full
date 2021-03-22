class Api {
  constructor({ baseUrl, headers }) {
      this._url = baseUrl
      this._headers = headers
  }

  _getResponseData(res) {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getCardList() {
      return fetch(`${this._url}/cards`, {
              headers: this._headers,
          })
          .then(this._getResponseData)
  }

  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
              headers: this._headers,
          })
          .then(this._getResponseData)
  }

  getInitialData() {
      return Promise.all([this.getUserInfo(), this.getCardList()])
  }

  setUserInfo({ name, about }) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
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
          headers: this._headers,
          body: JSON.stringify({
              avatar: avatar
          })
      })
      .then(this._getResponseData)
  }

  postPhoto({ name, link }) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
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
          headers: this._headers,
      })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {
              method: isLiked ? 'PUT' : 'DELETE',
              headers: this._headers
          })
          .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
      authorization: '66264c4a-1a87-4c46-9ef9-8541779913f9',
      'Content-Type': 'application/json'
  }
})

export default api
