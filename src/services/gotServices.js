//пишем класс, который отвечает за доступ к API

export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
  }

  getAllBooks = async () => {
    const res = await this.getResource('/books/');
    return res.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }

  //когда мы делаем запрос - мы получаем 1 стр-цу с 10 итемами (указано в их документации)
  //поэтому если хотим получить н/р 5 стр-цу, то пишем в запросе после ? дополнит. настройки

  getAllCharacters = async () => {
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHouses = async () => {
    const res = await this.getResource('/houses/');
    return res.map(this._transformHouse);
  }

  getHouse = async (id) => {
    return this.getResource(`/houses/${id}`);
  }

  isSet = (data) => {
    if (data) {
      return data
    } else {
      return "no data :("
    }
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
    }
    // return {
    //   name: char.name || "no data :(",
    //   gender: char.gender || "no data :(",
    //   born: char.born || "no data :(",
    //   died: char.died || "no data :(",
    //   culture: char.culture || "no data :("
    // }
  }

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
    }
  }

  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publiser: this.isSet(book.publiser),
      released: this.isSet(book.released)
    }
  }
}