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
window.isMuted = false;

function startGame() {
    main.style.display = "none";
    canvasWrapper.style.display = "flex";
    // gameControls.style.display = "flex";
    init(createLevel1()); // Erzeuge ein neues Level1-Objekt

    // Sounds nach Initialisierung sammeln
    window.ALL_SOUNDS = [
        window.MAIN_SOUND,
        window.COIN_SOUND,
        window.BOTTLE_BREAK_SOUND,
        window.SHOOTING_SOUND,
        window.COLLECT_BOTTLE_SOUND,
        window.COLLECT_COIN_SOUND,
        window.ENDBOSS_ATTACK_SOUND,
        window.ENDBOSS_HURT_SOUND,
        window.ENDBOSS_WALK_SOUND,
        window.ENDBOSS_ALERT_SOUND,
        window.ENDBOSS_SONIC_BOMB_SOUND,
        window.ENDBOSS_FIGHT_SOUND,
        window.ENDBOSS_DEATH_SOUND,
        window.ENDBOSS_SLIDE_SOUND,
        window.ENDBOSS_JUMP_SOUND,
        window.ENDBOSS_LITTLE_JUMP_SOUND,
        window.ENDBOSS_WIN_SOUND,
        window.CHICKS_HURT_SOUND,
        window.CHICKS_JUMP_SOUND,
        window.CHICKS_WALK_SOUND,
        window.CHICKS_GENERAL_SOUND,
        window.CHICKEN_DEATH_SOUND,
        window.CHICKEN_JUMP_SOUND,
        window.CHICKEN_WALK_SOUND,
        window.CHICKEN_GENERAL_SOUND,
        window.CHARACTER_DYING_SOUND,
        window.CHARACTER_JUMP_SOUND,
        window.CHARACTER_LITTLE_JUMP_SOUND,
        window.CHARACTER_HURT_SOUND,
        window.CHARACTER_SLEEPING_SOUND,
        window.CHARACTER_WALK_SOUND,
        window.CHARACTER_WIN_SOUND
    ];
}

// Mute-Status beim Laden aus localStorage holen
window.isMuted = localStorage.getItem('isMuted') === 'true';
if (muteButton) {
    if (window.isMuted) muteButton.classList.add('muted');
    else muteButton.classList.remove('muted');
}
if (window.ALL_SOUNDS && Array.isArray(window.ALL_SOUNDS)) {
    window.ALL_SOUNDS.forEach(sound => {
        if (sound) sound.muted = window.isMuted;
    });
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

    if (window.character && window.character.controlInterval) clearInterval(window.character.controlInterval);
    if (window.character && window.character.jumpLandingInterval) clearInterval(window.character.jumpLandingInterval);
    if (window.character && window.character.idleCheckInterval) clearInterval(window.character.idleCheckInterval);
    if (window.character && window.character.idleLongCheckInterval) clearInterval(window.character.idleLongCheckInterval);
    if (window.character && window.character.dyingInterval) clearInterval(window.character.dyingInterval);
    if (window.character && window.character.fallThroughCanvasInterval) clearInterval(window.character.fallThroughCanvasInterval);

    if (window.chicken && window.chicken.moveLeftAnimateIntervalEnemy) clearInterval(window.chicken.moveLeftAnimateIntervalEnemy);
    if (window.chicken && window.chicken.walkingInterval) clearInterval(window.chicken.walkingInterval);

    if (window.chicks && window.chicks.moveLeftAnimateIntervalEnemy) clearInterval(window.chicks.moveLeftAnimateIntervalEnemy);
    if (window.chicks && window.chicks.walkingInterval) clearInterval(window.chicks.walkingInterval);

    if (window.coins && window.coins.animationCoinInterval) clearInterval(window.coins.animationCoinInterval);

    if (window.endboss && window.endboss.walkingInterval) clearInterval(window.endboss.walkingInterval);
    if (window.endboss && window.endboss.attackInterval) clearInterval(window.endboss.attackInterval);
    if (window.endboss && window.endboss.hurtInterval) clearInterval(window.endboss.hurtInterval);
    if (window.endboss && window.endboss.endbossAlertInterval) clearInterval(window.endboss.endbossAlertInterval);
    if (window.endboss && window.endboss.dyingInterval) clearInterval(window.endboss.dyingInterval);
    if (window.endboss && window.endboss.fallThroughCanvasInterval) clearInterval(window.endboss.fallThroughCanvasInterval);

    if (window.enemy && window.enemy.moveLeftAnimateIntervalEnemy) clearInterval(window.enemy.moveLeftAnimateIntervalEnemy);
    if (window.enemy && window.enemy.moveInterval) clearInterval(window.enemy.moveInterval);

    if (window.runInterval) clearInterval(window.runInterval);
    if (window.enemyTrackingInterval) clearInterval(window.enemyTrackingInterval);
    if (window.fightInterval) clearInterval(window.fightInterval);
    if (window.endbossMoveInterval) clearInterval(window.endbossMoveInterval);
    if (window.world && window.world.endbossTrackInterval) clearInterval(window.world.endbossTrackInterval);

    if (window.moveableObject && window.moveableObject.gravityInterval) clearInterval(window.moveableObject.gravityInterval);

    if (window.throwableObject && window.throwableObject.throwBottleInterval) clearInterval(window.throwableObject.throwBottleInterval);
    if (window.throwableObject && window.throwableObject.throwCoinInterval) clearInterval(window.throwableObject.throwCoinInterval);
    if (window.throwableObject && window.throwableObject.splashInterval) clearInterval(window.throwableObject.splashInterval);
}

