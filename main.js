let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
let gameCanvas = document.getElementById("gameCanvas");
// let sCbuttons = document.querySelectorAll(".sc-btn");
let dialog = document.getElementById("howToPlayDialog");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');

function startGame() {
    main.style.display = "none";
    gameCanvas.style.display = "block";
    // sCbuttons.forEach(btn => btn.style.pointerEvents = "none");
    init();
}

function showHowToPlay() {   
    dialog.showModal();
}

function closeHowToPlayDialog() {
    dialog.close();
}

function showImprint() {
    window.location.href = "imprint.html";
}

function getLoseScreen() {
    gameCanvas.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    loseScreen.style.display = "flex";
}

function restartGame() {
    loseScreen.style.display = "none";
    startGame();
}

function exitGame() {
    startScreen.style.display = "flex";
    loseScreen.style.display = "none";
}

function getWinScreen() {
    gameCanvas.style.display = "none";
    winScreen.style.display = "flex";
    return winScreen;
}

document.getElementById('howToPlayDialog').addEventListener('click', function(event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});