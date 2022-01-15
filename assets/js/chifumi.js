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
// Return :
//      1 if choice1 is better than choice2
//      0 if choice1 is the same than choice2
//     -1 in other case

function compare(choice1, choice2) {
    if (choice1 === "pierre") {
        if (choice2 === "pierre") {
            return 0;
        } else if (choice2 === "feuille") {
            return -1;
        } else if (choice2 === "ciseaux") {
            return 1;
        }
    } else if (choice1 === "feuille") {
        if (choice2 === "pierre") {
            return 1;
        } else if (choice2 === "feuille") {
            return 0;
        } else if (choice2 === "ciseaux") {
            return -1;
        }
    } else if (choice1 === "ciseaux") {
        if (choice2 === "pierre") {
            return -1;
        } else if (choice2 === "feuille") {
            return 1;
        } else if (choice2 === "ciseaux") {
            return 0;
        }
    }

    console.log("Erreur ! au moins un des paramètres est invalide !");
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
    if (roundResult > 0) {
        playerScore++;
    } else if (roundResult < 0) {
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