/** Chicks (small chickens) class extending MoveableObject */
class Chicks extends MoveableObject {
    y = 340;
    width = 68;
    height = 86;
    offset = {
        top: 13,
        left: 3,
        right: 2,
        bottom: 5
    };
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    isDeadChicken = false;
    CHICKS_HURT_SOUND = new Audio('assets/audio/chicks/chicks_dead.mp3');
    CHICKS_JUMP_SOUND = new Audio('assets/audio/jump/chicks_jump.mp3');
    GENERAL_SOUND = new Audio('assets/audio/chicks/chicks_chirp.mp3');
    CHICKS_WALK_SOUND = new Audio('assets/audio/walk/chicks_walk.mp3');

    /** Create a chicks object */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.imageCache[this.IMAGE_DEAD] = new Image();
        this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
        this.x = 280 + Math.random() * 2000;
        this.y = 340;
        this.moveSpeed = 2.88 + Math.random() * 0.36;
        this.speed = this.moveSpeed;
        this.otherDirection = false;
        this.isDeadChicken = false;
        this.animate();
        this.applyGravity();
        this.addGeneralSoundLoop();
        window.CHICKS_HURT_SOUND = this.CHICKS_HURT_SOUND;
        window.CHICKS_JUMP_SOUND = this.CHICKS_JUMP_SOUND;
        window.CHICKS_WALK_SOUND = this.CHICKS_WALK_SOUND;
        window.CHICKS_GENERAL_SOUND = this.GENERAL_SOUND;
        setSoundMuted(this.CHICKS_HURT_SOUND);
        setSoundMuted(this.CHICKS_JUMP_SOUND);
        setSoundMuted(this.CHICKS_WALK_SOUND);
        setSoundMuted(this.GENERAL_SOUND);
    }

    /** Loop to play general chicks sounds at random intervals */
    addGeneralSoundLoop() {
        const playGeneralSound = () => {
            if (!this.isDeadChicken && !window.isMuted && !(window.world && window.world.gameStopped)) {
                window.safePlay(this.GENERAL_SOUND);
                this.GENERAL_SOUND.volume = 0.2;
            }
            if (!(window.world && window.world.gameStopped)) {
                const nextDelay = 3000 + Math.random() * 9000;
                setTimeout(playGeneralSound, nextDelay);
            }
        };
        playGeneralSound();
    }

    /** Animate the chicks' movement and walking */
    animate() {
        this.moveLeftAnimateIntervalEnemy = setInterval(() => {
            this.moveLeft();
        }, 30);

        this.walkingInterval = setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    /** Move the chick to the left */
    moveLeft() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {

            if (this.CHICKS_WALK_SOUND) this.CHICKS_WALK_SOUND.volume = 0.5;
            if (!window.isMuted) window.safePlay(this.CHICKS_WALK_SOUND);
            this.otherDirection = false;
            this.speed = this.moveSpeed;
            super.moveLeft();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    /** Move the chick to the right */
    moveRight() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {
            if (this.CHICKS_WALK_SOUND) this.CHICKS_WALK_SOUND.volume = 0.6;
            if (!window.isMuted) this.CHICKS_WALK_SOUND.play();
            this.otherDirection = true;
            this.speed = this.moveSpeed;
            super.moveRight();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    /** Make the chick jump at random intervals */
    enemyRandomJump() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {
            if (Math.random() < 0.01) {
                if (this.CHICKS_JUMP_SOUND) this.CHICKS_JUMP_SOUND.volume = 0.1;
                if (!window.isMuted) this.CHICKS_JUMP_SOUND.play();
                this.speedY = +12;
            }
        }
    }

    /** Handle the death of the chick */
    die(callback) {
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDeadChicken = true;
        
        if (this.CHICKS_HURT_SOUND) this.CHICKS_HURT_SOUND.volume = 0.8;
        if (!window.isMuted && !(window.world && window.world.gameStopped)) window.safePlay(this.CHICKS_HURT_SOUND);
        setTimeout(() => {
            if (callback) callback();
        }, 1000);
    }
}
