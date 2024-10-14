document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        e.preventDefault();
        document.getElementById('pagenum').value = parseFloat(document.getElementById('pagenum').value) + 1;
    }
    else if (e.keyCode == '40') {
        e.preventDefault();
        document.getElementById('pagenum').value = parseFloat(document.getElementById('pagenum').value) - 1;
    }
}

function tooltip(){
    exp = document.getElementById("exp");
    if (exp.className == "multiline exp-text hide"){
        document.getElementById("exp").className = "multiline exp-text"
        document.getElementById("exp-button").innerHTML = "Hide"
    } else {
        document.getElementById("exp").className = "multiline exp-text hide"
        document.getElementById("exp-button").innerHTML = "Show"
    }
}



function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

function addQuote(){
    //Declare Variables
    let output = document.getElementById("output-content").innerHTML;
    let page_num = sanitize(document.getElementById("pagenum").value);
    let quote = sanitize(document.getElementById("quote").value);

    //Removes placeholder
    if (output == "Nothing yet!"){
        document.getElementById("output-content").innerHTML = "";
        output = document.getElementById("output-content").innerHTML;
    }

    //Formats the Quote
    formatted_quote = page_num.concat(' - "',quote,'"<br><br>');
    let new_output = output + formatted_quote;

    //Pushes everything back to the document
    document.getElementById("output-content").innerHTML = new_output;
    document.getElementById("quote").value = '';
    localStorage['stored_quotes'] = new_output;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
}

function clearQuotes(){
    if(confirm("Clear all quotes?")){
        document.getElementById("output-content").innerHTML = "Nothing yet!";
        localStorage['stored_quotes'] = "";
    }
}


function chapterBreak(){
    let output = document.getElementById("output-content").innerHTML;

    //Removes placeholder
    if (output == "Nothing yet!") {
        document.getElementById("output-content").innerHTML = "";
        output = document.getElementById("output-content").innerHTML;
    }
    //Gets chapter name
    let chaptername = prompt("Enter the name of the chapter:","");
    if (chaptername !== null){
        if (chaptername == ""){
            chaptername = "CHAPTER BREAK";
        }

        //Adds heading signifer if markdown is selected
        if(document.querySelector('.Markdown').checked){
            chaptername = "##### " + chaptername;
        }

        //Sends it to the page
        let new_output = output + "<br><br>"+chaptername+"<br><br>";
        document.getElementById("output-content").innerHTML = new_output;
        localStorage['stored_quotes'] = new_output;
        document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    }
}

function sectionBreak() {
    let output = document.getElementById("output-content").innerHTML;

    //Removes placeholder
    if (output == "Nothing yet!") {
        document.getElementById("output-content").innerHTML = "";
        output = document.getElementById("output-content").innerHTML;
    }
    //Gets chapter name
    let sectionname = prompt("Enter the name of the section:", "");
    if (sectionname !== null) {
        if (sectionname == "") {
            sectionname = "SECTION BREAK";
        }

        //Adds heading signifer if markdown is selected
        if (document.querySelector('.Markdown').checked) {
            sectionname = "**" + sectionname + "**";
        }

        //Sends it to the page
        let new_output = output + sectionname + "<br><br>";
        document.getElementById("output-content").innerHTML = new_output;
        localStorage['stored_quotes'] = new_output;
        document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    }
}