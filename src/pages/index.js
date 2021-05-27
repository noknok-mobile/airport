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

//gallery
function showActiveItem(id, className) {
  const activeClass = `${className}_current`;
  let lastCurrentElem = document.querySelector(`.${activeClass}`) ?? null;
  if (lastCurrentElem) lastCurrentElem.classList.remove(activeClass);

  document.querySelector(`[data-link=${id}]`).classList.add(activeClass);
}
const imageThumbs = document.querySelectorAll(".js-image-thumb");
for (let thumb of imageThumbs) {
  thumb.addEventListener("click", showImage);
}
function showImage(e) {
  const galleryItemName = "gallery__image";
  let targetId = e.currentTarget.getAttribute("href").replace(/#/, "");

  if (document.querySelector(`[data-link=${targetId}]`))
    showActiveItem(targetId, galleryItemName);
}

const videoThumbs = document.querySelectorAll(".js-video-thumb");
for (let thumb of videoThumbs) {
  thumb.addEventListener("click", openVideo);
}
function openVideo(e){
    let targetId = e.currentTarget.getAttribute("href").replace(/#/, "");
    const videoWrapper = document.querySelector(`.gallery__video[data-link=${targetId}] `);
    console.log(videoWrapper);
    videoWrapper.classList.add('gallery__video_open');
    videoWrapper.requestFullscreen();

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


