//gallery
const imageThumbs = document.querySelectorAll(".js-image-thumb");
const gallery = document.querySelector('.gallery__images');
const galleryItemName = "gallery__image";
for (let thumb of imageThumbs) {
    if (window.innerWidth > 960) {
        thumb.addEventListener("click", (e)=>slideImage(e, galleryItemName));
    } else {
        thumb.addEventListener("click", (e)=>scrollToImage(e,gallery));

    }
}

function slideImage(e, itemClass) {
  const targetItem = selectImage(e);
    if(targetItem) showActiveItem(targetItem, itemClass);
}

function scrollToImage(e){
    targetElem = selectImage(e);
    const pos = targetElem.getBoundingClientRect().x;
    gallery.scrollBy({left: pos, behavior: 'smooth'});
}

function selectImage(e){
    let targetId = e.currentTarget.getAttribute("href").replace(/#/, "");
    return document.querySelector(`[data-link=${targetId}]`);
}

function showActiveItem(elem, className) {
  const activeClass = `${className}_current`;
  let lastCurrentElem = document.querySelector(`.${activeClass}`) ?? null;
  if (lastCurrentElem) lastCurrentElem.classList.remove(activeClass);

  elem.classList.add(activeClass);
}

const videoThumbs = document.querySelectorAll(".js-video-thumb");
for (let thumb of videoThumbs) {
  thumb.addEventListener("click", openVideo);
}
function openVideo(e) {
  let targetId = e.currentTarget.getAttribute("href").replace(/#/, "");
  const videoWrapper = document.querySelector(
    `.gallery__video[data-link=${targetId}] `
  );
  console.log(videoWrapper);
  videoWrapper.classList.add("gallery__video_open");
  showFullscreenVideo(videoWrapper);

}

