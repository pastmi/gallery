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
     <div class="psu-tabulation">
      <div id="js-tabulation__buttons" class="psu-tabulation__list">
        <a href='#exhibitions=1' class="exhibitions psu-tabulation__button ">Выставки</a> 
        <a href='#authors=1' class="authors psu-tabulation__button">Авторы</a> 
        <a href='#year=1'class="year psu-tabulation__button">Выставки по годам</a> 
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
      <div class="psu-years">     
        <% _.forEach(data, (item) => { %>
          <h2 class="psu-years__title"><%= item.name %></h2>
          <hr>
          <div class="psu-years__information"><%= item.information %></div>
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
      <div class="psu-authors">
        <% _.forEach(listOfAuthors, (item) => { %>
          <a href = "#authors/gallery=<%=currentPage%>:<%=item.id%>"
          class = "psu-authors__square" >
            <div class="psu-authors__square-content">
              <div class="psu-authors__image">
                <img src="<%= item.image %>" alt="">
              </div>
              <div class="psu-authors__info">
                <div class="psu-authors__name"><%= item.title %></div>
              </div>
            </div>
          </a>
        <% }) %>
      </div>
      ${
        countOfPages > 1
          ? this._getPaginationTemplate(currentPage, countOfPages, "authors")
          : ""
      }
    `);
    // <div class="authors__count-of-pictures"><%= item.count_of_pictures %> картин</div>

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
      <a class="psu-gallery">
        <% _.forEach(listOfPictures, (item) => { %>
          <div class="psu-gallery__item">
            <div class="psu-gallery__image">
              <img src="<%= item.image %>" alt="">
            </div>
            <div class="psu-gallery__info">
              <div class="psu-gallery__title"><%= item.name %></div>
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
      <div class="psu-exhibitions">
     
        <% _.forEach(data, (item) => { %>
          <a href="#exhibitions/gallery=<%=page%>:<%=item.value%>"  data-id="<%= item.id %>" class="js-exhibition psu-exhibitions__square">
            <div class="psu-exhibitions__square-content">
              <div class="psu-exhibitions__image">
                <img src="<%= item.image %>" alt="">
              </div>
              <div class="psu-exhibitions__info">
                <div class="psu-exhibitions__title"><%= item.text %></div>
                <div class="psu-exhibitions__count-of-pictures"><%= item.count_of_images %> картины</div>
              </div>
            </div>
          </a >
        <% }) %>
      </div>
      ${
        countOfPages > 1
          ? this._getPaginationTemplate(currentPage, countOfPages, "exhibitions")
          : ""
      }
    `);

    tabList.innerHTML = compiled({
      data: listOfExhibitions,
      page: currentPage
    });
  }

  _getPaginationTemplate(currentPage, countOfPages,classButton) {
    if (countOfPages < 6) {
      return this._getPaginationWithoutEllipsis(+currentPage, countOfPages,classButton);
    }

    if (currentPage > 2 && currentPage < countOfPages - 1) {
      return this._getPaginationWithTwoEllipsis(+currentPage, countOfPages,classButton);
    } else if (currentPage <= 2 || currentPage >= countOfPages - 1) {
      return this._getPaginationWithOneEllipsis(+currentPage, countOfPages,classButton);
    }

    return;
  }

  _getPaginationWithOneEllipsis(currentPage, countOfPages, classButton) {
    return _.template(`
      <div class="psu-pagination">
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <% _.forEach(_.range(0, 3), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a href='#<%=classButton%>=<%= index + 1 %>' class="psu-pagination__button psu-pagination__button_number psu-pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#<%=classButton%>=<%= index + 1 %>' data-page="<%= index + 1 %>" class="psu-pagination__button psu-pagination__button_number psu-pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <span class="psu-pagination__ellipsis">...</span>
        <% _.forEach(_.range(countOfPages - 3, countOfPages), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a  href='#<%=classButton%>=<%= index + 1 %>' class="psu-pagination__button psu-pagination__button_number psu-pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a  href='#<%=classButton%>=<%= index + 1 %>' data-page="<%= index + 1 %>" class="psu-pagination__button psu-pagination__button_number psu-pagination__page"><%= index + 1 %></button>
          <% } %>
        <% }) %>
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage,classButton });
  }

  _getPaginationWithTwoEllipsis(currentPage, countOfPages, classButton) {
    return _.template(`
      <div class="psu-pagination">
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <a  href='#<%=classButton%>=1' data-page="1" class="psu-pagination__button psu-pagination__button_number psu-pagination__page">1</a>
        <span class="psu-pagination__ellipsis">...</span>
        <% _.forEach(_.range(currentPage-2, currentPage+1), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a href='#<%=classButton%>=<%= index + 1 %>' class="psu-pagination__button psu-pagination__button_number psu-pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#<%=classButton%>=<%= index + 1 %>' data-page="<%= index + 1 %>" class="psu-pagination__button psu-pagination__button_number psu-pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <span class="psu-pagination__ellipsis">...</span>
        <a href='#<%=classButton%>=<%= countOfPages %>' data-page="<%= countOfPages %>" class="psu-pagination__button psu-pagination__button_number psu-pagination__page"><%= countOfPages %></a>
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage,classButton });
  }

  _getPaginationWithoutEllipsis(currentPage, countOfPages, classButton) {
    return _.template(`
      <div class="psu-pagination">
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationPrevButton">Предыдущая</a>
        <% _.forEach(_.range(0, countOfPages), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <a  href='#<%=classButton%>=<%= index + 1 %>' class="psu-pagination__button psu-pagination__button_number psu-pagination__button_active"><%= index + 1 %></a>
          <% } else { %>
            <a href='#<%=classButton%>=<%= index + 1 %>'  data-page="<%= index + 1 %>" class="psu-pagination__button psu-pagination__button_number psu-pagination__page"><%= index + 1 %></a>
          <% } %>
        <% }) %>
        <a class="psu-pagination__button psu-pagination__button_arrow" id="paginationNextButton">Следующая</a>
      </div>
    `)({ countOfPages, currentPage,classButton });
  }

  renderGallery(listOfPictures, currentPage, countOfPages) {
    let tabList = document.querySelector("#tabulation__main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="psu-pictures">
        <% _.forEach(data, (item, index) => { %>
          <div data-number="<%= index %>" class="js-pictures psu-pictures__square">
            <div class="psu-pictures__square-content">
              <div class="psu-pictures__image">
                <img src="<%= item.image %>" alt="">
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
      <div id="js-modal" class="psu-modal">
        <% if(length > 1) { %>
        <div id="js-modal__arrow_left" class="psu-modal__arrow psu-modal__arrow_left">
          <i class="fas fa-angle-left"></i>
        </div>
        <div id="js-modal__arrow_right" class="psu-modal__arrow psu-modal__arrow_right">
          <i class="fas fa-angle-right"></i>
        </div>
        <% } %>
        <div class="psu-modal__content">
          <div id="js-moadl__close" class="psu-modal__close">
            <i class="fas fa-times"></i>
          </div>
          <div id="js-modal__image" class="psu-modal__image">
            <img src="<%= data.image %>" alt="">
          </div>
          <% if(data.title || data.nameAuthor) { %>
          <div class="psu-modal__information">
            <% if(data.title) { %>
            <div><b>Название картины:</b> "<span class="psu-img-title"><%= data.title %></span>"</div>
            <% } %>
            <% if(data.nameAuthor) { %>
            <div><b>Автор</b>:<span class="psu-img-author"> <%= data.nameAuthor %></span></div>
            <% } %>
          </div>
          <% } %>
        </div>
      </div>
    `);

    tabList.insertAdjacentHTML(
      "beforeend",
      compiled({ data: pictures[number], length: pictures.length })
    );

    return Promise.resolve();
  }
}

export let render = new Render();
