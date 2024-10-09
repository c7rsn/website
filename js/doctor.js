document.getElementById('doctor-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent form reload

    const symptoms = document.getElementById('symptoms').value;
    document.getElementById('output-text').innerHTML = "Hmm, intriguing symptoms... Allow me to cogitate for a brief moment... *scratches chin*";

    try {
        const response = await fetch('https://safe-caverns-06535-0283d8fae041.herokuapp.com/ask-doctor', { // replace with your actual backend URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms }) // send symptoms as JSON
        });

        const result = await response.json();
        document.getElementById('output-text').innerHTML = result.diagnosis || "**MEDICAL EMERGENCY** Oh noez, it seems I've encountered a ** DIAGNOSTIC DILEMMA ** ! Please ASK AGAIN!!!";
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output-text').innerHTML = "**MEDICAL EMERGENCY** Oh noez, it seems I've encountered a ** DIAGNOSTIC DILEMMA ** ! Please ASK AGAIN!!!";
    }
});