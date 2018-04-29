class Api {
  getYears() {
    return fetch("/data/years.json");
  }
}

let api = new Api();
