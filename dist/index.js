"use strict";
/*window.addEventListener('DOMContentLoaded', (e:Event)=>{
  class DOMelements {
    constructor(domString: string) {
      this.domString = domString;
    }
  }
})*/
//* players scores */
var humanScore = 0;
var computerScore = 0;
var winningScore = 5;
// DOM Counters
var roundCounter = 1;
//DOM Buttons
var targetNumber = document.querySelector(".target");
var makeGuesButton = document.querySelector(".makeGuess");
var makeNextButton = document.querySelector(".nextButton");
var addButton = document.querySelector("#buttonPlus");
var minusButton = document.querySelector("#buttonMinus");
var newGame = document.querySelector(".newGameButton");
var next = document.querySelector(".nextGameButton");
// DOM Input number
var inputNumber = document.querySelector(".inputNumber");
// DOM Selectors
var roundNumber = document.querySelector(".round");
var numberCompt = document.querySelector(".numberComputer");
var humanScoreDom = document.querySelector(".humanScore");
var computerScoreDom = document.querySelector(".computerScore");
var userWinner = document.querySelector(".user");
var computerWinner = document.querySelector(".computer");
var modalEndgame = document.querySelector(".modal_endgame");
var winnerEndGame = document.querySelector(".winnerEndGame");
var mainContainerYou = document.querySelector("#main__containerYou");
var mainContainerComputer = document.querySelector("#main__containerComp");
//reads the value from the input field
var getVal = function () {
    var DomInputValue = inputNumber.value;
    var counterInput = 0;
    return {
        DomInputValue: DomInputValue,
        counterInput: counterInput
    };
};
var getValueCall = getVal();
// start a new round in the game
var generateNextRound = function () {
    makeGuesButton.disabled = false;
    addButton.disabled = false;
    minusButton.disabled = false;
    targetNumber.innerHTML = "?";
    makeGuesButton.style.backgroundColor = "hover";
};
/*Generates a number between 0 and 9 this is the number that the computer selects*/
var generateNumberComputer = function () {
    var numberComp = Math.floor(Math.random() * 10);
    return numberComp;
};
/*Generates a number between 0 and 9 this is the
number target that the player or the computer must aproach to*/
var generateTarget = function () {
    var random = Math.floor(Math.random() * 10).toString();
    /*If the number is less than 0 or greater than 9 game wont run*/
    if (parseInt(inputNumber.value) < 0 || parseInt(inputNumber.value) > 9) {
        alert("Your number must be between 0 and 9");
        throw "Your number must be between 0 and 9";
    }
    else {
        getValueCall.counterInput = parseInt(inputNumber.value);
        targetNumber.innerHTML = random;
        makeGuesButton.disabled = true;
        addButton.disabled = true;
        minusButton.disabled = true;
        makeNextButton.disabled = false;
    }
    return random;
};
/*This function compares the difference
between the target number and the computer number and the user's input */
var compareGuesses = function () {
    var target = parseInt(generateTarget());
    var human = parseInt(inputNumber.value);
    var computer = generateNumberComputer();
    /*generates a absolute value in order to compare between the computer and the user's input*/
    var integerHuman = Math.abs(target - human);
    var integerComputer = Math.abs(target - computer);
    var resultWinner;
    numberCompt.innerHTML = computer.toString();
    if (human === target) {
        resultWinner = true;
    }
    else if (computer === target) {
        resultWinner = false;
    }
    else if (human === computer || integerComputer === integerHuman) {
        resultWinner = "string";
    }
    else if (integerHuman < integerComputer) {
        resultWinner = true;
    }
    else if (integerHuman > integerComputer) {
        resultWinner = false;
    }
    return resultWinner;
};
var win = function () {
    if (humanScore >= winningScore) {
        return true;
    }
    else if (computerScore >= winningScore) {
        return false;
    }
    else {
        return null;
    }
};
var makeGuess = function () {
    var winner = compareGuesses();
    var modelnewGame = win();
    makeNextButton.disabled = false;
    if (modelnewGame === true) {
        modalEndgame.id = "starGame";
        winnerEndGame.innerHTML =
            "You Won!!! Congrast!!!";
    }
    else if (modelnewGame === false) {
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
    }
    else if (winner === false) {
        computerScore++;
        computerScoreDom.innerHTML = computerScore.toString();
        computerWinner.innerHTML = "Computer Won!!!!!";
        userWinner.innerHTML = "You lost!!!";
        mainContainerYou.id = "lose";
        mainContainerComputer.id = "won";
    }
    else if (typeof winner === "string") {
        userWinner.innerHTML = "It is a tie";
        mainContainerComputer.id = "tie";
        mainContainerYou.id = "tie";
    }
};
/*this function updates to 0 the round*/
var advanceRound = function () {
    roundCounter++;
    roundNumber.innerHTML = roundCounter.toString();
    makeNextButton.disabled = true;
    inputNumber.value = 0 + "";
    numberCompt.innerHTML = 0 + "";
    makeGuesButton.innerHTML = "Make a Guess";
    computerWinner.innerHTML = "Computer";
    userWinner.innerHTML = "User";
    mainContainerYou.classList.add("main__containerYou");
    mainContainerYou.id = "";
    mainContainerComputer.id = "";
};
var addOneInputNumber = function () {
    getValueCall.counterInput++;
    inputNumber.value = getValueCall.counterInput.toString();
};
var minusOneInputNumber = function () {
    if (getValueCall.counterInput > 0) {
        getValueCall.counterInput--;
        inputNumber.value = getValueCall.counterInput.toString();
    }
    else {
        return;
    }
};
var resetGame = function () {
    inputNumber.innerHTML = "0";
    roundNumber.innerHTML = 1 + "";
    makeNextButton.disabled = false;
    humanScoreDom.innerHTML = 0 + "";
    userWinner.innerHTML = "User";
    computerWinner.innerHTML = "Computer";
    computerScoreDom.innerHTML = 0 + "";
    numberCompt.innerHTML = 0 + "";
    targetNumber.innerHTML = 0 + "";
    makeGuesButton.disabled = false;
    addButton.disabled = false;
    minusButton.disabled = false;
    humanScore = 0;
    computerScore = 0;
    modalEndgame.id = "startedGame";
    mainContainerYou.id = "";
    mainContainerComputer.id = "";
};
makeGuesButton.addEventListener("click", makeGuess);
makeNextButton.addEventListener("click", advanceRound);
makeNextButton.addEventListener("click", generateNextRound);
addButton.addEventListener("click", addOneInputNumber);
minusButton.addEventListener("click", minusOneInputNumber);
next.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
//keyboar Events
document.addEventListener('keydown', function (e) {
    if (e.code === "Enter") {
        makeGuess();
    }
    else if (e.code === "Backspace" || e.code === "Delete" || e.code === "Minus") {
        minusOneInputNumber();
    }
    else if (e.code === "Equal") {
        addOneInputNumber();
    }
});
