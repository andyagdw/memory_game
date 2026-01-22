const getRandomTableCellIndex = (sizeOfBoard) => {
  return Math.floor(Math.random() * (sizeOfBoard * sizeOfBoard));
};

// ===================================================
const myObj = {
  red: 0,
  blue: 0,
  green: 0,
};

const boardSize = 4;
let levelVal = 1; // The level the user is currently on
let numOfSquares = 3; // The default number of squares to generate for level 1
const endGameText = "End Game";
const nextLevelText = "Next";

// ===================================================
/** @type {HTMLSpanElement} */
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
/** @type {HTMLDivElement} */
const homePageWrapper = document.querySelector(".js-home-page-wrapper");
/** @type {HTMLButtonElement} */
const startGameBtn = document.querySelector(".js-button--play-game");
/** @type {HTMLDivElement} */
const gameWrapper = document.querySelector(".js-game-wrapper");
/** @type {HTMLHeadingElement} */
const levelText = document.querySelector(".js-game-wrapper__heading");
/** @type {HTMLInputElement} */
const redInput = document.querySelector("#red-squares");
/** @type {HTMLInputElement} */
const blueInput = document.querySelector("#blue-squares");
/** @type {HTMLInputElement} */
const greenInput = document.querySelector("#green-squares");
/** @type {HTMLButtonElement} */
const submitBtn = document.querySelector(".js-button--submit");
/** @type {HTMLFormElement} */
const answerForm = document.querySelector(".js-answer-form");
/** @type {HTMLParagraphElement} */
const correctIncorrectText = document.querySelector(
  ".js-correct-incorrect-text",
);
/** @type {HTMLDivElement} */
const correctIncorrectTextWrapper = document.querySelector(
  ".js-correct-incorrect-text-wrapper",
);
/** @type {HTMLButtonElement} */
const nextLevelBtn = document.querySelector(".js-button--next-level");
/** @type {HTMLTableElement} */
const table = document.querySelector(".js-table");
// ===================================================
const enableInputFields = () => {
  // Enable input fields and button
  redInput.removeAttribute("disabled");
  blueInput.removeAttribute("disabled");
  greenInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  // * DISPLAY OBJECT IN CONSOLE
  // console.log("My object", myObj);
};

const generateSquares = () => {
  for (let i = 0; i < numOfSquares; i++) {
    setTimeout(
      () => {
        if (i === numOfSquares - 1) {
          setTimeout(enableInputFields, (i + 1) * 1000);
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
        }, 1000);
      },
      (i + 1) * 1000,
    );
  }
};

const startGame = () => {
  // Hide home page
  homePageWrapper.style.display = "none";
  // Display game page
  gameWrapper.style.display = "flex";
  // Update 'LEVEL' text
  levelText.innerText = `Level ${levelVal}`;
  // Start generating randoms squares
  generateSquares();
};

const resetStyles = (levelTextTextContent = "", answerWasCorrect = true) => {
  // Reset Object
  myObj.red = 0;
  myObj.green = 0;
  myObj.blue = 0;
  if (!answerWasCorrect) {
    // Hide Game page
    gameWrapper.style.display = "none";
    // Display home page
    homePageWrapper.style.display = "block";
    // Reset level
    levelVal = 1;
  }
  // Update Level text
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
  nextLevelBtn.classList.add("hidden");
};

// ===================================================
startGameBtn.addEventListener("click", startGame);
nextLevelBtn.addEventListener("click", () => {
  if (nextLevelBtn.textContent === endGameText) {
    resetStyles("", false);
    // Reset number of squares
    numOfSquares = 3;
  } else if (nextLevelBtn.textContent === nextLevelText) {
    resetStyles(`Level ${++levelVal}`);
    // Generate next game squares
    // Increase number of squares by 1
    ++numOfSquares;
    generateSquares();
  } else {
    return;
  }
});
answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    +redInput.value === myObj.red &&
    +blueInput.value === myObj.blue &&
    +greenInput.value === myObj.green
  ) {
    correctIncorrectTextWrapper.classList.remove("hidden");
    correctIncorrectText.textContent = "Congratulations!";
    nextLevelBtn.classList.remove("hidden");
    nextLevelBtn.textContent = nextLevelText;
  } else {
    correctIncorrectTextWrapper.classList.remove("hidden");
    correctIncorrectText.textContent = "Incorrect!";
    nextLevelBtn.classList.remove("hidden");
    nextLevelBtn.textContent = endGameText;
  }
  // Disable submit button to prevent another form submission
  submitBtn.setAttribute("disabled", true);
});
