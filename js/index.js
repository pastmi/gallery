import Main from './main';
import {Router} from './router';

let main = new Main();
var router = new Router({
  routes: [
    {
      name: "index",
      match: "",
      onBeforeEnter: () => (window.location.hash = "exhibitions=1")
    },
    {
      name: "exhibitions",
      match: /exhibitions=(.+)/,
      onEnter: page => {
       
        main.getExhibitions(page);
        main.changeActive("exhibitions", "js-tabulation__buttons");
      }
    },
    {
      name: "authors",
      match: /authors=(.+)/,
      onEnter: page => {
        main.getAuthors(page);
        main.changeActive("authors", "js-tabulation__buttons");
        
      }
    },
    {
      name: "year",
      match: /year=(.+)/,
      onEnter: page => {
        main.getYears();
        main.changeActive("year", "js-tabulation__buttons");
       
      }
    },
    {
      name: "exhibitions/gallery",
      match: /exhibitions\/gallery=(.+)/,
      onEnter: page => {
        main.changeActive("exhibitions", "psu-tabulation__main");
        let num = page.split(":");
        main.getGallery(num[1], num[0]);
      }
    },
     {
      name: "authors/gallery",
      match: /authors\/gallery=(.+)/,
      onEnter: page => {
        main.changeActive("authors", "psu-tabulation__main");
        let num = page.split(":");
        main.getAuthorsGallery(num[1], num[0]);
      }
    }
  ]
});


