let canvas;
let ctx;
let character = new MoveableObject();

function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    console.log('Character initialized', character);

    // ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
}