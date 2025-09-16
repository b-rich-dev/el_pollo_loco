import { checkEnemyCollisions, checkBottleCollisions, checkCoinCollisions, checkThrowableObjectEnemyCollisions } from './collision.helper.js';
import { trackEndbossToCharacter, enemyTrackingOfCharacter } from './enemy.tracking.helper.js';

/** Class representing the entire game world */
class World {
    character = new Character();
    level = typeof level1 !== 'undefined' ? level1 : null;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar('health', 90, 0, 100);
    statusBarCoins = new StatusBar('coins', 50, 30, 0);
    statusBarBottle = new StatusBar('bottle', 20, 60, 0);
    statusBarBoss = new StatusBar('boss', 720, 7, 100);
    throwableObject = [];
    endbossStarted = false;
    endbossStartDone = false;
    endbossMoveInterval = null;
    endboss = null;
    endbossDefeated = false;
    endbossAttackInterval = null;
    endbossAlert = false;
    lastThrowTime = 0;
    objectThrowCooldown = 600;
    enemyTrackingInterval = null;
    shootingPossible = true;
    gameOverScreens;
    gameOver = false;
    MAIN_SOUND = new Audio('assets/audio/main/main_mexican_music.m4a');
    gameStopped = false;

    /** Initialize the game world */
    constructor(canvas, ctx, keyboard, level) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.character.setWorld(this);
        window.world = this;
        window.MAIN_SOUND = this.MAIN_SOUND;
        setSoundMuted(this.MAIN_SOUND);

