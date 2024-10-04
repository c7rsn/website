const buttons = [
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
    new GameButton("5", "game-body", addScore, 5),
    new GameButton("10", "game-body", addScore, 10),
    new GameButton("1", "game-body", addScore, 1),
]



function GameButton(name, location, func, ...args){
    this.name = name;
    this.loc = location;
    this.func = func;
    this.args = args;
    this.create = function (){
        const newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = this.name;
        newButton.name = this.name;
        newButton.onclick = this.func.bind(null, ...this.args);
        newButton.classList.add("game-button");
        var gamebody = document.getElementById(this.loc);
        document.getElementById(this.loc).appendChild(newButton);
    }
}

function addScore(inc){
    console.log("button clicked");
    document.getElementById("score-value").innerHTML = parseFloat(document.getElementById("score-value").innerHTML) + inc;
}

function startGame(){
    buttons.forEach(button => button.create());
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
