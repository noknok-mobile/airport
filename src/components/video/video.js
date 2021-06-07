// video 
document.addEventListener("fullscreenchange", updateFullscreenSettings);

function showFullscreenVideo(videoWrapper) {
  if (!document.fullscreen) {
    const video = videoWrapper.querySelector('video');
    video.currentTime = 0;
    if(video.paused) video.play();
    videoWrapper.requestFullscreen();
  }
}
function updateFullscreenSettings(e) {
  const video = e.target.querySelector("video");
  if (video) video.controls = document.fullscreen;
  console.log("last time:" + video.currentTime);
}
function closeFullscreen() {
  document.exitFullscreen();
}
function playVideo(elem) {
  const video = elem.querySelector(".video")|| elem.parentNode.querySelector(".video");
  video.play();
}
