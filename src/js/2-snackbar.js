// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formGenerator = document.querySelector('.form');
const fulfilledInput = document.querySelector("input[value='fulfilled']");
const rejectedInput = document.querySelector("input[value='rejected']");
const textDelayInput = document.querySelector("input[type='number']");

formGenerator.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(textDelayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledInput.checked) {
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            timeout: 2000,
            progressBarColor: '#E5E5E5',
          })
        );
      } else if (rejectedInput.checked) {
        reject(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            timeout: 2000,
            progressBarColor: '#E5E5E5',
          })
        );
      }
    }, delay);
  });

  promise
    .then(value => {
      console.log(value);
      resetInputs();
    })
    .catch(error => {
      console.log(error);
      resetInputs();
    });

  function resetInputs() {
    textDelayInput.value = '';
  }
});
