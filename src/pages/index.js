const introWrapper = document.querySelector(".js-intro");
const intro = introWrapper.querySelector("video");
intro.addEventListener('click', ()=>showFullscreenVideo(introWrapper));
// index slider
const indexSliderContainer = document.querySelector(".index-slider");
const sizes = indexSliderContainer.getBoundingClientRect();
const triggerCenter = sizes.x + sizes.width / 2;
function nextSlide(e, center, slider) {
  e.clientX >= center ? slider.go(">") : slider.go("<");
}
indexSliderContainer.addEventListener("click", (e) =>
  nextSlide(e, triggerCenter, indexSlider)
);
const indexSlider = new Glide(indexSliderContainer, {
  rewind: false,
  autoplay: 20000,
}).mount();

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


