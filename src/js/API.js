class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + `/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Не удалось получить данные. Ошибка:${res.status}`);
      })
  }

  getUserInfoFromServer() {
    return fetch(this.baseUrl + `/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Не удалось получить данные. Ошибка:${res.status}`);
      })
      .catch(err => {
        throw err;
      });
  }

  updateUserInfoApi(name, about, avatar) {
    return fetch(this.baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Не удалось получить данные. Ошибка:${res.status}`);
      })
      .catch(err => {
        throw err;
      });
  }
}