const canvas = document.getElementById('canvas');
canvas.width = 895;
canvas.height = 991;
const sideLength = 32;
const context = canvas.getContext('2d');
const frameColor = '#2528e6';
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
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 7, 5, 5, 5, 5, 5, 5, 8, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 9, 2, 0, 9, 4, 6, 4, 4, 4, 4, 4, 4, 6, 4, 0, 9, 2, 0, 5, 5, 5, 5, 5],
    [4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 6, 4, 4, 4, 4, 4, 4, 6, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 8, 2, 7, 8, 4, 6, 4, 4, 4, 4, 4, 4, 6, 4, 7, 8, 2, 7, 5, 5, 5, 5, 5],
    [4, 4, 4, 4, 4, 6, 2, 6, 6, 4, 0, 5, 5, 5, 5, 5, 5, 9, 4, 6, 6, 2, 6, 4, 4, 4, 4, 4],
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
        if(t == 1 || t == 2 || t == 4) {
            return false;
        }
        return true;
    }

    _moveX(xOffset) {
        this.x += xOffset * sideLength;
    }

    _moveY(yOffset) {
        this.y += yOffset * sideLength;
    }

    // if move was success return true
    _movePos(x, y) {
        const newX = this._getX() + x;
        const newY = this._getY() + y;
        const coll = this._isCollision(newX, newY);

        if(coll) {
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

    stop() {}

    getWorldPosition() {
        return { x: this._getX(), y: this._getY() };
    }

    getRealPosition() {
        return { x: this.x, y: this.y };
    }
};

class World {
    constructor() {
    };

    drawWorld() {
        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < 28; j++) {
                let tileX = j * sideLength;
                let tileY = i * sideLength;
                switch (map[i][j]) {
                case 1://pill
                    context.beginPath();
                    context.arc(tileX + 16, tileY + 16, 9, 0, 2 * Math.PI);
                    context.fillStyle = '#ffdd6e';
                    context.fill();
                    break;
                case 2://coin
                    context.beginPath();
                    context.arc(tileX + 16, tileY + 16, 4, 0, 2 * Math.PI);
                    context.fillStyle = '#fff2c4';
                    context.fill();
                    break;
                case 4:
                    context.fillStyle = '#000';
                    context.fillRect(tileX, tileY, sideLength, sideLength);
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 0:
                    context.fillStyle = '#00f';
                    // context.fillStyle = 'rgb(0, 0, 0, 0)';
                    context.fillRect(tileX, tileY, sideLength, sideLength);
                    break;
                }
            }
        }
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
        const pacPoint = pacman.position.getWorldPosition();
        if(map[pacPoint.y][pacPoint.x] === 2) {
            pacman.score++;
            map[pacPoint.y][pacPoint.x] = 4;
        }
        if(map[pacPoint.y][pacPoint.x] === 1) {
            map[pacPoint.y][pacPoint.x] = 4;
            pacman.startPanic();
        }

        const pacPos = pacman.position.getRealPosition();
        for(let g of ghosts) {
            const gPos = g.position.getRealPosition();
            if(this.crashWith(pacPos, gPos)) {
                if(pacman.panicMode) {
                    g.setDead();
                } else
                    pacman.setDead();
            }
        }
    }
};

class Monster {
    constructor(position, color) {
        this.position = position;
        this.color = color;
        this.liveColor = color;
        this.deadColor = '#808080';
        this.isDead = false;
        this.currentDirection = 'Stop';
        this.nextDirection = 'Stop';
    };

    moveMonster(direction) {
        switch(direction) {
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

    drawMonster() {
        context.clearRect(this.position.x, this.position.y, sideLength, sideLength);
        if(this.moveMonster(this.nextDirection)) {
            this.currentDirection = this.nextDirection;
        } else {
            this.moveMonster(this.currentDirection);
        }
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, sideLength, sideLength);
    }

    setDirection(nextDirect) {
        this.nextDirection = nextDirect;
    }

    setDead() {
        setTimeout(() => { this.isDead = false;
                           this.color = this.liveColor;
                         }, 10000);
        this.isDead = true;
        this.color = this.deadColor;;
    }
}

class Ghost extends Monster {
    constructor(position, color) {
        super(position, color);
    }
}

class Pacman extends Monster {
    constructor(position, color) {
        super(position, color);
        this.score = 0;
        this.panicMode = false;
        this.toId = undefined;
        this.deadColor = '#202020';
    }

    startPanic() {
        if(this.panicMode) {
            clearTimeout(this.toId);
        }
        this.panicMode = true;
        this.toId = setTimeout(() => { this.panicMode = false; }, 10000);
    }
}

// Create the World
const world = new World();
// Some bad guys
const blinky = new Ghost(new Position(1, 1), '#f00');
const pinky = new Ghost(new Position(26, 1), '#ffb8ff');
const inky = new Ghost(new Position(1, 8), '#0ff');
const clyde = new Ghost(new Position(26, 8), 'ffb852');
const ghosts = [pinky, blinky, inky, clyde];
// And a good guy
const pacman = new Pacman(new Position(13, 23), 'yellow');

function init() {
    world.drawWorld();
    for(let g of ghosts) {
        g.drawMonster();
    }
    pacman.drawMonster();
}

document.onkeydown = function(e) {
    e.preventDefault();
    switch(e.code) {
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

const directions = ['Stop', 'Up', 'Down', 'Left', 'Right'];
setInterval(function() {
    for(let g of ghosts) {
        nd = directions[Math.round(Math.random() * 3) + 1];
        g.setDirection(nd);
    }}, 1000);

const anim = () => {
    setTimeout( function() {
        for(let g of ghosts) {
            g.drawMonster();
        }
        pacman.drawMonster();
        // console.log(`score:${pacman.score} panic:${pacman.panicMode} dead:${pacman.isDead}`);
        world.checkState();
        requestAnimationFrame(anim);
    }, 1000 / 7);
    //double check maybe will work
    // world.checkState();
};

init();
anim();
