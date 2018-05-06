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

  /**
   *
   * @param {Number} groupId Id of group with pictures
   * @param {Number} page Number of page with the Pictures
   */
  getPictures(groupId, page) {
    return fetch("../data/pictures.json");
  }
}

export let api = new Api();
