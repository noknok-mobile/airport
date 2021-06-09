//intro
const introWrapper = document.querySelector(".js-intro");
const introVideo = introWrapper.querySelector("video");
if(window.innerWidth > 960) introVideo.autoplay = true;
introWrapper.addEventListener('click', (e)=>{
    console.log(navigator.userAgent);
    showFullscreenVideo(introWrapper);
});
document.querySelector('.js-mobile-play').addEventListener('click', (e)=>showFullscreenVideo(introWrapper));