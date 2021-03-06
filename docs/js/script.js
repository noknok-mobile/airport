// contacts
document.querySelector(".js-form-expand").addEventListener("click", formExpand);

function formFold() {
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_fold");
}

function formExpand() {
  document
    .querySelector(".js-form-wrapper")
    .classList.remove("form-wrapper_fold");
}

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
  touchPosition = {
    x: touchStartHandle.x,
    y: touchStartHandle.y
  };
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
  if (isSwipeDown()) formFold();
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
    } else return false;
  }
}

Inputmask({
  mask: "+7 (999) 999-99-99"
}).mask('.input[name="phone"]');

//form validation
{
  const form = document.forms.feedback;
  form.setAttribute('novalidate', '');
  const formMessage = document.querySelector(".form__message");
  form.addEventListener("input", function () {
    hideErrorMessage(formMessage);
  });

  function showErrorMessage(msg, formMessage) {
    formMessage.classList.add("form__message_active");
    formMessage.innerText = msg;
  }

  function hideErrorMessage(formMessage) {
    formMessage.classList.remove("form__message_active");
  }

  const rules = (document.documentElement.lang === 'ru') ? [{
      name: "name",
      rules: "required|!callback_cyrillic",
      display: "??????",
    },
    {
      name: "org",
      rules: "!callback_cyrillic",
      display: "??????????????????????",
    },
    {
      name: "phone",
      rules: "required|!callback_phone",
      display: "??????????????",
    },
    {
      name: "email",
      rules: "valid_email|required",
      display: "E-mail",
    },
  ] : [{
      name: "name",
      rules: "required",
      display: "Name",
    },
    {
      name: "org",
      rules: "alpha_numeric",
      display: "Organization",
    },
    {
      name: "phone",
      rules: "required|!callback_phone",
      display: "Phone",
    },
    {
      name: "email",
      rules: "valid_email|required",
      display: "E-mail",
    },
  ];
  const validator = new FormValidator("feedback", rules, (errors, event) => {
    event.preventDefault();
    errors.forEach((elem) => showErrorMessage(elem.message, formMessage));
    if (!errors.length) formSubmit(event);
    console.log(errors);
  });

  validator.registerCallback('cyrillic', function (value) {
    const regexp = /^[??-????a-z\s]*$/gi;
    return regexp.test(value);
  });
  validator.registerCallback('phone', function (value) {
    const regexp = /[^_]$/gi;
    return regexp.test(value);
  });

  if (document.documentElement.lang === 'ru') {
    validator.setMessage("required", "???????? %s ?????????????????????? ?????? ????????????????????");
    validator.setMessage("valid_email", "?????????????? ???????????????????? %s");
    validator.setMessage("cyrillic", "???????? %s ?????????? ?????????????????? ???????????? ??????????");
    validator.setMessage('phone', "???????????????????????? ?????????? ????????????????");
  } else
    validator.setMessage('phone', "Phone is incorrect");

}
async function formSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let response = await fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  });
  if (response.ok) {
    let result = await response.text();
    console.log(result);
    // document.querySelector(".js-form-wrapper").classList.add("form-wrapper_submitted"); //???????????????? ???? ?????????????? ?? ?????????????? ????????
  }
  // ???? ?????????????? ????????????????
  document.querySelector(".js-form-wrapper").classList.add("form-wrapper_submitted");
}
//gallery
const imageThumbs = document.querySelectorAll(".js-image-thumb");
const gallery = document.querySelector('.gallery__images');
const galleryItemName = "gallery__image";
for (let thumb of imageThumbs) {
    if (window.innerWidth > 1200) {
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


// fullpage
new fullpage('#fullpage', {
  anchors: ['main', 'about', 'timer', 'indexes', 'gallery','news','contacts'],
  menu: '#menu',
  sectionSelector:'.screen',
  autoScrolling: true,
  licenseKey:'E76E6B00-ADE4458F-A92E04CA-F5831DFE',
  normalScrollElements: ".js-news-list, .map-wrapper",
  scrollHorizontally: false,
  loopBottom: true,
  loopTop: true,
  responsiveWidth: 1200,
  responsiveHeight: 560
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
  perView:2,
  bound:true,
  breakpoints:{
    768: {
      perView:1,
    }
  }
}).mount();

//intro
const introWrapper = document.querySelector(".js-intro");
const introVideo = introWrapper.querySelector("video");
if(window.innerWidth > 1200) introVideo.autoplay = true;
introWrapper.addEventListener('click', (e)=>{
    console.log(navigator.userAgent);
    showFullscreenVideo(introWrapper);
});
document.querySelector('.js-mobile-play').addEventListener('click', (e)=>showFullscreenVideo(introWrapper));
// news
const newsItemDetailClass = 'news-detail';
const detailContainerClass = 'js-news-detail';
const triggerClass = `js-news-detail-show`;
const listWrapperClass = 'js-news-list';
const detailContainer = document.querySelector(`.${detailContainerClass}`);
const newsListWrapper = document.querySelector(`.${listWrapperClass}`);

for(let elem of document.querySelectorAll(`.${triggerClass}`)){
    elem.addEventListener('click', openDetail);
}
document.querySelector('.js-news-detail__close').addEventListener('click', closeDetail);

function openDetail(e){
    // e.preventDefault();
    if(!detailContainer.classList.contains(`${detailContainerClass}_open`)){
        detailContainer.classList.add(`${detailContainerClass}_open`);
        newsListWrapper.classList.add(`${listWrapperClass}_fold`);
        
    }
    else detailContainer.classList.remove(`${detailContainerClass}_idle`);
    slideImage(e, newsItemDetailClass);
    if(window.innerWidth < 1200 ) setAllowScrolling(false);

}
function closeDetail(){
    detailContainer.classList.add(`${detailContainerClass}_idle`);
    detailContainer.classList.remove(`${detailContainerClass}_open`);
    newsListWrapper.classList.remove(`${listWrapperClass}_fold`);
    if(window.innerWidth < 1200 ) setAllowScrolling(true);
}
function setAllowScrolling(status){
    if(!status) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
}

// scroll mouse
let target = document.querySelector('.scrollMouse');
target.addEventListener('wheel', function(e){
  const toLeft  = e.deltaY > 0 && target.scrollLeft < 0;
  const toRight = e.deltaY < 0 && target.scrollLeft < target.scrollWidth - target.clientWidth;

  if (toLeft || toRight) {
    e.preventDefault();
    let offset = e.deltaY > 0? 1: -1;
     e.currentTarget.scrollBy(offset*40, 0);
  }
})

// custom cursor
function globalCursorHandler(e, cursor){
    cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
}

const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e)=>globalCursorHandler(e, cursor));
window.addEventListener('mouseleave', (e)=>hideCursor(e, cursor));

