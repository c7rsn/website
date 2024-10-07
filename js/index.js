let num = 0;
let output = "";

const fontlist = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Comic Sans MS",
];

function fun_text(text_id, text){
    document.getElementById(text_id).innerHTML = " ";
    let output = ""
    for (var i=0; i < text.length;i++){
        output += '<span style="font-family:'+fontlist[Math.floor(Math.random() * fontlist.length)]+'">'+text.charAt(i)+'</span>';
    }
    document.getElementById(text_id).innerHTML = output;
}

let fts = 1;
let s = false;
function flash_text(text_id){
    console.log(document.getElementById(text_id).style.color);
    if (fts % 2 == 0 ){
        if (s == false){
            document.getElementById(text_id).style.setProperty("color","blue","important");
            s = true;
        } else {
            document.getElementById(text_id).style.setProperty("color", "", "important");
            s = false;
        }
    }
    fts += 1;
}