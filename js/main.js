
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

// create the 2 player's object
var player1 = {
    name: 'Player 1'
};
var computer = {
    name: 'Computer'
};

// initialize variables that will store the value of the card played by both player each round and the result of each round
var  roundWinner, card1, card2;


// _____________________________________________________________
// CACHED ELEMENT REFERENCES

// reset button and message
const resetBtn = document.querySelector('.menu > #reset');
const menuBtn = document.querySelector('.menu > #home');
const message = document.querySelector('.menu > #message');

// player's inputs and titles
const player1Input = document.querySelector('#input1');
// const player2Input = document.querySelector('#input2');
const player1Title = document.querySelector('#info > #player1 > div.scoreGame > h2');
const player2Title = document.querySelector('#info > #player2 > div.scoreGame > h2');
const player1Form = document.querySelector('#info > #player1 > form');
// const player2Form = document.querySelector('#player2 > form');

// player's cards
const player1Deck = document.querySelector("#battlefield > #player1 > div.card.back-blue");
const player2Deck = document.querySelector("#battlefield > #player2 > div.card.back-red");
const player1Card = document.querySelector('#battlefield > #player1 > #card1');
const player2Card = document.querySelector('#battlefield > #player2 > #card2');

//player's score
const player1Score = document.querySelector("#info > #player1 > .scoreGame")
const player2Score = document.querySelector("#info > #player2 > .scoreGame")

// _____________________________________________________________
// EVENT LISTENERS

// input buttons
document.querySelector('#nameBtn1').addEventListener('click', player1Name);
// document.querySelector('#nameBtn2').addEventListener('click', player2Name);

// reset button
resetBtn.addEventListener('click', reset);    
menuBtn.addEventListener('click', introduction);

// _____________________________________________________________
// CREATE THE HOME PAGE

var introText = document.createElement('article');
var scoreChoice = document.createElement('article');
var battleChoice = document.createElement('article');

introduction();

function introduction() {
    document.querySelector('header > h1').textContent = 'WAR GAMES';

    ((player1Score.getElementsByTagName('p').length > 0) && (player2Score.getElementsByTagName('p').length > 0)) ?
    (document.querySelector('#player1 > .scoreGame > p').remove(), document.querySelector('#player2 > .scoreGame > p').remove())
    : -1;
    document.querySelector('main').setAttribute('style', 'display: none');
    document.querySelector('nav').setAttribute('style', 'display: none');

    document.body.appendChild(introText);
    document.body.appendChild(scoreChoice);
    document.body.appendChild(battleChoice);

    introText.setAttribute('id', 'intro-text');
    scoreChoice.setAttribute('id', 'score-choice');
    battleChoice.setAttribute('id', 'battle-choice');

    introText.setAttribute('style', 'display: flex-inline');
    scoreChoice.setAttribute('style', 'display: flex-inline');
    battleChoice.setAttribute('style', 'display: flex-inline');

    scoreChoice.addEventListener('click', scoreInit);
    battleChoice.addEventListener('click', battleInit);

    introText.textContent = 'Pick a gameplay and enjoy!';
    scoreChoice.innerHTML = '<span>SCORE</span><br><br>Get points to your score each round. <br>The highest score at the end of the battle wins!';
    battleChoice.innerHTML = "<span>BATTLE</span><br><br>Burn your opponent's extra cards <br> every time you win with a face card!";
}
// _____________________________________________________________
// FUNCTIONNALITIES


// GENERAL GAME FUNCTIONS

// removes the home page and display the game page
function removeIntroPage() {
    introText.setAttribute('style', 'display: none');
    scoreChoice.setAttribute('style', 'display: none');
    battleChoice.setAttribute('style', 'display: none');

    scoreChoice.removeEventListener('click', scoreInit);
    battleChoice.removeEventListener('click', battleInit);
    document.querySelector('main').style.display = 'flex';
    document.querySelector('nav').style.display = 'flex';
}

// resets the game page
function reset() {
    document.querySelector('#player1 > .scoreGame > p').textContent === 'SCORE' ? scoreInit(): 
    document.querySelector('#player1 > .scoreGame > p').innerHTML === 'CARDS<br>LEFT' ? battleInit() : introduction();
    document.querySelector('#player1 > .scoreGame > p').remove();
    document.querySelector('#player2 > .scoreGame > p').remove();
}

// resets the played cards to empty
function cardReset() {
    player1Card.style.opacity = "1";
    player1Card.style.borderColor = '#c3c3c3';
    player2Card.style.opacity = "1";
    player2Card.style.borderColor = '#c3c3c3';
}

// renders the name input
function player2Name() {
    event.preventDefault();
    // player2Input.value !== '' ? player2.name = player2Input.value : player2.name;
    player2Title.textContent = computer.name;
    player2Title.style.display = 'block';
    // player2Form.style.display = 'none';
    player2Score.style.display = "flex";
}
function player1Name() {
    event.preventDefault();
    player1Input.value !== '' ? player1.name = player1Input.value : player1.name;
    player1Title.textContent = player1.name;
    player1Title.style.display = 'block';
    player1Form.style.display = 'none';
    player1Score.style.display = "flex";
}

