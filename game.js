//frame canvas
const frameCanvas = document.getElementById('frame');
frameCanvas.width = 895;
frameCanvas.height = 991;
const frameContext = frameCanvas.getContext('2d');
//ghosts&pacman canvas
const monsterCanvas = document.getElementById('monster');
monsterCanvas.width = 895;
monsterCanvas.height = 991;
const monsterContext = monsterCanvas.getContext('2d');
//info lives etcF
const infoCanvas = document.getElementById("info");
infoCanvas.width = 895;
infoCanvas.height = 100;
const infoContext = infoCanvas.getContext('2d');
//score canvas
const scoreCanvas = document.getElementById("score");
scoreCanvas.width = 895;
scoreCanvas.height = 150;
const scoreContext = scoreCanvas.getContext('2d');

const frameColor = '#2121DE';
const sideLength = 32;


const map = [
    [7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
    [6, 2, 7, 5, 5, 8, 2, 7, 5, 5, 5, 8, 2, 6, 6, 2, 7, 5, 5, 5, 8, 2, 7, 5, 5, 8, 2, 6],
    [6, 1, 6, 4, 4, 6, 2, 6, 4, 4, 4, 6, 2, 6, 6, 2, 6, 4, 4, 4, 6, 2, 6, 4, 4, 6, 1, 6],
    [6, 2, 0, 5, 5, 9, 2, 0, 5, 5, 5, 9, 2, 0, 9, 2, 0, 5, 5, 5, 9, 2, 0, 5, 5, 9, 2, 6],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
    [6, 2, 7, 5, 5, 8, 2, 7, 8, 2, 7, 5, 5, 5, 5, 5, 5, 8, 2, 7, 8, 2, 7, 5, 5, 8, 2, 6],
    [6, 2, 0, 5, 5, 9, 2, 6, 6, 2, 0, 5, 5, 8, 7, 5, 5, 9, 2, 6, 6, 2, 0, 5, 5, 9, 2, 6],
    [6, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 6],
    [0, 5, 5, 5, 5, 8, 2, 6, 0, 5, 5, 8, 4, 6, 6, 4, 7, 5, 5, 9, 6, 2, 7, 5, 5, 5, 5, 9],
    [4, 4, 4, 4, 4, 6, 2, 6, 7, 5, 5, 9, 4, 0, 9, 4, 0, 5, 5, 8, 6, 2, 6, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 7, 5, 5, 4, 4, 5, 5, 8, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 9, 2, 0, 9, 4, 6, 4, 4, 4, 4, 4, 4, 6, 4, 0, 9, 2, 0, 5, 5, 5, 5, 5],
    [4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 8, 2, 7, 8, 4, 6, 4, 4, 4, 4, 4, 4, 6, 4, 7, 8, 2, 7, 5, 5, 5, 5, 5],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 0, 5, 5, 4, 4, 5, 5, 9, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 7, 5, 5, 5, 5, 5, 5, 8, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [7, 5, 5, 5, 5, 9, 2, 0, 9, 4, 0, 5, 5, 8, 7, 5, 5, 9, 4, 0, 9, 2, 0, 5, 5, 5, 5, 8],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
    [6, 2, 7, 5, 5, 8, 2, 7, 5, 5, 5, 8, 2, 6, 6, 2, 7, 5, 5, 5, 8, 2, 7, 5, 5, 8, 2, 6],
    [6, 2, 0, 5, 8, 6, 2, 0, 5, 5, 5, 9, 2, 0, 9, 2, 0, 5, 5, 5, 9, 2, 6, 7, 5, 9, 2, 6],
    [6, 1, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 1, 6],
    [0, 5, 8, 2, 6, 6, 2, 7, 8, 2, 7, 5, 5, 5, 5, 5, 5, 8, 2, 7, 8, 2, 6, 6, 2, 7, 5, 9],
    [7, 5, 9, 2, 0, 9, 2, 6, 6, 2, 0, 5, 5, 8, 7, 5, 5, 9, 2, 6, 6, 2, 0, 9, 2, 0, 5, 8],
    [6, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 6],
    [6, 2, 7, 5, 5, 5, 5, 9, 0, 5, 5, 8, 2, 6, 6, 2, 7, 5, 5, 9, 0, 5, 5, 5, 5, 8, 2, 6],
    [6, 2, 0, 5, 5, 5, 5, 5, 5, 5, 5, 9, 2, 0, 9, 2, 0, 5, 5, 5, 5, 5, 5, 5, 5, 9, 2, 6],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
    [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9],
];

class Position {
    constructor(x, y) {
        this.x = Math.floor(x) * sideLength;
        this.y = Math.floor(y) * sideLength;
    };

    _getX() {
        return this.x / sideLength;
    }

    _getY() {
        return this.y / sideLength;
    }


    _isCollision(x, y) {
        let t = map[y][x];
        // console.log(`x:${x} y:${y} t:${t}`);
        return !(t === 1 || t === 2 || t === 4);
    }

    _moveX(xOffset) {
        this.x += xOffset * sideLength;
    }

    _moveY(yOffset) {
        this.y += yOffset * sideLength;
    }

    // if move was success return true
    _movePos(x, y) {
        let cdx = x;
        let newX = this._getX() + x;
        let newY = this._getY() + y;
        //teleportation check
        if (this._getY() === 14 && newY === 14 && this._getX() === 27 && newX === 28) {
            newX = 0;
            x = -27
        }
        if (this._getY() === 14 && newY === 14 && this._getX() === 0 && newX === -1) {
            newX = 27;
            x = 27;
        }

        const coll = this._isCollision(newX, newY);
        if (coll) {
            return false;
        }
        this._moveX(x);
        this._moveY(y);

        return true;
    }

    moveLeft() {
        return this._movePos(-1, 0);
    }

    moveRight() {
        return this._movePos(1, 0);
    }

    moveDown() {
        return this._movePos(0, 1);
    }

    moveUp() {
        return this._movePos(0, -1);
    }

    stop() {
    }

    getWorldPosition() {
        return {x: this._getX(), y: this._getY()};
    }

    getRealPosition() {
        return {x: this.x, y: this.y};
    }
};

class World {
    constructor() {
    };

    drawWorld = () => {
        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < 28; j++) {
                let tileX = j * sideLength;
                let tileY = i * sideLength;
                switch (map[i][j]) {
                case 1://pill
                    frameContext.beginPath();
                    frameContext.arc(tileX + 16, tileY + 16, 9, 0, 2 * Math.PI);
                    frameContext.fillStyle = '#ffdd6e';
                    frameContext.fill();
                    break;
                case 2://coin
                    frameContext.beginPath();
                    frameContext.arc(tileX + 16, tileY + 16, 4, 0, 2 * Math.PI);
                    frameContext.fillStyle = '#fff2c4';
                    frameContext.fill();
                    break;
                case 4:
                    frameContext.fillStyle = '#000';
                    frameContext.fillRect(tileX, tileY, sideLength, sideLength);
                    break;
                case 5:
                    frameContext.beginPath();
                    frameContext.moveTo(tileX, tileY + 16);
                    frameContext.lineTo(tileX + sideLength, tileY + 16);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                case 6:
                    frameContext.beginPath();
                    frameContext.moveTo(tileX + 16, tileY);
                    frameContext.lineTo(tileX + 16, tileY + sideLength);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                case 7:
                    frameContext.beginPath();
                    frameContext.arc(tileX + sideLength, tileY + sideLength, 16, Math.PI, 1.5 * Math.PI, false);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                case 8:
                    frameContext.beginPath();
                    frameContext.arc(tileX, tileY + sideLength, 16, 1.5 * Math.PI, 0, false);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                case 9:
                    frameContext.beginPath();
                    frameContext.arc(tileX, tileY, 16, 0, 0.5 * Math.PI, false);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                case 0:
                    frameContext.beginPath();
                    frameContext.arc(tileX + sideLength, tileY, 16, 0.5 * Math.PI, Math.PI, false);
                    frameContext.lineWidth = 10;
                    frameContext.strokeStyle = frameColor;
                    frameContext.stroke();
                    break;
                }
            }
        }
    };

    crashWith(obj1, obj2) {
        const myleft = obj1.y;
        const myright = obj1.y + sideLength;
        const mytop = obj1.x;
        const mybottom = obj1.x + sideLength;
        const otherleft = obj2.y;
        const otherright = obj2.y + sideLength;
        const othertop = obj2.x;
        const otherbottom = obj2.x + sideLength;
        let crash = true;

        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        } else {
            console.log('Crash!!!');
        }

        return crash;
    }

    checkState() {
        const pacPoint = pacman.position.getWorldPosition();
        if (map[pacPoint.y][pacPoint.x] === 2) {
            pacman.score += 10;
            map[pacPoint.y][pacPoint.x] = 4;
            drawScore();
            this.drawWorld();
        }
        if (map[pacPoint.y][pacPoint.x] === 1) {
            map[pacPoint.y][pacPoint.x] = 4;
            pacman.startPanic();
        }
        const pacPos = pacman.position.getRealPosition();
        for (let g of ghosts) {
            for (let g of ghosts) {
                const gPos = g.position.getRealPosition();
                if (this.crashWith(pacPos, gPos)) {
                    if (pacman.panicMode) {
                        g.setDead();
                    } else {
                        pacman.setDead();
                    }
                }
            }
        }
        if (pacman.isDead) {
            pacman.restartPos();
        }
    }
};

