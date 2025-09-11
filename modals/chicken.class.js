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

    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    isDeadChicken = false;
    DEATH_SOUND = new Audio('assets/audio/dead/chicken_death.flac');
    GENERAL_SOUND = new Audio('assets/audio/chicken/general.wav');
    CHICKEN_JUMP_SOUND = new Audio('assets/audio/jump/chicken_jump.wav');
    CHICKEN_WALK_SOUND = new Audio('assets/audio/walk/chicken_walk.mp3');

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.imageCache[this.IMAGE_DEAD] = new Image();
        this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
        this.x = 280 + Math.random() * 2000;
        this.y = 340;
        this.moveSpeed = 0.20 + Math.random() * 0.30;
        this.speed = this.moveSpeed;
        this.otherDirection = false;
        this.isDeadChicken = false;
        this.animate();
        this.applyGravity();
        this.addGeneralSoundLoop();
        window.CHICKEN_DEATH_SOUND = this.DEATH_SOUND;
        window.CHICKEN_JUMP_SOUND = this.CHICKEN_JUMP_SOUND;
        window.CHICKEN_WALK_SOUND = this.CHICKEN_WALK_SOUND;
        window.CHICKEN_GENERAL_SOUND = this.GENERAL_SOUND;
        setSoundMuted(this.DEATH_SOUND);
        setSoundMuted(this.CHICKEN_JUMP_SOUND);
        setSoundMuted(this.CHICKEN_WALK_SOUND);
        setSoundMuted(this.GENERAL_SOUND); 
    }

    addGeneralSoundLoop() {
        const playGeneralSound = () => {
            if (!this.isDeadChicken && !window.isMuted) {
                this.GENERAL_SOUND.play();
                this.GENERAL_SOUND.volume = 0.3;
            }
            const nextDelay = 3000 + Math.random() * 9000; // 3-12 Sekunden
            setTimeout(playGeneralSound, nextDelay);
        };
        playGeneralSound();
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
            if (!window.isMuted) this.CHICKEN_WALK_SOUND.play();
            this.CHICKEN_WALK_SOUND.volume = 0.06;
            this.otherDirection = false;
            this.speed = this.moveSpeed;
            super.moveLeft();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    moveRight() {
        if (!this.isDeadChicken) {
            if (!window.isMuted) this.CHICKEN_WALK_SOUND.play();
            this.CHICKEN_WALK_SOUND.volume = 0.06;
            this.otherDirection = true;
            this.speed = this.moveSpeed;
            super.moveRight();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    enemyRandomJump() {
        if (!this.isDeadChicken) {
            if (Math.random() < 0.005) { // 0.5% Wahrscheinlichkeit pro Aufruf
                if (!window.isMuted) this.CHICKEN_JUMP_SOUND.play();
                this.CHICKEN_JUMP_SOUND.volume = 0.1;
                this.speedY = +8;
            }
        }
    }

    die(callback) {
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDeadChicken = true;
        if (!window.isMuted) this.DEATH_SOUND.play();
        this.DEATH_SOUND.volume = 0.6;
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