/*jshint esversion: 6 */
const slideNav = document.querySelector('#slideNav');
const openBtn = document.querySelector('.open-button');
const closeBtn = document.querySelector('.close-button');
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#mail');
const messageInput = document.querySelector('#msg');
const errorsContainer = document.querySelector('.errors-container');
const errorsList = document.querySelector('.errors-list');

/**
 * Nav bar
 */
function openNav() {
  openBtn.addEventListener('click', e => {
    slideNav.style.width = '200px';
    openBtn.style.display = 'none';
  });
}
openNav();

function closeNav() {
  closeBtn.addEventListener('click', e => {
    slideNav.style.width = '0';
    openBtn.style.display = 'block';
  });
}
closeNav();

form.addEventListener('submit', e => {
  const errorMessages = [];
  clearErrors();

  /**
   * Ensure the username is at least 6 characters long.
   */
  if (nameInput.value.length < 4 || nameInput.value.trim() == '') {
    errorMessages.push('Username must be at least 4 characters');
  }
  /**
   *Ensure the password is at least 10 characters long.
   */
  if (emailInput.value.length < 10) {
    errorMessages.push('You have entered an invalid email address');
  }
  if (messageInput.value.length < 60) {
    errorMessages.push('Your message have to be at least 60 characters long');
  }
  /**
   * If there are any errors then prevent the form from submitting and show the
   * error messages.
   */
  if (errorMessages.length > 0) {
    showErrors(errorMessages);
    e.preventDefault();
  }
});
/**
 * Clear the form if there is no errors.
 */
function clearErrors() {
  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0]);
  }
  errorsContainer.classList.remove('show');
}
/**
 * Creates a list of error if input field are not fulfilled.
 */
function showErrors(errorMessages) {
  errorMessages.forEach(errorMessage => {
    const li = document.createElement('li');
    li.innerText = errorMessage;
    errorsList.appendChild(li);
  });
  errorsContainer.classList.add('show');
}