class Monster {
    constructor(position, color) {
        this.position = position;
        this.color = color;
        this.liveColor = color;
        this.deadColor = 'transparent';
        this.isDead = false;
        this.currentDirection = 'Stop';
        this.nextDirection = 'Stop';
    };

    moveMonster(direction) {
        switch (direction) {
        case 'Stop':
            return this.position.stop();
            break;
        case 'Up':
            return this.position.moveUp();
            break;
        case 'Down':
            return this.position.moveDown();
            break;
        case 'Left':
            return this.position.moveLeft();
            break;
        case 'Right':
            return this.position.moveRight();
        }

    }

    setDirection(nextDirect) {
        this.nextDirection = nextDirect;
    }

    setDead() {
        setTimeout(() => {
            this.isDead = false;
            this.color = this.liveColor;
        }, 10000);
        this.isDead = true;
        this.color = this.deadColor;
    }
}

class Ghost extends Monster {
    constructor(position, color) {
        super(position, color);
    }

    drawMonster() {
        monsterContext.clearRect(this.position.x, this.position.y, sideLength, sideLength);
        if (this.moveMonster(this.nextDirection)) {
            this.currentDirection = this.nextDirection;
        } else {
            this.moveMonster(this.currentDirection);

        }
        const x = this.position.x + 16;
        const y = this.position.y + 18;
        monsterContext.fillStyle = this.color;
        monsterContext.beginPath();
        monsterContext.ellipse(x, y, 12, 17, 0, Math.PI, 0, false);
        monsterContext.fillStyle = this.color;
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.fillRect(this.position.x + 4, y, 24, 7);
        monsterContext.beginPath();
        monsterContext.arc(this.position.x + 7, y + 7, 3, 0, Math.PI, false);
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(this.position.x + 13, y + 7, 3, 0, Math.PI, false);
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(this.position.x + 19, y + 7, 3, 0, Math.PI, false);
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(this.position.x + 25, y + 7, 3, 0, Math.PI, false);
        monsterContext.fill();
        //eyes
        monsterContext.beginPath();
        monsterContext.arc(x - 4, y - 7, 4, 0, 2 * Math.PI, false);
        monsterContext.fillStyle = '#fff';
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(x + 4, y - 7, 4, 0, 2 * Math.PI, false);
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(x + 5, y - 7, 2, 0, 2 * Math.PI, false);
        monsterContext.fillStyle = '#000';
        monsterContext.fill();
        monsterContext.beginPath();
        monsterContext.arc(x - 3, y - 7, 2, 0, 2 * Math.PI, false);
        monsterContext.fillStyle = '#000';
        monsterContext.fill();
    }
}

