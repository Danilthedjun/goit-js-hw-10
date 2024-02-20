import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const time = event.target.delay.value;
  const state = event.target.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(time);
      }
      reject(time);
    }, time);
  });

  promise
    .then(resolve => {
      iziToast.success({
        position: 'topRight',
        icon: 'none',
        message: `✅ Fulfilled promise in ${time}ms`,
      });
    })
    .catch(reject => {
      iziToast.error({
        position: 'topRight',
        icon: 'none',
        message: `❌ Rejected promise in ${time}ms`,
      });
    });
  event.target.reset();
});
