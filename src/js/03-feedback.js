var throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const message = document.querySelector('textarea');
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  const data = {
    email: email.value,
    message: message.value,
  };
  const saveData = throttle(
    localStorage.setItem('feedback-form-state', JSON.stringify(data)),
    500
  );
}

if (localStorage.getItem('feedback-form-state') !== null) {
  try {
    const parsedData = JSON.parse(localStorage.getItem('feedback-form-state'));
    //console.log(parsedData);
    input.value = parsedData.email;
    message.value = parsedData.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
} else {
  input.value = '';
  message.value = '';
}

function onSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
