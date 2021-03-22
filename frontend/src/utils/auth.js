export const  BASE_URL  = 'https://auth.nomoreparties.co'

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if (res.status === 400) {
          console.log('Некорректно заполнено одно из полей')
        }
      if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`)
      }
      return res.json()
  })
  .then((res) => {
      return res
  })
}

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if (res.status === 400) {
          console.log('Не передано одно из полей')
        }
        if (res.status === 401) {
          console.log('Пользователь с email не найден ')
        }
      if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json()
  })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then((res) => {
      if ((res.status === 401 && !res.token) || (res.status === 401 && !`Bearer ${token}`)) {
          console.log('Токен не передан или передан не в том формате')
        }
      if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`)
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
