const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const personaSelect = document.getElementById('persona-select');

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    const selectedPersona = personaSelect.value;

    if (userMessage) {
        // Vis brugerens besked i chatboksen
        chatBox.innerHTML += `<div class="message user-message"><strong>Du:</strong> ${userMessage}</div>`;
        userInput.value = ''; // Tøm inputfeltet

        // Her kan du tilføje logik til at generere svar fra den valgte persona
        // For nu viser vi bare en placeholder-besked
        chatBox.innerHTML += `<div class="message persona-message"><strong>${selectedPersona}:</strong> Dette er et svar fra ${selectedPersona}.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Rul til bunden af chatboksen
    }
});
