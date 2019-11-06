var canvas = document.querySelector('canvas');

canvas.width = 895;
canvas.height = 991;

const sideLength = 32;

var context = canvas.getContext('2d');

const frameColor = "#2528e6";


var map = [
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

var pacman = {
    x: 14,
    y: 23,
};
const drawPacman = (x, y) => {
    context.beginPath();
    context.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
    context.fillStyle = "rgb(255, 255, 0)";
    context.fill();
    context.beginPath();
    context.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.arc(x, 0.99 * y, 2, 0, 2 * Math.PI, false);
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();
};
const drawWorld = () => {
    for (let i = 0; i < 31; i++) {
        for (let j = 0; j < 28; j++) {
            let tileX = j * sideLength;
            let tileY = i * sideLength;
            switch (map[i][j]) {
                case 1://pill
                    context.beginPath();
                    context.arc(tileX + 16, tileY + 16, 7, 0, 2 * Math.PI);
                    context.fillStyle = "#ffdd6e";
                    context.fill();
                    break;
                case 2://coin
                    context.beginPath();
                    context.arc(tileX + 16, tileY + 16, 4, 0, 2 * Math.PI);
                    context.fillStyle = "#fff2c4";
                    context.fill();
                    break;
                case 4:
                    context.fillStyle = "#000";
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
                    context.arc(tileX + sideLength, tileY, 16, 0.5 * Math.PI, 1 * Math.PI, false);
                    context.lineWidth = 10;
                    context.strokeStyle = frameColor;
                    context.stroke();
                    break;
            }
        }
    }
    drawPacman(pacman.x * sideLength + 16, pacman.y * sideLength + 16);
};

drawWorld();


const canMove = (x, y) => {
    return map[x][y] === 2 || map[x][y] === 4 || map[x][y] === 1;

};

const addPoints = () => {

};

document.onkeydown = function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            if (canMove(pacman.y, pacman.x - 1)) {
                map[pacman.y][pacman.x] = 4;//przemalowuję na czarne tło
                pacman.x -= 1;
                map[pacman.y][pacman.x] = 3;//przemalowuję na pacmana
                drawWorld();

            }
            break;
        case 'ArrowDown':
            if (canMove(pacman.y + 1, pacman.x)) {
                map[pacman.y][pacman.x] = 4;
                pacman.y += 1;
                map[pacman.y][pacman.x] = 3;
                drawWorld();
            }
            break;
        case 'ArrowRight':
            if (canMove(pacman.y, pacman.x + 1)) {
                map[pacman.y][pacman.x] = 4;
                pacman.x += 1;
                map[pacman.y][pacman.x] = 3;
                drawWorld();
            }
            break;
        case 'ArrowUp':
            if (canMove(pacman.y - 1, pacman.x)) {
                map[pacman.y][pacman.x] = 4;
                pacman.y -= 1;
                map[pacman.y][pacman.x] = 3;
                drawWorld();
            }
            break;
    }
};

//ghost test

// context.beginPath();
// context.ellipse(100, 100, 70, 100, 0, 1 * Math.PI, 0, false);
// context.fillStyle = "#f01e07";
// context.fill();
// context.beginPath();
// context.fillStyle = "#f01e07";
// context.fillRect(30, 100, 140, 40);
// context.beginPath();
// context.fillStyle = "#f01e07";
// context.arc(47.5, 135, 17.5, 0, Math.PI, false);
// context.fill();
// context.beginPath();
// context.fillStyle = "#f01e07";
// context.arc(82.5, 135, 17.5, 0, Math.PI, false);
// context.fill();
// context.beginPath();
// context.fillStyle = "#f01e07";
// context.arc(152.5, 135, 17.5, 0, Math.PI, false);
// context.fill();
// context.beginPath();
// context.fillStyle = "#f01e07";
// context.arc(117.5, 135, 17.5, 0, Math.PI, false);
// context.fill();



