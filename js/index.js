(function() {
  api
    .getYears()
    .then(data => data.json())
    .then(years => render.renderYears(years));
})();
