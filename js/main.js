import { render } from "./render";
import { api } from "./api";

export default class Main {
  constructor() {
    this.getYear = this.getYear.bind(this);
  }
  
  getYears() {
    api
      .getYears()
      .then(data => data.json())
      .then(years => render.renderYears(years))
      .then(() => document.addEventListener("click", this.getYear));
  }

  getExhibitions(page) {
    api
      .getExhibitions(page)
      .then(data => data.json())
      .then(exhibitions => render.renderExhibitions(exhibitions.list));
  }

  getYear(ev) {
    let target = ev.target;
    if (target.tagName !== "P") {
      return;
    }
    console.log(target.innerText);
    this.changeActiveYear(target);
  }

  changeActiveYear(target) {
    let elements = document.querySelectorAll(".year p");
    elements.forEach(item => item.classList.remove("year-active"));
    target.classList.add("year-active");
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
}
