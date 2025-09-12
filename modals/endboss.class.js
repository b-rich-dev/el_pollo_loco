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

    setWorld(world) {
        this.world = world;
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) return;
            if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    attack(callback) {
        if (window.world && window.world.gameStopped) return;
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
        if (!window.isMuted) this.ATTACK_SOUND.play();
        this.attackInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) {
                clearInterval(this.attackInterval);
                this.attackInterval = null;
                return;
            }

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
        if (window.world && window.world.gameStopped) return;
        if (!window.isMuted) this.ENDBOSS_LITTLE_JUMP_SOUND.play();
        this.ENDBOSS_LITTLE_JUMP_SOUND.volume = 1.0;
        this.speedY = 16;
    }

    hurt() {
        if (window.world && window.world.gameStopped) return;
        if (this.isHurting) return; // Starte nur, wenn nicht bereits hurt aktiv
        this.isHurting = true;
        let frame = 0;
        let repeat = 0;
        const maxRepeats = 3;
        if (!window.isMuted) this.HURT_SOUND.play();
        this.HURT_SOUND.volume = 0.3;
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
        }
        this.hurtInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) {
                clearInterval(this.hurtInterval);
                this.hurtInterval = null;
                this.isHurting = false;
                return;
            }
            this.img = this.imageCache[this.IMAGES_HURT[frame]];
            frame++;
            if (frame >= this.IMAGES_HURT.length) {
                frame = 0;
                repeat++;
                if (repeat >= maxRepeats) {
                    clearInterval(this.hurtInterval);
                    this.hurtInterval = null;
                    this.isHurting = false;
                }
            }
        }, 100);
    }

    die(callback) {
        if (window.world && window.world.gameStopped) return;
        // Beende alle relevanten Endboss-Intervalle und Flags
        if (this.endbossAlertInterval) {
            clearInterval(this.endbossAlertInterval);
            this.endbossAlertInterval = null;
        }
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
            this.hurtInterval = null;
            this.isHurting = false;
        }
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
        if (this.dyingInterval) {
            clearInterval(this.dyingInterval);
            this.dyingInterval = null;
        }
        if (this.fallThroughCanvasInterval) {
            clearInterval(this.fallThroughCanvasInterval);
            this.fallThroughCanvasInterval = null;
        }
        if (this.world && this.world.endbossTrackInterval) {
            clearInterval(this.world.endbossTrackInterval);
            this.world.endbossTrackInterval = null;
        }
        if (this.world) {
            this.world.endbossAttackInterval = null;
        }

        let frame = 0;
        const deadImages = this.IMAGES_DEAD;
        const interval = this.dyingInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) {
                clearInterval(interval);
                return;
            }
            this.img = this.imageCache[deadImages[frame]];
            frame++;
            if (!window.isMuted) this.ENDBOSS_DEATH_SOUND.play();
            if (frame >= deadImages.length) {
                clearInterval(interval);
                // Zeige das letzte Dead-Bild für 2 Sekunden
                this.img = this.imageCache[deadImages[deadImages.length - 1]];
                // Endboss soll jetzt durch das Canvas fallen
                this.fallThroughCanvasInterval = setInterval(() => {
                    this.FIGHT_SOUND.pause();
                    if (!window.isMuted) this.ENDBOSS_SLIDE_SOUND.play();
                    this.y += 12; // Geschwindigkeit des Fallens
                    if (this.y > 1000) { // Canvas verlassen (anpassen je nach Canvas-Höhe)
                        clearInterval(this.fallThroughCanvasInterval);
                        this.isDeadChicken = true;
                        this.world.gameOver = true;
                        if (callback) callback();
                    }
                }, 60);
            }
        }, 200); // Zeige jedes Bild für 600ms
    }

    walking() {
        if (window.world && window.world.gameStopped) return;
        if (!window.isMuted) this.WALK_SOUND.play();
        // this.WALK_SOUND.volume = 0.1;
        this.playAnimation(this.IMAGES_WALKING);
    }

    enemyRandomJump() {
        if (window.world && window.world.gameStopped) return;
        if (!(this.y < 94)) {
            if (!this.isDeadChicken) {
                if (Math.random() < 0.01) { // 50% Wahrscheinlichkeit pro Aufruf
                    if (!window.isMuted) this.ENDBOSS_JUMP_SOUND.play();
                    this.speedY = +12;
                }
            }
        }
    }

    alert(world, callback, intervalTime = 600) {
        if (window.world && window.world.gameStopped) return;
        this.speed = 0;
        let frame = 0;
        const alertImages = this.IMAGES_ALERT;
        if (!window.isMuted) this.SONIC_BOMB_SOUND.play();
        if (this.endbossAlertInterval) {
            clearInterval(this.endbossAlertInterval);
        }
        this.endbossAlertInterval = setInterval(() => {
            if (window.world && window.world.gameStopped) {
                clearInterval(this.endbossAlertInterval);
                this.endbossAlertInterval = null;
                return;
            }
            this.img = this.imageCache[alertImages[frame]];
            if (frame === alertImages.length - 2) {
                if (!window.isMuted)  this.ALERT_SOUND.play();
            }
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
        if (window.world && window.world.gameStopped) return;
        const targetX = 424;
        const slideSpeed = 10; // px pro Frame

        const statusBar = world.statusBarBoss;
        const slide = () => {
            if (window.world && window.world.gameStopped) return;
            if (statusBar.x > targetX) {
                statusBar.x -= slideSpeed;
                if (statusBar.x < targetX) statusBar.x = targetX;
                requestAnimationFrame(slide);
                if (!window.isMuted) this.FIGHT_SOUND.play();}
            // } else if (statusBar.x < targetX) {
            //     statusBar.x += slideSpeed;
            //     if (statusBar.x > targetX) statusBar.x = targetX;
            //     requestAnimationFrame(slide);
            // }
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
