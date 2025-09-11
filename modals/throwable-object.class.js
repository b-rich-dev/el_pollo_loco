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
    directionLeft = false; // Neue Eigenschaft für Richtung
    offset = { top: 0, left: 0, right: 0, bottom: 0 }; // Standard-Offset
    isSplashing = false; // Splash-Status
    splashInterval = null;
    isCoin = false; // NEU: Unterscheidung Coin/Bottle
    COIN_SOUND = new Audio('assets/audio/coin/coin.wav');
    BOTTLE_BREAK_SOUND = new Audio('assets/audio/bottle/bottle_break.wav');
    SHOOTING_SOUND = new Audio('assets/audio/bottle/shoot.wav');

    constructor(x, y, world, directionLeft = false) {
        // Entscheide, ob Flasche oder Coin geworfen wird anhand eines Flags oder Typs
        // Beispiel: Wenn world.statusBarBottle.bottles > 0, dann Flasche, sonst Coin
        if (world && world.statusBarBottle && world.statusBarBottle.bottles > 0) {
            super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
            this.loadImages(this.IMAGES_BOTTLE_ROTATION);
            this.offset = { top: 10, left: 10, right: 10, bottom: 10 }; // Beispiel-Offset für Bottle
            this.width = 50;
            this.height = 80;
            this.isCoin = false;
        } else {
            super().loadImage(this.IMAGES_COIN_ROTATION[0]);
            this.loadImages(this.IMAGES_COIN_ROTATION);
            this.offset = { top: 30, left: 30, right: 30, bottom: 30 }; // Beispiel-Offset für Coin
            this.width = 90;
            this.height = 90;
            this.isCoin = true;
        }
        this.x = x;
        this.y = y;

        this.world = world;
        this.directionLeft = directionLeft; // Richtung speichern
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

    throwBottle() {
        if (!window.isMuted) this.SHOOTING_SOUND.play();
        this.speedY = 18;
        this.applyGravity();
        this.throwBottleInterval = setInterval(() => {
            if (this.isSplashing) return;
            if (this.directionLeft) {
                this.x -= 12; // Nach links werfen
            } else {
                this.x += 12; // Nach rechts werfen
            }
            this.animateRotationBottle();
            // Splash bei Boden
            if (this.y >= this.groundLevel) {
                clearInterval(this.throwBottleInterval);
                this.animateSplash();
            }
            // Splash bei Enemy
            const enemy = this.getCollidingEnemy();
            if (enemy) {
                clearInterval(this.throwBottleInterval);
                // Position exakt auf Enemy setzen
                this.x = enemy.x;
                this.y = enemy.y;
                this.speedY = 0; // Gravity deaktivieren
                this.acceleration = 0; // Falls vorhanden
                this.animateSplash();
                
            }
        }, 52);
    }

    getCollidingEnemy() {
        if (!this.world || !this.world.level || !this.world.level.enemies) return null;
        return this.world.level.enemies.find(enemy =>
            this.isColliding && this.isColliding(enemy) && !enemy.isDeadChicken
        );
    }

    throwCoin() {
        if (!window.isMuted) this.COIN_SOUND.play();
        this.speedY = 8;
        this.groundLevel = 800;
        this.applyGravity();
        this.throwCoinInterval = setInterval(() => {
            if (this.directionLeft) {
                this.x -= 30; // Nach links werfen
            } else {
                this.x += 30; // Nach rechts werfen
            }
            this.animateRotationCoin();
            // Kollisionsabfrage mit Enemy
            const enemy = this.getCollidingEnemy();
            if (this.world && this.world.character && (
                (!this.directionLeft && this.x >= this.world.character.x + 1000) ||
                (this.directionLeft && this.x <= this.world.character.x - 1000)
            )) {
                clearInterval(this.throwCoinInterval);
            }
        }, 52);
    }

    animateRotationBottle() {
        if (this.isSplashing) return;
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentRotation]];
    }

    animateRotationCoin() {
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_COIN_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_COIN_ROTATION[this.currentRotation]];
    }

    animateSplash() {
        if (!window.isMuted) this.BOTTLE_BREAK_SOUND.play();
        this.BOTTLE_BREAK_SOUND.volume = 0.6;
        if (this.isCoin) return;
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.currentRotation = 0;
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.splashInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[this.currentRotation]];
            this.currentRotation++;
            if (this.currentRotation >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(this.splashInterval);
                this.removeFromWorld();
            }
        }, 120); // Animation langsamer (120ms)
    }

    removeFromWorld() {
        if (this.world && Array.isArray(this.world.throwableObject)) {
            const idx = this.world.throwableObject.indexOf(this);
            if (idx > -1) {
                this.world.throwableObject.splice(idx, 1);
            }
        }
    }

    drawBoundingBox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            (this.x + this.width - this.offset.right) - (this.x + this.offset.left),
            (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top)
        );
        ctx.stroke();
    }
}
