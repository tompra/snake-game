$(document).ready(() => {
    // ELEMENTS
    const $score = $('#score');
    const $scores = $('.scores');
    const $highScoreText = $('#highScore');
    const $logo = $('#logo');
    const $gameBoard = $('#game-board');
    const $gameBorder = $('.game-border');
    const $initialText = $('.initial-page-container');
    const $selectSize = $('#board-size');
    const $pauseModal = $('#pauseModal');

    // GAME VARIABLES
    let direction = 'right';
    let gameStarted = false;
    let gameSpeedDelay = 200;
    let gameInterval;
    let highScore = 0;
    let snake = [{ x: 10, y: 10 }];
    let food;
    let gridSize;
    let pauseGame = false;

    // Create snake or food elements
    const createGameElement = (tag, className) => {
        const $element = $(`<${tag}>`).addClass(className);
        return $element;
    };

    // Draw
    const drawGame = () => {
        $gameBoard.empty();
        drawSnake();
        drawFood();
        updateScore();
    };

    // Set position for snake and food
    const setPosition = (element, position) => {
        $(element).css({
            'grid-column': position.x,
            'grid-row': position.y,
        });
    };

    // Draw snake
    const drawSnake = () => {
        $.each(snake, (index, segment) => {
            const snakeElement = createGameElement('div', 'snake');
            setPosition(snakeElement, segment);

            if (index === 0) {
                $(snakeElement).addClass('head');
            } else if (index % 2 === 1) {
                $(snakeElement).addClass('rest-snake');
            }
            $gameBoard.append(snakeElement);
        });
    };

    // Draw food
    const drawFood = () => {
        if (gameStarted) {
            const foodElement = createGameElement('div', 'snake');
            setPosition(foodElement, food);
            $gameBoard.append(foodElement);
        }
    };

    // Generate food
    const generateFood = () => {
        gridSize = $selectSize.val();
        const x = Math.floor(Math.random() * gridSize) + 1;
        const y = Math.floor(Math.random() * gridSize) + 1;
        return { x, y };
    };

    // Move
    const move = () => {
        // Shallow copy
        if (!pauseGame) {
            const head = $.extend({}, snake[0]);
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
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                food = generateFood();
                increaseSpeed();
                clearInterval(gameInterval);
                gameInterval = setInterval(() => {
                    move();
                    checkCollision();
                    drawGame();
                }, gameSpeedDelay);
            } else {
                snake.pop();
            }
        }
    };

    // Update score
    const updateScore = () => {
        const currentScore = snake.length - 1;
        $score.text(currentScore.toString().padStart(3, '0'));
    };

    // Update Highscore
    const updateHighScore = () => {
        const currentScore = snake.length - 1;

        if (currentScore > highScore) {
            highScore = currentScore;
            $highScoreText.text(highScore.toString().padStart(3, '0'));
        }
    };

    // Check collision
    const checkCollision = () => {
        const head = snake[0];
        gridSize = $selectSize.val();

        if (
            head.x < 1 ||
            head.x > gridSize ||
            head.y < 1 ||
            head.y > gridSize
        ) {
            resetGame();
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    };
    // // Increase speed
    const increaseSpeed = () => {
        if (gameSpeedDelay > 150) {
            gameSpeedDelay -= 5;
        } else if (gameSpeedDelay > 100) {
            gameSpeedDelay -= 3;
        } else if (gameSpeedDelay > 50) {
            gameSpeedDelay -= 2;
        } else if (gameSpeedDelay > 25) {
            gameSpeedDelay -= 1;
        }
    };

    // Reset game
    const resetGame = () => {
        updateHighScore();
        stopGame();
        snake = [{ x: 10, y: 10 }];
        food = generateFood();
        direction = 'right';
        gameSpeedDelay = 200;
        updateScore();
    };

    // Stop game
    const stopGame = () => {
        clearInterval(gameInterval);
        gameStarted = false;
        $initialText.css('display', 'flex');
        $scores.css('display', 'none');
        $gameBoard.css('display', 'none');
        $gameBorder.css('display', 'none');
    };

    // Change grid size
    const changeBoardSize = () => {
        gridSize = $selectSize.val();
        $gameBoard.css('gridTemplateColumns', `repeat(${gridSize}, 20px)`);
        $gameBoard.css('gridTemplateRows', `repeat(${gridSize}, 20px)`);
    };

    // Start game
    const startGame = () => {
        gameStarted = true;
        food = generateFood();
        changeBoardSize();
        $initialText.css('display', 'none');
        $gameBoard.css('display', 'grid');
        $gameBorder.css('display', 'block');
        $scores.css('display', 'flex');
        //every interval makes the snake to move
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            drawGame();
        }, gameSpeedDelay);
    };

    // Handle key press event
    const handleKeyPress = (event) => {
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
                case 'P':
                case 'p':
                    pauseGame = !pauseGame;
                    if (pauseGame) {
                        pausedGame();
                    } else {
                        resumeGame();
                    }
                    break;
            }
        }
    };
    // Pause game
    const pausedGame = () => {
        clearInterval(gameInterval);
        $pauseModal.css('display', 'flex');
    };

    // Resume game
    const resumeGame = () => {
        if (gameStarted && !pauseGame) {
            gameInterval = setInterval(() => {
                move();
                checkCollision();
                drawGame();
            }, gameSpeedDelay);
            $pauseModal.css('display', 'none');
        }
    };

    $(document).on('keydown', handleKeyPress);
});
