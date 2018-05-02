import { render } from "./render";
import { api } from "./api";

export default class Main {
  getYears() {
    api
      .getYears()
      .then(data => data.json())
      .then(years => render.renderYears(years));
  }

  getAuthors() {
    api
      .getAuthors()
      .then(data => data.json())
      .then(authors =>
        render.renderAuthors(
          authors.list,
          authors.current_page,
          authors.count_of_pages
        )
      );
  }

  getPicturesByAuthor(id) {
    api
      .getPicturesByAuthor(id)
      .then(data => data.json())
      .then(authorInfo =>
        render.renderByAuthor(authorInfo.list_of_pictures, {
          name: authorInfo.name,
          image: authorInfo.image,
          description: authorInfo.description
        })
      );
  }

  getExhibitions(page) {
    api
      .getExhibitions(page)
      .then(data => data.json())
      .then(exhibitions => render.renderExhibitions(exhibitions.list));
  }
}
