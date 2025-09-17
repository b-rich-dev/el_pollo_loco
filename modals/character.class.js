/** Class for the main character in the game */
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
        'assets/img/2_character_pepe/5_dead/D-56.png'
    ];
    world;
    speed = 2.2;
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
    setOffset = {
        top: 138,
        left: 36,
        right: 52,
        bottom: 13
    };
    lastActionTime = Date.now();
    lastWasAboveGround = false;
    isCharacterDead = false;
    idleLongAnimationInterval = null;
    DYING_SOUND = new Audio('assets/audio/dead/dying-sound.mp3');
    JUMP_SOUND = new Audio('assets/audio/jump/jump.wav');
    LITTLE_JUMP_SOUND = new Audio('assets/audio/jump/little_jump.wav');
    HURT_SOUND = new Audio('assets/audio/ouch/hurt.wav');
    SLEEPING_SOUND = new Audio('assets/audio/sleep/snoring.wav');
    WALK_SOUND = new Audio('assets/audio/walk/walk.wav');
    WIN_SOUND = new Audio('assets/audio/win/win.mp3');
    action = false;

    /** Create the character object */
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        window.CHARACTER_DYING_SOUND = this.DYING_SOUND;
        window.CHARACTER_JUMP_SOUND = this.JUMP_SOUND;
        window.CHARACTER_LITTLE_JUMP_SOUND = this.LITTLE_JUMP_SOUND;
        window.CHARACTER_HURT_SOUND = this.HURT_SOUND;
        window.CHARACTER_SLEEPING_SOUND = this.SLEEPING_SOUND;
        window.CHARACTER_WALK_SOUND = this.WALK_SOUND;
        window.CHARACTER_WIN_SOUND = this.WIN_SOUND;
        setSoundMuted(this.DYING_SOUND);
        setSoundMuted(this.JUMP_SOUND);
        setSoundMuted(this.LITTLE_JUMP_SOUND);
        setSoundMuted(this.HURT_SOUND);
        setSoundMuted(this.SLEEPING_SOUND);
        setSoundMuted(this.WALK_SOUND);
        setSoundMuted(this.WIN_SOUND);
        this.DYING_SOUND.persistentOnGameOver = true;
    }

    /** Sets the world for the character and starts the animation loop */
    setWorld() {
        this.animate();
    }

    /** Main animation loop for character actions */
    animate() {
        this.controlInterval = setInterval(() => this.moveCharacter(), 1000 / 60);
        this.jumpLandingInterval = setInterval(() => this.jumpLandingCheck(), 50);
        this.idleCheckInterval = setInterval(() => this.characterIdleCheck(), 220);
        this.idleLongCheckInterval = setInterval(() => this.characterLongIdleCheck(), 800);
    }

    /** Moves the character based on keyboard input */
    moveCharacter() {
        if (isGameStopped()) return;

        this.action = false;
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canJump()) this.setJump();
        if (this.action) this.resetIdleTimer();

        this.world.camera_x = -this.x + 100;
    }

    /** Checks if the character can move right */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /** Moves the character to the right */
    moveRight() {
        if (!window.isMuted && !this.isAboveGround()) {
            if (this.WALK_SOUND.paused) this.WALK_SOUND.play();
            this.WALK_SOUND.volume = 0.2;
        }
        super.moveRight();
        this.otherDirection = false;
        this.action = true;
    }

    /** Checks if the character can move left */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /** Moves the character to the left */
    moveLeft() {
        if (!window.isMuted && !this.isAboveGround()) {
            if (this.WALK_SOUND.paused) this.WALK_SOUND.play();
            this.WALK_SOUND.volume = 0.2;
        }
        super.moveLeft();
        this.otherDirection = true;
        this.action = true;
    }

    /** Checks if the character can jump */
    canJump() {
        return (this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround();
    }

    /** Initiates the jump action */
    setJump() {
        this.jump();
        this.setJumpAnimation(this.IMAGES_JUMPING, true, false);
        this.action = true;
    }

    /** Sets the jump animation */
    resetIdleTimer() {
        this.lastActionTime = Date.now();
        this.SLEEPING_SOUND.pause();
        this.SLEEPING_SOUND.currentTime = 0;
        if (this.idleLongAnimationInterval) {
            clearInterval(this.idleLongAnimationInterval);
            this.idleLongAnimationInterval = null;
        }
        if (!this.idleCheckInterval) {
            this.idleCheckInterval = setInterval(() => this.characterIdleCheck(), 500);
        }
    }

    /** Sets the jump animation with options for looping and landing */
    jumpLandingCheck() {
        if (isGameStopped()) return;

        this.action = false;
        if (this.hasJustLanded()) this.hasJustLandedAction(); 
        else if (this.isHurt()) this.isHurtAction();
        else if (this.isAboveGround()) this.isAboveGroundAction();
        else if (this.isMoving()) this.move();
        
        if (this.action) this.resetIdleTimer();
        this.lastWasAboveGround = this.isAboveGround();
    }

    /** Checks if the character is moving left or right */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    /** Plays the walking animation */
    move() {
        this.action = true;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /** Handles the action when the character has just landed */
    hasJustLandedAction() {
        this.offset = this.setOffset;
        this.setJumpAnimation(this.IMAGES_JUMPING, false, true);
    }

    /** Handles the action when the character is hurt */
    isHurtAction() {
        this.action = true;
        if (!window.isMuted) this.HURT_SOUND.play();
        this.playAnimation(this.IMAGES_HURT);
    }

    /** Handles the action when the character is above ground */
    isAboveGroundAction() {
        this.action = true;
        this.setJumpAnimation(this.IMAGES_JUMPING, false, false);
    }

    /** Checks if the character has been inactive for a certain time and plays idle animations */
    characterIdleCheck() {
        if (isGameStopped()) return;
        if (this.isInactive(100)) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /** Checks if the character has been inactive for a longer time and plays long idle animations */
    characterLongIdleCheck() {
        if (isGameStopped()) return;
        if (this.isInactive(8000) && this.idleCheckInterval) {
            clearInterval(this.idleCheckInterval);
            this.idleCheckInterval = null;
            if (!window.isMuted) this.SLEEPING_SOUND.play();
            if (!this.idleLongAnimationInterval) {
                this.idleLongAnimationInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_IDLE_LONG);
                }, 220);
            }
        }
    }

    /** Checks if the character has been inactive for a specified time 
     * @param {number} time - Time in milliseconds to check for inactivity
     * @returns {boolean} - True if inactive for the specified time, false otherwise
    */
    isInactive(time) {
        return (Date.now() - this.lastActionTime) > time;
    }

    /** Sets the jump animation with options for looping and landing */
    jump() {
        if (isGameStopped()) return;
        if (!window.isMuted) this.JUMP_SOUND.play();
        if (!this.WALK_SOUND.paused) this.WALK_SOUND.pause();
        this.WALK_SOUND.currentTime = 0;
        this.speedY = 20;
        this.offset = this.offsetJump;
    }

    /** Sets a smaller jump, e.g., when hitting an enemy */
    littleJump() {
        if (isGameStopped()) return;
        if (!window.isMuted) this.LITTLE_JUMP_SOUND.play();
        this.LITTLE_JUMP_SOUND.volume = 0.6;
        if (!this.WALK_SOUND.paused) this.WALK_SOUND.pause();
        this.WALK_SOUND.currentTime = 0;
        this.speedY = 8;
        this.offset = this.offsetJump;
    }

    /** Initiates the death sequence for the character */
    deadJump() {
        if (isGameStopped()) return;
        this.speedY = 16;
    }

    /** Initiates the death sequence for the character with animation and callback 
    * @param {Function} callback - Function to call after death sequence completes
    */
    die(callback) {
        if (isGameStopped()) return;
        this.prepareDie();
        const deadImages = this.IMAGES_DEAD;
        this.animateDeath(deadImages, callback);
    }

    /** Prepares the character for death by playing sound and clearing intervals */
    prepareDie() {
        if (!window.isMuted) this.DYING_SOUND.play();
        if (this.isIntervalOn()) this.clearThisIntervals();
    }

    /** Plays the death animation and starts the fall through canvas sequence
     * @param {Array} deadImages - Array of image paths for death animation
     * @param {Function} callback - Function to call after death sequence completes
     */
    animateDeath(deadImages, callback) {
        let frame = 0;
        const interval = this.dyingInterval = setInterval(() => {
            this.img = this.imageCache[deadImages[frame]];
            frame++;
            if (frame >= deadImages.length) {
                clearInterval(interval);
                this.img = this.imageCache[deadImages[deadImages.length - 1]];
                if (this.img === this.imageCache[deadImages[deadImages.length - 1]]) {
                    this.startDeathFall(callback);
                }
            }
        }, 1000 / 60);
    }

    /** Starts the death fall sequence with a jump and then falling through the canvas
     * @param {Function} callback - Function to call after death sequence completes
     */
    startDeathFall(callback) {
        this.deadJump();
        setTimeout(() => {
            this.startFallThroughCanvas(callback);
        }, 600);
    }

    /** Starts the fall through canvas sequence 
     * @param {Function} callback - Function to call after death sequence completes
    */
    startFallThroughCanvas(callback) {
        this.fallThroughCanvasInterval = setInterval(() => {
            this.x += 1;
            this.y += 6; // Geschwindigkeit des Fallens
            if (this.y > 1000) { // Canvas verlassen (anpassen je nach Canvas-Höhe)
                clearInterval(this.fallThroughCanvasInterval);
                this.setDead(); // <-- Hier wird isCharacterDead gesetzt
                if (callback) callback();
            }
        }, 10);
    }

    /** Checks if any relevant intervals are currently active */
    isIntervalOn() {
        return this.world.runInterval ||
            this.world.endbossTrackInterval ||
            this.world.endbossAttackInterval ||
            this.controlInterval ||
            this.jumpLandingInterval ||
            this.idleCheckInterval ||
            this.idleLongCheckInterval;
    }

    /** Clears all relevant intervals */
    clearThisIntervals() {
        clearInterval(this.world.runInterval);
        clearInterval(this.world.endbossAttackInterval);
        clearInterval(this.world.endbossTrackInterval);
        clearInterval(this.controlInterval);
        clearInterval(this.jumpLandingInterval);
        clearInterval(this.idleCheckInterval);
        clearInterval(this.idleLongCheckInterval);
    }

    /** Sets the character as dead and triggers game over in the world */
    setDead() {
        this.isCharacterDead = true;
        this.world.gameOver = true;
    }

    /** Checks if the character has just landed */
    hasJustLanded() {
        return this.lastWasAboveGround && !this.isAboveGround();
    }
}
