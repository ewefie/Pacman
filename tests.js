//frame canvas
const frameCanvas = document.getElementById('frame');
frameCanvas.width = 895;
frameCanvas.height = 991;
const frameContext = frameCanvas.getContext('2d');
//ghosts canvas
const ghostCanvas = document.getElementById('ghosts');
ghostCanvas.width = 895;
ghostCanvas.height = 991;
const ghotsContext = ghostCanvas.getContext('2d');
//pacman canvas
const pacmanCanvas = document.getElementById('pacman');
pacmanCanvas.width = 895;
pacmanCanvas.height = 991;
const pacmanContext = pacmanCanvas.getContext('2d');
//info lives etc
const infoCanvas = document.getElementById("info");
infoCanvas.width = 895;
infoCanvas.height = 100;
const infoContext = infoCanvas.getContext('2d');
//score
const scoreCanvas = document.getElementById("score");
scoreCanvas.width = 895;
scoreCanvas.height = 150;
const scoreContext = scoreCanvas.getContext('2d');


const frameColor = '#2528e6';


//zamknąć w grze
let playersScore = 0;
let highScore = playersScore;


const sideLength = 32;
let ghostsFrightened = false;
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
    y: 720,
    tileX: 14,
    tileY: 23,
    currDir: 'none',
    newDir: 'none',
    lives: 3,
};

const drawPacman = (x, y) => {
    switch (pacman.currDir) {
    case 'none':
        pacmanContext.clearRect(x - 17 - (sideLength * cdX), y - 16 - (sideLength * cdY), sideLength, sideLength);
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 0, 2 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(255, 255, 0)';
        pacmanContext.fill();
        break;
    case 'left':
        pacmanContext.clearRect(x - 17 - (sideLength * cdX), y - 16 - (sideLength * cdY), sideLength, sideLength);
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 1.25 * Math.PI, 0.25 * Math.PI, false);
        // pacmanContext.fillStyle = 'transparent';
        pacmanContext.fillStyle = 'rgb(255, 255, 0)';
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 1.75 * Math.PI, 0.75 * Math.PI, false);
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, 0.99 * y, 2, 0, 2 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(0, 0, 0)';
        pacmanContext.fill();
        break;
    case 'right':
        // context.clearRect(x - 17, y - 16, sideLength, sideLength);
        pacmanContext.clearRect(x - 17 - (sideLength * cdX), y - 16 - (sideLength * cdY), sideLength, sideLength);
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(255, 255, 0)';
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, 0.99 * y, 2, 0, 2 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(0, 0, 0)';
        pacmanContext.fill();
        break;
    case 'up':
        pacmanContext.clearRect(x - 17 - (sideLength * cdX), y - 16 - (sideLength * cdY), sideLength, sideLength);
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 1.75 * Math.PI, 0.75 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(255, 255, 0)';
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(0.97 * x, y, 2, 0, 2 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(0, 0, 0)';
        pacmanContext.fill();
        break;
    case 'down':
        pacmanContext.clearRect(x - 17 - (sideLength * cdX), y - 16 - (sideLength * cdY), sideLength, sideLength);
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 0.75 * Math.PI, 1.75 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(255, 255, 0)';
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(x, y, 15, 1.25 * Math.PI, 0.25 * Math.PI, false);
        pacmanContext.fill();
        pacmanContext.beginPath();
        pacmanContext.arc(0.97 * x, y, 2, 0, 2 * Math.PI, false);
        pacmanContext.fillStyle = 'rgb(0, 0, 0)';
        pacmanContext.fill();
        break;
    }
};

