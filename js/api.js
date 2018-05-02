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

  /**
   * 
   * @param {Number} page Number of page with the Exhibitions 
   */
  getExhibitions(page) {
    return fetch("../data/exhibitions.json");
  }
}

export let api = new Api();
