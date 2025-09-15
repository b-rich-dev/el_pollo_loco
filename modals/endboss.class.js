/** Endboss class representing the final enemy in the game. */
class Endboss extends MoveableObject {

    width = 280;
    height = 360;
    y = 94;
    x = 2960;
    speed = 2;
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
    ATTACK_SOUND = new Audio('assets/audio/endboss/attack.wav');
    HURT_SOUND = new Audio('assets/audio/ouch/endboss_hurt.wav');
    WALK_SOUND = new Audio('assets/audio/walk/endboss_walk.wav');
    ALERT_SOUND = new Audio('assets/audio/endboss/alarm_call.wav');
    SONIC_BOMB_SOUND = new Audio('assets/audio/endboss/sonicbomb.wav');
    FIGHT_SOUND = new Audio('assets/audio/endboss/endboss_fight.mp3');
    ENDBOSS_DEATH_SOUND = new Audio('assets/audio/dead/endboss_death.wav');
    ENDBOSS_SLIDE_SOUND = new Audio('assets/audio/dead/endboss_slide.wav');
    ENDBOSS_JUMP_SOUND = new Audio('assets/audio/jump/endboss_jump.wav');
    ENDBOSS_LITTLE_JUMP_SOUND = new Audio('assets/audio/jump/endboss_little_jump.wav');
    ENDBOSS_WIN_SOUND = new Audio('assets/audio/endboss/win.wav');

