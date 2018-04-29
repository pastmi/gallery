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
}

let render = new Render();
