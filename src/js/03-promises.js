import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector("input[name='delay']"),
  stepEl: document.querySelector("input[name='step']"),
  amountEl: document.querySelector("input[name='amount']"),
};

let formDate = {};

refs.formEl.addEventListener('input', savingEnteredData);
refs.formEl.addEventListener('submit', renderPromise);

function savingEnteredData(e) {
  formDate[e.target.name] = Number(e.target.value);
}
function renderPromise(e) {
  e.preventDefault();

  const { delay, step, amount } = formDate;
  let updatedDelay = delay;

  if (delay < 0 || step < 0 || amount <= 0) {
    checkingValues({ delay, step, amount });
    clearingFormData();
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, updatedDelay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));

    updatedDelay += step;
  }
  clearingFormData(updatedDelay + step);
}
function checkingValues({ delay, step, amount }) {
  if (delay < 0) {
    Notify.warning('Delay must be greater than or equal to 0');
  }
  if (step < 0) {
    Notify.warning('Step must be greater than or equal to 0');
  }
  if (amount <= 0) {
    Notify.warning('Amount must be greater than 0');
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
function clearingFormData(delay) {
  setTimeout(() => {
    refs.delayEl.value = '';
    refs.stepEl.value = '';
    refs.amountEl.value = '';
    formDate = {};
  }, delay);
}