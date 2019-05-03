
// _____________________________________________________________
// CONSTANTS IN THE GLOBAL SCOPE


// full card deck (without the joker)
const deck = [''];



// _____________________________________________________________
// VARIABLES 


// 2 player objects, each including 3 properties: name, playing deck, and score
const player1 = {};
const player2 = {};


// an array that will host the deck array suffled
var shuffleDeck = [];


// an array that will host each player's shuffled deck, built from the shuffleDeck array
var deck1 = [];
var deck2 = [];


// initialize variables that will store the value of the card played by both player each round
var card1;
var card2;



// _____________________________________________________________
// EVENT LISTENERS


// 1 event listener for each player's input name's (little button to submit their name)
    // enabled when the page is loaded
    // disabled when a value is submitted


// 1 event listener on a reset button
    // reload the board game
    // enable the name's submit buttons


// 1 event listener to activate the game ("battle" button)
    // enabled when both player name's input is entered
    // trigger the init function


// 1 event listener on each player's deck
    // enabled when the "battle" button is triggered



// _____________________________________________________________
// FUNCTIONNALITIES


// init function => initializing the board game
    // triggered by the "battle" button
    // invoke the deckShuffling function
    // invoke the render function 


// render function => rendering the board game
    // called by init function
    //
    //
    //


// deckShuffling function => shuffling the deck array and build both shuffleDeck1 and shuffleDeck2
    // called by init function
    // assign both new arrays to both player's object


// function clickPlayer1 => 
    // triggered when player 1's deck is clicked
    // add to the "battle field" div the first element (card) from the deck1 array
    // remove the card from the deck1 array
    // assign the parseInt value of the element to the card1 variable


// function clickPlayer2 => 
    // triggered when player 2's deck is clicked
    // add to the "battle field" div the first element (card) from the deck2 array
    // remove the card from the deck2 array
    // assign the parseInt value of the element to the card2 variable


// getScore function => calculate the difference between card1 and card2
    // if card1 - card2 return positive value, add thst value to the score property of player 1 object
    // if card1 - card2 return negative value, add this value *-1 to the score property of player 2 object


// function displayScores => keep the score updated after each "battle"

// function displayMessage => render a message of the round of the winner & the winner of the game at the end


