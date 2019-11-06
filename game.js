var map = [
    [7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
    [6, 2, 7, 5, 5, 8, 2, 7, 5, 5, 5, 8, 2, 6, 6, 2, 7, 5, 5, 5, 8, 2, 7, 5, 5, 8, 2, 6],
    [6, 2, 6, 4, 4, 6, 2, 6, 4, 4, 4, 6, 2, 6, 6, 2, 6, 4, 4, 4, 6, 2, 6, 4, 4, 6, 2, 6],
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
    [6, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 6],
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
    y: 17,
};

const drawWorld = () => {
    document.getElementById('world').innerHTML = '';

    for (let mapElement of map) {
        for (let el of mapElement) {
            switch (el) {
                case 1:
                    document.getElementById('world').innerHTML += '<div class="wall"></div>';
                    break;
                case 2:
                    document.getElementById('world').innerHTML += '<div class="coin"></div>';
                    break;
                case 4:
                    document.getElementById('world').innerHTML += '<div class="ground"></div>';
                    break;
                case 3:
                    document.getElementById('world').innerHTML += '<div class="pacman"></div>';
                    break;
                case 6:
                    document.getElementById('world').innerHTML += '<div class="v"></div>';
                    break;
                case 5:
                    document.getElementById('world').innerHTML += '<div class="h"></div>';
                    break;
                case 7:
                    document.getElementById('world').innerHTML += '<div class="ctl"></div>';
                    break;
                case 8:
                    document.getElementById('world').innerHTML += '<div class="ctr"></div>';
                    break;
                case 9:
                    document.getElementById('world').innerHTML += '<div class="cbr"></div>';
                    break;
                case 0:
                    document.getElementById('world').innerHTML += '<div class="cbl"></div>';
                    break;
            }
        }
        document.getElementById('world').innerHTML += '<br>';
    }
}

drawWorld();

const canMove = (x, y) => {
    if (map[x][y] === 2 || map[x][y] === 4) {
        return true;
    }
    return false;
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


