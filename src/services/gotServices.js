//пишем класс, который отвечает за доступ к API

export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
  }

  //когда мы делаем запрос - мы получаем 1 стр-цу с 10 итемами (указано в их документации)
  //поэтому если хотим получить н/р 5 стр-цу, то пишем в запросе после ? дополнит. настройки

  async getAllCharacters() {
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter)
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character)
  }

  getAllHouses() {
    return this.getResource('/houses/');
  }

  getHouse(id) {
    return this.getResource(`/houses/${id}`);
  }

  getAllBooks() {
    return this.getResource('/books/');
  }

  getBook(id) {
    return this.getResource(`/books/${id}`);
  }

  _transformCharacter(char) {
    return {
      name: char.name || "no data :(",
      gender: char.gender || "no data :(",
      born: char.born || "no data :(",
      died: char.died || "no data :(",
      culture: char.culture || "no data :("
    }
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  }
}