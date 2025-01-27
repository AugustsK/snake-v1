import { Engine } from './modules/engine.js';
import { Snake, DIRECTIONS, RESULTS } from './modules/snake.js';
import './../styles/main.scss';

function main (w, d) {
    const arena = d.getElementById('arena');
    const scoreNode = d.getElementById('score');
    const resolution = 24;
    const size = Math.min(800, window.innerHeight - 96, document.documentElement.clientHeight - 96, window.innerWidth - 10, document.documentElement.clientWidth - 10);
    const grid = {};

    arena.style.width = `${size}px`;
    arena.style.height = `${size}px`;
    arena.style.marginBottom = `calc(100vh - ${size}px - 64px)`;

    d.documentElement.setAttribute('style', `--grid-items: ${resolution}`);

    let direction = DIRECTIONS.RIGHT;
    let score = 0;

    for (let i = 0; i < resolution; i++) {
        grid[i] = {};

        for (let j = 0; j < resolution; j++) {
            let gridNode = d.createElement('div');
            gridNode.id = `grid-${i}-${j}`;
            gridNode.style.width = `calc(100% / ${resolution})`;
            gridNode.style.height = `calc(100% / ${resolution})`;
            gridNode.style.top = `calc((100% / ${resolution}) * ${i})`;
            gridNode.style.left = `calc((100% / ${resolution}) * ${j})`;
            gridNode.classList.add('grid');
            arena.appendChild(gridNode);
            grid[i][j] = {
                node: gridNode,
                snake: null,
                head: null,
                apple: null,
                eaten: null
            };
        }
    }

    const snake = new Snake({
        x: resolution / 2,
        y: resolution / 2
    }, grid, resolution);

    let apples = 3;
    let multiplier = 1;
    let baseSpeed = 500;

    if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', 0);
    }

    d.addEventListener('keydown', event => {
        switch (event.key.toLowerCase()) {
            case 'arrowup':
            case 'w':
                direction = DIRECTIONS.UP;

                break;
            case 'arrowright':
            case 'd':
                direction = DIRECTIONS.RIGHT;
    
                break;
            case 'arrowdown':
            case 's':
                direction = DIRECTIONS.DOWN;
        
                break;
            case 'arrowleft':
            case 'a':
                direction = DIRECTIONS.LEFT;
        
                break;
        }
    });

    function randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function updateApples() {
        let total = arena.querySelectorAll('.apple').length;

        while (total < apples) {
            let randomCoords = {
                x: randomNumber(0, resolution - 1),
                y: randomNumber(0, resolution - 1)
            };

            let isApple = !!grid[randomCoords.y][randomCoords.x].apple;
            let isSnake = snake.doesIntersect(randomCoords);

            if (!isApple && !isSnake) {
                grid[randomCoords.y][randomCoords.x].apple = true;
                grid[randomCoords.y][randomCoords.x].node.classList.add('apple');
                total++;
            }
        }
    }

    function getSpeed() {
        return baseSpeed / multiplier;
    }

    let lastScoreUpdate = performance.now();

    function updateScore(amount) {
        score += Math.round(amount);
        scoreNode.innerHTML = `Current score: ${score}. Previous high score: ${localStorage.getItem('highScore')}`;
        lastScoreUpdate = performance.now();
    }

    function moveSnake() {
        let result = snake.go(direction);

        switch (result) {
            case RESULTS.SELF:
                if (parseInt(localStorage.getItem('highScore'), 10) < score) {
                    localStorage.setItem('highScore', score);
                }

                alert('Game over... :(');
                game.clear();

                break;
            case RESULTS.APPLE:
                multiplier = multiplier + 0.2;
                snake.promote();
                game.update(drawMethod, getSpeed());
                updateApples();
                updateScore(10 + Math.floor(score / 100));

                break;
            default: 
                if (snake.length >= resolution && performance.now() - lastScoreUpdate > getSpeed() * 10) {
                    updateScore(1);
                }
        }
    }

    const game = new Engine();
    const drawMethod = game.add({
        fn: moveSnake,
        frequency: getSpeed()
    });

    updateApples();
}

main(window, document);