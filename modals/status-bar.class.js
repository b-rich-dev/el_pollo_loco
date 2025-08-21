class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_COINS = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    IMAGES_BOTTLE = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    percentage = 100;
    type = 'health';


    constructor(type = 'health', x = 20, y = 0, percentage = 100) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = percentage;
        this.loadImages(this.getImages());
        this.setPercentage(percentage);
    }

    getImages() {
        if (this.type === 'health') return this.IMAGES_HEALTH;
        if (this.type === 'coins') return this.IMAGES_COINS;
        if (this.type === 'bottle') return this.IMAGES_BOTTLE;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let images = this.getImages();
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}