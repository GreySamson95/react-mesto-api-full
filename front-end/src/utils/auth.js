export const  BASE_URL  = 'https://back.greysamson.students.nomoredomains.icu'

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject('Ошибка на сервере');
  }
}

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
    .catch((err) => { throw err });
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
}


export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(checkResponse)
}
