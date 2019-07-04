// full card deck (without the joker)
const deck = [
    's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 
    'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 
    'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 
    'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 
];

// player & Computer objects
var player = {};
var computer = {
    name: 'Computer'
};

// card played by both player each round 
// and the result of each round
var  roundWinner, card1, card2;

// _____________________________________________________________
// CACHED ELEMENT REFERENCES 

// reset button and message
const resetBtn = document.querySelector('.menu > #reset');
const menuBtn = document.querySelector('.menu > #home');
const message = document.querySelector('.menu > #message');

// player's inputs and titles
const playerInput = document.querySelector('#input');
const playerTitle = document.querySelector('#info > #player-info > div.score-game > h2');
const computerTitle = document.querySelector('#info > #computer-info > div.score-game > h2');
const playerForm = document.querySelector('#info > #player-info > form');

// player's cards
const playerDeck = document.querySelector("#battlefield > #player-field > div.card.back-blue");
const computerDeck = document.querySelector("#battlefield > #computer-field> div.card.back-red");
const playerCard = document.querySelector('#battlefield > #player-field > #card1');
const computerCard = document.querySelector('#battlefield > #computer-field > #card2');

//player's score
const playerScore = document.querySelector("#info > #player-info > .score-game");
const computerScore = document.querySelector("#info > #computer-info > .score-game");

// winning / loosing audio
var winMusic = document.createElement('audio');
var looseMusic = document.createElement('audio');
winMusic.setAttribute('src', 'audio/yeehaw.mp3');
looseMusic.setAttribute('src', 'audio/boo3.mp3');
winMusic.setAttribute('autoplay', 'true');
looseMusic.setAttribute('autoplay', 'true');

// _____________________________________________________________
// EVENT LISTENERS

document.querySelector('#name-btn').addEventListener('click', playerName);
resetBtn.addEventListener('click', reset);    
menuBtn.addEventListener('click', introduction);

// _____________________________________________________________
// HOME PAGE

var introText = document.createElement('article');
var scoreChoice = document.createElement('article');
var battleChoice = document.createElement('article');

introduction();

function introduction() {
    document.querySelector('header > h1').textContent = 'WAR CARD GAMES';
    document.querySelector('header').setAttribute('style', 'background-color: #1226aa');

    ((playerScore.getElementsByTagName('p').length > 0) && (computerScore.getElementsByTagName('p').length > 0)) ?
    (document.querySelector('#player-info > .score-game > p').remove(), document.querySelector('#computer-info > .score-game > p').remove()) : -1;
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
// GENERAL GAMEPLAY

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
    document.querySelector('#player-info > .score-game > p').textContent === 'Score' ? scoreInit(): 
    document.querySelector('#player-info > .score-game > p').innerHTML === 'Cards<br>Left' ? battleInit() : introduction();
    document.querySelector('#player-info > .score-game > p').remove();
    document.querySelector('#computer-info > .score-game > p').remove();
}

// resets the played cards to empty
function cardReset() {
    playerCard.style.opacity = '1';
    playerCard.style.borderColor = '#c3c3c3';
    computerCard.style.opacity = '1';
    computerCard.style.borderColor = '#c3c3c3';
}

// renders the name input
function computerName() {
    event.preventDefault();
    computerTitle.textContent = computer.name;
    computerTitle.style.display = 'block';
    computerScore.style.display = 'flex';
}
function playerName() {
    event.preventDefault();
    playerInput.value !== '' ? player.name = playerInput.value : player.name;
    playerTitle.textContent = player.name;
    playerTitle.style.display = 'block';
    playerForm.style.display = 'none';
    playerScore.style.display = 'flex';
}

// shuffles the deck array and build both player.deck and computer.deck
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
    player.deck = deck.slice(0, deck.length / 2);
    computer.deck = deck.slice(deck.length / 2);
}

