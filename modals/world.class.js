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
    throwableObject = [];
    endbossStarted = false;
    endbossMoveInterval = null;
    endboss = null;
    endbossDefeated = false;
    endbossAttackInterval = null;
    endbossAlert = false;
    lastThrowTime = 0;
    objectThrowCooldown = 200; // Millisekunden Pause zwischen Würfen

    constructor(canvas, ctx, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.setWorld();
        this.character.setWorld(this); // Welt-Referenz setzen und Animation starten
        this.draw();
        this.run();
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.startEndbossBattle();
            this.removeDeadEnemies(); // NEU: Tote Gegner entfernen
        }, 50);
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
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (obj.isColliding && obj.isColliding(enemy) && !enemy.isDeadChicken) {
                    if (typeof enemy.die === 'function') {
                        enemy.die(() => {
                            enemy._remove = true;
                        });
                    }
                    this.throwableObject.splice(objIndex, 1);
                }
            });
        });
    }

    checkThrowableObjects() {
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
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
            this.endbossStarted = true;
            // console.log('Endboss startet:', this.endboss.x);
            this.endbossMoveInterval = setInterval(() => {
                // console.log('Endboss aktuelle Position:', this.endboss.x);
                // console.log('Endboss aktuelle Position:', this.endboss.y);
                if (this.character.x > 2238) { //2496 endboss
                    this.endboss.speed = 12;
                    this.endboss.walking();
                    this.endboss.moveLeft();
                }
                if (this.endboss.x <= 2496) {
                    clearInterval(this.endbossMoveInterval);
                    this.endbossAlertInterval = setInterval(() => {
                        this.endboss.alert();
                    }, 1400);
                    // console.log('Endboss hat Zielposition erreicht.');
                }
            }, 1000 / 6);
        }
    }
}