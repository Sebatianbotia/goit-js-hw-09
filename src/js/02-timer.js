
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let countdownInterval;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      startButton.removeAttribute('disabled');
    } else {
      startButton.setAttribute('disabled', 'true');
      Notiflix.Notify.warning('Please choose a date in the future');
    
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
 
  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);
 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function calculateCountdown() {
  const currentDate = new Date();
  const selectedDate = new Date(datetimePicker.value);
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('Countdown finished!');
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', function () {
  countdownInterval = setInterval(calculateCountdown, 1000);
  startButton.setAttribute('disabled', 'true');
});
console.log(convertMs(2000)); 
console.log(convertMs(140000)); 
console.log(convertMs(24140000)); 

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', function () {
  countdownInterval = setInterval(calculateCountdown, 1000);
  startButton.setAttribute('disabled', 'true');
});