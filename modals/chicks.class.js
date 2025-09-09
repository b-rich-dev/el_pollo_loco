class Chicks extends MoveableObject {
    y = 340;
    width = 68;
    height = 86;
    offset = {
        top: 14,
        left: 4,
        right: 3,
        bottom: 6
    };
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    isDeadChicken = false;

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.imageCache[this.IMAGE_DEAD] = new Image();
        this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
        this.x = 280 + Math.random() * 2000;
        this.y = 340;
        this.moveSpeed = 0.28 + Math.random() * 0.36; // Initiale Geschwindigkeit merken
        this.speed = this.moveSpeed;
        this.otherDirection = false;
        this.isDeadChicken = false;
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.moveLeftAnimateIntervalEnemy = setInterval(() => {
            this.moveLeft();
        }, 50);

        this.walkingInterval = setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    moveLeft() {
        if (!this.isDeadChicken) {
            this.otherDirection = false;
            this.speed = this.moveSpeed; // Immer die initiale Geschwindigkeit verwenden
            super.moveLeft();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    moveRight() {
        if (!this.isDeadChicken) {
            this.otherDirection = true;
            this.speed = this.moveSpeed; // Immer die initiale Geschwindigkeit verwenden
            super.moveRight();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    enemyRandomJump() {
        if (!this.isDeadChicken) {
            if (Math.random() < 0.01) { // 1% Wahrscheinlichkeit pro Aufruf
                this.speedY = +12;
            }
        }
    }

    die(callback) {
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDeadChicken = true;
        setTimeout(() => {
            if (callback) callback();
        }, 1000); // 1 Sekunde
    }

    // reset() {
    //     this.isDeadChicken = false;
    //     this.otherDirection = false;
    //     this.x = 280 + Math.random() * 2000;
    //     this.speed = this.moveSpeed;
    //     this.y = 340;
    //     // ggf. weitere Eigenschaften zurücksetzen
    // }
}