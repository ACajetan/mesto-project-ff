const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "ad667f8c-30a6-4d3b-a11f-5b1eb985f91a",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function requestCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при получении информации о карточках: ", err);
    });
}

export function requestUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при получении информации о пользователе: ", err);
    });
}

export function editProfileAPI(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
}

export function addNewCardAPI(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,

    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
}

export function deleteCardAPI(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function likeCardAPI(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

export function dislikeCardAPI(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function editAvatrAPI(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(handleResponse);
}
