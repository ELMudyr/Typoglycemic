const paragraph = document.querySelector('.text')
const button = document.getElementById("Button")
const nav = document.getElementsByTagName("li")
const aboutButton = document.getElementById("About")
const aboutPage = document.getElementById("about-page")

// Animations
gsap.from(nav, {
  opacity: 0,
  duration: 1,
  ease: "power.out",
  x: 25,
  delay: 1,
})
gsap.from(paragraph, {
  opacity: 0,
  duration: 1,
  ease: "power.in",
  y: 25,
})
gsap.from(button, {
  opacity: 0,
  y: 10,
  duration: 0.5,
  ease: "power.in",
  delay: 1,
})
aboutPage.style.display = "none";

// Show / hide About Page
aboutButton.addEventListener("click", function() {
  if (aboutPage.style.display === "none") {
    aboutPage.style.display = "block";
    gsap.fromTo(aboutPage, {
      opacity: 0,
      x: 500
    }, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power.in"
    });
  } else {
    gsap.to(aboutPage, {
      opacity: 0,
      x: 500,
      duration: 0.5,
      ease: "power.in",
      onComplete: function() {
        aboutPage.style.display = "none";
      }
    });
  }
});

// Dark / Ligh mode Toggle
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

  darkModeButton.addEventListener('click', function() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleButtons(false);
    localStorage.setItem('theme', 'light');
  });

  lightModeButton.addEventListener('click', function() {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleButtons(true);
    localStorage.setItem('theme', 'dark');
  });
});

//Handle Typoglycemia
function scrambleWord(word) {
  if (word.length <= 3) return word;

  const firstChar = word[0];
  const lastChar = word[word.length - 1];

  // Get the middle part of the word (characters between the first and last)
  let middleChars = word.slice(1, -1).split('');

  function shuffleMiddleCharacters(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
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

//News API
require('dotenv').config()
const API_Key = process.env.KEY_API
button.addEventListener("click",
  function generateText() {

    const options = {
      method: 'GET',
      headers: {
        'x-api-key': API_Key
      }
    };

    const url = `https://api.newscatcherapi.com/v2/search?q=Morocco&lang=en`;

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(API_Key)
        console.log(data.articles)
        let summary = data.articles[Math.floor(Math.random() * 20)].summary
        paragraph.textContent = scramblePhrase(summary)
      })
      .catch(error => console.error('Error:', error));
  })
