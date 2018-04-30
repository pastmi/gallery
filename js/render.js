class Render {
  constructor() {
    this.root = document.getElementById("root");
  }

  /**
   * Function for getting list of years
   * @param {Array} listOfYears
   */
  renderYears(listOfYears) {
    this.clearBlock(this.root);

    let compiled = _.template(`
      <% _.forEach(data, (item) => { %>
        <a href="/years/<%= item.year %>" class="years__item">
          <b><%= item.year %></b>
        </a>
      <% }) %>
    `);

    this.root.innerHTML =
      '<div class="years">' + compiled({ data: listOfYears }) + "</div>";
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
    // <%= item.name %>

    this.root.innerHTML = compiled({ listOfPictures, authorInfo });
  }
}

let render = new Render();
