export class Store {
  constructor(key) {
    this.key = key;
    this.data = this.getData();

    this.init();
  }

  addData(obj) {
    this.data.push(obj);

    localStorage.setItem(
      this.key, JSON.stringify([...this.data]),
    );
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  init() {
    localStorage.setItem(
      this.key, JSON.stringify(this.getData()),
    );
  }
}
