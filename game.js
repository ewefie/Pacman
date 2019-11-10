const canvas = document.getElementById('canvas');
canvas.width = 895;
canvas.height = 991;
const sideLength = 32;
const frameContext = canvas.getContext('2d');
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
const blinky = {
    color: '#FF0000',
    x: 486,
    y: 640,
};
const pinky = {
    color: '#FFB8FF',
    x: 448,
    y: 704,
};
const inky = {
    color: '#00FFFF',
    x: 410,
    y: 704,
};
const clyde = {
    color: '#FFB852',
    x: 486,
    y: 704,
};
const ghosts = [pinky, blinky, inky, clyde];

const pacman = {
    x: 448,
    y: 752,
    tileX: Math.round(this.x / sideLength),
    tileY: Math.round(this.x / sideLength),
    currDir: '',
    newDir: '',
    lives: 3,
};

let newX, newY;
let dirX = 0;
let dirY = 0;
const canMove = (x, y) => {
    x = x / 32;
    y = y / 32;
    return map[x][y] === 2 || map[x][y] === 4 || map[x][y] === 1;
};

const checkDirection = () => {
    switch (pacman.newDir) {
    case 'up':
        newY = pacman.y - sideLength;
        if (canMove(pacman.x, newY)) {
            pacman.y = newY;
            pacman.currDir = pacman.newDir;
        }
        break;
    case 'down':
        newY = pacman.y + sideLength;
        if (canMove(pacman.x, newY)) {
            pacman.y = newY;
            pacman.currDir = pacman.newDir;
        }
        break;
    case    'left'    :
        newX = pacman.x - sideLength;
        if (canMove(newX, pacman.y)) {
            pacman.x = newX;
            pacman.currDir = pacman.newDir;

        }
        break;
    case     'right'     :
        newX = pacman.x + sideLength;
        if (canMove(newX, pacman.y)) {
            pacman.x = newX;
            pacman.currDir = pacman.newDir;

        }
        break;
    }
};
const drawPacman = (x, y) => {
    context.beginPath();
    context.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
    context.fillStyle = 'rgb(255, 255, 0)';
    context.fill();
    context.beginPath();
    context.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x, 0.99 * y, 2, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fill();
};
const makeMove = (x, y) => {
    requestAnimationFrame(makeMove);
    checkDirection();
    drawPacman(x, y);
};


const drawWorld = () => {
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
                context.beginPath();
                context.moveTo(tileX, tileY + 16);
                context.lineTo(tileX + sideLength, tileY + 16);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            case 6:
                context.beginPath();
                context.moveTo(tileX + 16, tileY);
                context.lineTo(tileX + 16, tileY + sideLength);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            case 7:
                context.beginPath();
                context.arc(tileX + sideLength, tileY + sideLength, 16, 1 * Math.PI, 1.5 * Math.PI, false);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            case 8:
                context.beginPath();
                context.arc(tileX, tileY + sideLength, 16, 1.5 * Math.PI, 0, false);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            case 9:
                context.beginPath();
                context.arc(tileX, tileY, 16, 0, 0.5 * Math.PI, false);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            case 0:
                context.beginPath();
                context.arc(tileX + sideLength, tileY, 16, 0.5 * Math.PI, Math.PI, false);
                context.lineWidth = 10;
                context.strokeStyle = frameColor;
                context.stroke();
                break;
            }
        }
    }
};
const addPoints = () => {


};

document.onkeydown = function (e) {
    switch (e.code) {
    case 'ArrowLeft':
        pacman.direction = 'left';
        dirX = -1;
        dirY = 0;

        // if (canMove(pacman.y, pacman.x - 1)) {
        //     map[pacman.y][pacman.x] = 4;//przemalowuję na czarne tło
        //     pacman.x -= 1;
        //     map[pacman.y][pacman.x] = 3;//przemalowuję na pacmana
        //     drawWorld();
        //
        // }
        break;
    case 'ArrowDown':
        pacman.direction = 'down';
        dirX = 0;
        dirY = 1;
        // if (canMove(pacman.y + 1, pacman.x)) {
        //     map[pacman.y][pacman.x] = 4;
        //     pacman.y += 1;
        //     map[pacman.y][pacman.x] = 3;
        //     drawWorld();
        // }
        break;
    case 'ArrowRight':
        pacman.direction = 'right';
        dirX = 1;
        dirY = 0;
        // if (canMove(pacman.y, pacman.x + 1)) {
        //     map[pacman.y][pacman.x] = 4;
        //     pacman.x += 1;
        //     map[pacman.y][pacman.x] = 3;
        //     drawWorld();
        // }
        break;
    case 'ArrowUp':
        pacman.direction = 'up';
        dirX = 0;
        dirY = -1;
        // if (canMove(pacman.y - 1, pacman.x)) {
        //     map[pacman.y][pacman.x] = 4;
        //     pacman.y -= 1;
        //     map[pacman.y][pacman.x] = 3;
        //     drawWorld();
        // }
        break;
    }
};

