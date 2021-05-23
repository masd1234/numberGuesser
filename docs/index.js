let targetNumber = document.querySelector(".target");
let makeGuesButton = document.querySelector(".makeGuess");
let makeNextButtom = document.querySelector(".nextButtom");
let inputNumber = document.querySelector(".inputNumber");
let addButtom = document.querySelector(".main__ContainerButtom_plus");
let minusButtom = document.querySelector(".main__ContainerButtom_min");
let roundNumber = document.querySelector(".round");
let newGame = document.querySelector(".newGameButtom");
let next = document.querySelector(".nextGameButtom");
let numberCompt = document.querySelector(".numberComputer");
let humanScoreDom = document.querySelector(".humanScore");
let computerScoreDom = document.querySelector(".computerScore");
let userWinner = document.querySelector(".user");
let computerWinner = document.querySelector(".computer");

//* players scores */
let humanScore = 0;
let computerScore = 0;
let winningScore = 2;

/*starts a new round in the game*/
generateNextRound = () => {
  makeGuesButton.disable = false;
  addButtom.disable = false;
  minusButtom.disable = false;
  targetNumber.innerHTML = "?";
  makeGuesButton.style.backgroundColor = "hover";
};

/*Generates a number between 0 and 9 this is the number that the computer selects*/
generateNumberComputer = () => {
  let numberComp = Math.floor(Math.random() * 10);
  return numberComp;
};

/*Generates a number between 0 and 9 this is the number target that the player or the computer must aproach to*/
generateTarget = () => {
  let random = Math.floor(Math.random() * 10);
  /*if the number is less than 0 or greater than 9 game wont run*/
  if (inputNumber.value < 0 || inputNumber.value > 9) {
    alert("Your number must be between 0 and 9");
    throw "Your number must be between 0 and 9";
  } else {
    targetNumber.innerHTML = random;
    makeGuesButton.disable = true;
    addButtom.disable = true;
    minusButtom.disable = true;
    makeNextButtom.disable = false;
  }

  return random;
};

/*this function compares the difference between the target number and the computer number and the user's input */
compareGuesses = () => {
  let target = generateTarget();
  let human = inputNumber.value;
  let computer = generateNumberComputer();
  /*generates a absolute value in order to compare between the computer and the user's input*/
  let integerHuman = Math.abs(target - human);
  let integerComputer = Math.abs(target - computer);
  let resultWinner;
  numberCompt.innerHTML = computer;

  if (human === target) {
    resultWinner = true;
  } else if (computer === target) {
    resultWinner = false;
  } else if (human === computer || integerComputer === integerHuman) {
    resultWinner = "string";
  } else if (integerHuman < integerComputer) {
    resultWinner = true;
  } else if (integerHuman > integerComputer) {
    resultWinner = false;
  }

  return resultWinner;
};

win = () => {
  if (humanScore >= winningScore) {
    console.log(humanScore);
    return true;
  } else if (computerScore >= winningScore) {
    console.log(humanScore);
    return false;
  } else {
    return null;
  }
};

updateScore = () => {
  let winner = compareGuesses();
  let modelnewGame = win();

  if (modelnewGame === true) {
    document.querySelector(".modal_endgame").id = "starGame";
    document.querySelector(".winnerEndGame").innerHTML =
      "You Won!!! Congrast!!!";
  } else if (modelnewGame === false) {
    document.querySelector(".modal_endgame").id = "starGame";
    document.querySelector(".winnerEndGame").innerHTML =
      "The computer defeat you!!!";
  }

  if (winner === true) {
    humanScore++;
    humanScoreDom.innerHTML = humanScore;
    userWinner.innerHTML = "You won!!!!!!!!";
    document.querySelector(".main__containerYou").id = "won";
    document.querySelector(".main__containerComp").id = "lose";
  } else if (winner === false) {
    computerScore++;
    computerScoreDom.innerHTML = computerScore;
    computerWinner.innerHTML = "Computer Won!!!!!";
    document.querySelector(".main__containerYou").id = "lose";
    document.querySelector(".main__containerComp").id = "won";
  } else if (typeof winner === "string") {
    userWinner.innerHTML = "It is a tie";
    document.querySelector(".main__containerComp").id = "tie";
    document.querySelector(".main__containerYou").id = "tie";
  }
};

/*this function updates to 0 the round*/
advanceRound = () => {
  roundNumber.innerHTML++;
  makeNextButtom.disable = true;
  inputNumber.value = 0;
  numberCompt.innerHTML = 0;
  makeGuesButton.innerHTML = "Make a Guess";
  computerWinner.innerHTML = "Computer";
  userWinner.innerHTML = "User";
  document.querySelector(".main__containerYou").classList.add =
    "main__containerYou";
  document.querySelector(".main__containerYou").id = "";
  document.querySelector(".main__containerComp").id = "";
};

addOneInputNumber = () => {
  inputNumber.value++;
};

minusOneInputNumber = () => {
  if (inputNumber.value > 0) {
    inputNumber.value--;
  } else {
    return;
  }
};

resetGame = () => {
  advanceRound();
  inputNumber.value = 0;
  roundNumber.innerHTML = 1;
  makeNextButtom.disable = false;
  humanScoreDom.innerHTML = 0;
  computerScoreDom.innerHTML = 0;
  numberCompt.innerHTML = 0;
  targetNumber.innerHTML = 0;
  makeGuesButton.disable = false;
  humanScore = 0;
  computerScore = 0;
  document.querySelector(".modal_endgame").id = "startedGame";
  document.querySelector(".main__containerYou").id = "";
  document.querySelector(".main__containerComp").id = "";
};

makeGuesButton.addEventListener("click", updateScore);
makeNextButtom.addEventListener("click", advanceRound);
makeNextButtom.addEventListener("click", generateNextRound);
addButtom.addEventListener("click", addOneInputNumber);
minusButtom.addEventListener("click", minusOneInputNumber);
next.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
