let allPoliticians = [];

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    const areaDropdown = document.getElementById('area-dropdown');
    const partyDropdown = document.getElementById('party-dropdown');
    const nameDropdown = document.getElementById('name-dropdown');

    // Ryd chat
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function () {
        chatBox.innerHTML = "";
    });

    // Hent alle politikere én gang ved load
    fetch('http://localhost:8080/politikere')
        .then(response => response.json())
        .then(data => {
            allPoliticians = data;

            const areas = [...new Set(allPoliticians.map(p => p.area))];
            const parties = [...new Set(allPoliticians.map(p => p.party))];

            fillDropdown(areaDropdown, areas);
            fillDropdown(partyDropdown, parties);
        })
        .catch(error => console.error('Fejl ved hentning:', error));

    // Lyt efter ændringer i dropdowns
    areaDropdown.addEventListener('change', updateNameDropdown);
    partyDropdown.addEventListener('change', updateNameDropdown);

    function updateNameDropdown() {
        const selectedArea = areaDropdown.value;
        const selectedParty = partyDropdown.value;

        let filtered = allPoliticians;

        if (selectedArea) {
            filtered = filtered.filter(p => p.area === selectedArea);
        }

        if (selectedParty) {
            filtered = filtered.filter(p => p.party === selectedParty);
        }

        const names = [...new Set(filtered.map(p => p.name))];
        fillDropdown(nameDropdown, names);
    }

    function fillDropdown(dropdown, options) {
        dropdown.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- vælg --';
        dropdown.appendChild(defaultOption);

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });
    }

    // Send besked til valgt politiker
    sendButton.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();
        const selectedPolitician = nameDropdown.value;

        if (userMessage && selectedPolitician) {
            chatBox.innerHTML += `<div class="message user-message"><strong>Du:</strong> ${userMessage}</div>`;
            userInput.value = '';

            const loadingMessage = document.createElement('div');
            loadingMessage.classList.add('message', 'loading-message');
            loadingMessage.innerHTML = `<strong>${selectedPolitician}:</strong> <span class="dots">...</span>`;
            chatBox.appendChild(loadingMessage);
            chatBox.scrollTop = chatBox.scrollHeight;

            let dotCount = 1;
            const dotAnimation = setInterval(() => {
                dotCount = (dotCount % 3) + 1;
                loadingMessage.querySelector('.dots').textContent = '.'.repeat(dotCount);
            }, 500);

            try {
                const response = await fetch('http://localhost:8080/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: userMessage,
                        politician: selectedPolitician
                    }),
                    credentials: 'include'
                });

                clearInterval(dotAnimation);
                chatBox.removeChild(loadingMessage);

                if (response.ok) {
                    const data = await response.json();
                    chatBox.innerHTML += `<div class="message ai-message"><strong>${selectedPolitician}:</strong> ${data.response}</div>`;
                } else {
                    chatBox.innerHTML += `<div class="message error-message">Fejl i serverkommunikationen</div>`;
                }
            } catch (error) {
                console.error('Fejl:', error);
            }
            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            alert("Vælg venligst en politiker og skriv en besked ✉️");
        }
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });

    // Burger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', () => {
        navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
    });
});
