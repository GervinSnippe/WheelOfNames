// Variabelen koppelen aan HTML-elementen
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const namesTextarea = document.getElementById('names');
const chosenNameParagraph = document.getElementById('chosenName');
const innerWheel = document.getElementById('innerWheel');

let lastRotation = 0; // Houdt de laatst gebruikte rotatie bij

// Deze functie draait het rad en kiest een willekeurige naam
function spinWheel() {
  // Haal de ingevulde namen op, splitst op nieuwe regel, filter lege regels eruit
  const names = namesTextarea.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name !== '');

  if (names.length === 0) {
    alert('Vul eerst namen in!');
    return;
  }

  // Kies een willekeurige naam
  const randomIndex = Math.floor(Math.random() * names.length);
  const pickedName = names[randomIndex];

  // Verwijder de gekozen naam uit de lijst
  names.splice(randomIndex, 1);

  // Schrijf de nieuwe lijst (zonder gekozen naam) terug in de textarea
  namesTextarea.value = names.join('\n');

  // Toon de gekozen naam
  chosenNameParagraph.textContent = 'De winnaar is: ' + pickedName;

  // Maak een willekeurig aantal graden om te draaien tussen 2000 en 5000 (voor effect)
  const randomSpin = Math.floor(Math.random() * 3000) + 2000;

  // Bepaal de nieuwe rotatie
  // lastRotation zorgt ervoor dat we telkens verder blijven draaien in plaats van te resetten
  lastRotation += randomSpin;

  // Voer de draaiing uit via CSS transform
  innerWheel.style.transform = `rotate(${lastRotation}deg)`;
}

function resetWheel() {
  // Terug naar beginpositie en tekst leegmaken
  innerWheel.style.transform = 'rotate(0deg)';
  lastRotation = 0;
  chosenNameParagraph.textContent = '';
}

// Event listeners
spinBtn.addEventListener('click', spinWheel);
resetBtn.addEventListener('click', resetWheel);
