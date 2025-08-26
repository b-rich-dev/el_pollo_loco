class Chicken extends MoveableObject {
    y = 340;
    width = 68;
    height = 86;
    offset = {
        top: 6,
        left: 1,
        right: 2,
        bottom: 6
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 280 + Math.random() * 2000;
        this.speed = 0.18 + Math.random() * 0.28;
        this.animate();
    }

    animate() {
        setInterval(() => { this.moveLeft(); }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }
}