        this.draw();
        this.run();
        this.startEnemyTrackingInterval();
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (this.endboss) {
            this.endboss.setWorld(this);
        }
    }

    /** Set the world reference in the character */
    setWorld() {
        this.character.world = this;
    }

    /** Main game loop running at regular intervals */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.startEndbossBattle();
            this.removeDeadEnemies();
            if (!this.endbossStarted && this.MAIN_SOUND.paused) {
                if (!window.isMuted) this.MAIN_SOUND.play();
                this.MAIN_SOUND.volume = 0.1;
            }
        }, 50);
    }

    /** Start the interval to track enemies towards the character */
    startEnemyTrackingInterval() {
        this.enemyTrackingInterval = setInterval(() => {
            enemyTrackingOfCharacter(this);
        }, 1000);
    }

    /** Start the interval for the endboss to attack the character */
    startFightInterval() {
        if (this.endbossStartDone) {
            if (this.fightInterval) {
                clearInterval(this.fightInterval);
            }
            this.fightInterval = setInterval(() => {
                if (this.endboss && !this.endboss.isDeadChicken) this.endboss.attack();
            }, 2000);
        }
    }

    /** Remove dead enemies from the level's enemy array */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadChicken || (enemy.isDeadChicken && !enemy._remove));
    }

    /** Check for collisions between character, enemies, and throwable objects */
    checkCollisions() {
        checkEnemyCollisions(this);
        checkBottleCollisions(this);
        checkCoinCollisions(this);
        checkThrowableObjectEnemyCollisions(this);
    }

    /** Check if the player can throw a bottle or coin */
    checkThrowableObjects() {
        if (!this.shootingPossible) return;
        const now = Date.now();
        this.trySpawnThrowable(now);
    }

    /** Attempt to spawn a throwable object if conditions are met
    * @param {number} now - The current time in milliseconds
    */
    trySpawnThrowable(now) {
        const pressed = this.keyboard.D || this.keyboard.NUMPAD_ZERO;
        if (!pressed || now - this.lastThrowTime <= this.objectThrowCooldown) return;

        if (this.statusBarBottle.bottles > 0) {
            this.spawnThrowable(true, now);
        } else if (this.statusBarCoins.coins > 0) {
            this.spawnThrowable(false, now);
        }
    }

    /** Spawn a throwable object (bottle or coin)
    * @param {boolean} isBottle - True if spawning a bottle, false for a coin
    * @param {number} now - The current time in milliseconds
    */
    spawnThrowable(isBottle, now) {
        let obj = new ThrowableObject(
            this.character.x + 100,
            this.character.y + 120,
            this,
            this.character.otherDirection
        );
        this.throwableObject.push(obj);

        if (isBottle) this.minusBottleFromStatusBar(this.statusBarBottle);
        else this.minusCoinFromStatusBar(this.statusBarCoins);

        this.lastThrowTime = now;
    }

    /** Decrease bottle count in status bar */
    minusBottleFromStatusBar(statusBarBottle) {
        statusBarBottle.bottles--;
        statusBarBottle.setPercentage(statusBarBottle.bottles);
    }

    /** Decrease coin count in status bar */
    minusCoinFromStatusBar(statusBarCoins) {
        statusBarCoins.coins--;
        statusBarCoins.setPercentage(statusBarCoins.coins);
    }

    /** Main draw loop for rendering the game */
    draw() {
        if (this.handleEndConditions()) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const camXRounded = Math.round(this.camera_x);
        const prevSmoothing = this.ctx.imageSmoothingEnabled;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.translate(camXRounded, 0);
        this.renderBackgrounfdAndClouds();
        this.ctx.translate(-camXRounded, 0);
        this.ctx.imageSmoothingEnabled = prevSmoothing;

        this.renderFixedUI();
        this.ctx.translate(this.camera_x, 0);

        this.renderSceneObjects();
        this.ctx.translate(-this.camera_x, 0);

        if (!this.gameStopped) requestAnimationFrame(() => this.draw());
    }

    /** Render background and clouds */
    renderBackgrounfdAndClouds() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /** Check for end game conditions (win/lose) */
    handleEndConditions() {
        if (this.checkLoseCondition()) return true;
        if (this.checkWinCondition()) return true;
        return false;
    }

    /** Check if the player has lost the game */
    checkLoseCondition() {
        if (this.character.isCharacterDead) {
            showLoseScreen();
            if (this.endbossStartDone) {
                if (!window.isMuted) window.ENDBOSS_WIN_SOUND.play();
            }
            this.stopGame();
            return true;
        }
        return false;
    }

    /** Check if the player has won the game */
    checkWinCondition() {
        if (this.endboss && this.endboss.isDeadChicken) {
            this.gameOver = true;
            setWinInfo();
            showWinScreen();
            this.stopGame();

            if (!window.isMuted) window.CHARACTER_WIN_SOUND.play();
            return true;
        }
        return false;
    }

    /** Render fixed UI elements like status bars */
    renderFixedUI() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
    }

    /** Render character, enemies, and collectible objects */
    renderSceneObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /** Stop the game and all associated intervals and sounds */
    stopGame() {
        this.gameStopped = true;
        stopAllIntervals();
        stopAllSounds();
    }

    /** Stop all non-persistent sounds in the game */
    stopAllSounds() {
        Object.values(window).forEach(sound => {
            if (sound instanceof HTMLAudioElement) {
                if (sound.persistentOnGameOver) return;
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    /** Add multiple objects to the map for rendering
    * @param {Array} objects - Array of objects to add to the map
    */
    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    /** Add a single object to the map for rendering
    * @param {Object} mo - The object to add to the map
    */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);
        mo.drawBoundingBox(this.ctx);

        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /** Flip the image horizontally for right-facing characters
    * @param {Object} mo - The object to flip
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** Restore the image orientation after flipping
    * @param {Object} mo - The object to restore
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /** Start the endboss battle when the character reaches a certain position */
    startEndbossBattle() {
        if (!this.endbossStarted && this.character.x >= 2230 && this.endboss) {
            this.endbossStarted = true;
            this.endbossStartDone = true;
            this.endbossMoveInterval = setInterval(() => {
                this.shootingPossible = false;
                if (this.character.x > 2240) this.startWalking();
                if (this.endboss.x <= 2496) this.startAlert();
            }, 1000 / 6);
        }
    }

    /** Start walking towards the character */
    startWalking() {
        this.endboss.speed = 16;
        this.endboss.walking();
        this.endboss.moveLeft();
    }

    /** Start the endboss alert sequence */
    startAlert() {
        clearInterval(this.endbossMoveInterval);
        this.MAIN_SOUND.pause();
        this.endboss.alert(this, () => trackEndbossToCharacter(this));
    }
}

/** Set the main sound to be muted or unmuted based on global setting */
window.World = World;
