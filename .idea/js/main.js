const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const politicianSelect = document.getElementById('politician-select'); // Henter dropdown-menuen

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    const selectedPolitician = politicianSelect.value; // Henter valgt politiker

    if (userMessage) {
        chatBox.innerHTML += `<div class="message user-message"><strong>Du:</strong> ${userMessage}</div>`;
        userInput.value = '';

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    politician: selectedPolitician // Sender politikeren med i requesten
                })
            });

            if (response.ok) {
                const data = await response.json();
                chatBox.innerHTML += `<div class="message ai-message"><strong>${selectedPolitician}:</strong> ${data.response}</div>`;
            } else {
                chatBox.innerHTML += `<div class="message error-message">Fejl i serverkommunikationen</div>`;
            }
        } catch (error) {
            console.error('Fejl:', error);
        }
        chatBox.scrollTop = chatBox.scrollHeight; // sørger for at chatboxen altid viser den nyeste besked
    }
});

// Lyt efter 'Enter'-tasten i inputfeltet
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Eller event.keyCode === 13 for ældre browsere
        event.preventDefault(); // Forhindrer standard opførsel (fx nyt linjeskift)
        sendButton.click(); // Simulerer et klik på send-knappen
    }
});

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navUl = document.querySelector('nav ul');

hamburgerMenu.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const resetButton = document.getElementById("reset-button");

    resetButton.addEventListener("click", function() {
        chatBox.innerHTML = ""; //det rydder chatboxen :)
    });
});

// const sendButton = document.getElementById('send-button');
// const userInput = document.getElementById('user-input');
// const chatBox = document.getElementById('chat-box');
// const personaSelect = document.getElementById('persona-select');
//
// // document.onload(chatBox.innerHTML = `<div class="message user-message"><strong><i>kv</i>AI:</strong> ... dit svar kommer her ...</div>`);
//
//
//
// sendButton.addEventListener('click', () => {
//     // Saner input ved at fjerne farlige tegn
//     const sanitizeInput = (input) => {
//         const div = document.createElement('div'); // Opret et dummy DOM-element
//         div.innerText = input; // Sæt inputtet i DOM-elementet som tekst
//         return div.innerHTML; // Hent den rensede tekst som HTML-sikker streng
//     };
//
//     // Trim inputtet for whitespace og saner det
//     const userMessage = sanitizeInput(userInput.value.trim());
//     const selectedPersona = personaSelect.value;
//
//     if (userMessage) {
//         // Vis brugerens besked i chatboksen
//         chatBox.innerHTML += `<div class="message user-message"><strong>Du:</strong> ${userMessage}</div>`;
//         userInput.value = ''; // Tøm inputfeltet
//
//         // Her kan du tilføje logik til at generere svar fra den valgte persona
//         // For nu viser vi bare en placeholder-besked
//         chatBox.innerHTML += `<div class="message persona-message"><strong>${selectedPersona}:</strong> Dette er et svar fra ${selectedPersona}.</div>`;
//         chatBox.scrollTop = chatBox.scrollHeight; // Rul til bunden af chatboksen
//     }
// });
//
// // Lyt efter 'Enter'-tasten i inputfeltet
// userInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') { // Eller event.keyCode === 13 for ældre browsere
//         event.preventDefault(); // Forhindrer standard opførsel (fx nyt linjeskift)
//         sendButton.click(); // Simulerer et klik på send-knappen
//     }
// });
//
// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const navUl = document.querySelector('nav ul');
//
// hamburgerMenu.addEventListener('click', () => {
//     navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
// });
