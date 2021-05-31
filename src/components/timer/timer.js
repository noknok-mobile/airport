// timer start
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
