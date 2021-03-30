import { BASE_URL } from './utils';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(response.status);
  }
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
  .then((res) => checkResponse(res))
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
    .then(checkResponse);
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then((res) => checkResponse(res))
}
