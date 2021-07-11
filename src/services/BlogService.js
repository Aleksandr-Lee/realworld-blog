const LIMIT_ARTICLES = 5;
export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  async getResource(url, postRequest = null) {
    const res = await fetch(url, postRequest);
    return res.json();
  }

  async getListArticles(changeOffset = 1) {
    const token = localStorage.getItem('token');
    const offset = (changeOffset - 1) * LIMIT_ARTICLES;
    const url = `${this.apiBase}articles?limit=${LIMIT_ARTICLES}&offset=${offset}`;
    const postRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const request = token ? postRequest : null;
    const res = await this.getResource(url, request);
    return res;
  }

  async getArticle(slug) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}articles/${slug}`;
    const postRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const request = token ? postRequest : null;
    const res = await this.getResource(url, request);
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
          username,
          email,
          password,
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
          email,
          password,
        },
      }),
    };

    const res = await this.getResource(url, postRequest);
    return res;
  }

  async updateUser(username, email, password, image = null) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}user`;
    const postRequest = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async getCurrentUsers(token) {
    const url = `${this.apiBase}user`;
    const postRequest = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async createArticle({ title, shortDescription, text, tagList }) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}articles`;
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description: shortDescription,
          body: text,
          tagList,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async editArticle(title, description, body, tagList, slug) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}articles/${slug}`;
    const postRequest = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async deleteArticle(slug) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}/articles/${slug}`;
    const postRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async likeArticle(slug) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}/articles/${slug}/favorite`;
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async dislikeArticle(slug) {
    const token = localStorage.getItem('token');
    const url = `${this.apiBase}/articles/${slug}/favorite`;
    const postRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }
}
