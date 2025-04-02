fetch('http://localhost:8080/politikerne')
    .then(response => response.json())
    .then(politicians => {
        const politiciansList = document.getElementById('politicians-list');

        politicians.forEach(politician => {
            const politicianDiv = document.createElement('div');
            politicianDiv.classList.add('politician');

            // Brug politician.imageUrl for at få den rigtige billede sti
            const imagePath = `http://localhost:8080/${politician.name.toLowerCase().replace(" ", "")}.jpeg`;
            console.log('Image path:', imagePath); // Tjek billedstien i konsollen

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = politician.name;

            const button = document.createElement('button');
            button.textContent = `Chat med ${politician.name}`;
            button.onclick = () => {
                chatWithPolitician(politician.name);
            };

            politicianDiv.appendChild(img);
            politicianDiv.appendChild(button);
            politiciansList.appendChild(politicianDiv);
        });
    })
    .catch(error => console.error('Fejl ved hentning af politikere:', error));

// Funktion til at åbne chat med politiker
function chatWithPolitician(politicianName) {
    console.log(`Chat med ${politicianName} er valgt.`);
    // Du kan åbne et chatrum eller gøre noget andet her.
    // F.eks. opdatere en div med chatbeskeder eller sende en forespørgsel til backend.
}