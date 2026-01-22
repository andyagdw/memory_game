const getRandomTableCellIndex = (sizeOfBoard) => {
  return Math.floor(Math.random() * (sizeOfBoard * sizeOfBoard));
};

// ===================================================
const myObj = {
  red: 0,
  blue: 0,
  green: 0,
};

let levelVal = 1; // The level the user is currently on
let numOfSquares = 3; // The default number of squares to generate for level 1
let numOfLivesRemaining = 3;
const boardSize = 4;
const endGameText = "End Game";
const nextLevelText = "Next";
const numOfLivesRemainingText = "Number of lives remaining:";
const delayBeforeRestartingALevel = 10;
/* 
  How long it takes for a random coloured square to appear on the board
  How long it takes before a random coloured square to disappears of the board
*/
const delayTime = 1000;

// ===================================================
// Can add `@type` to all elements
/** @type {HTMLSpanElement} */
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
const homePageWrapper = document.querySelector(".js-home-page-wrapper");
const startGameBtn = document.querySelector(".js-button--play-game");
const gameWrapper = document.querySelector(".js-game-wrapper");
const levelText = document.querySelector(".js-game-wrapper__heading");
const redInput = document.querySelector("#red-squares");
const blueInput = document.querySelector("#blue-squares");
const greenInput = document.querySelector("#green-squares");
const submitBtn = document.querySelector(".js-button--submit");
const answerForm = document.querySelector(".js-answer-form");
const correctIncorrectText = document.querySelector(
  ".js-correct-incorrect-text",
);
const correctIncorrectTextWrapper = document.querySelector(
  ".js-correct-incorrect-text-wrapper",
);
const nextLvlOrEndGameBtn = document.querySelector(
  ".js-button--next-lvl-or-end-game",
);
const table = document.querySelector(".js-table");
const numOfLivesHeading = document.querySelector(
  ".js-game-wrapper__num-of-lives-heading",
);
// ===================================================
const enableInputFields = () => {
  // Enable input fields and button
  redInput.removeAttribute("disabled");
  blueInput.removeAttribute("disabled");
  greenInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  // ! UNCOMMENT TO DISPLAY OBJECT IN CONSOLE
  console.log("My object", myObj);
};

const generateSquares = () => {
  for (let i = 0; i < numOfSquares; i++) {
    setTimeout(
      () => {
        if (i === numOfSquares - 1) {
          setTimeout(enableInputFields, (i + 1) * delayTime);
        }
        const randomSquare =
          table.getElementsByTagName("td")[getRandomTableCellIndex(boardSize)];
        const randomNum = Math.random();
        if (randomNum < 0.3) {
          randomSquare.classList.add("red");
          myObj.red += 1;
        } else if (randomNum >= 0.3 && randomNum <= 0.6) {
          randomSquare.classList.add("blue");
          myObj.blue += 1;
        } else {
          randomSquare.classList.add("green");
          myObj.green += 1;
        }

        setTimeout(() => {
          if (randomSquare.classList.contains("red")) {
            randomSquare.classList.remove("red");
          } else if (randomSquare.classList.contains("blue")) {
            randomSquare.classList.remove("blue");
          } else {
            randomSquare.classList.remove("green");
          }
        }, delayTime);
      },
      (i + 1) * delayTime,
    );
  }
};

const startGame = () => {
  // Hide home page
  homePageWrapper.style.display = "none";
  // Display game page
  gameWrapper.style.display = "flex";
  // Update level text
  levelText.innerText = `Level ${levelVal}`;
  // Update 'number of lives remaining text'
  numOfLivesHeading.textContent = `${numOfLivesRemainingText} ${numOfLivesRemaining}`;
  // Start generating random squares
  generateSquares();
};

const resetStyles = (levelTextTextContent = "", endOfGame = false) => {
  // Reset Object
  myObj.red = 0;
  myObj.green = 0;
  myObj.blue = 0;
  if (!endOfGame) {
    // Hide Game page
    gameWrapper.style.display = "none";
    // Display home page
    homePageWrapper.style.display = "block";
    // Reset level
    levelVal = 1;
    // Reset number of lives remaining
    numOfLivesRemaining = 3;
  }
  // Update level text
  levelText.textContent = levelTextTextContent;
  // Reset input fields and set to disabled
  redInput.value = "0";
  blueInput.value = "0";
  greenInput.value = "0";
  redInput.setAttribute("disabled", true);
  blueInput.setAttribute("disabled", true);
  greenInput.setAttribute("disabled", true);
  // Hide 'correct incorrect text' and next level button
  correctIncorrectTextWrapper.classList.add("hidden");
  correctIncorrectText.textContent = "";
  nextLvlOrEndGameBtn.classList.add("hidden");
};

// ===================================================
startGameBtn.addEventListener("click", startGame);
nextLvlOrEndGameBtn.addEventListener("click", () => {
  if (nextLvlOrEndGameBtn.textContent === endGameText) {
    resetStyles("");
    // Reset number of squares
    numOfSquares = 3;
  } else if (nextLvlOrEndGameBtn.textContent === nextLevelText) {
    resetStyles(`Level ${++levelVal}`, true);
    // Increase number of squares by 1
    ++numOfSquares;
    // Generate next game squares
    generateSquares();
  } else {
    return;
  }
});
answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Correct answer
  if (
    +redInput.value === myObj.red &&
    +blueInput.value === myObj.blue &&
    +greenInput.value === myObj.green
  ) {
    correctIncorrectTextWrapper.classList.remove("hidden");
    correctIncorrectText.textContent = "Congratulations!";
    nextLvlOrEndGameBtn.classList.remove("hidden");
    nextLvlOrEndGameBtn.textContent = nextLevelText;
    // Wrong answer
  } else {
    --numOfLivesRemaining;
    if (numOfLivesRemaining > 0) {
      // Reset input fields and set to disabled
      redInput.setAttribute("disabled", true);
      blueInput.setAttribute("disabled", true);
      greenInput.setAttribute("disabled", true);
      redInput.value = "0";
      blueInput.value = "0";
      greenInput.value = "0";
      // Reset myObj to 0
      myObj.red = 0;
      myObj.blue = 0;
      myObj.green = 0;
      // Show incorrect text at the bottom
      correctIncorrectTextWrapper.classList.remove("hidden");
      correctIncorrectText.textContent = "Incorrect!";
      // Update number of lives remaining text
      numOfLivesHeading.textContent = `${numOfLivesRemainingText} ${numOfLivesRemaining}`;
      // Dynamically show when the level will be restarted
      for (let i = delayBeforeRestartingALevel; i >= 0; i--) {
        setTimeout(
          () => {
            if (i === 0) {
              // On last iteration generate squares and hide text content
              correctIncorrectTextWrapper.classList.add("hidden");
              correctIncorrectText.textContent = "";
              generateSquares();
            } else {
              // Dynamically show text at bottom of game board
              correctIncorrectText.textContent = `Incorrect! Restarting level in ${i} seconds...`;
            }
          },
          (delayBeforeRestartingALevel + 1 - i) * 1000, // Count up from 0 onwards
        );
      }
    } else {
      // No lives remaining
      numOfLivesHeading.textContent = `${numOfLivesRemainingText} ${numOfLivesRemaining}`;
      correctIncorrectTextWrapper.classList.remove("hidden");
      correctIncorrectText.textContent = "Game over!";
      nextLvlOrEndGameBtn.classList.remove("hidden");
      nextLvlOrEndGameBtn.textContent = endGameText;
    }
  }
  // Disable submit button to prevent another form submission
  submitBtn.setAttribute("disabled", true);
});
