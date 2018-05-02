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
    let countOfPages;

    api
      .getExhibitions(page)
      .then(data => data.json())
      .then(exhibitions => {
        render.renderExhibitions(
          exhibitions.list,
          page,
          exhibitions.count_of_pages
        );

        countOfPages = exhibitions.count_of_pages;
      })
      .then(() => {
        document
          .getElementById("paginationNextButton")
          .addEventListener(
            "click",
            this._nextExhibition.bind(this, page, countOfPages)
          );

        document
          .getElementById("paginationPrevButton")
          .addEventListener(
            "click",
            this._prevExhibition.bind(this, page, countOfPages)
          );

        let pages = document.getElementsByClassName("pagination__page");
        for (let i = 0; i < 9; i++) {
          pages[i].addEventListener(
            "click",
            this.getExhibitions.bind(this, +pages[i].dataset.page)
          );
        }
      });
  }

  _nextExhibition(page, countOfPages) {
    if (page !== countOfPages) {
      page++;
      this.getExhibitions(page);
    }
  }

  _prevExhibition(page, countOfPages) {
    if (page !== 1) {
      page--;
      this.getExhibitions(page);
    }
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
