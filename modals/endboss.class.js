class Endboss extends MoveableObject {

    width = 280; //280
    height = 160; //360
    y = 194; // 94
    x = 1060; // 2960
    speed = 5; //2
    offset = {
        top: 64,
        left: 20,
        right: 36,
        bottom: 10
    };
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    isDeadChicken = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        // this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    attack() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    hurt() {
        this.playAnimation(this.IMAGES_HURT);
    }

    die(callback) {
        this.isDeadChicken = true;
        let frame = 0;
        const deadImages = this.IMAGES_DEAD;
        const interval = setInterval(() => {
            this.img = this.imageCache[deadImages[frame]];
            frame++;
            if (frame >= deadImages.length) {
                clearInterval(interval);
                // Zeige das letzte Dead-Bild für 2 Sekunden
                this.img = this.imageCache[deadImages[deadImages.length - 1]];
                setTimeout(() => {
                    if (callback) callback();
                }, 2000);
            }
        }, 400); // Zeige jedes Bild für 400ms (insgesamt ca. 1,2s Animation)
    }

    walking(){
        this.playAnimation(this.IMAGES_WALKING);
    }

    alert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

}
