const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const personaSelect = document.getElementById('persona-select');

// document.onload(chatBox.innerHTML = `<div class="message user-message"><strong><i>kv</i>AI:</strong> ... dit svar kommer her ...</div>`);



sendButton.addEventListener('click', () => {
    // Saner input ved at fjerne farlige tegn
    const sanitizeInput = (input) => {
        const div = document.createElement('div'); // Opret et dummy DOM-element
        div.innerText = input; // Sæt inputtet i DOM-elementet som tekst
        return div.innerHTML; // Hent den rensede tekst som HTML-sikker streng
    };

    // Trim inputtet for whitespace og saner det
    const userMessage = sanitizeInput(userInput.value.trim());
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

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navUl = document.querySelector('nav ul');

hamburgerMenu.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
});
