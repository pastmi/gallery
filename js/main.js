import { render } from "./render";
import { api } from "./api";

export default class Main {
  constructor() {
    this.getYear = this.getYear.bind(this);
  }
  getInformation() {
    api
      .getYears()
      .then(data => data.json())
      .then(years => render.renderYears(years))
      .then(() => document.addEventListener("click", this.getYear));

    // api
    //   .getAuthors()
    //   .then(data => data.json())
    //   .then(authors =>
    //     render.renderAuthors(
    //       authors.list,
    //       authors.current_page,
    //       authors.count_of_pages
    //     )
    //   );

    // api
    //   .getPicturesByAuthor(3)
    //   .then(data => data.json())
    //   .then(authorInfo =>
    //     render.renderByAuthor(authorInfo.list_of_pictures, {
    //       name: authorInfo.name,
    //       image: authorInfo.image,
    //       description: authorInfo.description
    //     })
    //   );
  }
  getYear(ev) {
    let target = ev.target;
    if(target.tagName!=='P') {
      return;
    }
    console.log(target.innerText)
  }
}
