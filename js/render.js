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
     <div class="tabulation-list">
     <p>АВТОРЫ</p> 
      <p>ВЫСТАВКИ</p> 
       <p>ГОДА</p> 
       </div>
     <div class='tabulation-main'>
     
     </div>
         
           </div>
    `);
    this.root.innerHTML = compiled();
  }

  renderAboutTabulation(informatio) {
    let tabList = document.querySelector(".tabulation-main");
    this.clearBlock(tabList);
    let compiled = _.template(`
     <div class="year">     
         <% _.forEach(data, (item) => { %>
             <p><%= item.name %></p>
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
    let tabList = document.querySelector(".tabulation-main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="authors">
        <% _.forEach(listOfAuthors, (item) => { %>
          <a href="#" class="authors__item">
            <div class="authors__image">
              <img src="<%= item.image %>" alt="">
            </div>
            <div class="authors__info">
              <div class="authors__name"><%= item.name %></div>
              <div class="authors__count-of-pictures"><%= item.count_of_pictures %> картин</div>
            </div>
          </a>
        <% }) %>
      </div>
      <%= currentPage %>
    `);

    tabList.innerHTML = compiled({
      listOfAuthors,
      currentPage,
      countOfPages
    });
  }

  renderByAuthor(listOfPictures, authorInfo) {
    let tabList = document.querySelector(".tabulation-main");
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
    let tabList = document.querySelector(".tabulation-main");
    this.clearBlock(tabList);

    let compiled = _.template(`
      <div class="exhibitions">
        <% _.forEach(data, (item) => { %>
          <div class="exhibitions__item">
            <div class="exhibitions__image">
              <img src="<%= item.image %>" alt="">
            </div>
            <div class="exhibitions__info">
              <div class="exhibitions__title"><%= item.name %></div>
              <div class="exhibitions__count-of-pictures"><%= item.count_of_images %> картины</div>
            </div>
          </div>
        <% }) %>
      </div>
      ${ this._getPaginationTemplate(currentPage, countOfPages) }
    `);

    tabList.innerHTML = compiled({ data: listOfExhibitions });
  }

  _getPaginationTemplate(currentPage, countOfPages) {
    return _.template(`
      <div class="pagination">
        <button id="paginationPrevButton">Предыдущая</button>
        <% _.forEach(_.range(0, countOfPages), (index) => { %>
          <% if(index + 1 === currentPage) { %>
            <span><%= index + 1 %></span>
          <% } else { %>
            <button data-page="<%= index + 1 %>" class="pagination__page"><%= index + 1 %></button>
          <% } %>
        <% }) %>
        <button id="paginationNextButton">Следующая</button>
      </div>
    `)({ countOfPages, currentPage });    
  }
}

export let render = new Render();
