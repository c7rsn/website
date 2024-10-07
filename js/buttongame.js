const buttons = [
    new GameButton("key", "&#128273;", "game-body", addScore, 0),
    new GameButton("demon", "&#128520;", "game-body", addScore, 6.66), // Done.
    new GameButton("melon", "&#127817;", "game-body", addScore, 1.5),
    new GameButton("shocked", "&#128576;", "game-body", multScore, -0.5),
    new GameButton("ogre", "&#128121;", "game-body", addScore, -999), // Done.
    new GameButton("poop", "&#128169;", "game-body", addScore, -1),
    new GameButton("puke", "&#129326;", "game-body", addScore, -5),
    new GameButton("diamond", "&#128142;", "game-body", addScore, 15), // Done.
    new GameButton("floppy", "&#128190;", "game-body", addScore, 0.5),
    new GameButton("mail", "&#128231;", "game-body", sendMail, 10),
    new GameButton("bag", "&#128176;", "game-body", randScore, 40),
    new GameButton("head", "&#128511;", "game-body", rockHead, 111),
    new GameButton("shuffle", "&#128256;", "game-body", shuffleScore),
    new GameButton("dice", "&#127922;", "game-body", randScore, 6), // Done.
    new GameButton("lock", "&#128274;", "game-body", addScore, 0),
    new GameButton("cops", "&#128659;", "game-body", addScore, -10),
    new GameButton("bathroom", "&#128699;", "game-body", addScore, 4),
    new GameButton("crying", "&#128557;", "game-body", setScore, 0), // Done.
    new GameButton("cow", "&#128004;", "game-body", addScore, 1),
    new GameButton("mouse", "&#128045;", "game-body", multScore, 1.01), // Done.
    new GameButton("beers", "&#127867;", "game-body", addScore, 2),
    new GameButton("crazy", "&#129322;", "game-body", crazy, 200), // Done.
    new GameButton("donut", "&#127849;", "game-body", multScore, 0.01), //Done.
    new GameButton("tophat", "&#127913;", "game-body", addScore, 8),
    new GameButton("sax", "&#127927;", "game-body", addScore, 3), // Done.
]

let winstate = false;

function decodeHtmlEntity(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
}

function GameButton(name, symbol, location, func, ...args){
    this.name = name;
    this.symbol = symbol;
    this.loc = location;
    this.func = func;
    this.args = args;
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
    if (parseFloat(document.getElementById("score-value").innerHTML) >= 1000 && winstate == false) {
        alert("YOU WIN!!!\n\nYou beat the game with " + document.getElementById("click-value").innerHTML + " clicks.\nCan you go lower? (It's possible in four clicks, two different ways!)");
        winstate = true;
    }
}

function sendMail(){
    let buttonElement = document.querySelector(`[name="mail"]`);
    buttonElement.value = decodeHtmlEntity("&#128230");
}

function setScore(val){
    let newscore = val;
    if (document.getElementById("score-value").innerHTML > val){
        deployScore(newscore);
    } else {
        addClick();
    }
}

function addScore(inc) {
    let newscore = parseFloat(document.getElementById("score-value").innerHTML) + inc;
    if (parseFloat(document.getElementById("score-value").innerHTML) < 0) {
        document.getElementById("score-value").innerHTML = 0;
    }
    deployScore(newscore);
}

let rockClick = false;
function rockHead(inc){
    if (rockClick == false){
        let buttonElement = document.querySelector(`[name="head"]`);
        buttonElement.value = decodeHtmlEntity("&#128168");
        addScore(inc);
        rockClick = true;
    }
}

function multScore(inc){
    let newscore = parseFloat(document.getElementById("score-value").innerHTML) * inc;
    deployScore(newscore);
}

function randScore(max) {
    addScore((Math.floor(Math.random() * max))+1);
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function shuffleScore(){
    let neg = false;
    let score = document.getElementById("score-value").innerHTML
    if (parseFloat(score) < 0){
        score = String(parseFloat(score) * -1,2)
        neg = true;
    }
    let ss = score.split("");
    if (ss.includes(".")){
        let dotIndex = ss.indexOf(".");
        ss.splice(dotIndex, 1);
        shuffle(ss);
        ss.splice(dotIndex, 0, ".");
    }else{
        shuffle(ss);
    }
    let newscore = ss.join("");
    if (neg == true){
        newscore = parseFloat(newscore) * -1;
    }
    deployScore(newscore)
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

function deployScore(newscore){
    document.getElementById("score-value").innerHTML = Math.round(newscore*100)/100;
    addClick();
}

function startGame(){
    winstate = false;
    crazyclicks = 1;
    rockClick = false;
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
        document.getElementById("exp").className = "multiline exp-text"
        document.getElementById("exp-button").innerHTML = "Hide"
    } else {
        document.getElementById("exp").className = "multiline exp-text hide"
        document.getElementById("exp-button").innerHTML = "Show"
    }
}
