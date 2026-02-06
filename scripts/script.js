import {
  LEVEL_VAL,
  STARTING_NUM_OF_GENERATED_SQUARES,
  NUM_OF_LIVES_REMAINING,
  LOCAL_STORAGE_KEY,
  BOARD_SIZE,
  END_GAME_TEXT,
  NEXT_LEVEL_TEXT,
  NUM_OF_LIVES_REMAINING_TEXT,
  DELAY_BEFORE_RESTARTING_A_LEVEL,
  DELAY_TIME,
  ANSWER_OBJ,
} from "./modules/constants.js";

import {
  getRandomTableCellIndex,
  setClassName,
  generateRandomColour,
  removeRandomColouredSquare,
  createRandomColouredSquare,
} from "./modules/utils.js";

// ===================================================
let levelVal = LEVEL_VAL; // The level the user is currently on
let numOfSquares = STARTING_NUM_OF_GENERATED_SQUARES; // The default number of squares to generate for level 1
let numOfLivesRemaining = NUM_OF_LIVES_REMAINING;

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
const displayCorrectAnswerPara = document.querySelector(
  ".js-correct-incorrect-text-wrapper__display-correct-answer",
);
const userHighScoreText = document.querySelector(
  ".js-high-score-wrapper__score",
);
const highScorePopover = document.querySelector(".js-popover");
const highScoreText = document.querySelector(".js-popover__new-level-text");
// ===================================================
const enableInputFields = () => {
  // Enable input fields and button
  redInput.removeAttribute("disabled");
  blueInput.removeAttribute("disabled");
  greenInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  // ! UNCOMMENT TO DISPLAY OBJECT IN CONSOLE
  // console.log("Answer object", ANSWER_OBJ);
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
            const randomSquareIdx = getRandomTableCellIndex(BOARD_SIZE);
            const randomSquare =
              table.getElementsByTagName("td")[randomSquareIdx];
            const randomColour = generateRandomColour();

            if (
              prevRandomSquareIdx === randomSquareIdx &&
              prevRandomSquareColour === randomColour
            ) {
              continue;
              // Only generate a random square if current colour and index is not the same as last iteration
            } else {
              prevRandomSquareIdx = randomSquareIdx;
              prevRandomSquareColour = randomColour;
              createRandomColouredSquare(
                randomSquare,
                randomColour,
                setClassName,
                ANSWER_OBJ,
              );
              setTimeout(
                removeRandomColouredSquare,
                DELAY_TIME,
                randomSquare,
                randomColour,
                setClassName,
              );
              break;
            }
          }
        }
      },
      (i + 1) * DELAY_TIME,
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
  levelText.textContent = `Level ${levelVal}`;
  // Update 'number of lives remaining text'
  numOfLivesHeading.textContent = `${NUM_OF_LIVES_REMAINING_TEXT} ${numOfLivesRemaining}`;
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
  levelVal = LEVEL_VAL;
  // Reset number of lives remaining
  numOfLivesRemaining = NUM_OF_LIVES_REMAINING;
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
  // Hide high score popover if user has not closed it
  if (highScorePopover.style.display === "block") {
    highScorePopover.style.display = "none";
  }
};

const updateUserHighScore = () => {
  const userHighScore = +JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (levelVal > userHighScore) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(levelVal));
    userHighScoreText.textContent = levelVal;
    highScorePopover.showPopover();
    highScoreText.textContent = `Level ${levelVal}`;
  }
};

const resetStyles = (levelTextTextContent = "", endOfGame = false) => {
  // Reset Object
  ANSWER_OBJ.red = 0;
  ANSWER_OBJ.green = 0;
  ANSWER_OBJ.blue = 0;
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
  // Hide correct answer text
  setClassName(displayCorrectAnswerPara, "hidden");
  displayCorrectAnswerPara.textContent = "";
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
  for (let i = DELAY_BEFORE_RESTARTING_A_LEVEL; i >= 0; i--) {
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
      (DELAY_BEFORE_RESTARTING_A_LEVEL + 1 - i) * 1000, // Count up from 0 onwards
    );
  }
};

