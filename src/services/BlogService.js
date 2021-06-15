export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка, данные не получены ${res.status}`);
    }
    return res.json();
  }

  async getListArticles() {
    const url = `${this.apiBase}articles`;
    const res = await this.getResource(url);
    return res;
  }
}
