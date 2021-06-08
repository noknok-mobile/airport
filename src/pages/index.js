// fullpage
let scrollElements = window.innerWidth > 960? ".js-news-list" :'.js-news-list,.gallery__images';
new fullpage('#fullpage', {
  anchors: ['main', 'about', 'timer', 'indexes', 'gallery','news','contacts'],
  menu: '#menu',
  sectionSelector:'.screen',
  // autoScrolling: true,
  normalScrollElements: scrollElements,
  scrollHorizontally: false,
  loopBottom: true,
  loopTop: true
});


