class Render {
  constructor() {
    this.root = document.getElementById("root");
  }

  /**
   * Function for getting list of years
   * @param {Array} listOfYears
   */

  renderTabulation() {
    let compiled = _.template(`
     <div class="tabulation">
      <div id="js-tabulation__buttons" class="tabulation__list">
        <a href='#exhibitions=1' class="exhibitions tabulation__button ">Выставки</a> 
        <a href='#authors=1' class="authors tabulation__button">Авторы</a> 
        <a href='#year=1'class="year tabulation__button">Выставки по годам</a> 
      </div>
      <div id='tabulation__main'>
      
      </div>
    </div>
    `);
    this.root.innerHTML = compiled();
  }

  renderAboutTabulation(informatio) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);
    let compiled = _.template(`
      <div class="years">     
        <% _.forEach(data, (item) => { %>
          <h2 class="years__title"><%= item.name %></h2>
          <hr>
          <div class="years__information"><%= item.information %></div>
        <% }) %>
      </div>
    `);

    tabList.innerHTML = compiled({ data: informatio });
  }

  /**
   * Function for clear content inside of html element
   * @param {HTMLElement} block
   */
  clearBlock(block) {
    block.innerHTML = "";
  }

  /**
   *
   * @param {Array} listOfAuthors
   * @param {Number} currentPage
   * @param {Number} countOfPages
   */
  renderAuthors(listOfAuthors, currentPage, countOfPages) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="authors">
        <% _.forEach(listOfAuthors, (item) => { %>
          <a href = "#authors/gallery=<%=currentPage%>:<%=item.id%>"
          class = "authors__square" >
            <div class="authors__square-content">
              <div class="authors__image">
                <img src="<%= item.image %>" alt="">
              </div>
              <div class="authors__info">
                <div class="authors__name"><%= item.name %></div>
                <div class="authors__count-of-pictures"><%= item.count_of_pictures %> картин</div>
              </div>
            </div>
          </a>
        <% }) %>
      </div>
      ${
        countOfPages > 1
          ? this._getPaginationTemplate(currentPage, countOfPages)
          : ""
      }
    `);

    tabList.innerHTML = compiled({
      listOfAuthors,
      currentPage,
      countOfPages
    });
  }

  renderByAuthor(listOfPictures, authorInfo) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <h2><%= authorInfo.name %></h2>
      <img src="<%= authorInfo.image %>" alt="">
      <p><%= authorInfo.description %></p>
      <a class="gallery">
        <% _.forEach(listOfPictures, (item) => { %>
          <div class="gallery__item">
            <div class="gallery__image">
              <img src="<%= item.image %>" alt="">
            </div>
            <div class="gallery__info">
              <div class="gallery__title"><%= item.name %></div>
            </div>
          </div>
        <% }) %>
      </a>
    `);

    tabList.innerHTML = compiled({ listOfPictures, authorInfo });
  }

  /**
   *
   * @param {Array} listOfExhibitions
   * @param {Number} currentPage
   * @param {Number} counfOfPages
   */
  renderExhibitions(listOfExhibitions, currentPage, countOfPages) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="exhibitions">
     
        <% _.forEach(data, (item) => { %>
          <a href="#exhibitions/gallery=<%=page%>:<%=item.id%>"  data-id="<%= item.id %>" class="js-exhibition exhibitions__square">
            <div class="exhibitions__square-content">
              <div class="exhibitions__image">
                <img src="<%= item.image %>" alt="">
              </div>
              <div class="exhibitions__info">
                <div class="exhibitions__title"><%= item.name %></div>
                <div class="exhibitions__count-of-pictures"><%= item.count_of_images %> картины</div>
              </div>
            </div>
          </a >
        <% }) %>
      </div>
      ${
        countOfPages > 1
          ? this._getPaginationTemplate(currentPage, countOfPages)
          : ""
      }
    `);

    tabList.innerHTML = compiled({
      data: listOfExhibitions,
      page: currentPage
    });
  }

  _getPaginationTemplate(currentPage, countOfPages) {
    if (countOfPages < 6) {
      return this._getPaginationWithoutEllipsis(+currentPage, countOfPages);
    }

    if (currentPage > 2 && currentPage < countOfPages - 1) {
      return this._getPaginationWithTwoEllipsis(+currentPage, countOfPages);
    } else if (currentPage <= 2 || currentPage >= countOfPages - 1) {
      return this._getPaginationWithOneEllipsis(+currentPage, countOfPages);
    }

    return;
  }

  _getPaginationWithOneEllipsis(currentPage, countOfPages) {
    return _.template(`
      <div class="pagination">
        <a class="pagination__button pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <% _.forEach(_.range(0, 3), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a href='#exhibitions=<%= index + 1 %>' class="pagination__button pagination__button_number pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#exhibitions=<%= index + 1 %>' data-page="<%= index + 1 %>" class="pagination__button pagination__button_number pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <span class="pagination__ellipsis">...</span>
        <% _.forEach(_.range(countOfPages - 3, countOfPages), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a  href='#exhibitions=<%= index + 1 %>' class="pagination__button pagination__button_number pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a  href='#exhibitions=<%= index + 1 %>' data-page="<%= index + 1 %>" class="pagination__button pagination__button_number pagination__page"><%= index + 1 %></button>
          <% } %>
        <% }) %>
        <a class="pagination__button pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage });
  }

  _getPaginationWithTwoEllipsis(currentPage, countOfPages) {
    return _.template(`
      <div class="pagination">
        <a class="pagination__button pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <a  href='#exhibitions=1' data-page="1" class="pagination__button pagination__button_number pagination__page">1</a>
        <span class="pagination__ellipsis">...</span>
        <% _.forEach(_.range(currentPage-2, currentPage+1), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a href='#exhibitions=<%= index + 1 %>' class="pagination__button pagination__button_number pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#exhibitions=<%= index + 1 %>' data-page="<%= index + 1 %>" class="pagination__button pagination__button_number pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <span class="pagination__ellipsis">...</span>
        <a href='#exhibitions=<%= countOfPages %>' data-page="<%= countOfPages %>" class="pagination__button pagination__button_number pagination__page"><%= countOfPages %></a>
        <a class="pagination__button pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage });
  }

  _getPaginationWithoutEllipsis(currentPage, countOfPages) {
    return _.template(`
      <div class="pagination">
        <a class="pagination__button pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <% _.forEach(_.range(0, countOfPages), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a  href='#exhibitions=<%= index + 1 %>' class="pagination__button pagination__button_number pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#exhibitions=<%= index + 1 %>'  data-page="<%= index + 1 %>" class="pagination__button pagination__button_number pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <a class="pagination__button pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage });
  }

  renderGallery(listOfPictures, currentPage, countOfPages) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="pictures">
        <% _.forEach(data, (item, index) => { %>
          <div data-number="<%= index %>" class="js-pictures pictures__square">
            <div class="pictures__square-content">
              <div class="pictures__image">
                <img src="<%= item.preview_image %>" alt="">
              </div>
            </div>
          </div>
        <% }) %>
      </div>
      ${
        countOfPages > 1
          ? this._getPaginationTemplate(currentPage, countOfPages)
          : ""
      }
    `);

    tabList.innerHTML = compiled({ data: listOfPictures });
  }

  renderModal(pictures, number) {
    let tabList = document.querySelector("#tabulation__main");

    let compiled = _.template(`
      <div id="js-modal" class="modal">
        <div id="js-modal__arrow_left" class="modal__arrow modal__arrow_left">
          <-
        </div>
        <div id="js-modal__arrow_right" class="modal__arrow modal__arrow_right">
         ->
        </div>
        <div class="modal__content">
          <div id="js-moadl__close" class="modal__close">X</div>
          <div id="js-modal__image" class="modal__image">
            <img src="<%= data.image %>" alt="">
          </div>
          <div class="modal__information">
            <span><%= data.name %></span>
            <span><%= data.autor %></span>
          </div>
        </div>
      </div>
    `);

    tabList.insertAdjacentHTML(
      "beforeend",
      compiled({ data: pictures[number] })
    );

    return Promise.resolve();
  }
}

export let render = new Render();
