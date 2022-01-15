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

var h2PlayerName = document.getElementById("playerName");
var h3PlayerScore = document.getElementById("playerScore");
var h3RobotScore = document.getElementById("robotScore");
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
    h3PlayerScore.innerHTML = 0;
    h3RobotScore.innerHTML = 0;
    divEndGame.innerHTML = "";
    pPlayerPlay.innerHTML = "";
    pRobotPlay.innerHTML = "";
    roundCount = 0;
    playerChoice = "";
    robotChoice = "";
    playerScore = 0;
    robotScore = 0;
    initPlayerName();
}

// Get the new name of the player
function initPlayerName() {
    var currentName = h2PlayerName.innerHTML;
    var newName = prompt("Entrez votre nom", currentName);
    // if the value is a string and is not empty, change the name
    if ((typeof newName === "string" || newName instanceof String) && (newName != "")) {
        h2PlayerName.innerHTML = newName;
    }
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
    h3PlayerScore.innerHTML = playerScore;
    h3RobotScore.innerHTML = robotScore;
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

initPlay();