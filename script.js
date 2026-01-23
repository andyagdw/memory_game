const getRandomTableCellIndex = (sizeOfBoard) => {
  return Math.floor(Math.random() * (sizeOfBoard * sizeOfBoard));
};

// ===================================================
const answerObj = {
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
const body = document.querySelector("body");
// ===================================================
const enableInputFields = () => {
  // Enable input fields and button
  redInput.removeAttribute("disabled");
  blueInput.removeAttribute("disabled");
  greenInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  // ! UNCOMMENT TO DISPLAY OBJECT IN CONSOLE
  console.log("Answer object", answerObj);
};

const setClassName = (element, className, addClassName = true) => {
  addClassName
    ? element.classList.add(className)
    : element.classList.remove(className);
};

const removeRandomColouredSquare = (randomSquare) => {
  if (randomSquare.classList.contains("red")) {
    setClassName(randomSquare, "red", false);
  } else if (randomSquare.classList.contains("blue")) {
    setClassName(randomSquare, "blue", false);
  } else {
    setClassName(randomSquare, "green", false);
  }
};

const createRandomColouredSquare = (randomSquare) => {
  const randomNum = Math.random();
  if (randomNum < 0.3) {
    setClassName(randomSquare, "red");
    answerObj.red += 1;
  } else if (randomNum >= 0.3 && randomNum <= 0.6) {
    setClassName(randomSquare, "blue");
    answerObj.blue += 1;
  } else {
    setClassName(randomSquare, "green");
    answerObj.green += 1;
  }
};

const generateRandomColour = () => {
  const randomNum = Math.random();
  if (randomNum < 0.3) {
    return "red";
  } else if (randomNum >= 0.3 && randomNum <= 0.6) {
    return "blue";
  } else {
    return "green";
  }
};

const generateSquare = () => {
  let prevRandomSquareIdx = -1;
  let prevRandomSquareColour = "";
  for (let i = 0; i <= numOfSquares; i++) {
    setTimeout(
      () => {
        if (i === numOfSquares) {
          enableInputFields();
        } else {
          while (true) {
            const randomSquare =
              table.getElementsByTagName("td")[
                getRandomTableCellIndex(boardSize)
              ];
            const randomColour = generateRandomColour();

            if (
              prevRandomSquareIdx === randomSquare &&
              prevRandomSquareColour === randomColour
            ) {
              continue;
              // Only generate a random square if current colour and index is not the same as last iteration
            } else {
              prevRandomSquareIdx = randomSquare;
              prevRandomSquareColour = randomColour;
              createRandomColouredSquare(randomSquare);
              setTimeout(removeRandomColouredSquare, delayTime, randomSquare);
              break;
            }
          }
        }
      },
      (i + 1) * delayTime,
    );
  }
};

const updateBodyBackground = () => {
  if (body.classList.contains("home-page-body")) {
    setClassName(body, "home-page-body", false);
    setClassName(body, "game-page-body");
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
  // Update body background
  if (!document.startViewTransition) {
    updateBodyBackground();
  } else {
    document.startViewTransition(() => {
      updateBodyBackground();
    });
  }
  // Start generating random squares
  generateSquare();
};

const endGameResetStyles = () => {
  // Hide Game page
  gameWrapper.style.display = "none";
  // Display home page
  homePageWrapper.style.display = "block";
  // Reset level
  levelVal = 1;
  // Reset number of lives remaining
  numOfLivesRemaining = 3;
  // Reset text colour
  if (correctIncorrectText.classList.contains("incorrect-answer")) {
    setClassName(correctIncorrectText, "incorrect-answer", false);
  }
  if (body.classList.contains("game-page-body")) {
    // Add original body background
    setClassName(body, "game-page-body", false);
    setClassName(body, "home-page-body");
  }
  // Remove end game button style
  if (nextLvlOrEndGameBtn.classList.contains("end-game-style")) {
    setClassName(nextLvlOrEndGameBtn, "end-game-style", false);
  }
};

const resetStyles = (levelTextTextContent = "", endOfGame = false) => {
  // Reset Object
  answerObj.red = 0;
  answerObj.green = 0;
  answerObj.blue = 0;
  if (!endOfGame) {
    endGameResetStyles();
  }
  // Remove next level button style
  if (nextLvlOrEndGameBtn.classList.contains("next-level-style")) {
    setClassName(nextLvlOrEndGameBtn, "next-level-style", false);
  }
  // Update level text
  if (!document.startViewTransition) {
    levelText.textContent = levelTextTextContent;
  } else {
    document.startViewTransition(
      () => (levelText.textContent = levelTextTextContent),
    );
  }
  // Reset input fields and set to disabled
  redInput.value = "0";
  blueInput.value = "0";
  greenInput.value = "0";
  redInput.setAttribute("disabled", true);
  blueInput.setAttribute("disabled", true);
  greenInput.setAttribute("disabled", true);
  // Hide 'correct incorrect text' and next level button
  setClassName(correctIncorrectTextWrapper, "hidden");
  correctIncorrectText.textContent = "";
  setClassName(nextLvlOrEndGameBtn, "hidden");
};

const updateCorrectIncorrectText = () => {
  for (let i = delayBeforeRestartingALevel; i >= 0; i--) {
    setTimeout(
      () => {
        if (i === 0) {
          // On last iteration generate squares and hide text content
          setClassName(correctIncorrectTextWrapper, "hidden");
          correctIncorrectText.textContent = "";
          generateSquare();
        } else {
          // Dynamically show text at bottom of game board
          correctIncorrectText.textContent = `Incorrect! Restarting level in ${i} seconds...`;
        }
      },
      (delayBeforeRestartingALevel + 1 - i) * 1000, // Count up from 0 onwards
    );
  }
};

// ===================================================
startGameBtn.addEventListener("click", startGame);
nextLvlOrEndGameBtn.addEventListener("click", () => {
  if (nextLvlOrEndGameBtn.textContent === endGameText) {
    resetStyles();
    // Reset number of squares
    numOfSquares = 3;
  } else if (nextLvlOrEndGameBtn.textContent === nextLevelText) {
    resetStyles(`Level ${++levelVal}`, true);
    // Increase number of squares by 1
    ++numOfSquares;
    // Generate next game squares
    generateSquare();
  } else {
    return;
  }
});
answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Correct answer
  if (
    +redInput.value === answerObj.red &&
    +blueInput.value === answerObj.blue &&
    +greenInput.value === answerObj.green
  ) {
    setClassName(correctIncorrectTextWrapper, "hidden", false);
    correctIncorrectText.textContent = "Congratulations!";
    setClassName(correctIncorrectText, "correct-answer");
    setClassName(nextLvlOrEndGameBtn, "hidden", false);
    nextLvlOrEndGameBtn.textContent = nextLevelText;
    // Update next level button classname
    setClassName(nextLvlOrEndGameBtn, "next-level-style");
  } else {
    // Wrong answer
    --numOfLivesRemaining;
    if (numOfLivesRemaining > 0) {
      // Reset input fields and set to disabled
      redInput.setAttribute("disabled", true);
      blueInput.setAttribute("disabled", true);
      greenInput.setAttribute("disabled", true);
      redInput.value = "0";
      blueInput.value = "0";
      greenInput.value = "0";
      // Reset answerObj to 0
      answerObj.red = 0;
      answerObj.blue = 0;
      answerObj.green = 0;
      // Show incorrect text at the bottom
      setClassName(correctIncorrectTextWrapper, "hidden", false);
      // Remove correct colour text, if present
      if (correctIncorrectText.classList.contains("correct-answer")) {
        setClassName(correctIncorrectText, "correct-answer", false);
      }
      correctIncorrectText.textContent = "Incorrect!";
      updateCorrectIncorrectText();
    } else {
      // No lives remaining
      setClassName(correctIncorrectTextWrapper, "hidden", false);
      correctIncorrectText.textContent = "Game over!";
      setClassName(correctIncorrectText, "incorrect-answer");
      setClassName(nextLvlOrEndGameBtn, "hidden", false);
      nextLvlOrEndGameBtn.textContent = endGameText;
      // Update end game button classname
      setClassName(nextLvlOrEndGameBtn, "end-game-style");
    }
    // Update number of lives remaining text
    if (!document.startViewTransition) {
      numOfLivesHeading.textContent = `${numOfLivesRemainingText} ${numOfLivesRemaining}`;
    } else {
      document.startViewTransition(
        () =>
          (numOfLivesHeading.textContent = `${numOfLivesRemainingText} ${numOfLivesRemaining}`),
      );
    }
  }
  // Disable submit button to prevent another form submission
  submitBtn.setAttribute("disabled", true);
});
