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

  addListYear() {
    api
      .getYears()
      .then(data => data.json())
      .then(years => render.renderAboutTabulation(years));
  }

  addListAuthor() {
    api
      .getAuthors()
      .then(data => data.json())
      .then(author => render.renderAboutTabulation(author));
  }

  addListExhibition() {
    api
      .getExhibition()
      .then(data => data.json())
      .then(exhibition => render.renderAboutTabulation(exhibition));
  }
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
  tabulationListener(ev) {
    let target = ev.target;
    if (target.tagName !== "P") {
      return;
    }
    this.changeActive(target, "tabulation-list");
    switch (target.innerText) {
      case "ГОДА":
        this.addListYear();
        break;
      case "АВТОРЫ":
        this.addListAuthor();
        break;
      case "ВЫСТАВКИ":
        this.addListExhibition();
        break;
      default:
        break;
    }
  }

  wait(what, call) {
    if (what.length === 0) {
      setTimeout(() => call(), 100);
      return false;
    }
    return true;
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
}
