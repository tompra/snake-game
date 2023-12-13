// HTML elements
const score = document.querySelector('#score');
const scores = document.querySelector('.scores');
const highScoreText = document.querySelector('#highScore');
const logo = document.querySelector('#logo');
const board = document.querySelector('#board');
const gameBoard = document.querySelector('#game-board');
const gameBorder = document.querySelector('.game-border');
const initialText = document.querySelector('.initial-page-container');
const selectSize = document.querySelector('#board-size').value;

// Game variables
let direction = 'right';
let gameStarted = false;
let gameSpeedDelay = 200;
let highScore = 0;

// Create snake or food element
const createGameElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Draw

// Set position for snake and food
const setPosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
};

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
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
        }
    }
}

function init() {
    document.addEventListener('keydown', handleKeyPress);
}
init();
