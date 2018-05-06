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
        console.log(`onEnter exhibitions:${page}`);
        main.getExhibitions(page);
        main.changeActive("exhibitions", "js-tabulation__buttons");
      },
      onLeave: page => console.log(`onLeave exhibitions:${page}`)
    },
    {
      name: "exhibitions/gallery",
      match: /exhibitions\/gallery=(.+)/,
      onEnter: page => {
          let num = page.split(':')
        main.getGallery(num[1],num[0]);
      },

      onLeave: page => console.log(`onLeave exhibitions:${page}`)
    },
    {
      name: "authors",
      match: /authors=(.+)/,
      onEnter: page => {
        main.getAuthors(page);
        main.changeActive("authors", "js-tabulation__buttons");
        console.log(`onEnter authors:${page}`);
      },
      onLeave: page => console.log(`onLeave authors:${page}`)
    },
    {
      name: "year",
      match: /years=(.+)/,
      onEnter: page => {
        main.getYears();
        main.changeActive("years", "js-tabulation__buttons");
        console.log(`onEnter years:${page}`);
      },
      onLeave: page => console.log(`onLeave years:${page}`)
    }
  ]
});