const drawWorld = () => {
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
                frameContext.arc(tileX + sideLength, tileY + sideLength, 16, 1 * Math.PI, 1.5 * Math.PI, false);
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

let cdX = 0;
let cdY = 0;

const whichDir = () => {
    switch (pacman.currDir) {
    case "left":
        cdX = -1;
        cdY = 0;
        break;
    case "right":
        cdX = 1;
        cdY = 0;
        break;
    case "up":
        cdX = 0;
        cdY = -1;
        break;
    case "down":
        cdX = 0;
        cdY = 1;
        break;
    case "none":
        cdX = 0;
        cdY = 0;
        break;
    }
};


document.onkeydown = function (e) {
    switch (e.code) {
    case 'ArrowLeft':
        pacman.newDir = "left";
        pacman.currDir = "left";
        e.preventDefault();
        break;
    case 'ArrowDown':
        pacman.newDir = "down";
        pacman.currDir = "down";
        e.preventDefault();
        break;
    case 'ArrowRight':
        pacman.newDir = "right";
        pacman.currDir = "right";
        e.preventDefault();
        break;
    case 'ArrowUp':
        pacman.newDir = "up";
        pacman.currDir = "up";
        e.preventDefault();
        break;
    }
};

// const canMove = () => {
//     if (getMapContent(pacman.x, pacman.y) === 4 ||
//         getMapContent(pacman.x, pacman.y) === 2 ||
//         getMapContent(pacman.x, pacman.y) === 1) {
//         pacman.x += cdX;
//         pacman.y += cdY;
//     }
// };
const canMove = () => {
    let newTileValue = getMapContent(pacman.tileX, pacman.tileY);
    if (newTileValue <= 4) {
        pacman.tileX += cdX;
        pacman.tileY += cdY;
    }
    if (newTileValue === 2) {
        addPoints();
        clearTile(pacman.tileX, pacman.tileY);
        // drawWorld();
        return;
    }
    if (newTileValue === 1) {
        ghostsFrightened = true;
        clearTile(pacman.tileX, pacman.tileY);
        // drawWorld();
        //set timer i takie tam
    }
};
const addPoints = () => {
    playersScore += 10;
    drawScore();
};
const clearTile = (x, y) => {
    map[y][x] = 4;
};


drawWorld();
// const getMapContent = (px, py) => {
//     let pixelToTileX = Math.ceil(px / 32);
//     let pixelToTileY = Math.ceil(py / 32);
//     return map[pixelToTileY][pixelToTileX];
// };
const getMapContent = (px, py) => {
    return map[py + cdY][px + cdX];
};

let framesPerSecond = 7;

const anim = () => {
    setTimeout(function () {
        requestAnimationFrame(anim);

        drawPacman(pacman.tileX * sideLength + 16, pacman.tileY * sideLength + 16);
//być może gdzieś indziej będzie to draw world
        drawWorld();
        // }, 1000 / framesPerSecond);
    }, 1000 / framesPerSecond);
    whichDir();
    canMove();

};

const drawScore = () => {
    scoreContext.clearRect(0, 100, 300, 40);
    scoreContext.fillStyle = "white";
    scoreContext.textAlign = "left";
    scoreContext.font = "30px Lucida Console";
    scoreContext.fillText("Score: " + playersScore, 20, scoreCanvas.height - 20);
};

const drawHighScore = () => {
    // scoreContext.clearRect(0, 0, 895, );
    scoreContext.fillStyle = "white";
    scoreContext.font = "30px Lucida Console";
    scoreContext.textAlign = "center";
    scoreContext.fillText("HIGH SCORE", scoreCanvas.width / 2, scoreCanvas.height - 75);
    scoreContext.fillText(highScore, scoreCanvas.width / 2, scoreCanvas.height - 30);
};
const drawInfo = () => {
    let infoX = 1;
    let infoY = 1;
    for (let i = 1; i <= pacman.lives; i++) {
        infoContext.beginPath();
        infoContext.arc(infoX * sideLength * i, infoY * sideLength, 15, 0.25 * Math.PI, 1.25 * Math.PI, false);
        infoContext.fillStyle = 'rgb(255, 255, 0)';
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
//trzeba bedzie odświeżyć po każdej utracie życia

drawInfo();
drawScore();
drawHighScore();
anim();

//owoce, pojawiająs się dwa na lvl, pierwszy po zjedzeniu 70 kulek, drugi po zjedzeniu 170 kulek,
//owoc w lokalizacji losowanej z czwórek, zjedzenie owoca 100 p.
//https://pacman.fandom.com/wiki/Point_Configurations