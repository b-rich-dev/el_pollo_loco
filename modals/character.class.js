class Character extends MoveableObject {
    y = 148;
    width = 180;
    height = 280;
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
        'assets/img/2_character_pepe/1_idle/idle/I-1.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    speed = 2; // normal 2 schnell 20
    offset = {
        top: 138,
        left: 36,
        right: 52,
        bottom: 13
    };
    offsetJump = {
        top: 138,
        left: 38,
        right: 42,
        bottom: 13
    };
    lastActionTime = Date.now();
    lastWasAboveGround = false;

    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        // this.animate(); // Entfernt, Animation wird später gestartet
    }

    setWorld() {
        // this.world = world;
        this.animate();
    }

    animate() {

        setInterval(() => {
            let action = false;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                action = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                action = true;
            }

            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
                this.jump();
                action = true;
                // Sprungstart: Erstes Bild setzen
                this.setJumpAnimation(this.IMAGES_JUMPING, true, false);
            }

            if (action) {
                this.lastActionTime = Date.now();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.hasJustLanded()) {
                this.offset = {
                    top: 138,
                    left: 36,
                    right: 52,
                    bottom: 13
                };
                // Landung: Letztes Bild setzen
                this.setJumpAnimation(this.IMAGES_JUMPING, false, true);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                // Sprungphase: Bild je nach Höhe/Sprungstatus setzen
                this.setJumpAnimation(this.IMAGES_JUMPING, false, false);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
            if (!this.isAboveGround()) {
                this.offset = {
                    top: 138,
                    left: 36,
                    right: 52,
                    bottom: 13
                };
            }
            this.lastWasAboveGround = this.isAboveGround(); // Status aktualisieren
        }, 50);

        setInterval(() => {
            if (this.isInactive(3000)) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000);

        setInterval(() => {
            if (this.isInactive(5000)) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }, 1000);
    }

    isInactive(time) {
        return (Date.now() - this.lastActionTime) > time;
    }

    jump() {
        this.speedY = 20;
        this.offset = this.offsetJump;
    }

    littleJump() {
        this.speedY = 8;
        this.offset = this.offsetJump;
    }

    jumpCharacter() {
        if (this.isJumping == true) {
            return false;
        }
        this.speedY = 16.5;
        this.isJumping = true;
        this.jumpAnimationIndex = 0;
        this.frameCounter = 0;
        // this.jumpingSound.volume = 0.001;
        // this.jumpingSound.play();
    }

    // isColliding(mo) {
    //     return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    // }

    // isCollectingItem(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x + mo.width &&
    //         this.y < mo.y + mo.height;
    // }

    hasJustLanded() {
        return this.lastWasAboveGround && !this.isAboveGround();
    }
}
