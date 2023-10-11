
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dayValue = document.querySelector('[data-days]');
const hourValue = document.querySelector('[data-hours]');
const minuteValue = document.querySelector('[data-minutes]');
const secondValue = document.querySelector('[data-seconds]');

flatpickr(date, {
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
      Notiflix.Notify.failure('Por favor marque una fecha del futuro');
    }
  },
});

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

let countId 

function calculateCount() {
    const currentDate = new Date();
    const selectedDate = new Date(date.value);
    const timeDifference = selectedDate - currentDate;
  
    if (timeDifference <= 0) {
      clearInterval(countId);
      Notiflix.Notify.success('Conteo regresivo terminado!!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      dayValue.textContent = addLeadingZero(days);
      hourValue.textContent = addLeadingZero(hours);
      minuteValue.textContent = addLeadingZero(minutes);
      secondValue.textContent = addLeadingZero(seconds);
    }
  }

  startButton.addEventListener('click', function () {
    countId = setInterval(calculateCount, 1000);
    startButton.setAttribute('disabled', 'true');
  });

