import { render } from "./render";
import { api } from "./api";

export default class Main {
  constructor() {
    this.getInformation = this.getInformation.bind(this);
    this.tabulationListener = this.tabulationListener.bind(this);
    this.start();
  }
  start() {
    this.addTabulation();
  }

  addTabulation() {
    render.renderTabulation();
    document
      .querySelector(".tabulation-list")
      .addEventListener("click", this.tabulationListener);
       document
         .querySelector(".tabulation-main")
         .addEventListener("click", this.getInformation);
  }

  getYears() {
    api
      .getYears()
      .then(data => data.json())
      .then(years => render.renderAboutTabulation(years));
  }

  getExhibitions(page) {
    let countOfPages;
    api
      .getExhibitions()
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
  
  tabulationListener(ev) {
    let target = ev.target;
    if (target.tagName !== "P") {
      return;
    }
    if (target.classList.contains("year-active")) {
      target.classList.remove("year-active");
      render.clearBlock(document.querySelector(".tabulation-main"));
      return;
    }
    
    this.changeActive(target, "tabulation-list");
    switch (target.innerText) {
      case "ГОДА":
        this.getYears();
        break;
      case "АВТОРЫ":
        this.getAuthors();
        break;
      case "ВЫСТАВКИ":
        this.getExhibitions(1);
        break;
      default:
        break;
    }
  }

 

  getInformation(ev) {
    let target = ev.target;
    if (target.tagName !== "P") {
      return;
    }
    console.log(target.innerText);
    this.changeActive(target, "tabulation-main");
  }

  changeActive(target, classGroup) {
    let elements = document.querySelectorAll("." + classGroup + " p");
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
