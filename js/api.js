class Api {
  getYears() {
    return fetch("../data/years.json");
  }

  getAuthors() {
    return fetch("../data/authors.json");
  }

  /**
   *
   * @param {Number} id Id of author
   */
  getPicturesByAuthor(id) {
    return fetch("../data/authors-id.json");
  }
}

export let api = new Api();
