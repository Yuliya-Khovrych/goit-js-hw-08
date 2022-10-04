var throttle = require('lodash.throttle');
//console.log(throttle);

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const message = document.querySelector('textarea');
form.addEventListener('input', throttle(onInput), 500);
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  evt.preventDefault();
  //const { input, message } = evt.currentTarget.elements;
  const data = { email: input.value, message: message.value };

  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function updateIntput() {
  if (localStorage.getItem('feedback-form-state') !== null) {
    try {
      const parsedData = JSON.parse(
        localStorage.getItem('feedback-form-state')
      );
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
}
updateIntput();

function onSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  const dataOutput = {
    email: email.value,
    message: message.value,
  };
  console.log(dataOutput);
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
