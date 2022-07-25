/*jshint esversion: 6 */
const feedbackText = document.querySelector('#feedback-text');
const userName = document.querySelector('#username');
const startButton = document.querySelector('#start-button');

document.addEventListener('DOMContentLoaded', () => {
  userName.focus(), (feedbackText.textContent = '');
});

/**
 * Validates that username input is not left empty.
 * Change heading element color to red if there is an attempt of leaving it
 * empty.
 * Trim() input so it does not validate with space key.
 */

function start() {
  startButton.addEventListener('click', e => {
    e.preventDefault();
    if (userName.value.trim() == '') {
      document.getElementById('welcomeText').style.color = 'red';
    } else {
      (document.getElementById('welcomeText').style.color = 'black'),
        localStorage.setItem('username', userName.value),
        (location.href = location.href.includes('github')
          ? '/quiz-app/game.html'
          : 'game.html');
    }
  });
}
start();
