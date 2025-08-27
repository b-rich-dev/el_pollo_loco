class Coins extends MoveableObject {
    y = 200;
    height = 90;
    width = 90;
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };
    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);

        this.x = 30 + Math.random() * 2260;
        this.y = 30 + Math.random() * 350;
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}