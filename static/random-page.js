function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows.map((values) => values.join(', ').trim()).filter(Boolean);
}

const imageNumbers = Array.from({ length: 329 }, (_, index) => index + 1).filter(
  (number) => number !== 218,
);
const textElement = document.querySelector('#finaltxt');
const imageElement = document.querySelector('#random-image');
const againButton = document.querySelector('#again');
let entries = [];

function showRandomEntry() {
  const entry = entries[Math.floor(Math.random() * entries.length)];
  const imageNumber = imageNumbers[Math.floor(Math.random() * imageNumbers.length)];
  textElement.textContent = entry;
  imageElement.src = `./static/pngs/${imageNumber}.png`;
}

fetch(document.body.dataset.source)
  .then((response) => {
    if (!response.ok) throw new Error('Could not load this page.');
    return response.text();
  })
  .then((text) => {
    entries = parseCsv(text);
    showRandomEntry();
    againButton.addEventListener('click', showRandomEntry);
  })
  .catch(() => {
    textElement.textContent = 'Could not load this page. Please try again.';
    againButton.hidden = true;
  });
