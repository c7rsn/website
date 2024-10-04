const buttons = [
    new GameButton("key", "&#128273;", "game-body", 100, addScore, 1),
    new GameButton("demon", "&#128520;", "game-body", 200, addScore, 1),
    new GameButton("melon", "&#127817;", "game-body", 2200, addScore, 1),
    new GameButton("shocked", "&#128576;", "game-body", 600, addScore, 1),
    new GameButton("ogre", "&#128121;", "game-body", 700, setScore, -1000),
    new GameButton("poop", "&#128169;", "game-body", 800, addScore, -1),
    new GameButton("puke", "&#129326;", "game-body", 500, addScore, -5),
    new GameButton("diamond", "&#128142;", "game-body", 900, addScore, 10),
    new GameButton("floppy", "&#128190;", "game-body", 1000, addScore, 0.5),
    new GameButton("mail", "&#128231;", "game-body", 1100, sendMail, 10),
    new GameButton("bag", "&#128176;", "game-body", 1200, addScore, 1),
    new GameButton("head", "&#128511;", "game-body", 1300, addScore, 1),
    new GameButton("shuffle", "&#128256;", "game-body", 1400, addScore, 1),
    new GameButton("dice", "&#127922;", "game-body", 2300, randScore, 6),
    new GameButton("lock", "&#128274;", "game-body", 2100, addScore, 1),
    new GameButton("cops", "&#128659;", "game-body", 1500, addScore, 1),
    new GameButton("bathroom", "&#128699;", "game-body", 1600, addScore, 1),
    new GameButton("crying", "&#128557;", "game-body", 300, setScore, 0),
    new GameButton("cow", "&#128004;", "game-body", 1700, addScore, 1),
    new GameButton("mouse", "&#128045;", "game-body", 1800, multScore, 2),
    new GameButton("beers", "&#127867;", "game-body", 1900, addScore, 1),
    new GameButton("crazy", "&#129322;", "game-body", 400, crazy, 500),
    new GameButton("donut", "&#127849;", "game-body", 2000, addScore, 1),
    new GameButton("tophat", "&#127913;", "game-body", 2400, addScore, 1),
    new GameButton("sax", "&#127927;", "game-body", 2500, addScore, 3),
]

function decodeHtmlEntity(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
}

function GameButton(name, symbol, location, order, func, ...args){
    this.name = name;
    this.symbol = symbol;
    this.loc = location;
    this.func = func;
    this.args = args;
    this.order = order;
    this.create = function (){
        const newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = decodeHtmlEntity(this.symbol);
        newButton.name = this.name;
        newButton.onclick = this.func.bind(null, ...this.args);
        newButton.classList.add("game-button");
        var gamebody = document.getElementById(this.loc);
        document.getElementById(this.loc).appendChild(newButton);
    }
}

function addClick(){
    document.getElementById("click-value").innerHTML = parseFloat(document.getElementById("click-value").innerHTML) + 1;
    if (parseFloat(document.getElementById("score-value").innerHTML) >= 1000) {
        alert("YOU WIN!!!\n\nYou beat the game with " + document.getElementById("click-value").innerHTML + " clicks.\nCan you go lower?")
    }
}

function sendMail(){
    let buttonElement = document.querySelector(`[name="mail"]`);
    buttonElement.value = decodeHtmlEntity("&#128230");
}

function setScore(val){
    if (document.getElementById("score-value").innerHTML > val){
        document.getElementById("score-value").innerHTML = val;
    }
    addClick();
}

function addScore(inc) {
    document.getElementById("score-value").innerHTML = parseFloat(document.getElementById("score-value").innerHTML) + inc;
    if (parseFloat(document.getElementById("score-value").innerHTML) < 0) {
        document.getElementById("score-value").innerHTML = 0;
    }
    addClick();
}

function multScore(inc){
    document.getElementById("score-value").innerHTML = parseFloat(document.getElementById("score-value").innerHTML) * inc;
    addClick();
}

function randScore(max) {
    addScore(Math.floor(Math.random() * max))
}

let crazyclicks = 1
function crazy(max) {
    let buttonElement = document.querySelector(`[name="crazy"]`);
    let crazyFaces = [
        "&#129324",
        "&#129301",
        "&#128128",
    ]
    if (crazyclicks>3){
        addScore(-100);
    } else {
        buttonElement.value = decodeHtmlEntity(crazyFaces[crazyclicks - 1]);
        randScore(max/crazyclicks);
    crazyclicks += 1;
    }
}

function startGame(){
    crazyclicks = 1;
    document.getElementById("click-value").innerHTML = 0;
    document.getElementById("score-value").innerHTML = 0;
    buttons.forEach(button => button.create());
}

function reset() {
    if (confirm("Reset game?")) {
        var btns = document.getElementsByClassName("game-button");
        while(btns[0]){
            btns[0].parentNode.removeChild(btns[0]);
        }
        console.log("here")
        startGame();
    }
}


function tooltip() {
    exp = document.getElementById("exp");
    if (exp.className == "multiline exp-text hide") {
        if (document.getElementById("click-value").innerHTML == 0){
            document.getElementById("hint").innerHTML = "You don't really need a hint do you?";
        } else {
            document.getElementById("hint").innerHTML = "If a button doesn't do anything, you haven't figured out what it's for yet.";
        }
        document.getElementById("exp").className = "multiline exp-text"
        document.getElementById("exp-button").innerHTML = "Hide"
    } else {
        document.getElementById("exp").className = "multiline exp-text hide"
        document.getElementById("exp-button").innerHTML = "Show"
    }
}
