/**
 * Database of question and answers for the quiz.
 */
const gameData = [{
    question: "A small bunch of herbs, tied together, that is added to stews or casseroles for flavour.",
    answers: ["Bouquet garni", "Crudité", "Beignet", "Tuile"],
    correct: 1,
  },
  {
    question: "French-style, bite-sized sweetmeats and cakes served with coffee.",
    answers: ["Coulis", "Crêpe", "Petits fours", "Canapé"],
    correct: 3,
  },
  {
    question: "A French term describing the continual tossing of food in shallow fat so that it browns evenly.",
    answers: ["Pan frying", "Basting", "Sautéeing", "Braising"],
    correct: 3,
  },
  {
    question: "Extracting the flavours of spices or herbs by soaking them in liquid heated in a covered pan.",
    answers: ["Blanching ", "Curdling", "Brine", "Infusing"],
    correct: 4,
  },
  {
    question: "A French dish that has been sprinkled with sugar and grilled until a caramelized crust has formed on top.",
    answers: ["Julienne", "Brulée", "Caramel", "Flambé"],
    correct: 2,
  },
  {
    question: "An activity often used to assess the skills and training of a cooking job candidate.",
    answers: ["Barding", "Practice", "Sharpen", "Stage"],
    correct: 4,
  },
  {
    question: "The preparation of a meal from whatever ingredients happen to be on hand.",
    answers: ["Bricolage", "Once-a-month cooking", "Pairing", "Whip"],
    correct: 1,
  },
  {
    question: "Cooking food, usually vegetables, very gently in melted fat to release juices for flavour, but without allowing the food to brown.",
    answers: ["Tossing", "Sweating", "Stirring ", "Folding"],
    correct: 2,
  },
  {
    question: "To loosen the brown bit from a pan by adding liquid and then scraping the bits off the pan.",
    answers: ["Dredge", "Caramelize", "Deglaze", "Scrape"],
    correct: 3,
  },
  {
    question: "To cook the fat out of meat or poultry over a low heat, in order to preserve the drippings.",
    answers: ["Render", "confit", "Reduce", "Roux"],
    correct: 1,
  },
];
const bannerText = document.querySelector("#banner");
const userNameContainer = document.querySelector("#user-name-container");
const userName = document.querySelector("#username");
const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");
const tryAgainButton = document.querySelector("#reload-button");
const quizContainer = document.querySelector("#quiz-container");
const questionText = document.querySelector("#question");
const alert = document.querySelector("#alert");
const answersContainer = document.querySelector("#answers-container");
const scoreCard = document.querySelector("#score-card");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

let scoreIndex = 0;
let questionIndex = 0;
/**
 * Event Listeners
 */
document.addEventListener("DOMContentLoaded", () => {});

startButton.addEventListener("click", e => {
  e.preventDefault(), validateUser();
});
nextButton.addEventListener("click", () => {
  next();
});
tryAgainButton.addEventListener("click", () => {
  location.reload();
});

function validateUser() {
  const userVal = document.querySelector("#username");
  if (userVal.value == "") {
    document.getElementById("welcomeText").style.color = "red";
    userName.focus();
  } else {
    document.getElementById("welcomeText").style.color = "black";
    startGame();
  }
}

function activateButtons() {
  answersContainer.querySelectorAll(".answer-button").forEach((button, key) => {
    button.addEventListener("click", selectedAnswer);
    button.answerId = key + 1;
  });
}

function deactivateButtons() {
  answersContainer.querySelectorAll(".answer-button").forEach((button, key) => {
    button.removeEventListener("click", selectedAnswer);
    button.answerId = key + 1;
  });
}

function hideQuiz() {
  quizContainer.style.display = "none";
}
hideQuiz();

function displayQuiz() {
  quizContainer.style.display = "flex";
}

function hideNexButton() {
  nextButton.style.display = "none";
}

function displayNexButton() {
  nextButton.style.display = "flex";
}

function startGame() {
  activateButtons();
  hideNexButton();
  bannerText.textContent = "";
  welcomeText.textContent = `Hello ${userName.value}! welcome to my Quiz.`;
  userNameContainer.style.display = "none";
  tryAgainButton.style.display = "none";
  displayQuiz();
}

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
    answersContainer.style.display = "none";
    questionText.innerText = "Quiz Completed!";
    welcomeText.textContent = "";

    hideNexButton();
    tryAgainButton.style.display = "flex";
  }
}

function selectedAnswer(e) {
  let currentQuestion = gameData[questionIndex];
  let currentButton = e.currentTarget.answerId;
  const currentAnswer = currentQuestion.correct;
  let isCorrect = currentAnswer === currentButton;
  if (isCorrect) {
    scoreIndex++;
    quizContainer.style.backgroundColor = "green";
    currentScore();
  } else {
    quizContainer.style.backgroundColor = "red";
  }
  displayNexButton();
  deactivateButtons();
}

function next() {
  questionIndex++;
  quizContainer.style.backgroundColor = "inherit";
  activateButtons();
  hideNexButton();
  startQuiz();
  fullScore();
}

function currentScore() {
  scoreCard.textContent = `${scoreIndex} / ${gameData.length}`;
}

function thankYouMessage() {
  thankYouText.textContent = `Thank you for taking my Quiz ${userName.value}!`;
}
/**
 * This is a modal that will display if the user get all questions right
 */
function fullScore() {
  if (scoreIndex === gameData.length) {
    alert.classList.add("active");
    hideQuiz();
    setTimeout(() => {
      alert.classList.remove("active");
    }, 2500);
    setTimeout(() => {
      displayQuiz();
      thankYouMessage();
    }, 2700);
  }
}

startQuiz();