const playList = ["pierre", "feuille", "ciseaux"];

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

var h2Player = document.getElementById("playerScore");
var h2Robot = document.getElementById("robotScore");
var divEndGame = document.getElementById("endGame");

var pPlayerPlay = document.getElementById("playerPlay");
var pRobotPlay = document.getElementById("robotPlay");
// If the player click on a button, it register the choice:

btnRock.addEventListener("click", function (event) {
    if (roundCount < 3) {
        playRound("pierre");
    }
});
btnSheet.addEventListener("click", function (event) {
    if (roundCount < 3) {
        playRound("feuille");
    }
});
btnScissors.addEventListener("click", function (event) {
    if (roundCount < 3) {
        playRound("ciseaux");
    }
});
btnReset.addEventListener("click", function (event) {
    initPlay();
});

// If we want to play another game, 
function initPlay() {
    h2Player.innerHTML = 0;
    h2Robot.innerHTML = 0;
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
    return playList[parseInt(Math.random() * 3)];
}

function playRound(playerChoice) {
    roundCount++;
    robotChoice = robotPlay();
    var roundResult = compare(playerChoice, robotChoice);
    if (roundResult > 0) {
        playerScore++;
    } else if (roundResult < 0) {
        robotScore++;
    }
    h2Player.innerHTML = playerScore;
    h2Robot.innerHTML = robotScore;

    pPlayerPlay.innerHTML = "Vous avez joué " + playerChoice;
    pRobotPlay.innerHTML = "Le robot a joué " + robotChoice;

    if (roundCount === 3) {
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