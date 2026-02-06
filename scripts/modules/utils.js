const getRandomTableCellIndex = (sizeOfBoard) => {
  return Math.floor(Math.random() * (sizeOfBoard * sizeOfBoard));
};

const setClassName = (element, className, addClassName = true) => {
  addClassName
    ? element.classList.add(className)
    : element.classList.remove(className);
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

const removeRandomColouredSquare = (
  randomSquare,
  randomColour,
  classNameTogglerFunc,
) => {
  classNameTogglerFunc(randomSquare, randomColour, false);
};

const createRandomColouredSquare = (
  randomSquare,
  randomColour,
  classNameTogglerFunc,
  answerObj,
) => {
  classNameTogglerFunc(randomSquare, randomColour);
  answerObj[randomColour] += 1;
};

export {
  getRandomTableCellIndex,
  setClassName,
  generateRandomColour,
  removeRandomColouredSquare,
  createRandomColouredSquare,
};
