let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
let loseScreen = document.getElementById('loseEndScreen');
let winScreen = document.getElementById('winEndScreen');
let canvasWrapper = document.getElementById('canvasWrapper');
const smilies = [trashSmile(), lameSmile(), mehSmile(), basicSmile(), alrightSmile(), chillSmile(), coolSmile(), awesomeSmile(), epicSmile(), absolutelyGreatSmile(), legendarySmile()];
const muteButton = document.getElementById('muteButton');
const fullscreenButton = document.getElementById('fullscreenButton');
window.isMuted = false;
window.isFullscreen = false;

/** Start the game by hiding the main menu and showing the game canvas
 * This function initializes the game with level 1 and sets up all necessary sounds.
 */
function startGame() {
    main.style.display = "none";
    canvasWrapper.style.display = "flex";
    init(createLevel1());
    window.ALL_SOUNDS = [window.MAIN_SOUND, window.COIN_SOUND, window.BOTTLE_BREAK_SOUND, window.SHOOTING_SOUND, window.COLLECT_BOTTLE_SOUND, window.COLLECT_COIN_SOUND, window.ENDBOSS_ATTACK_SOUND, window.ENDBOSS_HURT_SOUND, window.ENDBOSS_WALK_SOUND, window.ENDBOSS_ALERT_SOUND, window.ENDBOSS_SONIC_BOMB_SOUND, window.ENDBOSS_FIGHT_SOUND, window.ENDBOSS_DEATH_SOUND, window.ENDBOSS_SLIDE_SOUND, window.ENDBOSS_JUMP_SOUND, window.ENDBOSS_LITTLE_JUMP_SOUND, window.ENDBOSS_WIN_SOUND, window.CHICKS_HURT_SOUND, window.CHICKS_JUMP_SOUND, window.CHICKS_WALK_SOUND, window.CHICKS_GENERAL_SOUND, window.CHICKEN_DEATH_SOUND, window.CHICKEN_JUMP_SOUND, window.CHICKEN_WALK_SOUND, window.CHICKEN_GENERAL_SOUND, window.CHARACTER_DYING_SOUND, window.CHARACTER_JUMP_SOUND, window.CHARACTER_LITTLE_JUMP_SOUND, window.CHARACTER_HURT_SOUND, window.CHARACTER_SLEEPING_SOUND, window.CHARACTER_WALK_SOUND, window.CHARACTER_WIN_SOUND];
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
    const intervals = [window.world?.runInterval, window.world?.enemyTrackingInterval, window.world?.fightInterval, window.world?.endbossMoveInterval, window.world?.endbossTrackInterval, window.character?.controlInterval, window.character?.jumpLandingInterval, window.character?.idleCheckInterval, window.character?.idleLongCheckInterval, window.character?.dyingInterval, window.character?.fallThroughCanvasInterval, window.chicken?.moveLeftAnimateIntervalEnemy, window.chicken?.walkingInterval, window.chicks?.moveLeftAnimateIntervalEnemy, window.chicks?.walkingInterval, window.coins?.animationCoinInterval, window.endboss?.walkingInterval, window.endboss?.attackInterval, window.endboss?.hurtInterval, window.endboss?.endbossAlertInterval, window.endboss?.dyingInterval, window.endboss?.fallThroughCanvasInterval, window.enemy?.moveLeftAnimateIntervalEnemy, window.enemy?.moveInterval, window.runInterval, window.enemyTrackingInterval, window.fightInterval, window.endbossMoveInterval, window.world?.endbossTrackInterval, window.moveableObject?.gravityInterval, window.throwableObject?.throwBottleInterval, window.throwableObject?.throwCoinInterval, window.throwableObject?.splashInterval];

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
    ['world', 'level', 'camera_x', 'throwableObject', 'shootingPossible', 'runInterval', 'enemyTrackingInterval', 'fightInterval', 'endbossMoveInterval', 'endbossTrackInterval', 'endbossStarted', 'endbossStartDone', 'endbossDefeated', 'endbossAttackInterval', 'endbossAlert', 'lastThrowTime', 'gameOverScreens'].forEach(key => window[key] = null);
    window.objectThrowCooldown = 300;
    ['statusBarHealth', 'statusBarCoins', 'statusBarBottle', 'statusBarBoss'].forEach(key => window[key] = null);

    Object.assign(window, { currentRotation: 0, groundLevel: 400, directionLeft: false, offset: { top: 0, left: 0, right: 0, bottom: 0 }, isSplashing: false, splashInterval: null, isCoin: false });

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
            renderFinalScoreAndSmiley(coins, finalScore, finalSentence);
        }
    }
}

