import { render } from "./render";
import { api } from "./api";

export default class Main {
  constructor() {
    this.getInformation = this.getInformation.bind(this);
    // this.tabulationListener = this.tabulationListener.bind(this);
    this.start();
    this.currentImageNumber = 0;
  }
  start() {
    this.addTabulation();
  }

  addTabulation() {
    render.renderTabulation();

    document
      .querySelector("#js-tabulation__buttons")
      .addEventListener("click", this.tabulationListener);
    document
      .querySelector("#tabulation__main")
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
        if (countOfPages > 1) {
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
          for (let i = 0; i < pages.length; i++) {
            pages[i].addEventListener(
              "click",
              this.getExhibitions.bind(this, +pages[i].dataset.page)
            );
          }
        }
      });
  }

  _nextExhibition(page, countOfPages) {
    if (page < +countOfPages) {
      page++;
      window.location.hash = "exhibitions=" + page;
      this.getExhibitions(page);
    }
  }

  _prevExhibition(page, countOfPages) {
    if (page > 1) {
      page--;
      window.location.hash = "exhibitions=" + page;
      this.getExhibitions(page);
    }
  }

  getInformation(ev) {
    let target = ev.target;
    if (target.tagName !== "P") {
      return;
    }
    console.log(target.innerText);
    this.changeActive(target, "tabulation__main");
  }

  changeActive(target, idGroup) {
    let elements = document.querySelectorAll("#" + idGroup + " a");
    elements.forEach(item =>
      item.classList.remove("tabulation__button_active")
    );
    document
      .querySelector("." + target)
      .classList.add("tabulation__button_active");
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

  getAuthors(page) {
    let countOfPages;
    api
      .getAuthors()
      .then(data => data.json())
      .then(authors => {
        render.renderAuthors(authors.list, page, authors.count_of_pages);

        countOfPages = authors.count_of_pages;
      })
      .then(() => {
        if (countOfPages > 1) {
          document
            .getElementById("paginationNextButton")
            .addEventListener(
              "click",
              this._nextAuthors.bind(this, page, countOfPages)
            );

          document
            .getElementById("paginationPrevButton")
            .addEventListener(
              "click",
              this._prevAuthors.bind(this, page, countOfPages)
            );

          let pages = document.getElementsByClassName("pagination__page");
          for (let i = 0; i < pages.length; i++) {
            pages[i].addEventListener(
              "click",
              this.getAuthors.bind(this, +pages[i].dataset.page)
            );
          }
        }
      });
  }

  _nextAuthors(page, countOfPages) {
    if (page > +countOfPages) {
      page++;
      window.location.hash = "authors=" + page;
    
      this.getAuthors(page);
    }
  }

  _prevAuthors(page, countOfPages) {
    if (page < 1) {
      page--;authors
       window.location.hash = "authors=" + page;
       
      this.getAuthors(page);
    }
  }

  getGallery(id, page) {
    let countOfPages, images;

    api
      .getPictures(id, page)
      .then(data => data.json())
      .then(pictures => {
        images = pictures;
        render.renderGallery(pictures.list, page, pictures.count_of_pages);

        countOfPages = pictures.count_of_pages;
      })
      .then(() => {
        let pictures = document.getElementsByClassName("js-pictures");

        for (let i = 0; i < pictures.length; i++) {
          pictures[i].addEventListener(
            "click",
            this.getModal.bind(this, images.list, pictures[i].dataset.number)
          );
        }
      });
  }

  getModal(pictures, number) {
    this.currentImageNumber = number;
    render.renderModal(pictures, number).then(() => {
      document
        .getElementById("js-modal__arrow_right")
        .addEventListener(
          "click",
          this._changeImage.bind(this, "right", pictures, number)
        );
      document
        .getElementById("js-modal__arrow_left")
        .addEventListener(
          "click",
          this._changeImage.bind(this, "left", pictures, number)
        );
      document
        .getElementById("js-moadl__close")
        .addEventListener("click", () => {
          document.getElementById("js-modal").remove();
        });
    });
  }

  _changeImage(direction, pictures, number) {
    if (direction === "left") {
      if (this.currentImageNumber > 0) {
        this.currentImageNumber--;
        this._replaceImage(pictures);
      }
    } else if (direction === "right") {
      if (this.currentImageNumber < pictures.length - 1) {
        this.currentImageNumber++;
        this._replaceImage(pictures);
      }
    }
  }

  _replaceImage(pictures) {
    let imageBlock = document.getElementById("js-modal__image");
    imageBlock.innerHTML = `<img src="${
      pictures[this.currentImageNumber].image
    }" alt="">`;
  }
}