function stopAllSounds() {
    if (window.character) {
        if (window.character.DYING_SOUND) { window.character.DYING_SOUND.pause(); window.character.DYING_SOUND.currentTime = 0; }
        if (window.character.JUMP_SOUND) { window.character.JUMP_SOUND.pause(); window.character.JUMP_SOUND.currentTime = 0; }
        if (window.character.LITTLE_JUMP_SOUND) { window.character.LITTLE_JUMP_SOUND.pause(); window.character.LITTLE_JUMP_SOUND.currentTime = 0; }
        if (window.character.HURT_SOUND) { window.character.HURT_SOUND.pause(); window.character.HURT_SOUND.currentTime = 0; }
        if (window.character.SLEEPING_SOUND) { window.character.SLEEPING_SOUND.pause(); window.character.SLEEPING_SOUND.currentTime = 0; }
        if (window.character.WALK_SOUND) { window.character.WALK_SOUND.pause(); window.character.WALK_SOUND.currentTime = 0; }
        if (window.character.WIN_SOUND) { window.character.WIN_SOUND.pause(); window.character.WIN_SOUND.currentTime = 0; }
    }

    if (window.chicken) {
        if (window.chicken.CHICKEN_DEATH_SOUND) { window.chicken.CHICKEN_DEATH_SOUND.pause(); window.chicken.CHICKEN_DEATH_SOUND.currentTime = 0; }
        if (window.chicken.CHICKEN_JUMP_SOUND) { window.chicken.CHICKEN_JUMP_SOUND.pause(); window.chicken.CHICKEN_JUMP_SOUND.currentTime = 0; }
        if (window.chicken.CHICKEN_WALK_SOUND) { window.chicken.CHICKEN_WALK_SOUND.pause(); window.chicken.CHICKEN_WALK_SOUND.currentTime = 0; }
        if (window.chicken.GENERAL_SOUND) { window.chicken.GENERAL_SOUND.pause(); window.chicken.GENERAL_SOUND.currentTime = 0; }
    }

    if (window.chicks) {
        if (window.chicks.CHICKS_HURT_SOUND) { window.chicks.CHICKS_HURT_SOUND.pause(); window.chicks.CHICKS_HURT_SOUND.currentTime = 0; }
        if (window.chicks.CHICKS_JUMP_SOUND) { window.chicks.CHICKS_JUMP_SOUND.pause(); window.chicks.CHICKS_JUMP_SOUND.currentTime = 0; }
        if (window.chicks.CHICKS_WALK_SOUND) { window.chicks.CHICKS_WALK_SOUND.pause(); window.chicks.CHICKS_WALK_SOUND.currentTime = 0; }
        if (window.chicks.GENERAL_SOUND) { window.chicks.GENERAL_SOUND.pause(); window.chicks.GENERAL_SOUND.currentTime = 0; }
    }

    if (window.endboss) {
        if (window.endboss.ENDBOSS_ATTACK_SOUND) { window.endboss.ENDBOSS_ATTACK_SOUND.pause(); window.endboss.ENDBOSS_ATTACK_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_HURT_SOUND) { window.endboss.ENDBOSS_HURT_SOUND.pause(); window.endboss.ENDBOSS_HURT_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_WALK_SOUND) { window.endboss.ENDBOSS_WALK_SOUND.pause(); window.endboss.ENDBOSS_WALK_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_ALERT_SOUND) { window.endboss.ENDBOSS_ALERT_SOUND.pause(); window.endboss.ENDBOSS_ALERT_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_SONIC_BOMB_SOUND) { window.endboss.ENDBOSS_SONIC_BOMB_SOUND.pause(); window.endboss.ENDBOSS_SONIC_BOMB_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_FIGHT_SOUND) { window.endboss.ENDBOSS_FIGHT_SOUND.pause(); window.endboss.ENDBOSS_FIGHT_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_DEATH_SOUND) { window.endboss.ENDBOSS_DEATH_SOUND.pause(); window.endboss.ENDBOSS_DEATH_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_SLIDE_SOUND) { window.endboss.ENDBOSS_SLIDE_SOUND.pause(); window.endboss.ENDBOSS_SLIDE_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_JUMP_SOUND) { window.endboss.ENDBOSS_JUMP_SOUND.pause(); window.endboss.ENDBOSS_JUMP_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_LITTLE_JUMP_SOUND) { window.endboss.ENDBOSS_LITTLE_JUMP_SOUND.pause(); window.endboss.ENDBOSS_LITTLE_JUMP_SOUND.currentTime = 0; }
        if (window.endboss.ENDBOSS_WIN_SOUND) { window.endboss.ENDBOSS_WIN_SOUND.pause(); window.endboss.ENDBOSS_WIN_SOUND.currentTime = 0; }
    }

    if (window.statusbar) {
        if (window.statusbar.COLLECT_BOTTLE_SOUND) { window.statusbar.COLLECT_BOTTLE_SOUND.pause(); window.statusbar.COLLECT_BOTTLE_SOUND.currentTime = 0; }
        if (window.statusbar.COLLECT_COIN_SOUND) { window.statusbar.COLLECT_COIN_SOUND.pause(); window.statusbar.COLLECT_COIN_SOUND.currentTime = 0; }
    }

    if (window.throwableObject) {
        if (window.throwableObject.COIN_SOUND) { window.throwableObject.COIN_SOUND.pause(); window.throwableObject.COIN_SOUND.currentTime = 0; }
        if (window.throwableObject.BOTTLE_BREAK_SOUND) { window.throwableObject.BOTTLE_BREAK_SOUND.pause(); window.throwableObject.BOTTLE_BREAK_SOUND.currentTime = 0; }
        if (window.throwableObject.SHOOTING_SOUND) { window.throwableObject.SHOOTING_SOUND.pause(); window.throwableObject.SHOOTING_SOUND.currentTime = 0; }
    }

    if (window.world && window.world.MAIN_SOUND) {
        window.world.MAIN_SOUND.pause();
        window.world.MAIN_SOUND.currentTime = 0;
    }

    // Alle Sounds im window.ALL_SOUNDS Array stoppen
    if (window.ALL_SOUNDS && Array.isArray(window.ALL_SOUNDS)) {
        window.ALL_SOUNDS.forEach(sound => {
            if (sound && typeof sound.pause === 'function') {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    // Alle globalen Audio-Variablen stoppen
    Object.keys(window).forEach(key => {
        if (window[key] instanceof HTMLAudioElement) {
            window[key].pause();
            window[key].currentTime = 0;
        }
    });
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

function isGameStopped() {
    return window.world && window.world.gameStopped;
}

function setSoundMuted(sound) {
    if (sound) sound.muted = window.isMuted;
}

function toggleMute() {
    if (muteButton) {
        muteButton.classList.toggle('muted');
    }
    window.isMuted = !window.isMuted;
    localStorage.setItem('isMuted', window.isMuted); // Mute-Status speichern
    if (window.ALL_SOUNDS && Array.isArray(window.ALL_SOUNDS)) {
        window.ALL_SOUNDS.forEach(sound => {
            if (sound) sound.muted = window.isMuted;
        });
    }
}

muteButton.addEventListener('click', toggleMute);

document.getElementById('howToPlayDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});