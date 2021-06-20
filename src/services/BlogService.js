export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка, данные не получены ${res.status}`);
    }
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
}
