class Coins extends MoveableObject {
    y = 200;
    height = 90;
    width = 90;
    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);

        this.x = 0 + Math.random() * 2260;
        this.y = 20 + Math.random() * 360;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}