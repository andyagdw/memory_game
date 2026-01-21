const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

/*

When 'Start Game' button is clicked:
    - Hide everything in main
    - Create 4 x 4 table
    - Display 'Level 1' at the top of the table (this needs to be updated as the user progresses)
    - Show form below table with three inputs
    - After two seconds, randomly show three coloured squares
    
    - Create a function that shows coloured squares and stores how many times they appeared
    - Have an object with the following keys: red, green, blue - store values here

    - If correct, show 'Next' button
    - If wrong, end game
        - Sets 'end game' to false
        - Shows home page - set main page back to block
        - Hide game page
        - Reset object
        - Reset number of squares

*/
