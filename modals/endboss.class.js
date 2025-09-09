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
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png'
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
    world;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2960;
        this.y = 94;
        this.otherDirection = false;
        this.isDeadChicken = false;
        this.endbossEnergy = 100;
        this.applyGravity();
        // this.animate();
    }

    setWorld(world) {
        this.world = world;
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    attack(callback) {
        // Stoppt alle anderen Bewegungsintervalle des Endboss, damit die Animation nicht gestört wird.
        // if (this.moveInterval) {
        //     clearInterval(this.moveInterval);
        //     this.moveInterval = null;
        // }
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
        }

        // Berechne die Distanz zum Charakter
        let targetX = this.world && this.world.character ? this.world.character.x : this.x;
        let totalDist = Math.abs(targetX - this.x);
        // Mindestens 40px, ggf. mehr
        if (totalDist < 40) totalDist = 40;

        const attackImages = this.IMAGES_ATTACK;
        const frames = attackImages.length;
        const intervalTime = 1000 / 6; // 6 FPS

        // Geschwindigkeit so berechnen, dass die Distanz in der Animationsdauer überwunden wird
        this.speed = totalDist / frames;

        let frame = 0;

        this.attackInterval = setInterval(() => {
            this.img = this.imageCache[attackImages[frame]];

            if (this.world && this.world.character) {
                targetX = this.world.character.x;
                const dist = targetX - this.x;
                // Verschiebt die x-Position um die berechnete Geschwindigkeit in Richtung des Charakters.
                this.x += Math.sign(dist) * this.speed;
                this.otherDirection = dist > 0;
            }

            if (frame === 5 && typeof this.littleJump === 'function') {
                this.littleJump();
            }

            frame++;
            if (frame >= attackImages.length) {
                clearInterval(this.attackInterval);
                this.attackInterval = null;
                this.speed = 5; // Geschwindigkeit zurücksetzen auf Standardwert.
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }, intervalTime);
    }

    littleJump() {
        this.speedY = 16;
    }

    hurt() {
        let frame = 0;
        let repeat = 0;
        const maxRepeats = 3;
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
        }
        this.hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[frame]];
            frame++;
            if (frame >= this.IMAGES_HURT.length) {
                frame = 0;
                repeat++;
                if (repeat >= maxRepeats) {
                    clearInterval(this.hurtInterval);
                    this.hurtInterval = null;
                }
            }
        }, 100);
    }

    die(callback) {
        if (this.endbossAlertInterval || this.world.endbossTrackInterval) {
            clearInterval(this.endbossAlertInterval);
            this.world.endbossAttackInterval = null;
            clearInterval(this.world.endbossTrackInterval);
        }

        let frame = 0;
        const deadImages = this.IMAGES_DEAD;
        
        const interval = this.dyingInterval = setInterval(() => {
            this.img = this.imageCache[deadImages[frame]];
            frame++;
            if (frame >= deadImages.length) {
                clearInterval(interval);
                // Zeige das letzte Dead-Bild für 2 Sekunden
                this.img = this.imageCache[deadImages[deadImages.length - 1]];
                // Endboss soll jetzt durch das Canvas fallen
                this.fallThroughCanvasInterval = setInterval(() => {
                    this.y += 12; // Geschwindigkeit des Fallens
                    if (this.y > 1000) { // Canvas verlassen (anpassen je nach Canvas-Höhe)
                        clearInterval(this.fallThroughCanvasInterval);
                        this.isDeadChicken = true;
                        if (callback) callback();
                    }
                }, 60);
            }
        }, 600); // Zeige jedes Bild für 600ms
    }

    walking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    enemyRandomJump() {
        if (!(this.y < 94)) {
            if (!this.isDeadChicken) {
                if (Math.random() < 0.005) { // 50% Wahrscheinlichkeit pro Aufruf
                    this.speedY = +12;
                }
            }
        }
    }

    alert(world, callback, intervalTime = 800) {
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
                this.speed = 5; // Geschwindigkeit nach Alert wieder setzen!
                if (typeof callback === 'function') {
                    callback(); // trackEndbossToCharacter wird jetzt gestartet!
                }
            }
        }, intervalTime);
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

    // reset() {
    //     this.isDeadChicken = false;
    //     this.isDead = false;
    //     this.otherDirection = false;
    //     this.endbossEnergy = 100;
    //     this.x = 2960;
    //     this.y = 94;
    //     // ggf. weitere Eigenschaften zurücksetzen
    // }
}
