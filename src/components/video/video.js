document.addEventListener("fullscreenchange", updateFullscreenSettings);

function showFullscreenVideo(videoWrapper) {
  if (!document.fullscreen) {
    videoWrapper.requestFullscreen();
  }
}
function updateFullscreenSettings(e) {
  console.log(e.target);
  const video = e.target.querySelector("video");
  if (video) video.controls = document.fullscreen;
}
function closeFullscreen() {
  document.exitFullscreen();
}
function playVideo(elem) {
  const video = elem.querySelector(".video")|| elem.parentNode.querySelector(".video");
  video.play();
}
