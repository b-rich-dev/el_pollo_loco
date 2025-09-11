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

    constructor(canvas, ctx, keyboard, level) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.character.setWorld(this);
        window.world = this;
        window.MAIN_SOUND = this.MAIN_SOUND;

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
                this.MAIN_SOUND.play();
                this.MAIN_SOUND.volume = 0.1;
            }
        }, 50);
    }

    startEnemyTrackingInterval() {
        this.enemyTrackingInterval = setInterval(() => {
            this.enemyTrackingOfCharacter();
            // this.trackEndbossToCharacter();
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
        this.checkEnemyCollisions();
        this.checkBottleCollisions();
        this.checkCoinCollisions();
        this.checkThrowableObjectEnemyCollisions(); // NEU: Eigene Prüfung für geworfene Objekte
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isCollidingFromAbove(enemy)) {
                    // Charakter springt von oben: Enemy stirbt, Charakter bekommt KEINEN Schaden
                    if (typeof enemy.die === 'function' && !enemy.isDeadChicken) {
                        enemy.die(() => {
                            enemy._remove = true; // Markiere für Entfernung
                        });
                        this.character.littleJump(); // Charakter springt nach dem Töten hoch
                    }
                } else {
                    // Seitliche Kollision: Charakter bekommt Schaden, Enemy bleibt
                    if (!enemy.isDeadChicken && !this.character.isHurt()) { // NEU: Nur wenn nicht hurt
                        this.character.hit();
                        this.statusBarHealth.setPercentage(this.character.energy);
                        if (this.character.energy <= 0) {
                            this.character.die();
                        }
                    }
                }
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.statusBarBottle.collectItem('bottle');
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoins.collectItem('coin');
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkThrowableObjectEnemyCollisions() {
        this.throwableObject.forEach((obj, objIndex) => {
            let hit = false;
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (!hit && obj.isColliding && obj.isColliding(enemy) && !enemy.isDeadChicken) {
                    if (enemy instanceof Endboss) {
                        if (enemy.endbossEnergy > 0) {
                            // Prüfe ob Coin oder Bottle
                            if (obj.isCoin) {
                                enemy.endbossEnergy -= 10;
                            } else {
                                enemy.endbossEnergy -= 20;
                            }
                            if (enemy.endbossEnergy < 0) enemy.endbossEnergy = 0;
                            enemy.hurt();
                            this.statusBarBoss.setPercentage(enemy.endbossEnergy);
                            if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
                                obj.x = enemy.x;
                                obj.y = enemy.y;
                                obj.speedY = 0;
                                obj.acceleration = 0;
                                obj.animateSplash();
                                hit = true;
                                // Flasche entfernt sich selbst nach Splash!
                                // KEIN splice hier!
                            } else {
                                hit = true;
                                this.throwableObject.splice(objIndex, 1);
                            }
                            if (enemy.endbossEnergy === 0) {
                                enemy.die(() => {
                                    enemy._remove = true;
                                });
                            }
                        }
                    } else {
                        if (typeof enemy.die === 'function') {
                            enemy.die(() => {
                                enemy._remove = true;
                            });
                        }
                        if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
                            obj.x = enemy.x;
                            obj.y = enemy.y;
                            obj.speedY = 0;
                            obj.acceleration = 0;
                            obj.animateSplash();
                            hit = true;
                            // Flasche entfernt sich selbst nach Splash!
                            // KEIN splice hier!
                        } else {
                            hit = true;
                            this.throwableObject.splice(objIndex, 1);
                        }
                    }
                }
            });
        });
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
                window.ENDBOSS_WIN_SOUND.play();
            }
            // // Alle Gegner zurücksetzen
            // this.level.enemies.forEach(enemy => {
            //     if (typeof enemy.reset === 'function') {
            //         enemy.reset();
            //     }
            // });
            return;
        }

        if (this.endboss && this.endboss.isDeadChicken) {
            this.gameOver = true;
            setWinInfo();
            showWinScreen();
            window.CHARACTER_WIN_SOUND.play();
            // // Alle Gegner zurücksetzen
            // this.level.enemies.forEach(enemy => {
            //     if (typeof enemy.reset === 'function') {
            //         enemy.reset();
            //     }
            // });
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

        requestAnimationFrame(() => this.draw());
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
           
            // this.MAIN_SOUND.currentTime = 0; // Sound komplett stoppen und zurücksetzen
            this.endbossStarted = true;
            this.endbossStartDone = true;
            this.endbossMoveInterval = setInterval(() => {
                this.shootingPossible = false;
                if (this.character.x > 2240) {
                    // this.MAIN_SOUND.pause();
                    this.endboss.speed = 16;
                    this.endboss.walking();
                    this.endboss.moveLeft();
                }
                if (this.endboss.x <= 2496) {
                    clearInterval(this.endbossMoveInterval);
                    this.MAIN_SOUND.pause();
                    // Callback wird übergeben, trackEndbossToCharacter startet nach Alert!
                    this.endboss.alert(this, () => this.trackEndbossToCharacter());
                    // this.trackEndbossToCharacter(); // <--- Entfernen!
                }
            }, 1000 / 6);
        }
    }

    trackEndbossToCharacter() {
        if (this.endbossTrackInterval) {
            clearInterval(this.endbossTrackInterval);
        }
        let attackPlayed = false;
        this.endbossTrackInterval = setInterval(() => {
            if (!this.endboss || this.endboss.isDeadChicken) {
                clearInterval(this.endbossTrackInterval);
                return;
            }
            // Endboss nur bewegen, wenn keine Attack-Animation läuft!
            if (!this.endboss.attackInterval) {
                if (this.endboss.x > this.character.x + 240) {
                    this.endboss.otherDirection = false;
                    this.endboss.speed = 5;
                    this.endboss.moveLeft();
                    this.endboss.walking();
                    this.endboss.enemyRandomJump();
                    attackPlayed = false;
                } else if (this.endboss.x < this.character.x - 340) {
                    this.endboss.otherDirection = true;
                    this.endboss.speed = 5;
                    this.endboss.moveRight();
                    this.endboss.walking();
                    this.endboss.enemyRandomJump();
                    attackPlayed = false;
                } else {
                    // Endboss ist in der Nähe (<100px): Attack-Animation einmal abspielen
                    if (!attackPlayed) {
                        attackPlayed = true;
                        // Attacke mit Callback, falls vorhanden
                        if (typeof this.endboss.attack === 'function' && this.endboss.attack.length > 0) {
                            this.endboss.attack(() => {
                                if (this.endboss.x < this.character.x + 240 || this.endboss.x > this.character.x - 340) {
                                    clearInterval(this.endbossTrackInterval);
                                    // Hier: Schnellerer Alert-Intervall (z.B. 300ms statt 800ms)
                                    this.endboss.alert(this, () => this.trackEndbossToCharacter(), 300);
                                }
                            });
                        } else {
                            // Fallback: Wartezeit nach Attacke (z.B. 1 Sekunde)
                            this.endboss.attack();
                            setTimeout(() => {
                                if (this.endboss.x < this.character.x + 240 || this.endboss.x > this.character.x - 340) {
                                    clearInterval(this.endbossTrackInterval);
                                    // Hier: Schnellerer Alert-Intervall (z.B. 300ms statt 800ms)
                                    this.endboss.alert(this, () => this.trackEndbossToCharacter(), 300);
                                }
                            }, 2000);
                        }
                    }
                }
            }
        }, 100);
    }

    enemyTrackingOfCharacter() {
        const directionCooldown = 2000; // ms Wartezeit nach Überholen
        if (this.character.x) {
            this.level.enemies.forEach(enemy => {
                // Prüfe, ob es sich um den Endboss handelt
                if (enemy instanceof Endboss) {
                    return; // Endboss wird nicht verfolgt
                }

                // Initialisiere lastDirectionChange nur, wenn NICHT gesetzt
                if (typeof enemy.lastDirectionChange !== 'number') {
                    enemy.lastDirectionChange = 0;
                }
                const now = Date.now();

                let directionChanged = false;

                // Charakter ist links vom Gegner
                if (enemy.x > this.character.x && enemy.otherDirection !== false) {
                    if (enemy._pendingDirection !== 'left') {
                        enemy._pendingDirection = 'left';
                        enemy._pendingSince = now;
                    }
                    if (now - enemy._pendingSince > directionCooldown) {
                        enemy.otherDirection = false;
                        enemy.lastDirectionChange = now;
                        enemy._pendingDirection = null;
                        enemy._pendingSince = null;
                        directionChanged = true;
                    }
                }
                // Charakter ist rechts vom Gegner
                else if (enemy.x < this.character.x && enemy.otherDirection !== true) {
                    if (enemy._pendingDirection !== 'right') {
                        enemy._pendingDirection = 'right';
                        enemy._pendingSince = now;
                    }
                    if (now - enemy._pendingSince > directionCooldown) {
                        enemy.otherDirection = true;
                        enemy.lastDirectionChange = now;
                        enemy._pendingDirection = null;
                        enemy._pendingSince = null;
                        directionChanged = true;
                    }
                } else {
                    // Richtung stimmt, Warte-Flags zurücksetzen
                    enemy._pendingDirection = null;
                    enemy._pendingSince = null;
                }

                // Sicherung: Bewegungsintervall pro Gegner verwalten
                if (directionChanged) {
                    clearInterval(enemy.moveLeftAnimateIntervalEnemy);
                    if (enemy.moveInterval) {
                        clearInterval(enemy.moveInterval);
                        enemy.moveInterval = null;
                    }
                    enemy.speed = enemy.moveSpeed;
                    if (enemy.otherDirection === true) {
                        enemy.moveInterval = setInterval(() => {
                            enemy.moveRight();
                        }, 50);
                    } else {
                        enemy.moveInterval = setInterval(() => {
                            enemy.moveLeft();
                        }, 50);
                    }
                }
            });
        }
    }
}