// shuffles the deck array and build both player1.deck and deck2
function deckShuffling() {
    currentIndex = deck.length;
    var randomIndex, storingValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;

        storingValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = storingValue;
    }
    player1.deck = deck.slice(0, deck.length / 2);
    computer.deck = deck.slice(deck.length / 2);
}

// render the board after the player chose the game play
function startingBoard() {
    message.textContent = 'enter your name';
    player1Card.setAttribute('class', 'card size');
    player2Card.setAttribute('class', 'card size');
    
    player1Input.value = '';
    player1Form.style.display = 'block';
    player1Title.style.display = 'none';
    
    // player2Input.value = '';
    // player2Form.style.display = 'block';
    player2Title.style.display = 'none';
    player1Score.style.display = "none";
    player2Score.style.display = "none";
    cardReset();
}

// renders the played cards with loosing/winning styling
function player2WinsStyle() {
    roundWinner = 'Computer'; // change player2.name to 'computer'
    player1Card.style.opacity = "0.3";
    player2Card.style.borderColor = '#CF5247';
}
function player1WinsStyle() {
    roundWinner = player1.name;
    player2Card.style.opacity = "0.3";
    player1Card.style.borderColor = '#26306F';
}

// renders the message with the winner of the game
function displayWinner() {
    message.style.fontSize = "14px";
    ((player1.score > computer.score) || (computer.deck.length === 0 && player1.deck.length !== 0)) ? 
    message.textContent = `${player1.name} won the war!`
    : message.textContent = `Computer won the war!`; // change player2.name to 'computer'

    player1Deck.removeEventListener('click', clickDeck1);
    // player2Deck.removeEventListener('click', clickDeck2);

    player1Deck.removeEventListener('click', clickBattleDeck1);
    // player2Deck.removeEventListener('click', clickBattleDeck2);
}

// renders the message with the winner of the round
function displayRoundWin () {
    (player1.deck.length === 0 || computer.deck.length === 0) ? 
    displayWinner() : roundWinner === 'tie' ? 
    (message.textContent = `It's a ${roundWinner}!`, player1Card.style.opacity = 0.3, player2Card.style.opacity = 0.3) :
    message.textContent = `${roundWinner} won the battle!`;
}


// BATTLE VERSION FUNCTIONS

// launch the battle version
function battleInit() {
    removeIntroPage();
    document.querySelector('header > h1').textContent = 'BATTLE';
    createCardsLeftDisplay();
    player1.deck = [];
    computer.deck = [];
    deckShuffling();
    startingBoard();
    battleDeckButtons();
    displayCardsLeft();
}

// enable the clicks in the decks with the battle gameplay triggered when the event occurs
function battleDeckButtons() {
    player1Deck.addEventListener('click', clickBattleDeck1);
    // player2Deck.addEventListener('click', clickBattleDeck2);   
}

