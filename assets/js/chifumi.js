// Globals variables and consts
const playList = ["pierre", "feuille", "ciseaux"];
const maxRounds = 3;

var roundCount = 0;

var playerChoice = "";
var robotChoice = "";

var playerScore = 0;
var robotScore = 0;

// DOM elements I use in the script
// var btnRock = document.getElementById("pierre");
// var btnSheet = document.getElementById("feuille");
// var btnScissors = document.getElementById("ciseaux");
var selPlayerSelector = document.getElementById("playerSelector");
var btnReset = document.getElementById("reset");

var h3PlayerScore = document.getElementById("playerScore");
var h3RobotScore = document.getElementById("robotScore");
var divEndGame = document.getElementById("endGame");

var pPlayerPlay = document.getElementById("playerPlay");
var pRobotPlay = document.getElementById("robotPlay");

// If the player click a button and if the maxRoundsrd round wasn't play,
// launch the round with the value selected.

selPlayerSelector.addEventListener("input", function (event) {
    alert(playList[selPlayerSelector.value]+" sélectionné");
    selPlayerSelector.value="-1";
})

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
}

// compare(choice1, choice2)
// Compare selected values from chifumi
// Return :
//      1 if choice1 is better than choice2
//      0 if choice1 is the same than choice2
//     -1 in other case

// function compare(choice1, choice2) {
//     if (choice1 === "pierre") {
//         if (choice2 === "pierre") {
//             return 0;
//         } else if (choice2 === "feuille") {
//             return -1;
//         } else if (choice2 === "ciseaux") {
//             return 1;
//         }
//     } else if (choice1 === "feuille") {
//         if (choice2 === "pierre") {
//             return 1;
//         } else if (choice2 === "feuille") {
//             return 0;
//         } else if (choice2 === "ciseaux") {
//             return -1;
//         }
//     } else if (choice1 === "ciseaux") {
//         if (choice2 === "pierre") {
//             return -1;
//         } else if (choice2 === "feuille") {
//             return 1;
//         } else if (choice2 === "ciseaux") {
//             return 0;
//         }
//     }

//     console.log("Erreur ! au moins un des paramètres est invalide !");
//}

// compare(choice1, choice2)
// Compare selected values from chifumi
// Return the winning play if exist, "égalité" else
function compare(choice1, choice2) {
    if (choice1 === choice2) {
        return "egalite";
    }
    if (choice1 === "pierre") {
        if (choice2 === "feuille") {
            return choice2;
        } else {
            return choice1;
        }
    }
    if (choice1 === "feuille") {
        if (choice2 === "ciseaux") {
            return choice2;
        } else {
            return choice1;
        }
    }
    // If choice1 is not "pierre" nor "ciseaux", it's necessarily "feuille", so no if for this case
    if (choice2 === "pierre") {
        return choice2;
    } else {
        return choice1;
    }
}


// Return random play for robot
function robotPlay() {
    return playList[parseInt(Math.random() * 3)];
}

// Play a round 
function playRound(playerChoice) {
    if (roundCount < 3) {
        roundCount++;
        robotChoice = robotPlay();
        var roundResult = compare(playerChoice, robotChoice);
        if (roundResult == playerChoice) {
            playerScore++;
        } else if (roundResult == robotChoice) {
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
    } else {
        alert("La partie est terminée, cliquez sur le bouton nouvelle partie pour recommencer");
    }
}