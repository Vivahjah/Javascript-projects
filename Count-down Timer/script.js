const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');

let formatTime = (time) => time < 10 ? `0${time}` : time;

// incase is not showing well, Update this date
const newYears = '1 May 2022';

const countdown = () => {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    const totalSeconds = (newYearsDate - currentDate) / 1000;
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(minutes);
    secEl.innerHTML = formatTime(seconds);
}




countdown();
setInterval(countdown, 1000);