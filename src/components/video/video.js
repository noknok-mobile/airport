// video 
screenfull.on('change', function(e){
  console.log(e);
  const video = e.target.querySelector('video'); 
  if (video) video.controls = screenfull.isFullscreen;
});

function showFullscreenVideo(videoWrapper) {
  const video = videoWrapper.querySelector('video');
  video.currentTime = 0;
  if(video.paused) video.play();

  if (screenfull.isEnabled && !screenfull.isFullscreen) {
    screenfull.request(videoWrapper);
  }
}

function closeFullscreen() {
  screenfull.exit();
}
function playVideo(elem) {
  const video = elem.querySelector(".video")|| elem.parentNode.querySelector(".video");
  video.play();
}
