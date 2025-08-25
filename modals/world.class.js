class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar('health', 20, 0, 100);
    statusBarCoins = new StatusBar('coins', 20, 50, 0);
    statusBarBottle = new StatusBar('bottle', 20, 100, 0);
    throwableObject = [];
    coins = [];

    constructor(canvas, ctx, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.createCoins(10); // z.B. 10 Coins erzeugen
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        // this.enemies.forEach(enemy => enemy.world = this);
        // this.coins.forEach(coin => coin.world = this);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }

    checkCollisions() {
            this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.D || this.keyboard.NUMPAD_ZERO) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
        }
    }

    createCoins(amount) {
        for (let i = 0; i < amount; i++) {
            this.coins.push(new Coins());
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
        this.addObjectsToMap(this.coins); // Coins-Array zeichnen

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
}