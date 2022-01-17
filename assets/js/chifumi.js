// Globals variables and consts
const playList = ["pierre", "feuille", "ciseaux"];
const maxRounds = 3;

// DOM elements I use in the script
var selPlayerSelector = document.getElementById("playerSelector");

var btnReset = document.getElementById("reset");
var cbRenamePlayer = document.getElementById("renamePlayer");

var h2PlayerName = document.getElementById("playerName");

var h3PlayerScore = document.getElementById("playerScore");
var h3RobotScore = document.getElementById("robotScore");
var divEndGame = document.getElementById("endGame");

var pPlayerPlay = document.getElementById("playerPlay");
var pRobotPlay = document.getElementById("robotPlay");

// If the player click a button and if the maxRoundsrd round wasn't play,
// launch the round with the value selected.

selPlayerSelector.addEventListener("input", function (event) {
    playRound(selPlayerSelector.value);
    selPlayerSelector.value = "-1";
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
    if (cbRenamePlayer.checked) {
        namePlayer();
        cbRenamePlayer.checked = false;
    }
}

function namePlayer() {
    var currentName = h2PlayerName.innerHTML;
    var newName = prompt("Quel est votre nom ?", currentName);
    if ((typeof newName === "string" || newName instanceof String) && newName != "") {
        h2PlayerName.innerText = newName;
    }
}

// Return random play for robot
function robotPlay() {
    return parseInt(Math.random() * 3);
}

// compare(choice1, choice2)
// Compare selected values from chifumi
// Return the winning play if exist, "égalité" else
function compare(choice1, choice2) {
    if (choice1 === choice2) {
        return "egalite";
    }
    if (choice2 % 3 == (choice1 + 1) % 3) {
        return choice2;
    } else {
        return choice1;
    }
}



// Play a round 
function playRound(playerChoice) {
    if (roundCount < 3) {
        roundCount++;
        robotChoice = robotPlay();
        var roundResult = compare(playerChoice, robotChoice);
        if (roundResult != "égalité"){
            
        if (roundResult == playerChoice) {
            playerScore++;
        } else if (roundResult == robotChoice) {
            robotScore++;
        }
        }
        // Print new scores
        h3PlayerScore.innerHTML = playerScore;
        h3RobotScore.innerHTML = robotScore;
        // and last played
        pPlayerPlay.innerHTML = "Vous avez joué " + playList[playerChoice];
        pRobotPlay.innerHTML = "Le robot a joué " + playList[robotChoice];
        // After last round
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
    } else {
        alert("La partie est terminée, cliquez sur le bouton nouvelle partie pour recommencer");
    }
}

// Initialize the game
initPlay();