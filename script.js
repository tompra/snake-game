// HTML elements
const score = document.querySelector('#score');
const scores = document.querySelector('.scores');
const highScoreText = document.querySelector('#highScore');
const logo = document.querySelector('#logo');
const board = document.querySelector('#board');
const gameBoard = document.querySelector('#game-board');
const gameBorder = document.querySelector('.game-border');
const initialText = document.querySelector('.initial-page-container');

// Game variables
let direction = 'right';
let gameStarted = false;
let gameSpeedDelay = 200;
let highScore = 0;

// Draw

// Draw map

// Draw snake

// Draw food

// Move

// Increase speed

// Check collision

// Reset game

// UpdateScore

// Stop game

// UpdateHighScore

// Change grid size
function changeBoardSize() {
    const selectSize = document.querySelector('#board-size').value;
    console.log('Select size', selectSize);
    gameBoard.style.gridTemplateColumns = `repeat(${selectSize}, 20px)`;
    gameBoard.style.gridTemplateRows = `repeat(${selectSize}, 20px)`;
}

function startGame() {
    gameStarted = true;
    changeBoardSize();
    initialText.style.display = 'none';
    gameBoard.style.display = 'grid';
    gameBorder.style.display = 'block';
    scores.style.display = 'block';
}

function handleKeyPress(event) {
    // when pressing spacebar startgame
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === '')
    ) {
        startGame();
    }
}

function init() {
    document.addEventListener('keydown', handleKeyPress);
}
init();
