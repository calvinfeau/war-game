
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
var shuffleDeck, roundWinner;

// an array that will host each player's shuffled deck, built from the shuffleDeck array
var deck1, deck2;

// initialize variables that will store the value of the card played by both player each round
var card1, card2;

// _____________________________________________________________
// CACHED ELEMENT REFERENCES

// reset button and message
const button = document.querySelector('#battlefield > button');
const message = document.querySelector('#battlefield > #message');

// player's inputs and titles
const player1Input = document.querySelector('#input1');
const player2Input = document.querySelector('#input2');
const player1Title = document.querySelector('#player1 > h2');
const player2Title = document.querySelector('#player2 > h2');
const player1Form = document.querySelector('#player1 > form');
const player2Form = document.querySelector('#player2 > form');

// player's cards
const player1Deck = document.querySelector("#player1 > div.card.back-blue");
const player2Deck = document.querySelector("#player2 > div.card.back-red");
const player1Card = document.querySelector('#battlefield > #cardPlayed > #card1');
const player2Card = document.querySelector('#battlefield > #cardPlayed > #card2');

// _____________________________________________________________
// EVENT LISTENERS


// document.querySelector('#battlefield > #message').textContent = 'Enter your names if you want to fight!';

document.querySelector('#nameBtn1').addEventListener('click', function(event) {
    event.preventDefault();
    player1Input.value !== '' ? player1.name = player1Input.value : player1.name;
    player1Title.textContent = player1.name;
    player1Title.style.display = 'block';
    player1Form.style.display = 'none';
    // return player1.name;
});    

document.querySelector('#nameBtn2').addEventListener('click', function(event) {
    event.preventDefault();
    player2Input.value !== '' ? player2.name = player2Input.value : player2.name;
    player2Title.textContent = player2.name;
    player2Title.style.display = 'block';
    player2Form.style.display = 'none';
    // return player2.name;
});    

// 1 event listener on a reset button
    // reload the board game
    // enable the name's submit buttons
button.addEventListener('click', init);    


// _____________________________________________________________
// FUNCTIONNALITIES

init();


function displayWinner() {
    player1.score > player2.score ? 
    message.textContent = `${player1.name} won the war!`
    : message.textContent = `${player2.name} won the war!`
}

// function displayMessage => render a message of the round of the winner & the winner of the game at the end
function displayRoundWin () {
    deck1.length === 0 ? displayWinner () : roundWinner === 'tie' ? message.textContent = `It's a ${roundWinner}!` :
    message.textContent = `${roundWinner} won the battle!`;
}

// function displayScores => keep the score updated after each "battle"
function displayScores() {
    document.querySelector('#player1Score').textContent = player1.score;
    document.querySelector('#player2Score').textContent = player2.score;
    displayRoundWin();
}
// getScore function => calculate the difference between card1 and card2
// if card1 - card2 return positive value, add thst value to the score property of player 1 object
// if card1 - card2 return negative value, add this value *-1 to the score property of player 2 object
function getScore() {
    var roundScore = card1 - card2;
    roundScore === 0 ? roundWinner = 'tie' :
    roundScore > 0 ? (player1.score += roundScore, roundWinner = player1.name) : (player2.score += (roundScore * -1), roundWinner = player2.name);
    deckButtons();
    displayScores();
}

function clickDeck1 () {
    // disable the click on the deck
    player1Deck.removeEventListener('click', clickDeck1);
    
    // assign to card1 the first parseInt value of deck1
    card1 = parseInt(deck1[0].slice(1));
    
    // render the card on the battlefield
    player1Card.setAttribute('class', `card large ${deck1[0]}`);
    
    // shift this value from deck1
    deck1.shift();
    
    // check if player 2 played
    deck1.length === deck2.length ? 
    getScore() : message.textContent = `${player2.name} turn`;
}

function clickDeck2 () {
    // disable the click on the deck
    player2Deck.removeEventListener('click', clickDeck2);
    
    // assign to card1 the first parseInt value of deck1
    card2 = parseInt(deck2[0].slice(1));
    
    // render the card on the battlefield
    player2Card.setAttribute('class', `card large ${deck2[0]}`);
    
    // shift this value from deck2
    deck2.shift();
    
    // check if player 1 plauyed
    deck2.length === deck1.length ? 
    getScore() : message.textContent = `${player1.name} turn`;    
}

function deckButtons () {
    player1Deck.addEventListener('click', clickDeck1);
    player2Deck.addEventListener('click', clickDeck2);
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

function startingBoard() {
    message.textContent = 'please enter your name';
    player1Card.setAttribute('class', 'card large');
    player2Card.setAttribute('class', 'card large');

    player1Input.value = '';
    player1Form.style.display = 'block';
    player1Title.style.display = 'none';

    player2Input.value = '';
    player2Form.style.display = 'block';
    player2Title.style.display = 'none';
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
    displayScores();
    startingBoard();
}