    /** Intervals for various animations and actions */
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
        window.ENDBOSS_ATTACK_SOUND = this.ATTACK_SOUND;
        window.ENDBOSS_HURT_SOUND = this.HURT_SOUND;
        window.ENDBOSS_WALK_SOUND = this.WALK_SOUND;
        window.ENDBOSS_ALERT_SOUND = this.ALERT_SOUND;
        window.ENDBOSS_SONIC_BOMB_SOUND = this.SONIC_BOMB_SOUND;
        window.ENDBOSS_FIGHT_SOUND = this.FIGHT_SOUND;
        window.ENDBOSS_DEATH_SOUND = this.ENDBOSS_DEATH_SOUND;
        window.ENDBOSS_SLIDE_SOUND = this.ENDBOSS_SLIDE_SOUND;
        window.ENDBOSS_JUMP_SOUND = this.ENDBOSS_JUMP_SOUND;
        window.ENDBOSS_LITTLE_JUMP_SOUND = this.ENDBOSS_LITTLE_JUMP_SOUND;
        window.ENDBOSS_WIN_SOUND = this.ENDBOSS_WIN_SOUND;
        setSoundMuted(this.ATTACK_SOUND);
        setSoundMuted(this.HURT_SOUND);
        setSoundMuted(this.WALK_SOUND);
        setSoundMuted(this.ALERT_SOUND);
        setSoundMuted(this.SONIC_BOMB_SOUND);
        setSoundMuted(this.FIGHT_SOUND);
        setSoundMuted(this.ENDBOSS_DEATH_SOUND);
        setSoundMuted(this.ENDBOSS_SLIDE_SOUND);
        setSoundMuted(this.ENDBOSS_JUMP_SOUND);
        setSoundMuted(this.ENDBOSS_LITTLE_JUMP_SOUND);
        setSoundMuted(this.ENDBOSS_WIN_SOUND);
    }

    /** Loop to play alert animation when the boss fight starts
    * @param {World} world - The game world instance
    */
    setWorld(world) {
        this.world = world;
    }

    /** Start the alert animation loop */
    animate() {
        this.walkingInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) return;
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    /** Loop to play alert animation when the boss fight starts
    * @param {Function} callback - The function to call when the attack animation is complete
    */
    attack(callback) {
        if (isGameStopped()) return;
        if (this.attackInterval) clearInterval(this.attackInterval);

        let targetX = this.world && this.world.character ? this.world.character.x : this.x;
        let totalDist = Math.abs(targetX - this.x);
        if (totalDist < 40) totalDist = 40;

        const attackImages = this.IMAGES_ATTACK;
        const intervalTime = 1000 / 6;
        this.speed = totalDist / attackImages.length;

        if (!window.isMuted) this.ATTACK_SOUND.play();
        this.startAttackLoop(attackImages, intervalTime, callback);
    }

    /** Loop to play attack animation
    * @param {Array} attackImages - The array of attack image paths
    * @param {number} intervalTime - The time interval for each frame
    * @param {Function} callback - The function to call when the attack animation is complete
    */
    startAttackLoop(attackImages, intervalTime, callback) {
        let frame = 0;
        this.attackInterval = setInterval(() => {
            if (isGameStopped()) { clearInterval(this.attackInterval); this.attackInterval = null; return; }
            this.img = this.imageCache[attackImages[frame]];
            if (this.world && this.world.character) {
                const dist = this.world.character.x - this.x;
                this.x += Math.sign(dist) * this.speed;
                this.otherDirection = dist > 0;
            }
            if (frame === 5 && typeof this.littleJump === 'function') this.littleJump();
            if (++frame >= attackImages.length) { clearInterval(this.attackInterval); this.attackInterval = null; this.speed = 5; if (typeof callback === 'function') callback(); }
        }, intervalTime);
    }

    /** Small jump during attack */
    littleJump() {
        if (window.world && window.world.gameStopped) return;
        if (!window.isMuted) this.ENDBOSS_LITTLE_JUMP_SOUND.play();
        this.ENDBOSS_LITTLE_JUMP_SOUND.volume = 1.0;
        this.speedY = 16;
    }

    /** Hurt animation when the endboss takes damage */
    hurt() {
        if (window.world && window.world.gameStopped) return;
        if (this.isHurting) return;
        this.isHurting = true;
        let frame = 0, repeat = 0, maxRepeats = 3;
        if (!window.isMuted) { this.HURT_SOUND.volume = 0.3; this.HURT_SOUND.play(); }
        if (this.hurtInterval) clearInterval(this.hurtInterval);
        this.hurtInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) { clearInterval(this.hurtInterval); this.hurtInterval = null; this.isHurting = false; return; }
            this.img = this.imageCache[this.IMAGES_HURT[frame++]];
            if (frame >= this.IMAGES_HURT.length) { frame = 0; if (++repeat >= maxRepeats) { clearInterval(this.hurtInterval); this.hurtInterval = null; this.isHurting = false; } }
        }, 100);
    }

    /** Handle the death of the endboss
    * @param {Function} callback - The function to call when the death animation is complete
    */
    die(callback) {
        if (isGameStopped()) return;
        this.clearDieIntervals();
        this.startDeathAnimation(callback);
    }

    /** Clear all intervals related to dying and attacking */
    clearDieIntervals() {
        if (this.endbossAlertInterval) { clearInterval(this.endbossAlertInterval); this.endbossAlertInterval = null; }
        if (this.hurtInterval) { clearInterval(this.hurtInterval); this.hurtInterval = null; this.isHurting = false; }
        if (this.attackInterval) { clearInterval(this.attackInterval); this.attackInterval = null; }
        if (this.dyingInterval) { clearInterval(this.dyingInterval); this.dyingInterval = null; }
        if (this.fallThroughCanvasInterval) { clearInterval(this.fallThroughCanvasInterval); this.fallThroughCanvasInterval = null; }
        if (this.world && this.world.endbossTrackInterval) { clearInterval(this.world.endbossTrackInterval); this.world.endbossTrackInterval = null; }
        if (this.world) { this.world.endbossAttackInterval = null; }
    }

    /** Start the death animation loop
    * @param {Function} callback - The function to call when the death animation is complete
    */
    startDeathAnimation(callback) {
        let f = 0, d = this.IMAGES_DEAD;
        this.dyingInterval = setInterval(() => {
            if (isGameStopped()) { clearInterval(this.dyingInterval); return; }
            this.img = this.imageCache[d[f++]];
            if (!window.isMuted) this.ENDBOSS_DEATH_SOUND.play();
            if (f >= d.length) { clearInterval(this.dyingInterval); this.img = this.imageCache[d[d.length - 1]]; this.startFallThroughCanvas(callback); }
        }, 200);
    }

    /** Make the endboss fall through the canvas after death
    * @param {Function} callback - The function to call when the fall is complete
    */
    startFallThroughCanvas(callback) {
        this.fallThroughCanvasInterval = setInterval(() => {
            this.FIGHT_SOUND.pause();
            if (!window.isMuted) this.ENDBOSS_SLIDE_SOUND.play();
            this.y += 12;
            if (this.y > 1000) { clearInterval(this.fallThroughCanvasInterval); this.isDeadChicken = true; if (this.world) this.world.gameOver = true; if (callback) callback(); }
        }, 60);
    }

    /** Move the endboss to the left and play walking animation */
    walking() {
        if (window.world && window.world.gameStopped) return;
        if (!window.isMuted) this.WALK_SOUND.play();
        this.playAnimation(this.IMAGES_WALKING);
    }

    /** Make the endboss jump at random intervals */
    enemyRandomJump() {
        if (window.world && window.world.gameStopped) return;
        if (!(this.y < 94)) {
            if (!this.isDeadChicken) {
                if (Math.random() < 0.01) {
                    if (!window.isMuted) this.ENDBOSS_JUMP_SOUND.play();
                    this.speedY = +12;
                }
            }
        }
    }

    /** Start the alert animation loop
    * @param {World} world - The game world instance
    * @param {Function} callback - The function to call when the alert animation is complete
    * @param {number} intervalTime - The time interval for each frame
    */
    alert(world, callback, intervalTime = 600) {
        if (isGameStopped()) return;
        this.speed = 0;
        if (!window.isMuted) this.SONIC_BOMB_SOUND.play();
        if (this.endbossAlertInterval) clearInterval(this.endbossAlertInterval);
        this.startAlertLoop(world, callback, intervalTime);
    }

    /** Loop to play alert animation
    * @param {World} world - The game world instance
    * @param {Function} callback - The function to call when the alert animation is complete
    * @param {number} intervalTime - The time interval for each frame
    */
    startAlertLoop(world, callback, intervalTime = 600) {
        let frame = 0, images = this.IMAGES_ALERT;
        this.endbossAlertInterval = setInterval(() => {
            if (isGameStopped()) { clearInterval(this.endbossAlertInterval); this.endbossAlertInterval = null; return; }
            this.img = this.imageCache[images[frame]];
            if (frame === images.length - 2 && !window.isMuted) this.ALERT_SOUND.play();
            if (++frame >= images.length) {
                this.setStartBoss(world, callback);
            }
        }, intervalTime);
    }

    /** Set the endboss to start the fight
    * @param {World} world - The game world instance
    * @param {Function} callback - The function to call when the boss is set to start
    */
    setStartBoss(world, callback) {
        clearInterval(this.endbossAlertInterval); this.endbossAlertInterval = null;
        this.slideBossStatusbar(world);
        if (world) world.shootingPossible = true;
        this.speed = 5;
        if (typeof callback === 'function') callback();
    }

    /** Slide the boss status bar into view
    * @param {World} world - The game world instance
    */
    slideBossStatusbar(world) {
        if (window.world && window.world.gameStopped) return;
        const targetX = 424, slideSpeed = 10;
        const statusBar = world.statusBarBoss;
        this.startStatusbarSlide(statusBar, targetX, slideSpeed);
    }

    /** Animate the sliding of the status bar
    * @param {StatusBar} statusBar - The status bar instance
    * @param {number} targetX - The target x position to slide to
    * @param {number} slideSpeed - The speed of the slide
    */
    startStatusbarSlide(statusBar, targetX = 424, slideSpeed = 10) {
        const step = () => {
            if (window.world && window.world.gameStopped) return;
            if (statusBar.x > targetX) {
                statusBar.x -= slideSpeed;
                if (statusBar.x < targetX) statusBar.x = targetX;
                if (!window.isMuted) this.FIGHT_SOUND.play();
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    /** Make the endboss jump */
    enemyJump() {
        this.speedY = +10;
    }
}
