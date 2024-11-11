// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate;
const date = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);

    if (date.getTime() > userSelectedDate.getTime()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 5000,
        progressBarColor: '#E5E5E5',
      });
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(datePicker, options);

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) {
    return;
  }

  startBtn.setAttribute('disabled', 'true');
  datePicker.setAttribute('disabled', 'true');

  startTimer(userSelectedDate);
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

  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
}

function addLeadingZero(value) {
  if (value < 10) {
    return String(value).padStart(2, '0');
  }
  return value;
}

function startTimer(targetDate) {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      document.querySelector('[data-start]').setAttribute('disabled', 'true');
      document.querySelector('#datetime-picker').removeAttribute('disabled');
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(timeRemaining);
    updateTimer(time);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
