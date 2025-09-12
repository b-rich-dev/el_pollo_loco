let canvas;
let world;
let keyboard = new Keyboard();
let moveLeft = document.getElementById("moveLeftButton");
let moveRight = document.getElementById("moveRightButton");
let jump = document.getElementById("jumpButton");
let throwObject = document.getElementById("throwButton");

function init(level) {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    world = new World(canvas, ctx, keyboard, level);

    // Prevent double-tap zoom on mobile for the whole document
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    });
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = true;
    }
    if (e.code === 'KeyD') {
        keyboard.D = true;
    }
    if (e.code === 'Numpad0') {
        keyboard.NUMPAD_ZERO = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = false;
    }
    if (e.code === 'KeyD') {
        keyboard.D = false;
    }
    if (e.code === 'Numpad0') {
        keyboard.NUMPAD_ZERO = false;
    }
});

moveLeft.addEventListener('mousedown', () => {
    keyboard.LEFT = true;
});
moveLeft.addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
moveLeft.addEventListener('mouseup', () => {
    keyboard.LEFT = false;
});
moveLeft.addEventListener('touchend', () => {
    keyboard.LEFT = false;
});
moveLeft.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

moveRight.addEventListener('mousedown', () => {
    keyboard.RIGHT = true;
});
moveRight.addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
});
moveRight.addEventListener('mouseup', () => {
    keyboard.RIGHT = false;
});
moveRight.addEventListener('touchend', () => {
    keyboard.RIGHT = false;
});
moveRight.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

jump.addEventListener('mousedown', () => {
    keyboard.SPACE = true;
});
jump.addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
jump.addEventListener('mouseup', () => {
    keyboard.SPACE = false;
});
jump.addEventListener('touchend', () => {
    keyboard.SPACE = false;
});
jump.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

throwObject.addEventListener('mousedown', () => {
    keyboard.D = true;
});
throwObject.addEventListener('touchstart', () => {
    keyboard.D = true;
});
throwObject.addEventListener('mouseup', () => {
    keyboard.D = false;
});
throwObject.addEventListener('touchend', () => {
    keyboard.D = false;
});
throwObject.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
