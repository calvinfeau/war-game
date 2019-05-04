
// _____________________________________________________________
// CONSTANTS IN THE GLOBAL SCOPE


// full card deck (without the joker)
const deck = [
    's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 
    'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 
    'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 
    'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 
];


// _____________________________________________________________
// STATE VARIABLES 


// 2 player objects, each including 3 properties: name, playing deck, and score
var player1 = {};
var player2 = {};


// an array that will host the deck array suffled
var shuffleDeck;


// an array that will host each player's shuffled deck, built from the shuffleDeck array
var deck1 = [];
var deck2 = [];


// initialize variables that will store the value of the card played by both player each round
var card1;
var card2;

welcome();
// _____________________________________________________________
// EVENT LISTENERS





// 1 event listener for each player's input name's (little button to submit their name)
// enabled when the page is loaded
// disabled when a value is submitted
function welcome() {
    document.querySelector('#battlefield > #message').textContent = 'Enter your names and press Battle!';
    player1.name = document.querySelector('#nameBtn1').addEventListener('click', function(event) {
        event.preventDefault();
        var playerName = document.querySelector('#input1').value;
        document.querySelector('#player1 > h2').textContent = playerName;
        document.querySelector('#player1 > form').style.display = 'none';
        // playerName.value = '';  
    });
    player2.name = document.querySelector('#nameBtn2').addEventListener('click', function(event) {
        event.preventDefault();
        var playerName = document.querySelector('#input2').value;
        document.querySelector('#player2 > h2').textContent = playerName;
        document.querySelector('#player2 > form').style.display = 'none';
        // playerName.value = '';  
        // 1 event listener to activate the game ("battle" button)
            // enabled when both player name's input is entered
            // trigger the init function
        document.querySelector('#battlefield > button').addEventListener('click', function() {
            init();
            document.querySelector('#battlefield > button').textContent = 'Reset';
            // resetGame();
        });
    });
};

// 1 event listener on a reset button
    // reload the board game
    // enable the name's submit buttons




// HAVE TO BE PLACED IN INIT SCOPE
// 1 event listener on each player's deck
    // enabled when the "battle" button is triggered

function deckButtons () {
document.querySelector("#player1 > div.card.back-blue").addEventListener('click', function() {
    // assign to card1 the first parseInt value of deck1
    card1 = parseInt(deck1[0][1]);
    console.log(card1);
    // shift this value from deck1
    deck1.shift();
    console.log(deck1);
    // render the card on the battlefield
    // if deck1.length = deck2.length => getScore()
    // deck1.length === deck2.length ? 
    // getScore() : document.querySelector('#battlefield > #message').textContent = `${player2.name} turn`;
});

document.querySelector("#player2 > div.card.back-red").addEventListener('click', function() {
    // assign to card1 the first parseInt value of deck1
    card2 = parseInt(deck2[0][1]);
    console.log(card2);
    deck2.shift();
    console.log(deck2);
    // render the card on the battlefield
    // if deck1.length = deck2.length => getScore()
    // deck2.length === deck1.length ? 
    // getScore() : document.querySelector('#battlefield > #message').textContent = `${player1.name} turn`;
})
}

// _____________________________________________________________
// CACHED ELEMENT REFERENCES

// player's name value


// document.querySelector('#player1 > h2').textContent = player1Name;
// document.querySelector('#player2 > h2').textContent = player2Name;

// _____________________________________________________________
// FUNCTIONNALITIES

// deckShuffling function => shuffling the deck array and build both shuffleDeck1 and shuffleDeck2
    // called by init function
    // assign both new arrays to both player's object

function deckShuffling() {
    deck.forEach( function(card, idx, deck) { 
    var i = Math.floor(Math.random() * Math.floor(deck.length - 1));
    (idx % 2 === 0) ? deck1.push(deck[i]) : deck2.push(deck[i]);
    });
    return deck1, deck2;
};


// init function => initializing the board game
    // triggered by the "battle" button
    // invoke the deckShuffling function
    // invoke the render function 

function init() {
    deckShuffling();
    player1.deck = deck1;
    // player1.score = 0;

    player2.deck = deck2;
    // player2.score = 0;

    // alert('battle button working')
    // render();
    deckButtons();
}
// render function => rendering the board game
    // called by init function
    //
    //
    //

// function render() {

// }



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


