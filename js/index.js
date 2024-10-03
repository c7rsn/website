let num = 0
let output = ""

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
    console.log(output);
    document.getElementById(text_id).innerHTML = output;
}