// renders updated game board and checks, when both cards are on field, who's the round winner
function clickBattleDeck1() {
    player1Name();
    player2Name();
    cardReset();
    // if message.textcontent is telling a round winner, reset the board game
    (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    (player1Card.setAttribute('class', 'card size'), player2Card.setAttribute('class', 'card size')) : -1;
    // disable the click on the deck
    player1Deck.removeEventListener('click', clickBattleDeck1);
    
    // assign to card1 the first parseInt value of deck1
    card1 = parseInt(player1.deck[0].slice(1));
    card2 = parseInt(computer.deck[0].slice(1));
    
    // render the card on the battlefield
    player1Card.setAttribute('class', `card size ${player1.deck[0]}`);
    player2Card.setAttribute('class', `card size ${computer.deck[0]}`);
    
    // clickBattleDeck2();
    getBattleScore();
    // player2Card.getAttribute('class') !== 'card size' ? 
    // getBattleScore() : message.textContent = `${player2.name}'s turn`;
}
// function clickBattleDeck2() {
    // cardReset();
    // if message.textcontent is telling a round winner, reset the board game
    // (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    // (player1Card.setAttribute('class', 'card size'), player2Card.setAttribute('class', 'card size')) : -1;
    // disable the click on the deck
    // player2Deck.removeEventListener('click', clickBattleDeck2);
    
    // assign to card1 the first parseInt value of deck1
    
    // render the card on the battlefield
    
    // player1Card.getAttribute('class') !== 'card size' ? 
    // getBattleScore() : message.textContent = `${player1.name}'s turn`;
// }

// check the winner
function getBattleScore() {   
    player1.deck.push(player1.deck.shift());
    computer.deck.push(computer.deck.shift());
    var roundScore = card1 - card2;
    roundScore === 0 ? roundWinner = 'tie' :
    roundScore > 0 ? (player1WinsStyle(), player1WinsBattle()) : (player2WinsStyle(), player2WinsBattle());
    battleDeckButtons();
    displayCardsLeft();
}

// compute the winner's gain
function player2WinsBattle() {
    var cardLost = [];
    card2 === 11 ? (cardLost = player1.deck.splice(0, 2), computer.deck = computer.deck.concat(cardLost)) :
    card2 === 12 ? (cardLost = player1.deck.splice(0, 3), computer.deck = computer.deck.concat(cardLost)) :
    card2 === 13 ? (cardLost = player1.deck.splice(0, 4), computer.deck = computer.deck.concat(cardLost)) : 
    card2 === 14 ? (cardLost = player1.deck.splice(0, 5), computer.deck = computer.deck.concat(cardLost)) :
    (cardLost = player1.deck.splice(0, 1), computer.deck = computer.deck.concat(cardLost));
}
function player1WinsBattle() {
    var cardLost = [];
    card1 === 11 ? (cardLost = computer.deck.splice(0, 2), player1.deck = player1.deck.concat(cardLost)) :
    card1 === 12 ? (cardLost = computer.deck.splice(0, 3), player1.deck = player1.deck.concat(cardLost)) :
    card1 === 13 ? (cardLost = computer.deck.splice(0, 4), player1.deck = player1.deck.concat(cardLost)) : 
    card1 === 14 ? (cardLost = computer.deck.splice(0, 5), player1.deck = player1.deck.concat(cardLost)) :
    (cardLost = computer.deck.splice(0, 1), player1.deck = player1.deck.concat(cardLost));
}

// creates the counter of cards left for each player
function createCardsLeftDisplay() {
    var score1 = document.createElement('p');
    var score2 = document.createElement('p');
    player1Score.appendChild(score1);
    player2Score.appendChild(score2);
    score1.innerHTML = 'CARDS<br>LEFT';
    score2.innerHTML = 'CARDS<br>LEFT';
}

// display updated amount of cards left for each player
function displayCardsLeft() {
    document.querySelector('#player1Score').textContent = player1.deck.length;
    document.querySelector('#player2Score').textContent = computer.deck.length;
    (player1.deck.length == computer.deck.length) ? -1 : displayRoundWin();
}


// SCORE VERSION FUNCTIONS

// launch the score version
function scoreInit() { 
    removeIntroPage();
    createScoreDisplay();
    document.querySelector('header > h1').textContent = 'SCORE';
    player1.deck = [];
    computer.deck = [];
    deckShuffling();
    player1.score = 0;
    computer.score = 0;
    startingBoard();
    scoreDeckButtons();
    displayScores();
}

// enables clicks on the decks with the score gameplay triggered when the event occurs
function scoreDeckButtons () {
    player1Deck.addEventListener('click', clickDeck1);
    // player2Deck.addEventListener('click', clickDeck2);
}

// renders updated game board and checks, when both cards are on field, who's the round winner
function clickDeck1() {
    player1Name();
    player2Name();
    cardReset();
    // if message.textcontent is telling a round winner, reset the board game
    (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    (player1Card.setAttribute('class', 'card size'), player2Card.setAttribute('class', 'card size')) : -1;
    // disable the click on the deck
    player1Deck.removeEventListener('click', clickDeck1);
    
    // assign to card1 the first parseInt value of deck1
    card1 = parseInt(player1.deck[0].slice(1));
    card2 = parseInt(computer.deck[0].slice(1));
    
    // render the card on the battlefield
    player1Card.setAttribute('class', `card size ${player1.deck[0]}`);
    player2Card.setAttribute('class', `card size ${computer.deck[0]}`);
    
    // shift this value from player1.deck
    player1.deck.shift();
    computer.deck.shift();
    
    clickDeck2();
    getScore();
    // check if player 2 played
    // player2Card.getAttribute('class') !== 'card size' ? 
    // getScore() : message.textContent = `${player2.name}'s turn`;
}
function clickDeck2() {
    // cardReset();
    // if message.textcontent is telling a round winner, reset the board game
    // (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    // (player1Card.setAttribute('class', 'card size'), player2Card.setAttribute('class', 'card size')) : -1;
    // disable the click on the deck
    // player2Deck.removeEventListener('click', clickDeck2);
    
    // assign to card1 the first parseInt value of player1.deck
    
    // render the card on the battlefield
    
    // shift this value from player2.deck
    
    // check if player 1 played
    // player1Card.getAttribute('class') !== 'card size' ? 
    // getScore() : message.textContent = `${player1.name}'s turn`;    
}

// calculates the difference between card1 and card2
function getScore() {
    var roundScore = card1 - card2;
    roundScore === 0 ? roundWinner = 'tie' :
    roundScore > 0 ? 
    (player1.score += roundScore, player1WinsStyle()) : (computer.score += (roundScore * -1), player2WinsStyle());
    scoreDeckButtons();
    displayScores();
}

// creates the score counter for each player
function createScoreDisplay() {
    var score1 = document.createElement('p');
    var score2 = document.createElement('p');
    player1Score.appendChild(score1);
    player2Score.appendChild(score2);

    score1.textContent = 'SCORE';
    score2.textContent = 'SCORE';
}

// renders updated scores after each round
function displayScores() {
    player1.deck.length === 26 ? (player1.score = 0, computer.score = 0) : displayRoundWin();
    document.querySelector('#player1Score').textContent = player1.score;
    document.querySelector('#player2Score').textContent = computer.score;
}