// renders the board after the player chose the game play
function startingBoard() {
    message.textContent = 'enter your name';
    player.name = 'Player 1';
    playerCard.setAttribute('class', 'card size');
    computerCard.setAttribute('class', 'card size');
    playerDeck.style.opacity = '1';
    computerDeck.style.opacity = '1';

    playerInput.value = '';
    playerForm.style.display = 'block';
    playerTitle.style.display = 'none';
    playerScore.style.display = 'none';
    
    computerTitle.style.display = 'none';
    computerScore.style.display = 'none';
    cardReset();
}

// renders the played cards with loosing/winning styling
function computerWinsStyle() {
    roundWinner = 'Computer';
    playerCard.style.opacity = '0.3';
    computerCard.style.opacity = '1';
}
function playerWinsStyle() {
    roundWinner = player.name;
    computerCard.style.opacity = '0.3';
    playerCard.style.opacity = '1';
}

// renders the message with the winner of the game
function displayWinner() {
    document.querySelector('h1').textContent === 'BATTLE' ? 
    computer.deck.length === 0 && player.deck.length !== 0 ?
    (message.textContent = `${player.name} won the war!`, winMusic.load(), playerWinsBattle(), computerDeck.style.opacity = '0.3') : (message.textContent = `Computer won the war!`, looseMusic.load(), computerWinsStyle(), playerDeck.style.opacity = '0.3')
    : document.querySelector('h1').textContent === 'SCORE' ? 
    player.score > computer.score ? 
    (message.textContent = `${player.name} won the war!`, winMusic.load(), playerWinsStyle(), computerDeck.style.opacity = '0.3') : (message.textContent = `Computer won the war!`, looseMusic.load(), computerWinsStyle(), playerDeck.style.opacity = '0.3')
    : -1;

    playerDeck.removeEventListener('click', clickDeck);
    playerDeck.removeEventListener('click', clickBattleDeck);
}

// renders the message with the winner of the round
function displayRoundWin () {
    (player.deck.length === 0 || computer.deck.length === 0) ? 
    displayWinner() : roundWinner === 'tie' ? 
    (message.textContent = `It's a ${roundWinner}!`, playerCard.style.opacity = 0.3, computerCard.style.opacity = 0.3) :
    message.textContent = `${roundWinner} won the battle!`;
}

// _____________________________________________________________
// BATTLE GAMEPLAY 

function battleInit() {
    removeIntroPage();
    document.querySelector('header > h1').textContent = 'BATTLE';
    createCardsLeftDisplay();
    player.deck = [];
    computer.deck = [];
    deckShuffling();
    startingBoard();
    battleDeckButtons();
    displayCardsLeft();
}

// enables clicks on the decks with the battle gameplay triggered when the event occurs
function battleDeckButtons() {
    playerDeck.addEventListener('click', clickBattleDeck);
}

