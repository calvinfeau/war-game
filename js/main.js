
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
var player1 = {
    name: 'Player 1'
};

var player2 = {
    name: 'Player 2'
};

// an array that will host the deck array suffled
var shuffleDeck;
var roundWinner;
// an array that will host each player's shuffled deck, built from the shuffleDeck array
var deck1, deck2;

// initialize variables that will store the value of the card played by both player each round
var card1, card2;

// _____________________________________________________________
// EVENT LISTENERS


document.querySelector('#battlefield > #message').textContent = 'Enter your names if you want to fight!';

document.querySelector('#nameBtn1').addEventListener('click', function(event) {
    event.preventDefault();
    player1.name = document.querySelector('#input1').value;
    document.querySelector('#player1 > h2').textContent = player1.name;
    document.querySelector('#player1 > form').style.display = 'none';
    return player1.name;
});

document.querySelector('#nameBtn2').addEventListener('click', function(event) {
    event.preventDefault();
    player2.name = document.querySelector('#input2').value;
    document.querySelector('#player2 > h2').textContent = player2.name;
    document.querySelector('#player2 > form').style.display = 'none';
    return player2.name;
});

// 1 event listener to activate the game ("battle" button)
    // enabled when both player name's input is entered
    // trigger the init function

document.querySelector('#battlefield > button').addEventListener('click', function() {
    init();
    document.querySelector('#battlefield > button').textContent = 'Reset';
    console.log(deck1, deck2);
});


// 1 event listener on a reset button
    // reload the board game
    // enable the name's submit buttons


// _____________________________________________________________
// CACHED ELEMENT REFERENCES

// _____________________________________________________________
// FUNCTIONNALITIES

// getScore function => calculate the difference between card1 and card2
// if card1 - card2 return positive value, add thst value to the score property of player 1 object
// if card1 - card2 return negative value, add this value *-1 to the score property of player 2 object

function getScore() {
    var roundScore = card1 - card2;
    roundScore > 0 ? (player1.score += roundScore, roundWinner = player1.name) : (player2.score += (roundScore * -1), roundWinner = player2.name);
    deckButtons();
    displayScores();
}

// function displayMessage => render a message of the round of the winner & the winner of the game at the end
function displayRoundWin () {
    document.querySelector('#battlefield > #message').textContent = `${roundWinner} won the battle! But not the war...`;
}

// function displayScores => keep the score updated after each "battle"
function displayScores() {
    document.querySelector('#player1Score').textContent = player1.score;
    document.querySelector('#player2Score').textContent = player2.score;
    displayRoundWin();
}

function clickDeck1 () {
    // disable the click on the deck
    document.querySelector("#player1 > div.card.back-blue").removeEventListener('click', clickDeck1);
    
    // assign to card1 the first parseInt value of deck1
    card1 = parseInt(deck1[0].slice(1));
    
    // render the card on the battlefield
    document.querySelector('#battlefield > #cardPlayed > #card1').setAttribute('class', `card ${deck1[0]}`);
    
    // shift this value from deck1
    deck1.shift();
    
    // check if player 2 played
    deck1.length === deck2.length ? 
    getScore() : document.querySelector('#battlefield > #message').textContent = `${player2.name} turn`;
}
function clickDeck2 () {
    // disable the click on the deck
    document.querySelector("#player2 > div.card.back-red").removeEventListener('click', clickDeck2);
    
    // assign to card1 the first parseInt value of deck1
    card2 = parseInt(deck2[0].slice(1));
    
    // render the card on the battlefield
    document.querySelector('#battlefield > #cardPlayed > #card2').setAttribute('class', `card ${deck2[0]}`);
    
    // shift this value from deck2
    deck2.shift();
    
    // check if player 1 plauyed
    deck2.length === deck1.length ? 
    getScore() : document.querySelector('#battlefield > #message').textContent = `${player1.name} turn`;    
}

function deckButtons () {
    document.querySelector("#player1 > div.card.back-blue").addEventListener('click', clickDeck1);
    document.querySelector("#player2 > div.card.back-red").addEventListener('click', clickDeck2);
}

// deckShuffling function => shuffling the deck array and build both shuffleDeck1 and shuffleDeck2
// called by init function
// assign both new arrays to both player's object

function deckShuffling() {
    deck.forEach( function(card, idx, deck) { 
        var i = Math.floor(Math.random() * Math.floor(deck.length - 1));
        (idx % 2 === 0) ? deck1.push(deck[i]) : deck2.push(deck[i]);
    });
    return deck1, deck2;
}

// init function => initializing the board game
// triggered by the "battle" button
// invoke the deckShuffling function
// invoke the render function 

function init() {
    deck1 = [];
    deck2 = [];
    // shuffling deck
    deckShuffling();
    
    // setting up player's deck and scores
    player1.deck = deck1;
    player1.score = 0;
    player2.deck = deck2;
    player2.score = 0;
    
    // enable the event listeners on decks
    deckButtons();
}