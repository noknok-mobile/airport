const videoWrapper = document.querySelector('.video-wrapper');
const video = document.querySelector('video');
video.onclick = function () {
    if (!document.fullscreen) {
        videoWrapper.requestFullscreen();
        video.controls = true;
    }
}
document.querySelector('.js-video-close').addEventListener('click', function () {
    document.exitFullscreen();
})
document.addEventListener('fullscreenchange', function (e) {
    if (!document.fullscreen)
        video.controls = false;
})