drawWorld();
// makeMove(pacman.x, pacman.y);
//ghost test
gx = 400;
gy = 400;

const printGhost = (x, y, color) => {
    x += 16;
    y += 18;
    context.clearRect(x - 19, y - 25, sideLength + 5, sideLength + 8);
    context.beginPath();
    context.ellipse(x, y, 24 * 0.7, 24, 0, 1 * Math.PI, 0, false);
    context.fillStyle = color;
    context.fill();
    context.beginPath();
    context.fillRect(x - 17, y, 24 * 1.40, 24 * 0.40);
    context.beginPath();
    context.arc(x - 12, y + 9, 24 * 0.175, 0, Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x - 4, y + 9, 24 * 0.175, 0, Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x + 4, y + 9, 24 * 0.175, 0, Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x + 12, y + 9, 24 * 0.175, 0, Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x - 4, y - 7, 5, 0, 2 * Math.PI);
    context.fillStyle = '#fff';
    context.fill();
    context.beginPath();
    context.arc(x + 4, y - 7, 5, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(x + 5, y - 7, 2, 0, 2 * Math.PI);
    context.fillStyle = '#000';
    context.fill();
    context.beginPath();
    context.arc(x - 3, y - 7, 2, 0, 2 * Math.PI);
    context.fillStyle = '#000';
    context.fill();
};


//pacman cały czas się porusza w zadanym kierunku (jesli może), więc musi miec ustawiony direction pobrany z klawisza wcisnietego od gracza
// mamy direction zapamiętane przez pacmana, sprawdzamy czy może zmienić kierunek, jesli tak to zmieniamy

//jeśli może się ruszyć to jego koordynaty zmieniają się o +-32,
//animacja jest rozbita

//test animacji
//
// let testX = 6;
// let testY = 1;
// const anim = () => {
//         // if ((testY - 16) % 32 === 0 && (testX - 16) % 32 === 0) {
//         if (map[testY][testX] === 2) {
//             context.clearRect(testX * sideLength, testY * sideLength - 32, sideLength, sideLength);
//             requestAnimationFrame(anim)
//             context.beginPath();
//             context.arc(testX * sideLength + 16, testY * sideLength + 16, 4, 0, 2 * Math.PI);
//             context.fillStyle = '#eb4034';
//             context.fill();
//             testY += 1;
//             testX += 0;
//         } else {
//             // testY += -1;
//             // testX += 0;
//         }
//         // } else {
//         //     context.clearRect(testX - 16, testY - 16, sideLength, sideLength);
//         //     requestAnimationFrame(anim)
//         //     context.beginPath();
//         //     context.arc(testX, testY, 4, 0, 2 * Math.PI);
//         //     context.fillStyle = '#fff2c4';
//         //     context.fill();
//         //     testY += 2;
//         //     testX += 0;
//         // }
//     }
// ;
let testX = 32;
let testY = 32;


// const drawObject = () => {
//     context.clearRect(testX, testY, sideLength, sideLength);
//     // requestAnimationFrame(anim)
//     context.beginPath();
//     context.arc(testX + 16, testY + 16, 4, 0, 2 * Math.PI);
//     context.fillStyle = '#eb4034';
//     context.fill();
// };


const anim = () => {
        if ((testY) % 32 === 0 && (testX) % 32 === 0) {
            if (map[(testY / sideLength) + dirX][(testX / sideLength) + dirX] === 2 || map[(testY / sideLength) + dirY][(testX / sideLength) + dirX] === 4) {
                testY += dirY;
                testX += dirX;
            } else {
                testY += 0;
                testX += 0;
            }
        } else {
            testY += dirY;
            testX += dirX;
        }
        // context.clearRect(testX, testY, sideLength, sideLength);
        requestAnimationFrame(anim);
        printGhost(testX, testY, pinky.color);
    }
;

anim();
