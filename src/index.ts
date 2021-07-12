
/*window.addEventListener('DOMContentLoaded', (e:Event)=>{
  class DOMelements {
    constructor(domString: string) {
      this.domString = domString;
    }
  }
})*/


//* players scores */
let humanScore = 0;
let computerScore = 0;
let winningScore = 5;

// DOM Counters
let roundCounter = 1

//DOM Buttons
let targetNumber = document.querySelector(".target") as HTMLElement;
let makeGuesButton = document.querySelector(".makeGuess") as HTMLButtonElement;
let makeNextButtom = document.querySelector(".nextButtom") as HTMLButtonElement;
let addButtom = document.querySelector(".main__ContainerButtom_plus") as HTMLButtonElement;
let minusButtom = document.querySelector(".main__ContainerButtom_min") as HTMLButtonElement;
let newGame = document.querySelector(".newGameButtom") as HTMLButtonElement;
let next = document.querySelector(".nextGameButtom") as HTMLButtonElement;

// DOM Input number
let inputNumber = document.querySelector(".inputNumber") as HTMLInputElement;

// DOM Selectors
let roundNumber = document.querySelector(".round") as HTMLElement;
let numberCompt = document.querySelector(".numberComputer") as HTMLElement;
let humanScoreDom = document.querySelector(".humanScore") as HTMLElement;
let computerScoreDom = document.querySelector(".computerScore") as HTMLElement;
let userWinner = document.querySelector(".user") as HTMLElement;
let computerWinner = document.querySelector(".computer") as HTMLElement;


const modalEndgame = document.querySelector(".modal_endgame") as HTMLElement
const winnerEndGame = document.querySelector(".winnerEndGame") as HTMLElement
const mainContainerYou = document.querySelector(".main__containerYou") as HTMLElement
const mainContainerComputer = document.querySelector(".main__containerComp") as HTMLElement


//reads the value from the input field
const getVal =()=>{
  let DomInputValue = inputNumber.value
  let counterInput = 0
  return {
    DomInputValue,
    counterInput
  }
}

let getValueCall = getVal()

// start a new round in the game
const generateNextRound = () => {
    (<HTMLInputElement>makeGuesButton).disabled = false;
    (<HTMLInputElement>addButtom).disabled = false;
        (<HTMLInputElement>minusButtom).disabled = false;
  targetNumber.innerHTML = "?";
  makeGuesButton.style.backgroundColor = "hover";
};

/*Generates a number between 0 and 9 this is the number that the computer selects*/
const generateNumberComputer = () => {
  let numberComp = Math.floor(Math.random() * 10);
  return numberComp;
};

/*Generates a number between 0 and 9 this is the 
number target that the player or the computer must aproach to*/
const generateTarget = () => {
  let random = Math.floor(Math.random() * 10).toString();
  
  /*If the number is less than 0 or greater than 9 game wont run*/
  if (parseInt(inputNumber.value) < 0 || parseInt(inputNumber.value)> 9) {
    alert("Your number must be between 0 and 9");
    throw "Your number must be between 0 and 9";
  } else {
    getValueCall.counterInput = parseInt(inputNumber.value)
    targetNumber.innerHTML = random;
    makeGuesButton.disabled = true;
    addButtom.disabled = true;
    minusButtom.disabled = true;
    makeNextButtom.disabled = false;
  }

  return random;
};

/*This function compares the difference 
between the target number and the computer number and the user's input */
const compareGuesses = () => {
  let target = parseInt(generateTarget());
  let human = parseInt(inputNumber.value);
  let computer = generateNumberComputer();

  /*generates a absolute value in order to compare between the computer and the user's input*/
  let integerHuman = Math.abs(target - human);
  let integerComputer = Math.abs(target - computer);
  let resultWinner;
 
  numberCompt.innerHTML = computer.toString();

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

const win = () => {
  if (humanScore >= winningScore) {
    return true;
  } else if (computerScore >= winningScore) {
    return false;
  } else {
    return null;
  }
};

const makeGuess = () => {
  let winner = compareGuesses();
  let modelnewGame = win();
  makeNextButtom.disabled = false;
  if (modelnewGame === true) {
    modalEndgame.id = "starGame";
    winnerEndGame.innerHTML =
      "You Won!!! Congrast!!!";
  } else if (modelnewGame === false) {
    modalEndgame.id = "starGame";
    winnerEndGame.innerHTML =
      "The computer defeat you!!!";
  }

  if (winner === true) {
    humanScore++;
    humanScoreDom.innerHTML = humanScore.toString();
    userWinner.innerHTML = "You won!!!!!!!!";
    computerWinner.innerHTML = "Computer lost!!!";
    mainContainerYou.id = "won";
    mainContainerComputer.id = "lose";
  } else if (winner === false) {
    computerScore++;
    computerScoreDom.innerHTML = computerScore.toString();
    computerWinner.innerHTML = "Computer Won!!!!!";
    userWinner.innerHTML = "You lost!!!";
    mainContainerYou.id = "lose";
    mainContainerComputer.id = "won";
  } else if (typeof winner === "string") {
    userWinner.innerHTML = "It is a tie";
    mainContainerComputer.id = "tie";
    mainContainerYou.id = "tie";
  }
};

/*this function updates to 0 the round*/
const advanceRound = () => {
  roundCounter++
  roundNumber.innerHTML = roundCounter.toString();
  makeNextButtom.disabled = true;
  inputNumber.value = 0+"";
  numberCompt.innerHTML = 0+"";
  makeGuesButton.innerHTML = "Make a Guess";
  computerWinner.innerHTML = "Computer";
  userWinner.innerHTML = "User";
  mainContainerYou.classList.add( "main__containerYou")
  mainContainerYou.id = "";
  mainContainerComputer.id = "";
};

const addOneInputNumber = () => {
  getValueCall.counterInput++
  inputNumber.value = getValueCall.counterInput.toString()
};

const minusOneInputNumber = () => {
  if (getValueCall.counterInput > 0) {
    getValueCall.counterInput--;
    inputNumber.value = getValueCall.counterInput.toString();
  } else {
    return;
  }
};

const resetGame = () => {
  
  inputNumber.innerHTML = "0";
  roundNumber.innerHTML = 1+"";
  makeNextButtom.disabled = false;
  humanScoreDom.innerHTML = 0+"";
  computerScoreDom.innerHTML = 0+"";
  numberCompt.innerHTML = 0+"";
  targetNumber.innerHTML = 0+"";
  makeGuesButton.disabled = false;
  addButtom.disabled = false;
  minusButtom.disabled = false;
  humanScore = 0;
  computerScore = 0;
  modalEndgame.id = "startedGame";
  mainContainerYou.id = "";
  mainContainerComputer.id = "";
};



makeGuesButton.addEventListener("click", makeGuess);
makeNextButtom.addEventListener("click", advanceRound);
makeNextButtom.addEventListener("click", generateNextRound);
addButtom.addEventListener("click", addOneInputNumber);
minusButtom.addEventListener("click", minusOneInputNumber);
next.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);


//keyboar Events
document.addEventListener('keydown', (e:KeyboardEvent)=>{
  if(e.code === "Enter"){
    makeGuess()
  } else if (e.code === "Backspace" || e.code === "Delete" || e.code === "Minus" ){
    minusOneInputNumber()
  } else if (e.code === "Equal" ){
    addOneInputNumber()
  }
})
