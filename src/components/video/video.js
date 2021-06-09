// video
screenfull.on("change", function (e) {
  const videoWrapper = e.target;
  const video = videoWrapper.querySelector("video");
  if (video) {
    video.controls = screenfull.isFullscreen;
    video.paused = !screenfull.isFullscreen;
  }
  fullpage_api.setAllowScrolling(!screenfull.isFullscreen);
});

function showFullscreenVideo(videoWrapper) {
  const video = videoWrapper.querySelector("video");
  if (screenfull.isEnabled && !screenfull.isFullscreen) {
    screenfull.request(videoWrapper);
  }
  if(video.autoplay) video.load();
  else {
    video.play();
  }
}

function closeFullscreen() {
  screenfull.exit();
}