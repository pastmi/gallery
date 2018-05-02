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
             <p><%= item.year %></p>
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
    this.clearBlock(this.root);

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

    this.root.innerHTML = compiled({
      listOfAuthors,
      currentPage,
      countOfPages
    });
  }

  renderByAuthor(listOfPictures, authorInfo) {
    this.clearBlock(this.root);

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

    this.root.innerHTML = compiled({ listOfPictures, authorInfo });
  }

  /**
   *
   * @param {Array} listOfExhibitions
   */
  renderExhibitions(listOfExhibitions) {
    this.clearBlock(root);

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
    `);

    this.root.innerHTML = compiled({ data: listOfExhibitions });
  }
}

export let render = new Render();
