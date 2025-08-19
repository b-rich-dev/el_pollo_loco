let canvas;
let world;

function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    world = new World(canvas);

    console.log('Character initialized', world.character);

    // ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
}