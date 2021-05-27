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
  let lastCurrentElem = document.querySelector(`.${activeClass}`)?? null;
  if(lastCurrentElem) lastCurrentElem.classList.remove(activeClass);
  
  document.querySelector(`[data-link=${id}]`).classList.add(activeClass);
}
const galleryThumbs = document.querySelectorAll('.gallery__thumb-wrapper');
for(let thumb of galleryThumbs){
  thumb.addEventListener('click', showImage)
}
function showImage(e){
  const galleryItemName = "gallery__image";
  let targetId = e.currentTarget.getAttribute('href').replace(/#/, "");
  
  if (document.querySelector(`[data-link=${targetId}]`))
    showActiveItem(targetId, galleryItemName);

}

// fullpage
const myFullpage = new fullpage('#fullpage', {
  anchors: ['main', 'about', 'timer', 'indexes', 'gallery','news','contacts'],
  menu: '#menu',
  sectionSelector:'.screen',
  // autoScrolling: true,
  normalScrollElements:'.js-news-list',
  scrollHorizontally: false,
  loopBottom: true,
  loopTop: true
});


// contacts
document.querySelector(".js-form-expand").addEventListener("click", formExpand);
function formFold() {
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_fold");
}
function formExpand() {
  document.querySelector(".js-form-wrapper").classList.remove("form-wrapper_fold");
}

function formSubmit(){
  setTimeout(()=>document.querySelector('.js-form-wrapper').classList.add('form-wrapper_submitted'), 500);
 
}
document.querySelector('.js-form-wrapper form').addEventListener('submit', function(e){
  e.preventDefault();
  formSubmit();
})
const swipeSensitivity = 20;
const map = document.querySelector(".js-map");
var touchStart = null;
var touchPosition = null;
map.addEventListener("touchstart", touchStartHandle); //
map.addEventListener("touchmove", touchMoveHandle); //
map.addEventListener("touchend", touchEndHandle);
map.addEventListener("touchcancel", touchEndHandle);

function touchStartHandle(e) {
  fullpage_api.setAllowScrolling(false);
  touchStartHandle = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
  touchPosition = { x: touchStartHandle.x, y: touchStartHandle.y };
  formFold();
}
function touchMoveHandle(e) {
  e.stopPropagation();
  touchPosition = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
}
function touchEndHandle(e) {
  fullpage_api.setAllowScrolling(true);
  if(isSwipeDown()) formFold();
  touchStartHandle = null;
  touchPosition = null;
}
function isSwipeDown() {
  var d = {
      x: touchStartHandle.x - touchPosition.x,
      y: touchStartHandle.y - touchPosition.y,
    };

  if (Math.abs(d.y) > swipeSensitivity) {
    if (d.y < 0) {
      return true;
    }
    else return false;
  }
}
