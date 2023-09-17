// Hardcoded data for different levels

const level_name = [
  "Level-I: Easy",
  "Level-II: Intermediate",
  "Level-III: Moderate",
  "Level-IV: Challenging",
  "Level-V: Advanced",
  "Level-VI: Hard",
  "Level-VII: Expert",
];
const lcolor = [
  "#C65993",
  "#B64A85",
  "#A73C77",
  "#983D70",
  "#893E68",
  "#7A3F60",
  "#6B4058",
];

const level1_words = [
  "JET",
  "SUN",
  "RED",
  "RUN",
  "PEN",
  "BOX",
  "FOX",
  "COW",
  "BUG",
  "ZIP",
  "CAR",
  "MAN",
  "HAT",
  "TOY",
  "INK",
];
const level2_words = [
  "FROG",
  "JUMP",
  "FISH",
  "KITE",
  "WIND",
  "SAND",
  "FARM",
  "LAMP",
  "PARK",
  "GOLF",
  "CAKE",
  "BIRD",
  "RICE",
  "LION",
  "SOUP",
];
const level3_words = [
  "CHALK",
  "GLOVE",
  "APPLE",
  "MOUSE",
  "DANCE",
  "TABLE",
  "CHAIR",
  "PHONE",
  "OCEAN",
  "PLANT",
  "TIGER",
  "BRAIN",
  "EAGLE",
  "RIVER",
  "DRINK",
];
const level4_words = [
  "BANANA",
  "PUZZLE",
  "CANDLE",
  "MAGNET",
  "BRIDGE",
  "BEAR",
  "PIZZA",
  "SQUIRREL",
  "MIRROR",
  "VIOLIN",
  "JACKET",
  "DOLPHIN",
  "FRIEND",
  "ISLAND",
  "MONKEY",
];
const level5_words = [
  "MYSTERY",
  "BICYCLE",
  "WALRUS",
  "BUTTERY",
  "SUNRISE",
  "UMBRELLA",
  "CABBAGE",
  "FANTASY",
  "GARDEN",
  "HORROR",
  "JOURNEY",
  "KANGAROO",
  "LOBSTER",
  "POTATO",
  "ZEBRA",
];
const level6_words = [
  "TOMORROW",
  "DISCOVER",
  "ADVENTURE",
  "MOUNTAIN",
  "ELEPHANT",
  "DANGEROUS",
  "HOSPITAL",
  "HIGHLIGHT",
  "INVISIBLE",
  "PARACHUTE",
  "UNIVERSE",
  "REFRIGERATOR",
  "CELEBRATE",
  "DIFFICULT",
  "INTEREST",
];
const level7_words = [
  "EXCEPTION",
  "COMPLICATED",
  "SPECTACULAR",
  "CONFUSION",
  "RECOMMEND",
  "DEVELOPER",
  "DISTURBANCE",
  "CHALLENGE",
  "CONCENTRATE",
  "IMAGINATION",
  "EXPERIMENT",
  "OVERWHELMING",
  "DETERMINED",
  "COMMUNICATION",
  "UNDERSTAND",
];

const level_word = [
  level1_words,
  level2_words,
  level3_words,
  level4_words,
  level5_words,
  level6_words,
  level7_words,
];

// Selectors
const main = document.querySelector(".main");
const level = document.querySelector(".level");
const answer = document.getElementById("answer");
const btn = document.querySelector(".pressed");
const chnage_btn = document.querySelector(".chnage_word");
const insert = document.querySelector(".Word");
const reset = document.querySelector(".reset");
const mean_btn = document.querySelector(".means");
// constansts
let level_number = 0;

// Disctnory api call
async function getWordMeaning(w) {
  try {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${w}`;
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const data = await response.json();
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      return meaning;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// helper Functions

// selecting word
const word_selector = function () {
  return Math.floor(Math.random() * 15);
};

// generating random number
const random_gen = function (a) {
  return Math.floor(Math.random() * (a - 1));
};

// scrambling word letters
let word = "";
let ans = "";
const word_scramble = function (lev) {
  const select = level_word[lev][word_selector()];
  let charArray = select.split("");
  ans = select;
  // Function to shuffle the characters in an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  do {
    charArray = select.split(""); // Reset charArray to the original word
    shuffleArray(charArray); // Shuffle the characters
    word = charArray.join(""); // Reconstruct the word
  } while (word === select); // Repeat until word is different from select

  insert.textContent = `${word}`;
  console.log(ans);
};

word_scramble(level_number);

// Play Game

const play = function () {
  level.textContent = `${level_name[level_number]}`;
  main.style.backgroundColor = `${lcolor[level_number]}`;
};

mean_btn.addEventListener("click", function () {
  if (ans === answer.value) {
    getWordMeaning(ans)
      .then((meaning) => {
        if (meaning) {
          alert(`${meaning}`);
        } else {
          alert(`No meaning found`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

btn.addEventListener("click", function () {
  if (ans === answer.value) {
    answer.value = "";
    level_number++;

    if (level_number === 7) {
      alert("Congrats you win!");
      location.reload();
    } else {
      word_scramble(level_number);
      play();
    }
  } else {
    alert("retry");
  }
});

chnage_btn.addEventListener("click", function () {
  insert.textContent = "";

  word_scramble(level_number);
});

// reset game
reset.addEventListener("click", function () {
  location.reload();
});
