/*jshint esversion: 6 */

// Variable containing the quiz questions

const gameData = [
  {
    question:
      'A small bunch of herbs, tied together, that is added to stews or casseroles for flavour.',
    answers: ['Bouquet garni', 'Crudité', 'Beignet', 'Tuile'],
    correct: 1,
  },
  {
    question:
      'French-style, bite-sized sweetmeats and cakes served with coffee.',
    answers: ['Coulis', 'Crêpe', 'Petits fours', 'Canapé'],
    correct: 3,
  },
  {
    question:
      'A French term describing the continual tossing of food in shallow fat so that it browns evenly.',
    answers: ['Pan frying', 'Basting', 'Sautéeing', 'Braising'],
    correct: 3,
  },
  {
    question:
      'Extracting the flavours of spices or herbs by soaking them in liquid heated in a covered pan.',
    answers: ['Blanching ', 'Curdling', 'Brine', 'Infusing'],
    correct: 4,
  },
  {
    question:
      'A French dish that has been sprinkled with sugar and grilled until a caramelized crust has formed on top.',
    answers: ['Julienne', 'Brulée', 'Caramel', 'Flambé'],
    correct: 2,
  },
  {
    question:
      'An activity often used to assess the skills and training of a cooking job candidate.',
    answers: ['Barding', 'Practice', 'Sharpen', 'Stage'],
    correct: 4,
  },
  {
    question:
      'The preparation of a meal from whatever ingredients happen to be on hand.',
    answers: ['Bricolage', 'Once-a-month cooking', 'Pairing', 'Whip'],
    correct: 1,
  },
  {
    question:
      'Cooking food, usually vegetables, very gently in melted fat to release juices for flavour, but without allowing the food to brown.',
    answers: ['Tossing', 'Sweating', 'Stirring ', 'Folding'],
    correct: 2,
  },
  {
    question:
      'To loosen the brown bit from a pan by adding liquid and then scraping the bits off the pan.',
    answers: ['Dredge', 'Caramelize', 'Deglaze', 'Scrape'],
    correct: 3,
  },
  {
    question:
      'To cook the fat out of meat or poultry over a low heat, in order to preserve the drippings.',
    answers: ['Render', 'confit', 'Reduce', 'Roux'],
    correct: 1,
  },
];

// Variables of Selected elements

const bannerText = document.querySelector('#banner');
const userNameContainer = document.querySelector('#user-name-container');
const welcomeText = document.querySelector('#welcomeText');
const feedbackText = document.querySelector('#feedback-text');
const userName = document.querySelector('#username');
const startButton = document.querySelector('#start-button');
const nextButton = document.querySelector('#next-button');
const tryAgainButton = document.querySelector('#reload-button');
const quizContainer = document.querySelector('#quiz-container');
const questionText = document.querySelector('#question');
const modalMessage = document.querySelector('#modal-message');
const answersContainer = document.querySelector('#answers-container');
const scoreCard = document.querySelector('#score-card');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');

let scoreIndex = 0;
let questionIndex = 0;

//  // Wait for the DOM to finish loading before running the game.

document.addEventListener('DOMContentLoaded', () => {
  userName.focus(), (feedbackText.textContent = '');
});
//  Event listeners control buttons

startButton.addEventListener('click', e => {
  e.preventDefault(), validateUser();
});
userName.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    validateUser();
  }
});

nextButton.addEventListener('click', () => {
  next();
});

tryAgainButton.addEventListener('click', () => {
  location.reload();
});

/**
 * Validates that username input is not left empty.
 */
function validateUser() {
  const userVal = document.querySelector('#username');
  if (userVal.value == '') {
    document.getElementById('welcomeText').style.color = 'red';
  } else {
    document.getElementById('welcomeText').style.color = 'black';
    startGame();
  }
}
/**
 * Activate answer buttons individually.
 */
function activateButtons() {
  answersContainer.querySelectorAll('.answer-button').forEach((button, key) => {
    button.addEventListener('click', selectedAnswer);
    button.answerId = key + 1;
  });
}
/**
 * Deactivate answer buttons to prevent answering multiple times the same question.
 */
function deactivateButtons() {
  answersContainer.querySelectorAll('.answer-button').forEach((button, key) => {
    button.removeEventListener('click', selectedAnswer);
    button.answerId = key + 1;
  });
}
// This functions hide and display DOM elements for user interactivity

function hideQuiz() {
  quizContainer.style.display = 'none';
}
hideQuiz();

function displayQuiz() {
  quizContainer.style.display = 'flex';
}
/**
 * This hides Next button in between question to avoid skipping question without answering them.
 */
function hideNexButton() {
  nextButton.style.display = 'none';
}
/**
 * Next button is displayed so the user can move into the next question of the quiz.
 */
function displayNexButton() {
  nextButton.style.display = 'flex';
}
/**
 * This will hide Username Input and Start button, and display the Quiz questions as well as answer buttons  and Score area.
 * It will display a welcome message with the chosen username.
 * It will hide quiz banner text.
 * It will hide try again button to avoid page reload without answering all the questions.
 */
function startGame() {
  activateButtons();
  hideNexButton();
  bannerText.textContent = '';
  welcomeText.textContent = `Hello ${userName.value}, welcome!`;
  userNameContainer.style.display = 'none';
  tryAgainButton.style.display = 'none';
  displayQuiz();
}
/**
 * This will initiate the quiz iterating through questions and answers.
 *
 */
function startQuiz() {
  const currentGameData = gameData[questionIndex];
  if (questionIndex < gameData.length) {
    questionText.innerText = `${questionIndex + 1}. ${
      currentGameData.question
    }`;
    answer1.innerHTML = currentGameData.answers[0];
    answer2.innerHTML = currentGameData.answers[1];
    answer3.innerHTML = currentGameData.answers[2];
    answer4.innerHTML = currentGameData.answers[3];
  } else {
    answersContainer.style.display = 'none';
    questionText.innerText = 'Quiz Completed!';
    welcomeText.textContent = '';
    hideNexButton();
    tryAgainButton.style.display = 'flex';
  }
}
/**
 * Check that the button pressed is linked with the correct answer.
 * If it is correct,increments score by one and changes background color to green.
 * Otherwise will change background color to red .
 */
function selectedAnswer(e) {
  let currentQuestion = gameData[questionIndex];
  let currentButton = e.currentTarget.answerId;
  const currentAnswer = currentQuestion.correct;
  let isCorrect = currentAnswer === currentButton;
  if (isCorrect) {
    scoreIndex++;
    quizContainer.style.backgroundColor = 'green';
    currentScore();
  } else {
    quizContainer.style.backgroundColor = 'red';
  }
  displayNexButton();
  deactivateButtons();
}
// Next question

function next() {
  questionIndex++;
  quizContainer.style.backgroundColor = '';
  activateButtons();
  hideNexButton();
  startQuiz();
  fullScore();
}
/**
 * Calcutaled Score by comparing number questions that had been answered correctly against the total amount.
 */
function currentScore() {
  scoreCard.textContent = `${scoreIndex} / ${gameData.length}`;
}
// Displays a thank you message using the user name.

function thankYouMessage() {
  feedbackText.textContent = `Thank you for taking my Quiz ${userName.value}!`;
}

/**
 * This will display a Modal  message if the user answers all questions and them all are right.
 */
function fullScore() {
  if (scoreIndex === gameData.length) {
    modalMessage.classList.add('active');
    hideQuiz();
    setTimeout(() => {
      modalMessage.classList.remove('active');
    }, 3300);
    setTimeout(() => {
      displayQuiz();
      thankYouMessage();
    }, 3300);
  }
}

startQuiz();
