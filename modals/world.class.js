class World {
    character = new Character();
    level = level1;
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

    constructor(canvas, ctx, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
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
        }, 50);
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkBottleCollisions();
        this.checkCoinCollisions();
    }

    checkEnemyCollisions(){
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
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



    checkThrowableObjects() {
        if (this.keyboard.D || this.keyboard.NUMPAD_ZERO) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 120);
            this.throwableObject.push(bottle);
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