// renders updated game board and checks who's the round winner
function clickBattleDeck() {
    playerName();
    computerName();
    cardReset();

    (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    (playerCard.setAttribute('class', 'card size'), computerCard.setAttribute('class', 'card size')) : -1;
    
    playerDeck.removeEventListener('click', clickBattleDeck); // disable the click on the deck
    
    card1 = parseInt(player.deck[0].slice(1));
    card2 = parseInt(computer.deck[0].slice(1));
    
    playerCard.setAttribute('class', `card size ${player.deck[0]}`);
    computerCard.setAttribute('class', `card size ${computer.deck[0]}`);

    getBattleScore();
}

// check the winner
function getBattleScore() {   
    player.deck.push(player.deck.shift());
    computer.deck.push(computer.deck.shift());
    var roundScore = card1 - card2;
    roundScore === 0 ? roundWinner = 'tie' :
    roundScore > 0 ? (playerWinsStyle(), playerWinsBattle()) : (computerWinsStyle(), computerWinsBattle());
    battleDeckButtons();
    displayCardsLeft();
}

// compute the winner's gain
function computerWinsBattle() {
    var cardLost = [];
    card2 === 11 ? (cardLost = player.deck.splice(0, 2), computer.deck = computer.deck.concat(cardLost)) :
    card2 === 12 ? (cardLost = player.deck.splice(0, 3), computer.deck = computer.deck.concat(cardLost)) :
    card2 === 13 ? (cardLost = player.deck.splice(0, 4), computer.deck = computer.deck.concat(cardLost)) : 
    card2 === 14 ? (cardLost = player.deck.splice(0, 5), computer.deck = computer.deck.concat(cardLost)) :
    (cardLost = player.deck.splice(0, 1), computer.deck = computer.deck.concat(cardLost));
}
function playerWinsBattle() {
    var cardLost = [];
    card1 === 11 ? (cardLost = computer.deck.splice(0, 2), player.deck = player.deck.concat(cardLost)) :
    card1 === 12 ? (cardLost = computer.deck.splice(0, 3), player.deck = player.deck.concat(cardLost)) :
    card1 === 13 ? (cardLost = computer.deck.splice(0, 4), player.deck = player.deck.concat(cardLost)) : 
    card1 === 14 ? (cardLost = computer.deck.splice(0, 5), player.deck = player.deck.concat(cardLost)) :
    (cardLost = computer.deck.splice(0, 1), player.deck = player.deck.concat(cardLost));
}

// creates the counter of cards left for each player
function createCardsLeftDisplay() {
    var score1 = document.createElement('p');
    var score2 = document.createElement('p');
    playerScore.appendChild(score1);
    computerScore.appendChild(score2);
    score1.innerHTML = 'Cards<br>Left';
    score2.innerHTML = 'Cards<br>Left';
}

// display updated amount of cards left for each player
function displayCardsLeft() {
    document.querySelector('#player-score').textContent = player.deck.length;
    document.querySelector('#computer-score').textContent = computer.deck.length;
    (player.deck.length == computer.deck.length) ? -1 : displayRoundWin();
}

// _____________________________________________________________
// SCORE GAMEPLAY

function scoreInit() { 
    removeIntroPage();
    createScoreDisplay();
    document.querySelector('header > h1').textContent = 'SCORE';
    player.deck = [];
    computer.deck = [];
    deckShuffling();
    player.score = 0;
    computer.score = 0;
    startingBoard();
    scoreDeckButtons();
    displayScores();
}

// enables clicks on the decks with the score gameplay triggered when the event occurs
function scoreDeckButtons () {
    playerDeck.addEventListener('click', clickDeck);
}

// renders updated game board and checks, when both cards are on field, who's the round winner
function clickDeck() {
    playerName();
    computerName();
    cardReset();

    (message.textContent === `It's a ${roundWinner}!` || message.textContent === `${roundWinner} won the battle!`) ? 
    (playerCard.setAttribute('class', 'card size'), computerCard.setAttribute('class', 'card size')) : -1;

    playerDeck.removeEventListener('click', clickDeck);
    
    card1 = parseInt(player.deck[0].slice(1));
    card2 = parseInt(computer.deck[0].slice(1));
    
    playerCard.setAttribute('class', `card size ${player.deck[0]}`);
    computerCard.setAttribute('class', `card size ${computer.deck[0]}`);
    
    player.deck.shift();
    computer.deck.shift();

    getScore();
}

// calculates the difference between card1 and card2
function getScore() {
    var roundScore = card1 - card2;
    roundScore === 0 ? roundWinner = 'tie' :
    roundScore > 0 ? 
    (player.score += roundScore, playerWinsStyle()) : (computer.score += (roundScore * -1), computerWinsStyle());
    scoreDeckButtons();
    displayScores();
}

// creates the score counter for each player
function createScoreDisplay() {
    var score1 = document.createElement('p');
    var score2 = document.createElement('p');
    playerScore.appendChild(score1);
    computerScore.appendChild(score2);

    score1.textContent = 'Score';
    score2.textContent = 'Score';
}

// renders updated scores after each round
function displayScores() {
    player.deck.length === 26 ? (player.score = 0, computer.score = 0) : displayRoundWin();
    document.querySelector('#player-score').textContent = player.score;
    document.querySelector('#computer-score').textContent = computer.score;
}