const showNoLivesRemainingDisplay = () => {
  // Reset input fields and set to disabled
  setClassName(correctIncorrectTextWrapper, "hidden", false);
  correctIncorrectText.textContent = "Game over!";
  setClassName(correctIncorrectText, "incorrect-answer");
  setClassName(nextLvlOrEndGameBtn, "hidden", false);
  nextLvlOrEndGameBtn.textContent = END_GAME_TEXT;
  // Update end game button classname
  setClassName(nextLvlOrEndGameBtn, "end-game-style");
};

const showLivesRemainingDisplay = () => {
  redInput.setAttribute("disabled", true);
  blueInput.setAttribute("disabled", true);
  greenInput.setAttribute("disabled", true);
  redInput.value = "0";
  blueInput.value = "0";
  greenInput.value = "0";
  // Reset ANSWER_OBJ to 0
  ANSWER_OBJ.red = 0;
  ANSWER_OBJ.blue = 0;
  ANSWER_OBJ.green = 0;
  // Show incorrect text at the bottom
  setClassName(correctIncorrectTextWrapper, "hidden", false);
  // Remove correct colour text, if present
  if (correctIncorrectText.classList.contains("correct-answer")) {
    setClassName(correctIncorrectText, "correct-answer", false);
  }
  correctIncorrectText.textContent = "Incorrect!";
  updateCorrectIncorrectText();
};

const showCorrectAnswerDisplay = () => {
  // Check to see if 'correct answer' UI is displaying from a previous guess
  if (!displayCorrectAnswerPara.classList.contains("hidden")) {
    setClassName(displayCorrectAnswerPara, "hidden");
  }
  setClassName(correctIncorrectTextWrapper, "hidden", false);
  correctIncorrectText.textContent = "Congratulations!";
  setClassName(correctIncorrectText, "correct-answer");
  setClassName(nextLvlOrEndGameBtn, "hidden", false);
  nextLvlOrEndGameBtn.textContent = NEXT_LEVEL_TEXT;
  // Update next level button classname
  setClassName(nextLvlOrEndGameBtn, "next-level-style");
};

// ===================================================
startGameBtn.addEventListener("click", startGame);
nextLvlOrEndGameBtn.addEventListener("click", () => {
  if (nextLvlOrEndGameBtn.textContent === END_GAME_TEXT) {
    resetStyles();
    // Reset number of squares
    numOfSquares = STARTING_NUM_OF_GENERATED_SQUARES;
  } else if (nextLvlOrEndGameBtn.textContent === NEXT_LEVEL_TEXT) {
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
    +redInput.value === ANSWER_OBJ.red &&
    +blueInput.value === ANSWER_OBJ.blue &&
    +greenInput.value === ANSWER_OBJ.green
  ) {
    showCorrectAnswerDisplay();
  } else {
    // Wrong answer
    --numOfLivesRemaining;
    const correctAnswerText = `Correct answer was: Red ${ANSWER_OBJ.red}, Blue: ${ANSWER_OBJ.blue}, Green: ${ANSWER_OBJ.green}`;
    if (numOfLivesRemaining > 0) {
      showLivesRemainingDisplay();
    } else {
      // No lives remaining
      updateUserHighScore();
      showNoLivesRemainingDisplay();
    }
    // Update number of lives remaining text
    if (!document.startViewTransition) {
      numOfLivesHeading.textContent = `${NUM_OF_LIVES_REMAINING_TEXT} ${numOfLivesRemaining}`;
    } else {
      document.startViewTransition(
        () =>
          (numOfLivesHeading.textContent = `${NUM_OF_LIVES_REMAINING_TEXT} ${numOfLivesRemaining}`),
      );
    }
    // Display correct answer
    setClassName(displayCorrectAnswerPara, "hidden", false);
    displayCorrectAnswerPara.textContent = correctAnswerText;
  }
  // Disable submit button to prevent another form submission
  submitBtn.setAttribute("disabled", true);
});

// Show high score when HTML has been parsed
document.addEventListener("DOMContentLoaded", () => {
  let userHighScore = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? null,
  );

  if (!userHighScore) {
    userHighScore = 0;
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
  }

  userHighScoreText.textContent = userHighScore;
});