for(trigger of document.querySelectorAll('.js-cursor-trigger')){
    trigger.addEventListener('mouseenter', (e)=>highlightCursor(e, cursor));
    trigger.addEventListener('mouseleave', (e)=>hideCursor(e, cursor));

}
function highlightCursor(e, cursor){
    cursor.classList.add(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.add('cursor_triggered');
    cursor.classList.remove('cursor_hidden');
    
}
function hideCursor(e, cursor){
    cursor.classList.remove(`cursor_${e.target.dataset.cursor}`);
    cursor.classList.remove('cursor_triggered');
    cursor.classList.add('cursor_hidden');

}
// menu
const menuToggle = document.querySelector(".js-menu-toggle");
const menuContainer = document.querySelector(".menu-wrapper");
const mobileMenu = document.querySelector(".menu-mobile");
menuToggle.addEventListener("click", toggleMenu);
menuContainer.addEventListener("click", function (e) {
  if (
    !mobileMenu.contains(e.target) ||
    e.target.classList.contains("menu-mobile__item")
  )
    toggleMenu();
});
function toggleMenu(e) {
  menuContainer.classList.toggle("js-menu_open");
}

// timer start
const phrases = {
    sec: ['??????????????','??????????????','????????????'],
    min: ['????????????','????????????','??????????'],
    hour: ['??????','????????','??????????'],
    day: ['????????','??????','????????']
}
const cases = {
    nominative: 0,
    accusative: 1,
    genitive: 2
}
function isTeen(dozensCount){//???????? ?????????? -??????????
    return Boolean(dozensCount >= 1 && dozensCount <= 2);
}
function getCase(count){
    let dozensCount = count / 10 % 10;
    let lastDigit = count % 10;
    if (isTeen(dozensCount) || lastDigit >= 5 || lastDigit == 0) return cases.genitive;
    if (lastDigit == 1) return cases.nominative;
    if (lastDigit > 1 && lastDigit < 5) return cases.accusative;
}
function getCasePhrase(count, valueType){
    const phraseCase = getCase(count);
    return phrases[valueType][phraseCase];
}

let dateAttr = document.querySelector('.timer').dataset.end;
let date = new Date(dateAttr);

function getCountdownTime() {
    let now = new Date();
    gap = date - now;
    if (gap < 0) {
        clearInterval(timerInterval);
    } else {

        let days = Math.floor(gap / 1000 / 60 / 60 / 24);
        let hours = Math.floor(gap / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(gap / 1000 / 60) % 60;
        let seconds = Math.floor(gap / 1000) % 60;

        document.querySelector('span[data-type="day"]').innerText = days;
        document.querySelector('span[data-type="hour"]').innerText = hours;
        document.querySelector('span[data-type="min"]').innerText = minutes;
        document.querySelector('span[data-type="sec"]').innerText = seconds;
        document.querySelector('[data-type="day"]').dataset.text = getCasePhrase(days, 'day');
        document.querySelector('[data-type="hour"]').dataset.text = getCasePhrase(hours, 'hour');
        document.querySelector('[data-type="min"]').dataset.text = getCasePhrase(minutes, 'min');
        document.querySelector('[data-type="sec"]').dataset.text = getCasePhrase(seconds, 'sec');
    }
}

let timerInterval = setInterval(getCountdownTime, 1000);

getCountdownTime();

// video
screenfull.on("change", function (e) {
  const videoWrapper = e.target;
  const video = videoWrapper.querySelector("video");
  if (video) {
    video.controls = screenfull.isFullscreen;
    if(!video.autoplay) video.paused = !screenfull.isFullscreen;
  }
  fullpage_api.setAllowScrolling(!screenfull.isFullscreen);
});

function showFullscreenVideo(videoWrapper) {
  const video = videoWrapper.querySelector("video");
  console.log(video);
  if (screenfull.isEnabled && !screenfull.isFullscreen) {
    screenfull.request(videoWrapper);
    if(video.autoplay) video.currentTime = 0;
  }

  if(video.paused){
    video.play();
  }
}

function closeFullscreen() {
  screenfull.exit();
}