class Pacman extends Monster {
    constructor(position, color) {
        super(position, color);
        this.score = 0;
        this.lives = 3;
        this.panicMode = false;
        this.toId = undefined;
        this.deadColor = '#202020';
    }

    startPanic() {
        if (this.panicMode) {
            clearTimeout(this.toId);
        }
        this.panicMode = true;
        this.toId = setTimeout(() => {
            this.panicMode = false;
        }, 10000);
    }

    restartPos() {//
        monsterContext.clearRect(this.position.x, this.position.y, sideLength, sideLength);
        this.currentDirection = "Stop";
        this.nextDirection = "Stop";
        this.position = new Position(0, 14);
        this.lives--;
        console.log("Stracił życie");
        console.log(pacman.lives);
        this.isDead = false;
        this.color = this.liveColor;
        drawInfo();
    }

    drawPacman() {
        monsterContext.clearRect(this.position.x, this.position.y, sideLength, sideLength);
        if (this.moveMonster(this.nextDirection)) {
            this.currentDirection = this.nextDirection;
        } else {
            this.moveMonster(this.currentDirection);
        }

        //actual drawing starts here
        monsterContext.fillStyle = this.color;
        const x = this.position.x + 16;
        const y = this.position.y + 16;
        switch (pacman.currentDirection) {
        case 'Stop':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0, 2 * Math.PI, false);
            monsterContext.fill();
            break;
        case 'Left':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 1.25 * Math.PI, 0.25 * Math.PI, false);
            // monsterContext.fillStyle = 'transparent';
            monsterContext.fillStyle = this.color;
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 1.75 * Math.PI, 0.75 * Math.PI, false);
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y - 7, 2, 0, 2 * Math.PI, false);
            monsterContext.fillStyle = 'rgb(0, 0, 0)';
            monsterContext.fill();
            break;
        case 'Right':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
            monsterContext.fillStyle = this.color;

            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y - 7, 2, 0, 2 * Math.PI, false);
            monsterContext.fillStyle = 'rgb(0, 0, 0)';
            monsterContext.fill();
            break;
        case 'Up':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 1.75 * Math.PI, 0.75 * Math.PI, false);
            monsterContext.fillStyle = this.color;
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x - 7, y, 2, 0, 2 * Math.PI, false);
            monsterContext.fillStyle = 'rgb(0, 0, 0)';
            monsterContext.fill();
            break;
        case 'Down':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
            monsterContext.fillStyle = this.color;
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 1.25 * Math.PI, 0.25 * Math.PI, false);
            monsterContext.fill();
            monsterContext.beginPath();
            monsterContext.arc(x - 7, y, 2, 0, 2 * Math.PI, false);
            monsterContext.fillStyle = 'rgb(0, 0, 0)';
            monsterContext.fill();
            break;
        }
    }
}

