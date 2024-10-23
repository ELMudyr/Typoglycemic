const apiKey = '16fb0c9f7dc740da7639329841201e31';
const paragraph = document.querySelector('.text')
const button = document.getElementById("Button")

document.addEventListener('DOMContentLoaded', function() {
  const darkModeButton = document.getElementById('Dark-mode-on');
  const lightModeButton = document.getElementById('Light-mode-on');
  const body = document.body;

  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleButtons(true);
  } else {
    body.classList.add('light-mode');
    toggleButtons(false);
  }

  // Function to toggle between buttons
  function toggleButtons(isDarkMode) {
    if (isDarkMode) {
      darkModeButton.style.display = 'block';
      lightModeButton.style.display = 'none';
    } else {
      lightModeButton.style.display = 'block';
      darkModeButton.style.display = 'none';
    }
  }

  // Switch to light mode
  darkModeButton.addEventListener('click', function() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleButtons(false);
    localStorage.setItem('theme', 'light');
  });

  // Switch to dark mode
  lightModeButton.addEventListener('click', function() {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleButtons(true);
    localStorage.setItem('theme', 'dark');
  });
});




let phrase = 'Wikipedia is a free content online encyclopedia written and maintained by a community of volunteers, known as Wikipedians, through open collaboration and the wiki '
paragraph.textContent = scramblePhrase(phrase)

function scrambleWord(word) {
  if (word.length <= 3) return word;

  const firstChar = word[0];
  const lastChar = word[word.length - 1];

  // Get the middle part of the word (characters between the first and last)
  let middleChars = word.slice(1, -1).split('');

  function shuffleMiddleCharacters(arr) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      // Swap characters at positions i and randomIndex
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
  }
  const shuffledMiddle = shuffleMiddleCharacters(middleChars);

  return firstChar + shuffledMiddle.join('') + lastChar;
}

function scramblePhrase(phrase) {
  return phrase.split(' ').map(word => {
    // Handle punctuation at the end of a word
    let punctuation = '';
    if (/[^a-zA-Z]$/.test(word)) {
      punctuation = word.slice(-1);
      word = word.slice(0, -1);
    }
    return scrambleWord(word) + punctuation;
  }).join(' ');
}

button.addEventListener("click",
  function generateText() {

    fetch(`https://api.api-ninjas.com/v1/dadjokes?limit`, {
      method: 'GET',
      headers: {
        'X-Api-Key': '4tgNc/+4MCwtWEHtwiNHNw==WMtyUfwZ8RETmVwa',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        joke = data[0].joke
        paragraph.textContent = scramblePhrase(joke)
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  })
