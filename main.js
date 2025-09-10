let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
// let gameCanvas = document.getElementById("gameCanvas");
let dialog = document.getElementById("howToPlayDialog");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');
// let gameControls = document.getElementById('gameControls');
let canvasWrapper = document.getElementById('canvasWrapper');
const smilies = [trashSmile(), lameSmile(), mehSmile(), basicSmile(), alrightSmile(), chillSmile(), coolSmile(), awesomeSmile(), epicSmile(), absolutelyGreatSmile()];


function startGame() {
    main.style.display = "none";
    canvasWrapper.style.display = "flex";
    // gameControls.style.display = "flex";
    init(createLevel1()); // Erzeuge ein neues Level1-Objekt
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
    canvasWrapper.style.display = "none";
    // gameControls.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    loseScreen.style.display = "flex";
}

function showWinScreen() {
    canvasWrapper.style.display = "none";
    // gameControls.style.display = "none";
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

    stopAllIntervals();
    resetGameVariables();
    startGame();
}

function stopAllIntervals() {
    // if (window.character && window.character.controlInterval) {
    //     clearInterval(window.character.controlInterval);
    // }
    // if (window.character && window.character.jumpLandingInterval) {
    //     clearInterval(window.character.jumpLandingInterval);
    // }
    // if (window.character && window.character.idleCheckInterval) {
    //     clearInterval(window.character.idleCheckInterval);
    // }
    // if (window.character && window.character.idleLongCheckInterval) {
    //     clearInterval(window.character.idleLongCheckInterval);
    // }
    // if (window.character && window.character.dyingInterval) {
    //     clearInterval(window.character.dyingInterval);
    // }
    // if (window.character && window.character.fallThroughCanvasInterval) {
    //     clearInterval(window.character.fallThroughCanvasInterval);
    // }


    // if (window.chicken && window.chicken.moveLeftAnimateIntervalEnemy) {
    //     clearInterval(window.chicken.moveLeftAnimateIntervalEnemy);
    // }
    // if (window.chicken && window.chicken.walkingInterval) {
    //     clearInterval(window.chicken.walkingInterval);
    // }


    // if (window.chicks && window.chicks.moveLeftAnimateIntervalEnemy) {
    //     clearInterval(window.chicks.moveLeftAnimateIntervalEnemy);
    // }
    // if (window.chicks && window.chicks.walkingInterval) {
    //     clearInterval(window.chicks.walkingInterval);
    // }


    // if (window.coins && window.coins.animationCoinInterval) {
    //     clearInterval(window.coins.animationCoinInterval);
    // }


    // if (window.endboss && window.endboss.walkingInterval) {
    //     clearInterval(window.endboss.walkingInterval);
    // }
    // if (window.endboss && window.endboss.attackInterval) {
    //     clearInterval(window.endboss.attackInterval);
    // }
    // if (window.endboss && window.endboss.hurtInterval) {
    //     clearInterval(window.endboss.hurtInterval);
    // }
    // if (window.endboss && window.endboss.dyingInterval) {
    //     clearInterval(window.endboss.dyingInterval);
    // }
    // if (window.endboss && window.endboss.fallThroughCanvasInterval) {
    //     clearInterval(window.endboss.fallThroughCanvasInterval);
    // }
    // if (window.endboss && window.endboss.endbossAlertInterval) {
    //     clearInterval(window.endboss.endbossAlertInterval);
    // }


    // if (window.throwableObject && window.throwableObject.throwBottleInterval) {
    //     clearInterval(window.throwableObject.throwBottleInterval);
    // }
    // if (window.throwableObject && window.throwableObject.throwCoinInterval) {
    //     clearInterval(window.throwableObject.throwCoinInterval);
    // }
    // if (window.throwableObject && window.throwableObject.splashInterval) {
    //     clearInterval(window.throwableObject.splashInterval);
    // }


    if (window.world && window.world.runInterval) {
        clearInterval(window.world.runInterval);
    }
    if (window.world && window.world.enemyTrackingInterval) {
        clearInterval(window.world.enemyTrackingInterval);
    }
    if (window.world && window.world.fightInterval) {
        clearInterval(window.world.fightInterval);
    }
    if (window.world && window.world.endbossMoveInterval) {
        clearInterval(window.world.endbossMoveInterval);
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
    window.shootingPossible = true;
    window.runInterval = null;
    window.enemyTrackingInterval = null;
    window.fightInterval = null;
    window.endbossMoveInterval = null;
    window.endbossTrackInterval = null;
    window.endbossStarted = false;
    window.endbossStartDone = false;
    window.endbossDefeated = false;
    window.endbossAttackInterval = null;
    window.endbossAlert = false;
    window.lastThrowTime = 0;
    window.objectThrowCooldown = 300;
    window.gameOverScreens = null;

    // StatusBars
    window.statusBarHealth = null;
    window.statusBarCoins = null;
    window.statusBarBottle = null;
    window.statusBarBoss = null;

    // Throwable Objects Eigenschaften
    window.currentRotation = 0;
    window.groundLevel = 400;
    window.directionLeft = false;
    window.offset = { top: 0, left: 0, right: 0, bottom: 0 };
    window.isSplashing = false;
    window.splashInterval = null;
    window.isCoin = false;

    // Canvas & Input
    window.canvas = null;
    window.ctx = null;
    window.keyboard = null;
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
    canvasWrapper.style.display = "none";
    // gameControls.style.display = "none";
    winScreen.style.display = "flex";
    return winScreen;
}

function setWinInfo(){
    const finalScore = document.getElementById("finalScore");
    const finalSentence = document.getElementById("finalSentence");
    if (window.world && window.world.gameOver) {
        if (finalScore && finalSentence) {
            const coins = window.world.statusBarCoins.coins;
            finalScore.textContent = `${coins}`;
            let smileyIndex = coins;
            if (smileyIndex < 0) smileyIndex = 0;
            if (smileyIndex >= smilies.length) smileyIndex = smilies.length - 1;
            finalSentence.innerHTML = "";
            finalSentence.innerHTML = smilies[smileyIndex];
        } else {
            console.warn('finalScore oder finalSentence ist null!');
        }
    }
}

document.getElementById('howToPlayDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});