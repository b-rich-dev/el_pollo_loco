/** StatusBar Class
 * Represents a status bar in the game, such as health, coins, or bottles.
 * Inherits from DrawableObject to utilize image loading and drawing capabilities.
 */
class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_BOSS_STATUSBAR = [
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];
    IMAGES_COINS = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    ];
    IMAGES_BOTTLE = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png'
    ];
    IMAGE_SALSA_BOTTLE = 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
    salsaBottleImg = null;
    IMAGE_COIN_PEPERONI = 'assets/img/8_coin/pepper_in_coin.png';
    coinPeperoniImg = null;
    x = 20;
    y = 20;
    width = 200;
    height = 60;
    percentage = 100;
    type = 'health';
    bottles = 0;
    coins = 0;
    COLLECT_BOTTLE_SOUND = new Audio('assets/audio/collect/collect_bottle.mp3');
    COLLECT_COIN_SOUND = new Audio('assets/audio/collect/collect_coin.mp3');


    /** Constructor to initialize the status bar
     * @param {string} type - The type of status bar ('health', 'coins', 'bottle', 'boss')
     * @param {number} x - The x position of the status bar
     * @param {number} y - The y position of the status bar
     * @param {number} percentage - The initial percentage of the status bar
     */
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
        this.salsaBottleImg = new Image();
        this.salsaBottleImg.src = this.IMAGE_SALSA_BOTTLE;
        this.coinPeperoniImg = new Image();
        this.coinPeperoniImg.src = this.IMAGE_COIN_PEPERONI;
        window.COLLECT_BOTTLE_SOUND = this.COLLECT_BOTTLE_SOUND;
        window.COLLECT_COIN_SOUND = this.COLLECT_COIN_SOUND;
        setSoundMuted(this.COLLECT_BOTTLE_SOUND);
        setSoundMuted(this.COLLECT_COIN_SOUND);
    }

    /** Get the appropriate image array based on the status bar type */
    getImages() {
        if (this.type === 'health') return this.IMAGES_HEALTH;
        if (this.type === 'coins') return this.IMAGES_COINS;
        if (this.type === 'bottle') return this.IMAGES_BOTTLE;
        if (this.type === 'boss') return this.IMAGES_BOSS_STATUSBAR;
    }

    /** Set the current percentage and update the displayed image accordingly
    * @param {number} percentage - The new percentage value (0-100)
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let images = this.getImages();
        let path = images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** Determine the correct image index based on the current percentage */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0;
    }

    /** Collect an item and update the corresponding count and play sound
    * @param {string} type - The type of item collected ('bottle' or 'coin')
    */
    collectItem(type) {
        if (type === 'bottle') {
            if (!window.isMuted) this.COLLECT_BOTTLE_SOUND.play();
            this.bottles += 1;
        } else if (type === 'coin') {
            if (!window.isMuted) this.COLLECT_COIN_SOUND.play();
            this.coins += 1;
        }
    }

    /** Draw the status bar and collected items on the canvas
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawMiniBottles(ctx);
        this.drawCoinPeperonis(ctx);
    }

    /** Draw mini bottles representing collected bottles
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    drawMiniBottles(ctx) {
        let itemSize = 36;
        let spacing = -20;
        let startX = this.x + 20;
        let startY = this.y + 18;

        for (let i = 0; i < this.bottles; i++) {
            ctx.drawImage(this.salsaBottleImg, startX + i * (itemSize + spacing), startY, itemSize, itemSize);
        }
    }

    /** Draw mini coins representing collected coins
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    drawCoinPeperonis(ctx) {
        let itemSize = 18;
        let spacing = -3;
        let startX = this.x + 40;
        let startY = this.y + 32;

        for (let i = 0; i < this.coins; i++) {
            ctx.drawImage(this.coinPeperoniImg, startX + (this.bottles + i) * (itemSize + spacing), startY, itemSize, itemSize);
        }
    }
}
