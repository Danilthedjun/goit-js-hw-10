import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
const input = document.querySelector('input');
button.setAttribute('disabled', 'true');

let userSelectedDate;
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      button.setAttribute('disabled', 'true');
    } else {
      button.removeAttribute('disabled');
      userSelectedDate = selectedDates[0].getTime();
    }
    console.log(selectedDates[0]);
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
button.addEventListener('click', event => {
  let ms = userSelectedDate - Date.now();
  button.setAttribute('disabled', 'true');
  input.setAttribute('disabled', 'true');

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  let intervalId;
  intervalId = setInterval(() => {
    let { days, hours, minutes, seconds } = convertMs(ms);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
      input.removeAttribute('disabled');
    }
    ms = ms - 1000;
  }, 1000);
});
