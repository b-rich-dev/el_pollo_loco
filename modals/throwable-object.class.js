/** Class representing a throwable object (bottle or coin) in the game. */
class ThrowableObject extends MoveableObject {
    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    IMAGES_COIN_ROTATION = [
        'assets/img/8_coin/rotation/coin_rotation_1.png',
        'assets/img/8_coin/rotation/coin_rotation_2.png',
        'assets/img/8_coin/rotation/coin_rotation_3.png',
        'assets/img/8_coin/rotation/coin_rotation_4.png'
    ];
    currentRotation = 0;
    groundLevel = 400;
    directionLeft = false;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };
    isSplashing = false;
    splashInterval = null;
    isCoin = false;
    COIN_SOUND = new Audio('assets/audio/coin/coin.mp3');
    BOTTLE_BREAK_SOUND = new Audio('assets/audio/bottle/bottle_break.mp3');
    SHOOTING_SOUND = new Audio('assets/audio/bottle/shoot.mp3');

    /** Create a throwable object (bottle or coin)
    * @param {number} x - Initial x position
    * @param {number} y - Initial y position
    * @param {Object} world - Reference to the game world
    * @param {boolean} directionLeft - Direction of throw (true for left, false for right)
    */
    constructor(x, y, world, directionLeft = false) {
        if (world && world.statusBarBottle && world.statusBarBottle.bottles > 0) {
            super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
            this.loadImages(this.IMAGES_BOTTLE_ROTATION);
            this.offset = { top: 10, left: 10, right: 10, bottom: 10 };
            this.width = 50;
            this.height = 80;
            this.isCoin = false;
        } else {
            super().loadImage(this.IMAGES_COIN_ROTATION[0]);
            this.loadImages(this.IMAGES_COIN_ROTATION);
            this.offset = { top: 30, left: 30, right: 30, bottom: 30 };
            this.width = 90;
            this.height = 90;
            this.isCoin = true;
        }
        this.x = x;
        this.y = y;

        this.world = world;
        this.directionLeft = directionLeft;
        if (world && world.statusBarBottle && world.statusBarBottle.bottles > 0) {
            this.throwBottle();
        } else {
            this.throwCoin();
        }

        window.COIN_SOUND = this.COIN_SOUND;
        window.BOTTLE_BREAK_SOUND = this.BOTTLE_BREAK_SOUND;
        window.SHOOTING_SOUND = this.SHOOTING_SOUND;
        setSoundMuted(this.COIN_SOUND);
        setSoundMuted(this.BOTTLE_BREAK_SOUND);
        setSoundMuted(this.SHOOTING_SOUND);
    }

    /** Throw the bottle with initial upward speed and apply gravity */
    throwBottle() {
        if (!window.isMuted) this.SHOOTING_SOUND.play();
        this.speedY = 18;
        if (this.world && this.world.character) this.resetIdleTimer();
        this.applyGravity();
        this.throwBottleInterval = setInterval(() => {
            if (this.isSplashing) return;
            this.updateBottleHorizontal();
            this.animateRotationBottle();
            if (this.y >= this.groundLevel) { this.stopBottleAndSplash(); return; }
            const enemy = this.getCollidingEnemy();
            if (enemy) this.handleBottleHitEnemy(enemy);
        }, 52);
    }

    /** Reset the character's idle timer to prevent idle animations */
    resetIdleTimer() {
        this.world.character.action = true;
        if (typeof this.world.character.resetIdleTimer === 'function') this.world.character.resetIdleTimer();
        else this.world.character.lastActionTime = Date.now();
    }

    /** Update bottle horizontal position based on throw direction */
    updateBottleHorizontal() {
        if (this.directionLeft) this.x -= 12;
        else this.x += 12;
    }

    /** Stop bottle movement and start splash animation */
    stopBottleAndSplash() {
        clearInterval(this.throwBottleInterval);
        this.animateSplash();
    }

    /** Handle bottle collision with an enemy
    * @param {Object} enemy - The enemy object that was hit
    */
    handleBottleHitEnemy(enemy) {
        clearInterval(this.throwBottleInterval);
        this.x = enemy.x;
        this.y = enemy.y;
        this.speedY = 0;
        this.acceleration = 0;
        this.animateSplash();
    }

    /** Get the first enemy that the bottle is colliding with */
    getCollidingEnemy() {
        if (!this.world || !this.world.level || !this.world.level.enemies) return null;
        return this.world.level.enemies.find(enemy =>
            this.isColliding && this.isColliding(enemy) && !enemy.isDeadChicken
        );
    }

    /** Throw a coin with initial upward speed and apply gravity */
    throwCoin() {
        if (!window.isMuted) this.COIN_SOUND.play();
        this.speedY = 8;
        if (this.world && this.world.character) this.resetIdleTimer();
        this.groundLevel = 800;
        this.applyGravity();
        this.throwCoinInterval = setInterval(() => this.updateCoinFrame(), 52);
    }

    /** Update coin horizontal position based on throw direction */
    updateCoinFrame() {
        if (this.directionLeft) this.x -= 30;
        else this.x += 30;

        this.animateRotationCoin();

        const enemy = this.getCollidingEnemy();
        if (this.world && this.world.character && (
            (!this.directionLeft && this.x >= this.world.character.x + 1000) ||
            (this.directionLeft && this.x <= this.world.character.x - 1000)
        )) {
            clearInterval(this.throwCoinInterval);
        }
    }

    /** Animate the rotation of the bottle during the throw */
    animateRotationBottle() {
        if (this.isSplashing) return;
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentRotation]];
    }

    /** Animate the rotation of the coin during the throw */
    animateRotationCoin() {
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_COIN_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_COIN_ROTATION[this.currentRotation]];
    }

    /** Animate the splash effect when the bottle hits the ground or an enemy */
    animateSplash() {
        this.BOTTLE_BREAK_SOUND.volume = 0.6;
        if (!window.isMuted) this.BOTTLE_BREAK_SOUND.play();
        if (this.isCoin) return;
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.currentRotation = 0;
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.splashInterval = setInterval(this.animateSplashFrame.bind(this), 120);
    }

    /** Update splash animation frame */
    animateSplashFrame() {
        const key = this.IMAGES_BOTTLE_SPLASH[this.currentRotation];
        if (this.imageCache && this.imageCache[key]) {
            this.img = this.imageCache[key];
        }
        this.currentRotation++;
        if (this.currentRotation >= this.IMAGES_BOTTLE_SPLASH.length) {
            clearInterval(this.splashInterval);
            this.removeFromWorld();
        }
    }

    /** Remove the throwable object from the game world */
    removeFromWorld() {
        if (this.world && Array.isArray(this.world.throwableObject)) {
            const idx = this.world.throwableObject.indexOf(this);
            if (idx > -1) {
                this.world.throwableObject.splice(idx, 1);
            }
        }
    }

    /** Draw the bounding box for debugging purposes
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    drawBoundingBox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'transparent';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            (this.x + this.width - this.offset.right) - (this.x + this.offset.left),
            (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top)
        );
        ctx.stroke();
    }
}
