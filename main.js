let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
// let gameCanvas = document.getElementById("gameCanvas");
let dialog = document.getElementById("howToPlayDialog");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');
// let gameControls = document.getElementById('gameControls');
let canvasWrapper = document.getElementById('canvasWrapper');
const smilies = [trashSmile(), lameSmile(), mehSmile(), basicSmile(), alrightSmile(), chillSmile(), coolSmile(), awesomeSmile(), epicSmile(), absolutelyGreatSmile()];
const muteButton = document.getElementById('muteButton');

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

function setWinInfo() {
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

function toggleMute() {
    if (muteButton) {
        muteButton.classList.toggle('muted');
    }
    if (window.MAIN_SOUND) {
        window.MAIN_SOUND.muted = !window.MAIN_SOUND.muted;
    }


    if (window.COIN_SOUND) {
        window.COIN_SOUND.muted = !window.COIN_SOUND.muted;
    }
    if (window.BOTTLE_BREAK_SOUND) {
        window.BOTTLE_BREAK_SOUND.muted = !window.BOTTLE_BREAK_SOUND.muted;
    }
    if (window.SHOOTING_SOUND) {
        window.SHOOTING_SOUND.muted = !window.SHOOTING_SOUND.muted;
    }


    if (window.COLLECT_BOTTLE_SOUND) {
        window.COLLECT_BOTTLE_SOUND.muted = !window.COLLECT_BOTTLE_SOUND.muted;
    }
    if (window.COLLECT_COIN_SOUND) {
        window.COLLECT_COIN_SOUND.muted = !window.COLLECT_COIN_SOUND.muted;
    }


    if (window.ENDBOSS_ATTACK_SOUND) {
        window.ENDBOSS_ATTACK_SOUND.muted = !window.ENDBOSS_ATTACK_SOUND.muted;
    }
    if (window.ENDBOSS_HURT_SOUND) {
        window.ENDBOSS_HURT_SOUND.muted = !window.ENDBOSS_HURT_SOUND.muted;
    }
    if (window.ENDBOSS_WALK_SOUND) {
        window.ENDBOSS_WALK_SOUND.muted = !window.ENDBOSS_WALK_SOUND.muted;
    }
    if (window.ENDBOSS_ALERT_SOUND) {
        window.ENDBOSS_ALERT_SOUND.muted = !window.ENDBOSS_ALERT_SOUND.muted;
    }
    if (window.ENDBOSS_SONIC_BOMB_SOUND) {
        window.ENDBOSS_SONIC_BOMB_SOUND.muted = !window.ENDBOSS_SONIC_BOMB_SOUND.muted;
    }
    if (window.ENDBOSS_FIGHT_SOUND) {
        window.ENDBOSS_FIGHT_SOUND.muted = !window.ENDBOSS_FIGHT_SOUND.muted;
    }
    if (window.ENDBOSS_DEATH_SOUND) {
        window.ENDBOSS_DEATH_SOUND.muted = !window.ENDBOSS_DEATH_SOUND.muted;
    }
    if (window.ENDBOSS_SLIDE_SOUND) {
        window.ENDBOSS_SLIDE_SOUND.muted = !window.ENDBOSS_SLIDE_SOUND.muted;
    }
    if (window.ENDBOSS_JUMP_SOUND) {
        window.ENDBOSS_JUMP_SOUND.muted = !window.ENDBOSS_JUMP_SOUND.muted;
    }
    if (window.ENDBOSS_LITTLE_JUMP_SOUND) {
        window.ENDBOSS_LITTLE_JUMP_SOUND.muted = !window.ENDBOSS_LITTLE_JUMP_SOUND.muted;
    }
    if (window.ENDBOSS_WIN_SOUND) {
        window.ENDBOSS_WIN_SOUND.muted = !window.ENDBOSS_WIN_SOUND.muted;
    }


    if (window.CHICKS_HURT_SOUND) {
        window.CHICKS_HURT_SOUND.muted = !window.CHICKS_HURT_SOUND.muted;
    }
    if (window.CHICKS_JUMP_SOUND) {
        window.CHICKS_JUMP_SOUND.muted = !window.CHICKS_JUMP_SOUND.muted;
    }
    if (window.CHICKS_WALK_SOUND) {
        window.CHICKS_WALK_SOUND.muted = !window.CHICKS_WALK_SOUND.muted;
    }
    if (window.CHICKS_GENERAL_SOUND) {
        window.CHICKS_GENERAL_SOUND.muted = !window.CHICKS_GENERAL_SOUND.muted;
    }


    if (window.CHICKEN_DEATH_SOUND) {
        window.CHICKEN_DEATH_SOUND.muted = !window.CHICKEN_DEATH_SOUND.muted;
    }
    if (window.CHICKEN_JUMP_SOUND) {
        window.CHICKEN_JUMP_SOUND.muted = !window.CHICKEN_JUMP_SOUND.muted;
    }
    if (window.CHICKEN_WALK_SOUND) {
        window.CHICKEN_WALK_SOUND.muted = !window.CHICKEN_WALK_SOUND.muted;
    }
    if (window.CHICKEN_GENERAL_SOUND) {
        window.CHICKEN_GENERAL_SOUND.muted = !window.CHICKEN_GENERAL_SOUND.muted;
    }

    if (window.CHARACTER_DYING_SOUND) {
        window.CHARACTER_DYING_SOUND.muted = !window.CHARACTER_DYING_SOUND.muted;
    }
    if (window.CHARACTER_JUMP_SOUND) {
        window.CHARACTER_JUMP_SOUND.muted = !window.CHARACTER_JUMP_SOUND.muted;
    }
    if (window.CHARACTER_LITTLE_JUMP_SOUND) {
        window.CHARACTER_LITTLE_JUMP_SOUND.muted = !window.CHARACTER_LITTLE_JUMP_SOUND.muted;
    }
    if (window.CHARACTER_HURT_SOUND) {
        window.CHARACTER_HURT_SOUND.muted = !window.CHARACTER_HURT_SOUND.muted;
    }
    if (window.CHARACTER_SLEEPING_SOUND) {
        window.CHARACTER_SLEEPING_SOUND.muted = !window.CHARACTER_SLEEPING_SOUND.muted;
    }
    if (window.CHARACTER_WALK_SOUND) {
        window.CHARACTER_WALK_SOUND.muted = !window.CHARACTER_WALK_SOUND.muted;
    }
    if (window.CHARACTER_WIN_SOUND) {
        window.CHARACTER_WIN_SOUND.muted = !window.CHARACTER_WIN_SOUND.muted;
    }
}

muteButton.addEventListener('click', toggleMute);

document.getElementById('howToPlayDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});