/** Set finalScore and finalSentence with the appropriate smiley */
function renderFinalScoreAndSmiley(coins, finalScoreElem, finalSentenceElem) {
    coins = Number(coins) || 0;
    if (finalScoreElem) finalScoreElem.textContent = `${coins}`;
    if (!finalSentenceElem) return;
    let index = Math.max(0, Math.min(coins, smilies.length - 1));
    finalSentenceElem.innerHTML = smilies[index] || '';
}

/** Check if the game is currently stopped */
function isGameStopped() {
    return window.world && window.world.gameStopped;
}

/** Set the muted state for a specific sound */
function setSoundMuted(sound) {
    if (sound) sound.muted = window.isMuted;
}

/** Toggle fullscreen mode for the game canvas */
function toggleFullscreen() {
    try {
        const canvasWrapper = document.getElementById('canvasWrapper');
        const canvas = document.getElementById('gameCanvas');
        
        if (!canvasWrapper) return;
        
        if (!canvasWrapper.classList.contains('fullscreen-mode')) enterCanvasFullscreen(canvasWrapper, canvas);
        else exitCanvasFullscreen(canvasWrapper, canvas);
        
        updateFullscreenButton();
    } catch (error) {
        console.warn('Fullscreen operation failed:', error);
    }
}

/** Enter canvas fullscreen mode */
function enterCanvasFullscreen(canvasWrapper, canvas) {
    // Store original canvas dimensions
    if (canvas) {
        canvas.dataset.originalWidth = canvas.width;
        canvas.dataset.originalHeight = canvas.height;
    }
    
    canvasWrapper.classList.add('fullscreen-mode');
    
    // Show controller buttons on touch devices in fullscreen
    if (isTouchDevice()) {
        const moveButtons = document.querySelector('.move-buttons');
        const actionButtons = document.querySelector('.action-buttons');
        
        [moveButtons, actionButtons].forEach(btn => {
            if (btn) {
                btn.style.display = 'flex !important';
                btn.style.position = 'fixed';
                btn.style.zIndex = '99999';
                btn.style.visibility = 'visible';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
        });
    }
    
    if (canvas) resizeCanvasForFullscreen(canvas);

    document.body.style.overflow = 'hidden';
}

/** Exit canvas fullscreen mode */
function exitCanvasFullscreen(canvasWrapper, canvas) {
    canvasWrapper.classList.remove('fullscreen-mode');
    
    const moveButtons = document.querySelector('.move-buttons');
    const actionButtons = document.querySelector('.action-buttons');
    
    [moveButtons, actionButtons].forEach(btn => {
        if (btn) {
            btn.style.position = '';
            btn.style.zIndex = '';
            btn.style.display = '';
            btn.style.visibility = '';
            btn.style.opacity = '';
            btn.style.pointerEvents = '';
        }
    });
    
    if (canvas) {
        if (canvas.dataset.originalWidth && canvas.dataset.originalHeight) {
            canvas.width = parseInt(canvas.dataset.originalWidth);
            canvas.height = parseInt(canvas.dataset.originalHeight);
        } else {
            canvas.width = 720;
            canvas.height = 480;
        }
        
        canvas.style.width = '';
        canvas.style.height = '';
        canvas.style.maxWidth = '';
        canvas.style.maxHeight = '';
        canvas.style.objectFit = '';
        canvas.style.transform = '';     
        canvas.offsetHeight; 
    }
    
    document.body.style.overflow = '';
    
    if (isMobileDevice()) {
        setTimeout(() => {
            window.scrollTo(0, 0);
            if (canvas) {
                canvas.style.display = 'block';
            }
        }, 100);
    }
}

/** Resize canvas for fullscreen while maintaining aspect ratio */
function resizeCanvasForFullscreen(canvas) {
    const originalWidth = parseInt(canvas.dataset.originalWidth || 720);
    const originalHeight = parseInt(canvas.dataset.originalHeight || 480);
    const aspectRatio = originalWidth / originalHeight;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenAspectRatio = screenWidth / screenHeight;
    
    let newWidth, newHeight;
    
    if (screenAspectRatio > aspectRatio) {
        newHeight = screenHeight;
        newWidth = screenHeight * aspectRatio;
    } else {
        newWidth = screenWidth;
        newHeight = screenWidth / aspectRatio;
    }

    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
}

/** Update fullscreen button appearance based on current state */
function updateFullscreenButton() {
    if (fullscreenButton) {
        const canvasWrapper = document.getElementById('canvasWrapper');
        const isFullscreen = canvasWrapper && canvasWrapper.classList.contains('fullscreen-mode');
        const icon = fullscreenButton.querySelector('.fullscreen-icon');
        
        if (isFullscreen) {
            fullscreenButton.classList.add('fullscreen-active');
            if (icon) icon.textContent = '⛶';
            fullscreenButton.title = 'Fullscreen verlassen';
        } else {
            fullscreenButton.classList.remove('fullscreen-active');
            if (icon) icon.textContent = '⛶';
            fullscreenButton.title = 'Fullscreen aktivieren';
        }
        window.isFullscreen = isFullscreen;
    }
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

/** Set the muted state for a specific sound */
function setSoundMuted(sound) {
    if (sound) sound.muted = window.isMuted;
}

/** Safe play wrapper: startet audio.play() und fängt AbortError ab */
function safePlay(sound) {
    if (!sound) return;
    try {
        if (sound.paused) {
            const p = sound.play();
            if (p && typeof p.then === 'function') {
                p.catch(e => {
                    if (e && e.name !== 'AbortError') console.error(e);
                });
            }
        }
    } catch (e) {
        if (e && e.name !== 'AbortError') console.error(e);
    }
}

/** Safe pause wrapper: pauses audio robust */
function safePause(sound) {
    if (!sound) return;
    try {
        sound.pause();
    } catch (e) {
        console.error(e);
    }
}

/** Expose helpers globally so Module-Klassen sie nutzen können */
window.safePlay = safePlay;
window.safePause = safePause;

/** Add event listeners for mute functionality */
muteButton.addEventListener('click', toggleMute);

/** Add event listeners for fullscreen functionality */
if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
}

/** Listen for window resize to adjust canvas in fullscreen mode */
window.addEventListener('resize', () => {
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvas = document.getElementById('gameCanvas');
    
    if (canvasWrapper && canvas && canvasWrapper.classList.contains('fullscreen-mode')) {
        resizeCanvasForFullscreen(canvas);
    }
});

/** Listen for ESC key to exit fullscreen */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const canvasWrapper = document.getElementById('canvasWrapper');
        if (canvasWrapper && canvasWrapper.classList.contains('fullscreen-mode')) {
            exitCanvasFullscreen(canvasWrapper, document.getElementById('gameCanvas'));
            updateFullscreenButton();
        }
    }
});



/** Initialize fullscreen button state */
updateFullscreenButton();



/** Check if device is mobile */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/** Check if device is primarily a touch device */
function isTouchDevice() {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isPixel = /Pixel/i.test(ua);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    
    // Enhanced iPad Pro detection
    const isPadPro = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                     (ua.includes('Macintosh') && navigator.maxTouchPoints > 0) ||
                     (navigator.platform === 'MacIntel' && 'ontouchend' in document);
    
    const isTablet = /iPad|Android.*tablet|tablet/i.test(ua) || isPadPro;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileSize = window.innerWidth <= 768 || (isAndroid && window.innerWidth <= 1024);
    const tabletSize = hasTouch && window.innerWidth >= 768 && window.innerWidth <= 1366;
    
    return isMobile || isPixel || isTablet || (hasTouch && isMobileSize) || tabletSize;
}

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
