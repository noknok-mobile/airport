let handleMouse = true;
const cursor = document.querySelector('.cursor_local');
const globalCursor = document.querySelector('.cursor_fixed');

function mouseHandler(e){
    console.log({
        y: e.y, //alias for e.clientY
        clientY: e.clientY,//относительно viewport . Идеально для курсора на всем сайте с position:fixed
        layerY: e.layerY,//относительно текущего layer, non-standart, но в последних версиях всех браузеров поддерживается
        pageY: e.pageY,//относительно document
        screenY: e.screenY//относительно окна браузера!! это как относительно viewport, но со смещением ок 200px - высота строки поиска. В полноэкранном режиме относительно viewport
    })
}
function globalCursorHandler(e){
    globalCursor.style.top = `${e.clientY}px`;
    globalCursor.style.left = `${e.clientX}px`;
}
function localCursorHandler(e){
    // mouseHandler(e);
    const elemDimensions = e.target.getBoundingClientRect();
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;//перескакивет!!!!    
    // let top = elemDimensions.top;
    // let bottom = elemDimensions.bottom;
    // if(e.pageY > top && e.pageY < bottom){
    // }
}
document.body.addEventListener('mousemove', localCursorHandler);
document.addEventListener('keydown', function(e){
    if(e.code = "Space") {
        e.preventDefault();
        handleMouse = !handleMouse;
        console.log(`handleMouse = ${handleMouse}`);
        if(handleMouse) document. body.removeEventListener('mousemove', localCursorHandler);
        else document.body.addEventListener('mousemove', localCursorHandler);
    }
})


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
stripe.onclick = function() {
    stripe.classList.add('animate');
  };
for(let elem of document.querySelectorAll('.js-more-show')){
    elem.addEventListener('click', (e)=>{
        e.preventDefault();
        document.querySelector('.js-more').classList.add('js-more_open');
    })
}
document.querySelector('.js-more-close').addEventListener('click', (e)=>{
    document.querySelector('.js-more').classList.remove('js-more_open');
});

const phrases = {
    sec: ['секунда','секунды','секунд'],
    min: ['минута','минуты','минут'],
    hour: ['час','часа','часов'],
    day: ['день','дня','дней']
}
const cases = {
    nominative: 0,
    accusative: 1,
    genitive: 2
}
function isTeen(dozensCount){//если число -дцать
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