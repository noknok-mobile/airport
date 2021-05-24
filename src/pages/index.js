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
const activeClass = "gallery__image_current";

function showActiveImage(id) {
  const elements = document.querySelectorAll(".gallery__image");
  for (elem of elements) {
    elem.classList.remove(activeClass);
  }
  document.querySelector(`[data-link=${id}]`).classList.add(activeClass);
}
window.addEventListener("hashchange", function () {
  let targetId = location.hash.replace(/#/, "");

  if (document.querySelector(`[data-link=${targetId}]`))
    showActiveImage(targetId);
});