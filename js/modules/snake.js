const DIRECTIONS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

const RESULTS = {
    CLEAR: 0,
    APPLE: 1,
    SELF: 2
}

class Snake {
    head = {
        x: 0,
        y: 0
    }

    body = []

    length = 3

    grid = {}

    history = []

    bounds = 0

    constructor(head, grid, resolution) {
        this.head.x = head.x;
        this.head.y = head.y;
        this.body.push(this.head);
        this.grid = grid;
        this.bounds = resolution;
        this.#draw();
    }

    #clean() {
        while(this.history.length > 0) {
            let oldNode = this.history.pop();

            this.grid[oldNode.y][oldNode.x].node.classList.remove('head');

            if (!this.doesIntersect(oldNode)) {
                this.grid[oldNode.y][oldNode.x].node.classList.remove('body');
                this.grid[oldNode.y][oldNode.x].node.classList.remove('was-apple');
            }
        }
    }

    #draw() {
        this.#clean();
        this.grid[this.head.y][this.head.x].node.classList.add('head');

        this.body.forEach(bodyNodeCoordinates => {
            this.grid[bodyNodeCoordinates.y][bodyNodeCoordinates.x].node.classList.add('body');
        });
    }

    promote() {
        this.length++;
    }

    #adjustForBounds(probableCoords) {
        if (probableCoords.x + 1 > this.bounds) {
            probableCoords.x = 0;
        }

        if (probableCoords.x < 0) {
            probableCoords.x = this.bounds - 1;
        }

        if (probableCoords.y + 1 > this.bounds) {
            probableCoords.y = 0;
        }

        if (probableCoords.y < 0) {
            probableCoords.y = this.bounds - 1;
        }

        return probableCoords;
    }

    #getProbableCoords(direction) {
        let probableCoordinates = {
            x: this.head.x,
            y: this.head.y
        }

        switch (direction) {
            case DIRECTIONS.UP:
                probableCoordinates.y--;

                break;
            case DIRECTIONS.RIGHT:
                probableCoordinates.x++;

                break;
            case DIRECTIONS.DOWN:
                probableCoordinates.y++;

                break;
            case DIRECTIONS.LEFT:
                probableCoordinates.x--;

                break;
        }

        return this.#adjustForBounds(probableCoordinates);
    }

    doesIntersect(probableCoords) {
        let intersects = false;

        this.body.forEach(coords => {
            if (coords.x === probableCoords.x && coords.y === probableCoords.y) {
                intersects = true;
            }
        });

        return intersects;
    }

    #hasApple(probableCoords) {
        let hasApple = !!this.grid[probableCoords.y][probableCoords.x].apple;

        if (hasApple) {
            this.grid[probableCoords.y][probableCoords.x].apple = null;
            this.grid[probableCoords.y][probableCoords.x].node.classList.remove('apple');
            this.grid[probableCoords.y][probableCoords.x].node.classList.add('was-apple');
        }

        return hasApple;
    }

    go(direction) {
        let probableCoordinates = this.#getProbableCoords(direction);

        if (this.doesIntersect(probableCoordinates)) {
            return RESULTS.SELF;
        }

        let hasApple = this.#hasApple(probableCoordinates);

        this.history.push(this.head);
        this.head = probableCoordinates;
        this.body.push(probableCoordinates);

        while (this.body.length > this.length) {
            let coords = this.body.shift();

            if (!this.history.includes(coords)) {
                this.history.push(coords);
            }
        }

        this.#draw();

        return hasApple ? RESULTS.APPLE : RESULTS.CLEAR;
    }
}

export { Snake, DIRECTIONS, RESULTS };