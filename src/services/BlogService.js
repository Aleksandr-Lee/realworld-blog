/* eslint-disable object-shorthand */
export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  async getResource(url, postRequest = null) {
    const res = await fetch(url, postRequest);
    //   if (!res.ok) {
    //     throw new Error(`Ошибка, данные не получены ${res.status}`);
    //   }
    return res.json();
  }

  async getListArticles(offset = 0) {
    const url = `${this.apiBase}articles?limit=5&offset=${offset}`;
    const res = await this.getResource(url);
    return res;
  }

  async getArticle(slug) {
    const url = `${this.apiBase}articles/${slug}`;
    const res = await this.getResource(url);
    return res;
  }

  async setUserRegistration(username, email, password) {
    const url = `${this.apiBase}users`;
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async getUsers(email, password) {
    const url = `${this.apiBase}users/login`;
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async updateUser(email, bio = 'I like to skateboard', image = null, token) {
    console.log(email, bio, image, token);
    const url = `${this.apiBase}user`;
    const postRequest = {
      method: 'PUT',
      headers: {
        //  'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token jwt.${token}`,
      },
      body: JSON.stringify({
        user: {
          email: email,
          bio: bio,
          image: image,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }
}