// Create the World
const world = new World();
// Some bad guys
const blinky = new Ghost(new Position(12, 14), '#f00');
const pinky = new Ghost(new Position(13, 14), '#ffb8ff');
const inky = new Ghost(new Position(14, 14), '#0ff');
const clyde = new Ghost(new Position(15, 14), '#ffb852');
const ghosts = [pinky, blinky, inky, clyde];
// And a good guy
const pacman = new Pacman(new Position(13, 23), '#FFFF00');

function init() {
    world.drawWorld();
    for (let g of ghosts) {
        g.drawMonster();
    }
    pacman.drawPacman();
    drawScore();
    drawHighScore();
    drawInfo();
}

document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.code) {
    case 'ArrowUp':
        pacman.setDirection('Up');
        break;
    case 'ArrowDown':
        pacman.setDirection('Down');
        break;
    case 'ArrowLeft':
        pacman.setDirection('Left');
        break;
    case 'ArrowRight':
        pacman.setDirection('Right');
        break;
    }
};
//brak inicjalizacji zmiennej 'nd' - sprawdzic co to robi
const directions = ['Stop', 'Up', 'Down', 'Left', 'Right'];
setInterval(function () {
    for (let g of ghosts) {
        let nd = directions[Math.round(Math.random() * 3) + 1];
        g.setDirection(nd);
    }
}, 1000);

const anim = () => {
    setTimeout(function () {
        for (let g of ghosts) {
            g.drawMonster();
        }
        pacman.drawPacman();
        // console.log(`score:${pacman.score} panic:${pacman.panicMode} dead:${pacman.isDead}`);
        world.checkState();
        requestAnimationFrame(anim);
    }, 1000 / 7);
    //double check maybe will work
    // world.checkState();
};

const drawScore = () => {
    scoreContext.clearRect(0, 100, 300, 40);
    scoreContext.fillStyle = "white";
    scoreContext.textAlign = "left";
    scoreContext.font = "30px Lucida Console";
    scoreContext.fillText("Score: " + pacman.score, 20, scoreCanvas.height - 20);
};
//add highscore
const drawHighScore = () => {
    // scoreContext.clearRect(0, 0, 895, );
    scoreContext.fillStyle = "white";
    scoreContext.font = "30px Lucida Console";
    scoreContext.textAlign = "center";
    scoreContext.fillText("HIGH SCORE", scoreCanvas.width / 2, scoreCanvas.height - 75);
    scoreContext.fillText(pacman.score, scoreCanvas.width / 2, scoreCanvas.height - 30);
};

const drawInfo = () => {
    infoContext.clearRect(0, 0, 450, 100);
    let infoX = 1;
    let infoY = 1;
    for (let i = 1; i <= pacman.lives; i++) {
        infoContext.beginPath();
        infoContext.arc(infoX * sideLength * i, infoY * sideLength, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
        infoContext.fillStyle = pacman.liveColor;
        infoContext.fill();
        infoContext.beginPath();
        infoContext.arc(infoX * sideLength * i, infoY * sideLength, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
        infoContext.fill();
        infoContext.beginPath();
        infoContext.arc(infoX * sideLength * i * 0.98, (infoY * sideLength) * 0.80, 2, 0, 2 * Math.PI, false);
        infoContext.fillStyle = 'rgb(0, 0, 0)';
        infoContext.fill();
    }
};

init();
anim();
