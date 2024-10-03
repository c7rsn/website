
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
    }

    //Formats the Quote
    formatted_quote = page_num.concat(' - "',quote,'"<br><br>');

    //Pushes everything back to the document
    document.getElementById("output-content").innerHTML += formatted_quote;
    document.getElementById("quote").value = '';
}
