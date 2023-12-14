// HTML elements
const score = document.querySelector('#score');
const scores = document.querySelector('.scores');
const highScoreText = document.querySelector('#highScore');
const logo = document.querySelector('#logo');
const gameBoard = document.querySelector('#game-board');
const gameBorder = document.querySelector('.game-border');
const initialText = document.querySelector('.initial-page-container');
const selectSize = document.querySelector('#board-size');

// Game variables
let direction = 'right';
let gameStarted = false;
let gameSpeedDelay = 200;
let gameInterval;
let highScore = 0;
let snake = [{ x: 10, y: 10 }];
let food;
let gridSize;

// Create snake or food element
const createGameElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Draw
const drawGame = () => {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
};

// Set position for snake and food
const setPosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
};

// Draw snake
const drawSnake = () => {
    // for each segment it should call the snake element
    snake.forEach((segment, index) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);

        if (index === 0) {
            snakeElement.classList.add('head');
        } else if (index % 2 === 1) {
            snakeElement.classList.add('rest-snake');
        }
        gameBoard.appendChild(snakeElement);
    });
};

// Draw food
const drawFood = () => {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        gameBoard.appendChild(foodElement);
    }
};

// Generate food
const generateFood = () => {
    gridSize = selectSize.value;
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
};

// Move
const move = () => {
    // shallow copy of the snake obkect targeting the first div in this case the head so as not make the snake bigger by oving
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
    }
    // to make the snake head to be in front all time
    snake.unshift(head);
    // when the snake eat the food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            drawGame();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
};

// Increase speed

// Check collision

// Reset game

// UpdateScore

// Stop game

// UpdateHighScore

// Change grid size
function changeBoardSize() {
    gridSize = selectSize.value;
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;
}

// Start game
function startGame() {
    gameStarted = true;
    food = generateFood();
    changeBoardSize();
    initialText.style.display = 'none';
    gameBoard.style.display = 'grid';
    gameBorder.style.display = 'block';
    scores.style.display = 'block';
    // every interval makes the snake to move
    gameInterval = setInterval(() => {
        drawGame();
        move();
    }, gameSpeedDelay);
}

// Handle key press event
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

// Initial
function init() {
    document.addEventListener('keydown', handleKeyPress);
}
init();
