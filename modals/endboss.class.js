class Endboss extends MoveableObject {

    width = 280; //280
    height = 360; //360
    y = 94; // 94
    x = 2960; // 2960
    speed = 2; //2
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
    endbossEnergy = 100;

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
        let frame = 0;
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
        }
        this.hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[frame]];
            frame++;
            if (frame >= this.IMAGES_HURT.length) {
                clearInterval(this.hurtInterval);
                this.hurtInterval = null;
            }
        }, 1000 / 6);
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

    walking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    alert(world) {
        this.speed = 0;
        let frame = 0;
        const alertImages = this.IMAGES_ALERT;
        if (this.endbossAlertInterval) {
            clearInterval(this.endbossAlertInterval);
        }
        this.endbossAlertInterval = setInterval(() => {
            this.img = this.imageCache[alertImages[frame]];
            frame++;
            if (frame >= alertImages.length) {
                clearInterval(this.endbossAlertInterval);
                this.endbossAlertInterval = null;
                this.slideBossStatusbar(world);
                world.shootingPossible = true;
            }
        }, 800);
    }

    slideBossStatusbar(world) {
        const targetX = 424;
        const slideSpeed = 10; // px pro Frame

        const statusBar = world.statusBarBoss;
        function slide() {
            if (statusBar.x > targetX) {
                statusBar.x -= slideSpeed;
                if (statusBar.x < targetX) statusBar.x = targetX;
                requestAnimationFrame(slide);
            } else if (statusBar.x < targetX) {
                statusBar.x += slideSpeed;
                if (statusBar.x > targetX) statusBar.x = targetX;
                requestAnimationFrame(slide);
            }
            // Stoppt automatisch, wenn targetX erreicht ist
        }
        slide();
    }

    enemyJump() {
        this.speedY = +10;
    }

    // this.setEnemyAttack(this.IMAGES_ATTACK, true, false);
    setEnemyAttack(images, attackStart = false, attackEnd = false) {
        if (attackStart) {
            // Erstes Bild beim Sprungstart
            this.img = this.imageCache[images[0]];
        } else if (attackEnd) {
            // Letztes Bild bei Landung
            this.img = this.imageCache[images[images.length - 1]];
        } else {
            // Höchster Punkt: Bild mit J-34.png (Index 3)
            if (Math.abs(this.speedY) < 1) {
                this.img = this.imageCache[images[5]];
            } else {
                // Dazwischen: Verteile Bilder nach Y-Position/Sprungphase
                let phase = Math.floor((this.speedY + 20) / 40 * (images.length - 2));
                phase = Math.max(1, Math.min(images.length - 2, phase));
                this.img = this.imageCache[images[phase]];
            }
        }
    }
}
