const videoWrapper = document.querySelector(".video-wrapper");
const video = document.querySelector("video");
video.onclick = function () {
  if (!document.fullscreen) {
    videoWrapper.requestFullscreen();
    video.controls = true;
  }
};
document
  .querySelector(".js-video-close")
  .addEventListener("click", function () {
    document.exitFullscreen();
  });
document.addEventListener("fullscreenchange", function (e) {
  if (!document.fullscreen) video.controls = false;
});

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

//gallery

function showActiveItem(id, className) {
  const activeClass = `${className}_current`;
  const elements = document.querySelectorAll(`.${className}`);
  for (elem of elements) {
    elem.classList.remove(activeClass);
  }
  document.querySelector(`[data-link=${id}]`).classList.add(activeClass);
}

window.addEventListener("hashchange", function () {
  const galleryItemName = "gallery__image";
  let targetId = location.hash.replace(/#/, "");

  if (document.querySelector(`[data-link=${targetId}]`))
    showActiveItem(targetId, galleryItemName);
});

const myFullpage = new fullpage('#fullpage', {
  anchors: ['main', 'about', 'timer', 'indexes', 'gallery','news','contacts'],
  menu: '#menu',
  sectionSelector:'.screen',
  // autoScrolling: true,
  normalScrollElements:'.scrollMouse',
  scrollHorizontally: false,
  loopBottom: true
});