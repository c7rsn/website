function convert(val, unit){
    if(unit=="kgs"){
        val = val * 2.20462;
    }
    return val
}

function balance(sc, sp, sf){
    let total = parseFloat(sc) + parseFloat(sp) + parseFloat(sf);
    sc = parseFloat(sc)/total;
    sp = parseFloat(sp)/total;
    sf = parseFloat(sf)/total;
    percents = [sc, sp, sf];
    return percents;
}


function calculate(){
    let bw = document.getElementById("bw").value;
    let bu = document.getElementById("bw-units").value;

    let rg = document.getElementById("ratio-grams").value;
    let rw = document.getElementById("ratio-weight").value;
    let ru = document.getElementById("ratio-units").value;

    let sc = document.getElementById("split-c").value;
    let sp = document.getElementById("split-p").value;
    let sf = document.getElementById("split-f").value;

    bw = convert(bw, bu);
    rw = convert(rw, ru);

    let per = balance(sc, sp, sf);
    sc = per[0];
    sp = per[1];
    sf = per[2];

    let tp = rg * (bw / rw);
    let tc = (((tp * 4) / sp) * sc) / 4;
    let tf = (((tp * 4) / sp) * sf) / 9;
    let tk = (tc * 4) + (tp * 4) + (tf * 9);

    document.getElementById("total-calories").innerHTML = Math.round(tk)+"cal";
    document.getElementById("total-carbs").innerHTML = Math.round(tc)+"g";
    document.getElementById("total-protein").innerHTML = Math.round(tp)+"g";
    document.getElementById("total-fat").innerHTML = Math.round(tf)+"g";
}