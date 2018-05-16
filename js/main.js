import { render } from "./render";
import { api } from "./api";

export default class Main {
  constructor() {

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

  }

  getYears() {
    api
      .getYears()
      .then(data => data.json())
      .then(response => response.data)
      .then(years => render.renderAboutTabulation(years));
  }

  getExhibitions(page) {
   
    let countOfPages;
    api
      .getExhibitions(page)
      .then(data => data.json())
      .then(response => response.data)
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

          let pages = document.getElementsByClassName("psu-pagination__page");
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

  changeActive(target, idGroup) {
    let elements = document.querySelectorAll("#" + idGroup + " a");
    elements.forEach(item =>
      item.classList.remove("psu-tabulation__button_active")
    );
    document
      .querySelector("." + target)
      .classList.add("psu-tabulation__button_active");
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
      .getAuthors(page)
      .then(data => data.json())
      .then(response => response.data)
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

          let pages = document.getElementsByClassName("psu-pagination__page");
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
    
    if (page < +countOfPages) {
       
      page++;
      window.location.hash = "authors=" + page;

      this.getAuthors(page);
    }
  }

  _prevAuthors(page, countOfPages) {
  
    if (page > 1) {
      
      page--;
       window.location.hash = "authors=" + page;

      this.getAuthors(page);
    }
  }

  getGallery(id, page) {
    let countOfPages, images;

    api
      .getPictures(id, page)
      .then(data => data.json())
      .then(resp => resp.data)
      .then(pictures => {
        images = pictures;
        render.renderGallery(pictures.list_of_pictures, page, pictures.count_of_pages);

        countOfPages = pictures.count_of_pages;
      })
      .then(() => {
        let pictures = document.getElementsByClassName("js-pictures");

        for (let i = 0; i < pictures.length; i++) {
          pictures[i].addEventListener(
            "click",
            this.getModal.bind(this, images.list_of_pictures, pictures[i].dataset.number)
          );
        }
      });
  }

  getAuthorsGallery(id, page) {
    let countOfPages, images;

    api
      .getPicturesByAuthor(id, page)
      .then(data => data.json())
      .then(resp => resp.data)
      .then(pictures => {
        images = pictures;
        render.renderGallery(pictures.list_of_pictures, page, pictures.count_of_pages);

        countOfPages = pictures.count_of_pages;
      })
      .then(() => {
        let pictures = document.getElementsByClassName("js-pictures");

        for (let i = 0; i < pictures.length; i++) {
          pictures[i].addEventListener(
            "click",
            this.getModal.bind(this, images.list_of_pictures, pictures[i].dataset.number)
          );
        }
      });
  }

  getModal(pictures, number) {
    this.currentImageNumber = number;
    render.renderModal(pictures, number).then(() => {
      if(pictures.length > 1) {
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
      }
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
    let imageBlock = document.getElementById("js-modal__image"),
    title = document.querySelector('.psu-img-title'),
    author = document.querySelector('.psu-img-author');
    imageBlock.innerHTML = `<img src="${
      pictures[this.currentImageNumber].image
    }" alt="">`;
    title.innerHTML =    pictures[this.currentImageNumber].title;
    author.innerHTML =    pictures[this.currentImageNumber].nameAuthor;
  }
}
