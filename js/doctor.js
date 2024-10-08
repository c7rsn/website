document.getElementById('doctor-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent form reload

    const symptoms = document.getElementById('symptoms').value;

    try {
        const response = await fetch('https://safe-caverns-06535-0283d8fae041.herokuapp.com/ask-doctor', { // replace with your actual backend URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms }) // send symptoms as JSON
        });

        const result = await response.json();
        document.getElementById('output').innerHTML = result.diagnosis || 'I goofed up, try asking again.';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = 'I goofed up, ask me again.';
    }
});