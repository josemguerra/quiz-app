const gameData = [
  {
    question:
      "A small bunch of herbs, tied together, that is added to stews or casseroles for flavour.",
    answers: ["Bouquet garni", "Crudité", "Beignet", "Tuile"],
    correct: 1,
  },
  {
    question:
      "French-style, bite-sized sweetmeats and cakes served with coffee.",
    answers: ["Coulis", "Crêpe", "Petits fours", "Canapé"],
    correct: 3,
  },
  {
    question:
      "A French term describing the continual tossing of food in shallow fat so that it browns evenly.",
    answers: ["Pan frying", "Basting", "Sautéeing", "Braising"],
    correct: 3,
  },
  {
    question:
      "Extracting the flavours of spices or herbs by soaking them in liquid heated in a covered pan.",
    answers: ["Blanching ", "Curdling", "Brine", "Infusing"],
    correct: 4,
  },
  {
    question:
      "A French dish that has been sprinkled with sugar and grilled until a caramelized crust has formed on top.",
    answers: ["Julienne", "Brulée", "Caramel", "Flambé"],
    correct: 2,
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
const answersContainer = document.querySelector("#answers-container");
const scoreCard = document.querySelector("#score-card");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

let scoreIndex = 0;
let questionIndex = 0;
quizContainer.style.display = "none";

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  next();
});
tryAgainButton.addEventListener("click", () => {
  location.reload();
});

function next() {
  questionIndex++;
  quizContainer.style.backgroundColor = "inherit";
  activateButtons();
  hideNexButton()
  startQuiz();
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
function hideNexButton() {
  nextButton.style.display = "none";
}
function displayNexButton() {
  nextButton.style.display = "flex";
}

function startGame() {
  activateButtons();
  bannerText.textContent = "";
  headerText.textContent = `Hello ${userName.value}! welcome to my Quiz.`;
  userNameContainer.style.display = "none";
  tryAgainButton.style.display = "none";
  quizContainer.style.display = "flex";
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
    hideNexButton()    
    tryAgainButton.style.display = "flex";
  }
}

function selectedAnswer(e) {
  let currentQuestion = gameData[questionIndex];
  let currentAnswer = currentQuestion.answer;
  let currentButton = e.currentTarget.answerId;
  const currentCorrect = currentQuestion.correct;
  let isCorrect = currentCorrect === currentButton;
  if (isCorrect) {
    scoreIndex++;
    quizContainer.style.backgroundColor = "green";
    currentScore();
  } else {
    quizContainer.style.backgroundColor = "red";
  }
  displayNexButton()
  deactivateButtons();
}
function currentScore() {
  scoreCard.textContent = `${scoreIndex} / ${gameData.length}`;
}

startQuiz();
