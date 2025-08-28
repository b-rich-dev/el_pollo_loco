class Chicks extends MoveableObject {
    y = 340;
    width = 68;
    height = 86;
    offset = {
        top: 14,
        left: 8,
        right: 6,
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
        this.speed = 0.18 + Math.random() * 0.28;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    moveLeft() {
        if (!this.isDeadChicken) {
            this.otherDirection = false;
            super.moveLeft();
        }
    }

    moveRight() {
        if (!this.isDeadChicken) {
            this.otherDirection = true;
            super.moveRight();
        }
    }

    die(callback) {
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDeadChicken = true;
        setTimeout(() => {
            if (callback) callback();
        }, 1000); // 1 Sekunde
    }
}