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
    }
}

let timerInterval = setInterval(getCountdownTime, 1000);

getCountdownTime();