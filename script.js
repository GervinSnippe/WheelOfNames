const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const namesTextarea = document.getElementById('names');
const chosenNameParagraph = document.getElementById('chosenName');
const innerWheel = document.getElementById('innerWheel');

let lastRotation = 0;

function spinWheel() {
  // 1. Lees namenlijst uit de textarea
  const names = namesTextarea.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name !== '');

  if (names.length === 0) {
    alert('Vul eerst namen in!');
    return;
  }

  // 2. Kies willekeurige index
  const randomIndex = Math.floor(Math.random() * names.length);
  const pickedName = names[randomIndex];

  // 3. Bereken segmenthoeken
  const n = names.length;                  // aantal namen
  const segmentHoek = 360 / n;             // hoek per segment
  const baseAngle = (randomIndex * segmentHoek) + (segmentHoek / 2);
  
  // 4. Voeg een paar ‘volledige rondjes’ toe voor effect
  //    Kies bijv. 3 tot 5 volledige rondjes
  const extraRondjes = Math.floor(Math.random() * 3) + 3;  // random 3,4,5
  const extraHoek = 360 * extraRondjes;

  // 5. Bepaal totale draaihoek
  const totalRotation = lastRotation + extraHoek + baseAngle;

  // 6. Draai het wiel naar die hoek (CSS transform)
  innerWheel.style.transform = `rotate(${totalRotation}deg)`;

  // 7. Sla op voor de volgende spin
  lastRotation = totalRotation;

  // 8. Verwijder de naam uit de lijst en update de textarea
  names.splice(randomIndex, 1);
  namesTextarea.value = names.join('\n');

  // 9. Toon de gekozen naam
  chosenNameParagraph.textContent = 'De winnaar is: ' + pickedName;
}

function resetWheel() {
  innerWheel.style.transform = 'rotate(0deg)';
  lastRotation = 0;
  chosenNameParagraph.textContent = '';
}

// Event listeners
spinBtn.addEventListener('click', spinWheel);
resetBtn.addEventListener('click', resetWheel);
