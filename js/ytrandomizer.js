function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function checkForJsonWithTitle(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();

        const jsonData = JSON.parse(text);
        return !!jsonData.title;  // returns true if title exists, false if not
    } catch (error) {
        return false;  // fetch or parsing failed
    }
}

function validVideoId(id) {
    let linkprefix = "https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=";
    let checklink = linkprefix+id;
    console.log(checklink);
    checkForJsonWithTitle(checklink).then(result => {
        console.log(result);
        return result; 
    });
}

function randomize() {
    let ytprefix = "https://www.youtube.com/embed/";
    let newlink = "";
    let i = 0;
    while (i<100) {
        let randlink = makeid(10);
        console.log(randlink);
        if (validVideoId(randlink)){
            newlink = ytprefix + randlink;
            break
        }
        i += 1;
    }
    document.getElementById("video").src = newlink;
}