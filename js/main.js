
// WAR GAME - Score version


// ---------------------------------------------------------------------------------------------------------------------------
// INTRODUCTION 

// Each player plays a card by clicking on his/her deck
// When a player wins a round, he/she adds the difference of value to his/her score
// The player with the highest score at the end wins!

// ---------------------------------------------------------------------------------------------------------------------------    
// BOARD GAME

// The title will be displayed as a header

// The board game will be displayed in 3 columns:
// Both edge columns will include the Player's name, deck and live score

// The middle column will be the battle field where:
// On each side, the player's card being played would be display
// On the bottom, the player winning the round will be displayed
// When the game ends, instead of the player winning the round, the war winner will be displayed 

// A reset button will also be included


// ---------------------------------------------------------------------------------------------------------------------------
// INITIALIZATION 

// The users will write (input) their name where "Player 1"/"Player 2" are displayed

// Each player will be an object with:
    // a name property with a value of the input previously written
    // a deck property with a value an array of shuffled numbers from 2 to 14, each represented twice (2 Ace, 2 Kings, 2 Queens, etc...)
    // a score property with a initial value at 0

        //   const player1 = {
        //        name: 'input',
        //        deck: [4, 10, 9, 13, 8, 7, 4, 2, etc...],
        //        score: 0
        //      }

// 2 empty variables will be initialized to store the value of the cars being played and compare them

    // var card1, card2;

// Each card will be identified by a positive value:    
    // 2 of Spades = 2 
    // 10 of Diamonds = 10
    // Jacks = 11
    // Queens = 12
    // Kings = 13
    // Aces = 14


// ---------------------------------------------------------------------------------------------------------------------------
// LOGIC 

// The program will then wait for an event to be triggered:

    // A click on the main deck of a player will grab the first value of the deck array and place it in a battle array
    // When a player click once on its main deck, the click on the same deck is disabled until the other player click on his deck
    // When the battle array has 2 values, it'll compare them and return the difference
    // This difference will be assign as follow:

        // Case 1 | => Player 1 - Player 2 return positive value | => Player 1 add the difference to his score
        // Case 2 | => Player 1 - Player 2 return negative value | => Player 2 add the difference *-1 to his score
        // Case 3 | => Player 2 - Player 1 return positive value | => Player 2 add the difference to his score
        // Case 4 | => Player 2 - Player 1 return negative value | => Player 1 add the difference *-1 to his score

// The code will run until both deck arrays are empty => then, both scores will be compare and the player object hosting the property of the highest score will display the value of the name property





// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

// WAR GAME - Overpay version

