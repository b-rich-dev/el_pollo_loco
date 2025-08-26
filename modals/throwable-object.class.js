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
    currentRotation = 0;
    groundLevel = 400; // Passe ggf. an die tatsächliche Bodenhöhe an

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 80;
        this.throw();
    }

    throw(){
        this.speedY = 18;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 12;
            this.animateRotation();
            if (this.y >= this.groundLevel) {
                clearInterval(this.throwInterval);
                // Optional: Splash-Animation hier starten
            }
        }, 52); // Kürzeres Intervall für flüssigere Animation 40
    }

    animateRotation() {
        this.currentRotation = (this.currentRotation + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentRotation]];
    }
}
