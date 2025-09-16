let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
// let dialog = document.getElementById("howToPlayDialog");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');
let canvasWrapper = document.getElementById('canvasWrapper');
const smilies = [trashSmile(), lameSmile(), mehSmile(), basicSmile(), alrightSmile(), chillSmile(), coolSmile(), awesomeSmile(), epicSmile(), absolutelyGreatSmile()];
const muteButton = document.getElementById('muteButton');
window.isMuted = false;

/** Start the game by hiding the main menu and showing the game canvas
 * This function initializes the game with level 1 and sets up all necessary sounds.
 */
function startGame() {
    main.style.display = "none";
    canvasWrapper.style.display = "flex";
    init(createLevel1());
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

/** Handle mute functionality for all sounds */
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

/** Show the "How to Play" dialog */
function openDialog(id) {
    dialog = document.getElementById(id);
    dialog.showModal();
}

/** Close the "How to Play" dialog */
function closeDialog(id) {
    dialog = document.getElementById(id);
    dialog.close();
}

/** Show the lose screen and hide other screens */
function showLoseScreen() {
    canvasWrapper.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    loseScreen.style.display = "flex";
}

/** Show the win screen and hide other screens */
function showWinScreen() {
    canvasWrapper.style.display = "none";
    startScreen.style.display = "none";
    main.style.display = "flex";
    winScreen.style.display = "flex";
}

/** Restart the game by resetting variables and starting a new game */
function restartGame() {
    if (loseScreen.style.display === "flex") loseScreen.style.display = "none";
    if (winScreen.style.display === "flex") winScreen.style.display = "none";

    stopAllIntervals();
    resetGameVariables();
    startGame();
}

/** Stop all active intervals in the game */
function stopAllIntervals() {
    const intervals = [
        window.world?.runInterval,
        window.world?.enemyTrackingInterval,
        window.world?.fightInterval,
        window.world?.endbossMoveInterval,
        window.world?.endbossTrackInterval,
        window.character?.controlInterval,
        window.character?.jumpLandingInterval,
        window.character?.idleCheckInterval,
        window.character?.idleLongCheckInterval,
        window.character?.dyingInterval,
        window.character?.fallThroughCanvasInterval,
        window.chicken?.moveLeftAnimateIntervalEnemy,
        window.chicken?.walkingInterval,
        window.chicks?.moveLeftAnimateIntervalEnemy,
        window.chicks?.walkingInterval,
        window.coins?.animationCoinInterval,
        window.endboss?.walkingInterval,
        window.endboss?.attackInterval,
        window.endboss?.hurtInterval,
        window.endboss?.endbossAlertInterval,
        window.endboss?.dyingInterval,
        window.endboss?.fallThroughCanvasInterval,
        window.enemy?.moveLeftAnimateIntervalEnemy,
        window.enemy?.moveInterval,
        window.runInterval,
        window.enemyTrackingInterval,
        window.fightInterval,
        window.endbossMoveInterval,
        window.world?.endbossTrackInterval,
        window.moveableObject?.gravityInterval,
        window.throwableObject?.throwBottleInterval,
        window.throwableObject?.throwCoinInterval,
        window.throwableObject?.splashInterval
    ];

    intervals.forEach(interval => {
        if (interval) clearInterval(interval);
    });
}

/** Stop all currently playing sounds */
function stopAllSounds() {
    const sounds = [];

    if (window.ALL_SOUNDS && Array.isArray(window.ALL_SOUNDS)) sounds.push(...window.ALL_SOUNDS);

    Object.keys(window).forEach(key => {
        if (window[key] instanceof HTMLAudioElement) sounds.push(window[key]);
    });

    sounds.forEach(sound => {
        if (sound && typeof sound.pause === 'function') {
            sound.pause();
            sound.currentTime = 0;
        }
    });
}

/** Reset all global game variables to their initial state */
function resetGameVariables() {
    ['world', 'level', 'camera_x', 'throwableObject', 'shootingPossible', 'runInterval',
        'enemyTrackingInterval', 'fightInterval', 'endbossMoveInterval', 'endbossTrackInterval',
        'endbossStarted', 'endbossStartDone', 'endbossDefeated', 'endbossAttackInterval',
        'endbossAlert', 'lastThrowTime', 'gameOverScreens'
    ].forEach(key => window[key] = null);

    window.objectThrowCooldown = 300;

    ['statusBarHealth', 'statusBarCoins', 'statusBarBottle', 'statusBarBoss'].forEach(key => window[key] = null);

    Object.assign(window, {
        currentRotation: 0,
        groundLevel: 400,
        directionLeft: false,
        offset: { top: 0, left: 0, right: 0, bottom: 0 },
        isSplashing: false,
        splashInterval: null,
        isCoin: false
    });

    ['canvas', 'ctx', 'keyboard'].forEach(key => window[key] = null);
}

/** Exit the game and return to the start screen */
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

/** Get the lose screen element */
function getWinScreen() {
    canvasWrapper.style.display = "none";
    winScreen.style.display = "flex";
    return winScreen;
}

/** Set the final score and message on the win screen */
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

/** Check if the game is currently stopped */
function isGameStopped() {
    return window.world && window.world.gameStopped;
}

/** Set the muted state for a specific sound */
function setSoundMuted(sound) {
    if (sound) sound.muted = window.isMuted;
}

/** Toggle mute state for all sounds and update the mute button */
function toggleMute() {
    if (muteButton) muteButton.classList.toggle('muted');
    window.isMuted = !window.isMuted;
    localStorage.setItem('isMuted', window.isMuted);
    if (window.ALL_SOUNDS && Array.isArray(window.ALL_SOUNDS)) {
        window.ALL_SOUNDS.forEach(sound => {
            if (sound) sound.muted = window.isMuted;
        });
    }
}

/** Add event listeners for mute functionality */
muteButton.addEventListener('click', toggleMute);

/** Close the "How to Play" dialog when clicking outside the content area */
document.getElementById('howToPlayDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeDialog('howToPlayDialog');
    }
});

/** Close the "imprint" dialog when clicking outside the content area */
document.getElementById('imprintDialog').addEventListener('click', function (event) {
    const dialogContent = document.getElementById('imprintDialogContent');
    if (!dialogContent.contains(event.target)) {
        closeDialog('imprintDialog');
    }
});