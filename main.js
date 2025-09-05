let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
let gameCanvas = document.getElementById("gameCanvas");
let dialog = document.getElementById("howToPlayDialog");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');

function startGame() {
    main.style.display = "none";
    gameCanvas.style.display = "block";
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

function showLoseScreen() {
    gameCanvas.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    loseScreen.style.display = "flex";
}

function showWinScreen() {
    gameCanvas.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    winScreen.style.display = "flex";
}

function restartGame() {
    if (loseScreen.style.display === "flex") {
        loseScreen.style.display = "none";
    }
    if (winScreen.style.display === "flex") {
        winScreen.style.display = "none";
    }

    // stopAllIntervals();
    // resetGameVariables();
    startGame();
}

function stopAllIntervals() {
    
    if (window.world && window.world.runInterval) {
        clearInterval(window.world.runInterval);
    }
    if (window.world && window.world.enemyTrackingInterval) {
        clearInterval(window.world.enemyTrackingInterval);
    }
    if (window.world && window.world.endbossTrackInterval) {
        clearInterval(window.world.endbossTrackInterval);
    }
}

function resetGameVariables() {
    // World & Level
    window.world = null;
    window.level = null;
    window.camera_x = 0;
    window.throwableObject = null;
    window.endbossStarted = false;
    window.endbossStartDone = false;
    window.endbossMoveInterval = null;
    window.endbossDefeated = false;
    window.endbossAttackInterval = null;
    window.endbossAlert = false;
    window.lastThrowTime = 0;
    window.objectThrowCooldown = 300;
    window.enemyTrackingInterval = null;
    window.shootingPossible = true;
    window.gameOverScreens = null;
    window.runInterval = null;
    window.endbossTrackInterval = null;
    window.fightInterval = null;

    // StatusBars
    window.statusBarHealth = null;
    window.statusBarCoins = null;
    window.statusBarBottle = null;
    window.statusBarBoss = null;

    // Moveable Objects
    window.character = null;
    window.chicken = null;
    window.chicks = null;
    window.endboss = null;
    window.coin = null;
    window.bottle = null;

    // Canvas & Input
    window.canvas = null;
    window.ctx = null;
    window.keyboard = null;

    // Entferne das manuelle Zurücksetzen von Eigenschaften!
    // Die Objekte werden beim Neustart neu erzeugt und erhalten ihre Startwerte.
}

function exitGame() {
    if (loseScreen.style.display === "flex") {
        loseScreen.style.display = "none";
        startScreen.style.display = "flex";
    }
    if (winScreen.style.display === "flex") {
        winScreen.style.display = "none";
        startScreen.style.display = "flex";
    }
}

function getWinScreen() {
    gameCanvas.style.display = "none";
    winScreen.style.display = "flex";
    return winScreen;
}

document.getElementById('howToPlayDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});