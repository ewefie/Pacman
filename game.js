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
const infoCanvas = document.getElementById('info');
infoCanvas.width = 895;
infoCanvas.height = 100;
const infoContext = infoCanvas.getContext('2d');
//score canvas
const scoreCanvas = document.getElementById('score');
scoreCanvas.width = 895;
scoreCanvas.height = 150;
const scoreContext = scoreCanvas.getContext('2d');

const frameColor = '#1919A6';

const sideLength = 32;

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
        let t = game.map[y][x];
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
            x = -27;
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
}

class Game {
    constructor() {
        this.gameOn = false;
        this.gamePaused = false;
        this.beans = 240;
        this.world = new World();
        // Some bad guys
        this.blinky = new Ghost(new Position(12, 14), '#f00');
        this.pinky = new Ghost(new Position(13, 14), '#ffb8ff');
        this.inky = new Ghost(new Position(14, 14), '#0ff');
        this.clyde = new Ghost(new Position(15, 14), '#ffb852');
        this.ghosts = [this.pinky, this.blinky, this.inky, this.clyde];
        // And a good guy
        this.pacman = new Pacman(new Position(13, 23), '#FFFF00');
        this.map = [
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
    };

    showWelcomeScreen() {
        // Create the World
        this.world.drawWorld();

        frameContext.fillStyle = this.pacman.color;
        frameContext.font = '120px monospace';
        frameContext.textAlign = 'center';
        frameContext.fillText('PACMAN', frameCanvas.width / 2, frameCanvas.height / 2 - 20);
        frameContext.font = '30px monospace';
        frameContext.fillText('Press spacebar to start', frameCanvas.width / 2, frameCanvas.height / 2 + 30);
    };

    showWinMessage() {
        frameContext.fillStyle = this.pacman.color;
        frameContext.font = '120px monospace';
        frameContext.textAlign = 'center';
        frameContext.fillText('WINNER!', frameCanvas.width / 2, frameCanvas.height / 2 - 20);
        frameContext.font = '30px monospace';
        frameContext.fillText('Press spacebar to start new game', frameCanvas.width / 2, frameCanvas.height / 2 + 30);
        game = new Game();// this = new Game();//jak to napisać żeby działało?

    };

    showGameOver() {
        frameContext.fillStyle = this.pacman.color;
        frameContext.font = '120px monospace';
        frameContext.textAlign = 'center';
        frameContext.fillText('GAME OVER!', frameCanvas.width / 2, frameCanvas.height / 2 - 20);
        frameContext.font = '30px monospace';
        frameContext.fillText('Press spacebar to start new game', frameCanvas.width / 2, frameCanvas.height / 2 + 30);
        game = new Game();
    };

    showPause() {
        frameContext.fillStyle = this.pacman.color;
        frameContext.font = '120px monospace';
        frameContext.textAlign = 'center';
        frameContext.fillText('GAME PAUSED ', frameCanvas.width / 2, frameCanvas.height / 2 - 20);
        frameContext.font = '30px monospace';
        frameContext.fillText('Press spacebar to resume', frameCanvas.width / 2, frameCanvas.height / 2 + 30);
        this.gamePaused = true;
    }

    drawScore() {
        scoreContext.clearRect(0, 100, 300, 40);
        scoreContext.fillStyle = 'white';
        scoreContext.textAlign = 'left';
        scoreContext.font = '30px Lucida Console';
        scoreContext.fillText('Score: ' + this.pacman.score, 20, scoreCanvas.height - 20);
    };

//add highscore
    drawHighScore() {
        // scoreContext.clearRect(0, 0, 895, );
        scoreContext.fillStyle = 'white';
        scoreContext.font = '30px Lucida Console';
        scoreContext.textAlign = 'center';
        scoreContext.fillText('HIGH SCORE', scoreCanvas.width / 2, scoreCanvas.height - 75);
        scoreContext.fillText(this.pacman.score, scoreCanvas.width / 2, scoreCanvas.height - 30);
    };

    drawInfo() {
        infoContext.clearRect(0, 0, 450, 100);
        let infoX = 1;
        let infoY = 1;
        for (let i = 1; i <= this.pacman.lives; i++) {
            infoContext.beginPath();
            infoContext.arc(infoX * sideLength * i, infoY * sideLength, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
            infoContext.fillStyle = this.pacman.liveColor;
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

    init() {
        frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
        this.world.drawWorld();
        monsterContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
        this.gameOn = true;
        for (let g of this.ghosts) {
            g.drawMonster();
        }
        this.pacman.drawPacman();
        this.drawScore();
        this.drawHighScore();
        this.drawInfo();

        let ghosts = this.ghosts;

        const directions = ['Stop', 'Up', 'Down', 'Left', 'Right'];
        setInterval(function () {
            for (let g of ghosts) {
                let nd = directions[Math.floor(Math.random() * 3) + 1];
                g.setDirection(nd);
            }
        }, 1000);
        anim();
    }
}

class World {
    constructor() {
    };

    drawWorld() {
        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < 28; j++) {
                let tileX = j * sideLength;
                let tileY = i * sideLength;
                switch (game.map[i][j]) {
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
                    this.drawWall(tileX, tileY + 16, tileX + sideLength, tileY + 16);
                    break;
                case 6:
                    this.drawWall(tileX + 16, tileY, tileX + 16, tileY + sideLength);
                    break;
                case 7:
                    this.drawCorner(tileX + sideLength, tileY + sideLength, 1, 1.5);
                    break;
                case 8:
                    this.drawCorner(tileX, tileY + sideLength, 1.5, 0);
                    break;
                case 9:
                    this.drawCorner(tileX, tileY, 0, 0.5);
                    break;
                case 0:
                    this.drawCorner(tileX + sideLength, tileY, 0.5, 1);
                    break;
                }
            }
        }
    }

    drawWall(startX, startY, stopX, stopY) {
        frameContext.beginPath();
        frameContext.moveTo(startX, startY);
        frameContext.lineTo(stopX, stopY);
        frameContext.lineWidth = 10;
        frameContext.strokeStyle = frameColor;
        frameContext.stroke();
    }

    drawCorner(startX, startY, startAngle, endAngle) {
        frameContext.beginPath();
        frameContext.arc(startX, startY, 16, startAngle * Math.PI, endAngle * Math.PI, false);
        frameContext.lineWidth = 10;
        frameContext.strokeStyle = frameColor;
        frameContext.stroke();
    }

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
        if (game.pacman.lives === 0) {
            game.showGameOver();
            return;
        }
        if (game.beans === 0) {
            game.showWinMessage();
            return;
        }
        const pacPoint = game.pacman.position.getWorldPosition();
        if (game.map[pacPoint.y][pacPoint.x] === 2) {
            game.pacman.score += 10;
            game.beans--;
            game.map[pacPoint.y][pacPoint.x] = 4;
            game.drawScore();
            this.drawWorld();
        }
        if (game.map[pacPoint.y][pacPoint.x] === 1) {
            game.map[pacPoint.y][pacPoint.x] = 4;
            game.pacman.startPanic();
        }
        const pacPos = game.pacman.position.getRealPosition();
        for (let g of game.ghosts) {
            for (let g of game.ghosts) {
                const gPos = g.position.getRealPosition();
                if (this.crashWith(pacPos, gPos)) {
                    if (game.pacman.panicMode) {
                        g.setDead();
                    } else {
                        game.pacman.setDead();
                    }
                }
            }
        }
        if (game.pacman.isDead) {
            game.pacman.restartPos();
        }
    }
}

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
        case 'Up':
            return this.position.moveUp();
        case 'Down':
            return this.position.moveDown();
        case 'Left':
            return this.position.moveLeft();
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
        this.frightenedColor = '#2121DE';
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
        // this.deadColor = '#202020';
    }

    startPanic() {
        if (this.panicMode) {
            clearTimeout(this.toId);
        }
        this.panicMode = true;
        const ghosts = game.ghosts;

        for (const ghost of ghosts) {
            ghost.color = ghost.frightenedColor;
        }
        this.toId = setTimeout(() => {
            this.panicMode = false;
            for (const ghost of ghosts) {
                ghost.color = ghost.liveColor;
            }
        }, 10000);
    }

    restartPos() {//
        monsterContext.clearRect(this.position.x, this.position.y, sideLength, sideLength);
        this.currentDirection = 'Stop';
        this.nextDirection = 'Stop';
        this.position = new Position(0, 14);
        this.lives--;
        console.log('Stracił życie');
        console.log(game.pacman.lives);
        this.isDead = false;
        this.color = this.liveColor;
        game.drawInfo();
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
        switch (game.pacman.currentDirection) {
        case 'Stop':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 0, 2 * Math.PI, false);
            monsterContext.fill();
            break;
        case 'Left':
            monsterContext.beginPath();
            monsterContext.arc(x, y, 15, 1.25 * Math.PI, 0.25 * Math.PI, false);
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


document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.code) {
    case 'ArrowUp':
        game.pacman.setDirection('Up');
        break;
    case 'ArrowDown':
        game.pacman.setDirection('Down');
        break;
    case 'ArrowLeft':
        game.pacman.setDirection('Left');
        break;
    case 'ArrowRight':
        game.pacman.setDirection('Right');
        break;
    case 'Space':
        if (game.gameOn === false && game.gamePaused === false) {
            game.init();
            break;
        }
        if (game.gameOn === true && game.gamePaused === false) {
            game.showPause();
            break;
        }
        if (game.gameOn === true && game.gamePaused === true) {
            game.gamePaused = false;
            frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
            game.world.drawWorld();
            anim();
            break;
        }
    }
};

const anim = () => {
    let ghosts = game.ghosts;
    let pacman = game.pacman;
    let world = game.world;
    if (!game.gamePaused && game.gameOn) {
        setTimeout(function () {
            for (let g of ghosts) {
                g.drawMonster();
            }
            pacman.drawPacman();
            // console.log(`score:${pacman.score} panic:${pacman.panicMode} dead:${pacman.isDead}`);
            world.checkState();
            requestAnimationFrame(anim);
        }, 1000 / 7);
    }
    //double check maybe will work
    // world.checkState();
};
let game = new Game();
game.showWelcomeScreen();
