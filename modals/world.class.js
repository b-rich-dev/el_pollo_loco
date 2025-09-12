import { checkEnemyCollisions, checkBottleCollisions, checkCoinCollisions, checkThrowableObjectEnemyCollisions } from './collision.helper.js';
import { trackEndbossToCharacter, enemyTrackingOfCharacter } from './enemy.tracking.helper.js';

class World {
    character = new Character();
    level = typeof level1 !== 'undefined' ? level1 : null; // Fallback
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
    objectThrowCooldown = 600; // Millisekunden Pause zwischen Würfen
    enemyTrackingInterval = null;
    shootingPossible = true;
    gameOverScreens;
    gameOver = false;
    MAIN_SOUND = new Audio('assets/audio/main/main_mexican_music.m4a');
    gameStopped = false;

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
        // this.initEnemies();

        this.draw();
        this.run();
        this.startEnemyTrackingInterval();
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (this.endboss) {
            this.endboss.setWorld(this); // <--- Welt-Referenz für Endboss setzen!
        }
        
    }

    setWorld() {
        this.character.world = this;
    }

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

    startEnemyTrackingInterval() {
        this.enemyTrackingInterval = setInterval(() => {
            enemyTrackingOfCharacter(this);
            // trackEndbossToCharacter(this);
        }, 1000);
    }

    startFightInterval() {
        if (this.endbossStartDone) {
            if (this.fightInterval) {
                clearInterval(this.fightInterval);
            }
            this.fightInterval = setInterval(() => {
                if (this.endboss && !this.endboss.isDeadChicken) {
                    this.endboss.attack();
                }
            }, 2000); // Endboss greift alle 2 Sekunden an
        }
    }

    removeDeadEnemies() {
        // Entferne alle Gegner, die isDeadChicken=true UND deren Callback bereits aufgerufen wurden
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDeadChicken || (enemy.isDeadChicken && !enemy._remove));
    }

    checkCollisions() {
        checkEnemyCollisions(this);
        checkBottleCollisions(this);
        checkCoinCollisions(this);
        checkThrowableObjectEnemyCollisions(this);
    }

    checkThrowableObjects() {
        if (this.shootingPossible) {
            const now = Date.now();
            if ((this.keyboard.D || this.keyboard.NUMPAD_ZERO) &&
                this.statusBarBottle.bottles > 0 &&
                now - this.lastThrowTime > this.objectThrowCooldown) {
                let bottle = new ThrowableObject(
                    this.character.x + 100,
                    this.character.y + 120,
                    this,
                    this.character.otherDirection // Blickrichtung übergeben
                );
                this.throwableObject.push(bottle);
                this.statusBarBottle.bottles--;
                this.statusBarBottle.setPercentage(this.statusBarBottle.bottles);
                this.lastThrowTime = now;
            }
            if ((this.keyboard.D || this.keyboard.NUMPAD_ZERO) &&
                this.statusBarBottle.bottles === 0 &&
                this.statusBarCoins.coins > 0 &&
                now - this.lastThrowTime > this.objectThrowCooldown) {
                let coin = new ThrowableObject(
                    this.character.x + 100,
                    this.character.y + 120,
                    this,
                    this.character.otherDirection // Blickrichtung übergeben
                );
                this.throwableObject.push(coin);
                this.statusBarCoins.coins--;
                this.statusBarCoins.setPercentage(this.statusBarCoins.coins);
                this.lastThrowTime = now;
            }
        }
    }

    draw() {
        if (this.character.isCharacterDead) {
            showLoseScreen();
            if (this.endbossStartDone) {
                if (!window.isMuted) window.ENDBOSS_WIN_SOUND.play();
            }
            this.stopGame();
            return;
        }

        if (this.endboss && this.endboss.isDeadChicken) {
            this.gameOver = true;
            setWinInfo();
            showWinScreen();
            this.stopGame();

            if (!window.isMuted) window.CHARACTER_WIN_SOUND.play();
            
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        // Nur weiterzeichnen, wenn das Spiel nicht gestoppt ist!
        if (!this.gameStopped) {
            requestAnimationFrame(() => this.draw());
        }
    }

    stopGame() {
        this.gameStopped = true;
        stopAllIntervals()
        stopAllSounds();
    }

    stopAllSounds() {
        Object.values(window).forEach(sound => {
            if (sound instanceof HTMLAudioElement) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawBoundingBox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    startEndbossBattle() {
        if (!this.endbossStarted && this.character.x >= 2230 && this.endboss) {
            this.endbossStarted = true;
            this.endbossStartDone = true;
            this.endbossMoveInterval = setInterval(() => {
                this.shootingPossible = false;
                if (this.character.x > 2240) {
                    this.endboss.speed = 16;
                    this.endboss.walking();
                    this.endboss.moveLeft();
                }
                if (this.endboss.x <= 2496) {
                    clearInterval(this.endbossMoveInterval);
                    this.MAIN_SOUND.pause();
                    this.endboss.alert(this, () => trackEndbossToCharacter(this));
                }
            }, 1000 / 6);
        }
    }
}

window.World = World;