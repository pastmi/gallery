class Api {
  getYears() {
    return fetch(" http://joomla/index.php?option=com_spsimpleportfolio&task=getJsonYears&format=json", {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  getAuthors(page) {
    return fetch(" http://joomla/index.php?option=com_spsimpleportfolio&task=getJsonAuthors&format=json&page=" + page, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  /**
   *
   * @param {Number} id Id of author
   */
  getPicturesByAuthor(id) {
    return fetch(` http://joomla/index.php?option=com_spsimpleportfolio&task=getJsonAuthorId&format=json&id=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  /**
   *
   * @param {Number} page Number of page with the Exhibitions
   */
  getExhibitions(page) {
    return fetch(" http://joomla/index.php?option=com_spsimpleportfolio&task=getJsonExhibitions&format=json&page=" + page, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  /**
   *
   * @param {Number} groupId Id of group with pictures
   * @param {Number} page Number of page with the Pictures
   */
  getPictures(id, page) {
    return fetch(` http://joomla/index.php?option=com_spsimpleportfolio&task=getJsonPictures&format=json&&id=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  }
}

export let api = new Api();
