// Globals variables and consts
const playList = ["pierre", "feuille", "ciseaux"];
const maxRounds = 3;

var roundCount = 0;

var playerChoice = "";
var robotChoice = "";

var playerScore = 0;
var robotScore = 0;

// DOM elements I use in the script
var btnRock = document.getElementById("pierre");
var btnSheet = document.getElementById("feuille");
var btnScissors = document.getElementById("ciseaux");
var btnReset = document.getElementById("reset");

var domPlayerScore = document.getElementById("playerScore");
var domRobotScore = document.getElementById("robotScore");
var divEndGame = document.getElementById("endGame");

var pPlayerPlay = document.getElementById("playerPlay");
var pRobotPlay = document.getElementById("robotPlay");

// If the player click a button and if the maxRoundsrd round wasn't play,
// launch the round with the value selected.

btnRock.addEventListener("click", function (event) {
    if (roundCount < maxRounds) {
        playRound("pierre");
    }
});
btnSheet.addEventListener("click", function (event) {
    if (roundCount < maxRounds) {
        playRound("feuille");
    }
});
btnScissors.addEventListener("click", function (event) {
    if (roundCount < maxRounds) {
        playRound("ciseaux");
    }
});

// If the player click on reset button, reset the play
btnReset.addEventListener("click", function (event) {
    initPlay();
});

// If we want to play another game
// Restore initial values for var and DOM selectors
// TODO : Add a prompt for reading player name. Put it in #playerName
//  syntax : prompt(message[, defaultValue]);
function initPlay() {
    domPlayerScore.innerHTML = 0;
    domRobotScore.innerHTML = 0;
    divEndGame.innerHTML = "";
    pPlayerPlay.innerHTML = "";
    pRobotPlay.innerHTML = "";
    roundCount = 0;
    playerChoice = "";
    robotChoice = "";
    playerScore = 0;
    robotScore = 0;
}

// compare(choice1, choice2)
// Compare selected values from chifumi
// Return the winning play if exist, "égalité" else
function compare(choice1, choice2) {
    var result = "";
    if (choice1 === choice2) {
        result = "egalite";
    } else if (choice1 === "pierre") {
        if (choice2 === "feuille") {
            result = choice2;
        } else {
            result = choice1;
        }
    } else if (choice1 === "feuille") {
        if (choice2 === "ciseaux") {
            result = choice2;
        } else {
            result = choice1;
        }
    } else {
        if (choice2 === "pierre") {
            result = choice2;
        } else {
            result = choice1;
        }
    }
    return result;
}

// Return random play for robot
function robotPlay() {
    return playList[parseInt(Math.random() * maxRounds)];
}

// Play a round 
function playRound(playerChoice) {
    roundCount++;
    robotChoice = robotPlay();
    var roundResult = compare(playerChoice, robotChoice);
    if (roundResult === playerChoice) {
        playerScore++;
    } else if (roundResult === robotChoice) {
        robotScore++;
    }

    // Print new scores
    domPlayerScore.innerHTML = playerScore;
    domRobotScore.innerHTML = robotScore;
    // and last played
    pPlayerPlay.innerHTML = "Vous avez joué " + playerChoice;
    pRobotPlay.innerHTML = "Le robot a joué " + robotChoice;
    // After
    if (roundCount >= maxRounds) {
        var msg = "";
        if (playerScore > robotScore) {
            msg = "Vous avez gagné !";
        } else if (playerScore < robotScore) {
            msg = "Le robot a gagné !";
        } else {
            msg = "match nul !";
        }
        divEndGame.innerHTML = msg;
    }
}