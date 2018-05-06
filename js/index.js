import Main from './main';
import {Router} from './router'

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
      onEnter: page => console.log(`onEnter exhibitions:${page}`),
      onLeave: page => console.log(`onLeave exhibitions:${page}`)
    },
    {
      name: "author",
      match: /author=(.+)/,
      onEnter: page => console.log(`onEnter author:${page}`),
      onLeave: page => console.log(`onLeave author:${page}`)
    },
    {
      name: "year",
      match: /year=(.+)/,
      onEnter: page => console.log(`onEnter year:${page}`),
      onLeave: page => console.log(`onLeave year:${page}`)
    }
  ]
});

let main = new Main();
