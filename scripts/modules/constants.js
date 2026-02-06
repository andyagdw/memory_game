const LEVEL_VAL = 1;
const STARTING_NUM_OF_GENERATED_SQUARES = 3;
const NUM_OF_LIVES_REMAINING = 10;
const LOCAL_STORAGE_KEY = "memory_burst_high_score";
const BOARD_SIZE = 4;
const END_GAME_TEXT = "End Game";
const NEXT_LEVEL_TEXT = "Next";
const NUM_OF_LIVES_REMAINING_TEXT = "Number of lives remaining:";
const DELAY_BEFORE_RESTARTING_A_LEVEL = 10;
/* 
  How long it takes for a random coloured square to appear on the board
  How long it takes before a random coloured square disappears of the board
*/
const DELAY_TIME = 1000;
const ANSWER_OBJ = {
  red: 0,
  blue: 0,
  green: 0,
};

export {
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
};
