let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultparas");

const p = document.createElement("p");
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value)
    validateGuess(guess)
  });
}

function validateGuess(guess) {    // to check if the user input is valid or not
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 0");
  } else if (guess > 100) {
    alert("Please enter a number less than or equal to 100");
  } else { 
    previousGuesses.push(guess);
    if (numGuesses === 10) {
      displayGuesses(guess);
      displayMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayGuesses(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  //cheking if guess is equals to the random number or not
  if (guess === randomNumber) {
    displayMessage(`You guessed it right! The number was ${randomNumber}`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Your guess is too low!");
  } else {
    displayMessage("Your guess is too high!");
  }
}

function displayGuesses(guess) {
  // to display the previous guesses
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses}`;
}


function displayMessage(message) {
  // to display the message to the user
  lowOrHi.innerHTML =`<h2>${message}</h2>`;
}

function endGame() {
  // to end the game and display the start over button
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<button><h2 id="newGame">Start New Game</h2></button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  // to start a new game
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuesses}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}


