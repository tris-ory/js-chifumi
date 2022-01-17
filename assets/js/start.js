var inpStartingName = document.getElementById("startingName");
var btnStart = document.getElementById("start");
var divStartingContent = document.getElementById("startingContent");
var body = document.getElementsByTagName("body")[0];
var html = document.getElementsByTagName("html")[0];
var currentName;

btnStart.addEventListener("click", function(event){
    currentName = inpStartingName.value;
    if (currentName === ""){
        currentName = "Joueur";
    }

    initGamePage();
});

function initGamePage(){
    console.log("Vous êtes " + currentName);
    removeDOMElements();
    addDOMElements();
}

function removeDOMElements(){
    divStartingContent.remove();
}

function addDOMElements(){
    body.innerHTML += "<div class=\"container\">\
    <div class=\"player\">\
        <div>\
            <h2 id=\"playerName\">" + currentName + "</h2>\
            <h3 id=\"playerScore\">0</h3>\
        </div>\
        <select id=\"playerSelector\">\
            <option value=\"-1\" selected>-- Choisissez votre coup --</option>\
            <option value=\"0\">Pierre</option>\
            <option value=\"1\">Feuille</option>\
            <option value=\"2\">Ciseaux</option>\
        </select>\
    </div>\
    <div class=\"player\">\
        <h2>Robot</h2>\
        <h3 id=\"robotScore\">0</h3>\
        <img src=\"assets/img/computer.png\" alt=\"Ordinateur\" />\
    </div>\
    </div>\
    <div class=\"container\">\
    <p id=\"playerPlay\" class=\"player\"></p>\
    <p id=\"robotPlay\" class=\"player\"></p>\
    </div>\
    <div id=\"endGame\"></div>\
    <div>\
    <input type=\"checkbox\" name=\"renamePlayer\" id=\"renamePlayer\" />\
    <label for=\"renamePlayer\"> Renommer le joueur&nbsp;?&nbsp;</label>\
    <button id=\"reset\">Nouvelle partie</button>\
    </div>";
    let newScript=document.createElement("script");
    newScript.src="assets/js/chifumi.js";
    html.appendChild(newScript);
}