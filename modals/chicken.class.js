/** Chicken class representing a chicken enemy in the game. */
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
    DEATH_SOUND = new Audio('assets/audio/dead/chicken_death.mp3');
    GENERAL_SOUND = new Audio('assets/audio/chicken/general.mp3');
    CHICKEN_JUMP_SOUND = new Audio('assets/audio/jump/chicken_jump.mp3');
    CHICKEN_WALK_SOUND = new Audio('assets/audio/walk/chicken_walk.mp3');

    /** Create a chicken object */
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

    /** Loop to play general chicken sounds at random intervals */
    addGeneralSoundLoop() {
        const playGeneralSound = () => {
            if (!this.isDeadChicken && !window.isMuted && !(window.world && window.world.gameStopped)) {
                window.safePlay(this.GENERAL_SOUND);
                this.GENERAL_SOUND.volume = 0.3;
            }
            if (!(window.world && window.world.gameStopped)) {
                const nextDelay = 3000 + Math.random() * 9000;
                setTimeout(playGeneralSound, nextDelay);
            }
        };
        playGeneralSound();
    }

    /** Animate the chicken's movement and walking */
    animate() {
        this.moveLeftAnimateIntervalEnemy = setInterval(() => {
            this.moveLeft();
        }, 50);

        this.walkingInterval = setInterval(() => {
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    /** Move the chicken to the left */
    moveLeft() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {
            if (this.CHICKEN_WALK_SOUND) this.CHICKEN_WALK_SOUND.volume = 0.05;
            if (!window.isMuted) window.safePlay(this.CHICKEN_WALK_SOUND);
            this.otherDirection = false;
            this.speed = this.moveSpeed;
            super.moveLeft();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    /** Move the chicken to the right */
    moveRight() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {
            if (this.CHICKEN_WALK_SOUND) this.CHICKEN_WALK_SOUND.volume = 0.05;
            if (!window.isMuted) window.safePlay(this.CHICKEN_WALK_SOUND);
            this.otherDirection = true;
            this.speed = this.moveSpeed;
            super.moveRight();
        }
        if (!(this.y < 340)) {
            this.enemyRandomJump();
        }
    }

    /** Make the chicken jump at random intervals */
    enemyRandomJump() {
        if (!this.isDeadChicken && !(window.world && window.world.gameStopped)) {
            if (Math.random() < 0.005) {
                if (this.CHICKEN_JUMP_SOUND) this.CHICKEN_JUMP_SOUND.volume = 0.1;
                if (!window.isMuted) window.safePlay(this.CHICKEN_JUMP_SOUND);
                this.speedY = +8;
            }
        }
    }

    /** Handle the death of the chicken 
     * @param {Function} callback - Optional callback to execute after death animation
    */
    die(callback) {
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.isDeadChicken = true;
        if (this.DEATH_SOUND) this.DEATH_SOUND.volume = 0.6;
        if (!window.isMuted && !(window.world && window.world.gameStopped)) window.safePlay(this.DEATH_SOUND);
        setTimeout(() => {
            if (callback) callback();
        }, 1000);
    }
}
