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
    groundLevel = 400; // Passe ggf. an die tatsächliche Bodenhöhe an
    directionLeft = false; // Neue Eigenschaft für Richtung
    offset = { top: 0, left: 0, right: 0, bottom: 0 }; // Standard-Offset

    constructor(x, y, world, directionLeft = false) {
        // Entscheide, ob Flasche oder Coin geworfen wird anhand eines Flags oder Typs
        // Beispiel: Wenn world.statusBarBottle.bottles > 0, dann Flasche, sonst Coin
        if (world && world.statusBarBottle && world.statusBarBottle.bottles > 0) {
            super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
            this.loadImages(this.IMAGES_BOTTLE_ROTATION);
            this.offset = { top: 10, left: 10, right: 10, bottom: 10 }; // Beispiel-Offset für Bottle
            this.width = 50;
            this.height = 80;
        } else {
            super().loadImage(this.IMAGES_COIN_ROTATION[0]);
            this.loadImages(this.IMAGES_COIN_ROTATION);
            this.offset = { top: 30, left: 30, right: 30, bottom: 30 }; // Beispiel-Offset für Coin
            this.width = 90;
            this.height = 90;
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
    }

    throwBottle(){
        this.speedY = 18;
        this.applyGravity();
        this.throwBottleInterval = setInterval(() => {
            if (this.directionLeft) {
                this.x -= 12; // Nach links werfen
            } else {
                this.x += 12; // Nach rechts werfen
            }
            this.animateRotationBottle();
            if (this.y >= this.groundLevel) {
                clearInterval(this.throwBottleInterval);
                // Optional: Splash-Animation hier starten
            }
        }, 52);
    }

    throwCoin(){
        this.speedY = 8;
        this.applyGravity();
        this.throwCoinInterval = setInterval(() => {
            if (this.directionLeft) {
                this.x -= 30; // Nach links werfen
            } else {
                this.x += 30; // Nach rechts werfen
            }
            this.animateRotationCoin();
            if (this.world && this.world.character && (
                (!this.directionLeft && this.x >= this.world.character.x + 1000) ||
                (this.directionLeft && this.x <= this.world.character.x - 1000)
            )) {
                clearInterval(this.throwCoinInterval);
            }
        }, 52);
    }

    animateRotationBottle() {
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentRotation]];
    }

    animateRotationCoin() {
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_COIN_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_COIN_ROTATION[this.currentRotation]];
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
