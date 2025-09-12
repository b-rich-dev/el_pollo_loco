class MoveableObject extends DrawableObject {
    speed = 0.18;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 20; // 100
    lastHit = 0;
    jumpLandTimer = null;     // Timer für Bildwechsel bei Landung
    jumpLandLocked = false;   // solange true, werden andere Animationen nicht überschreiben

    applyGravity() {
        if (this.gravityInterval) return; // Nur einmal starten!
        this.gravityInterval = setInterval(() => {
            if (this instanceof ThrowableObject) {
                // Stoppe Gravitation, wenn Boden erreicht
                if (this.y >= this.groundLevel) {
                    this.y = this.groundLevel;
                    this.speedY = 0;
                    this.acceleration = 0;
                    clearInterval(this.gravityInterval);
                } else if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            } else if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Endboss) {
            return this.y < 94;
        } else if (this instanceof Chicken || this instanceof Chicks) {
            return this.y < 340; // Chickens und Chicks: Bodenhöhe 340
        } else {
            return this.y < 148;
        }
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;
        this.currentImage = (this.currentImage + 1) % images.length;
        this.img = this.imageCache[images[this.currentImage]];
    }

    moveRight() {
        // console.log('character x position:', this.world.character.x);
        this.x += this.speed;
        
    }

    moveLeft() {
        this.x -= this.speed;
        
        // console.log('character x position:', this.world.character.x);
    }

    jump() {
        this.speedY = 20;
    }

    isColliding(mo) {
        // Berücksichtigt die Offsets von beiden Objekten!
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingFromAbove(mo) {
        const isFromAbove = this.y + this.height - this.offset.bottom <= mo.y + mo.offset.top + 20
            && this.speedY < 0;
        return isFromAbove;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    setJumpAnimation(images, jumpStart = false, landing = false) {
        // Reset/Start-Fall
        if (jumpStart) {
            this.img = this.imageCache[images[0]];
            if (this.jumpLandTimer) {
                clearTimeout(this.jumpLandTimer);
                this.jumpLandTimer = null;
            }
            this.jumpLandLocked = false; // neuer Sprung beginnt -> entsperren
            return;
        }

        // Landung: zuerst Bild 7 kurz zeigen, dann Bild 8
        if (landing) {
            // Wenn bereits gesperrt, nichts ändern (zeigt weiterhin 7 oder 8)
            if (this.jumpLandLocked) return;

            // Sperren und zuerst Bild 7 setzen
            this.jumpLandLocked = true;
            this.img = this.imageCache[images[7]];

            // Timer: nach kurzer Zeit Bild 8 setzen, danach entsperren
            if (this.jumpLandTimer) clearTimeout(this.jumpLandTimer);
            this.jumpLandTimer = setTimeout(() => {
                this.img = this.imageCache[images[8]];
                // kurze Anzeige von Bild 8, dann entsperren
                this.jumpLandTimer = setTimeout(() => {
                    this.jumpLandLocked = false;
                    this.jumpLandTimer = null;
                }, 80); // Dauer, wie lange Bild 8 gehalten wird (anpassen)
            }, 80); // Wartezeit zwischen 7 und 8 (anpassen)
            return;
        }

        // Wenn gesperrt, nichts überschreiben (zeigt weiterhin 7 oder 8)
        if (this.jumpLandLocked) return;

        // Sprungphase bestimmen anhand speedY
        if (this.isAboveGround()) {
            if (this.speedY > 15) {
                // Noch am Boden, Sprung startet: 0 bis 2
                this.img = this.imageCache[images[1]];
            } else if (this.speedY > 10) {
                this.img = this.imageCache[images[2]];
            } else if (this.speedY > 5) {
                // Auf dem Weg zum höchsten Punkt: 3
                this.img = this.imageCache[images[3]];
            } else if (this.speedY > 0) {
                // Kurz vor dem höchsten Punkt: 3
                this.img = this.imageCache[images[3]];
            } else if (this.speedY === 0) {
                // Höchster Punkt: 4
                this.img = this.imageCache[images[4]];
            } else if (this.speedY < 0 && this.speedY > -10) {
                // Nach dem höchsten Punkt: 4 und 5
                this.img = this.imageCache[images[5]];
            } else if (this.speedY <= -13 && this.speedY > -19) {
                // Kurz vorm Boden: 6
                this.img = this.imageCache[images[6]];
            } else if (this.speedY <= -18) {
                // Am Boden: 7 und 8
                this.img = this.imageCache[images[7]];
            }
        } else {
            // Am Boden: 7 und 8
            this.img = this.imageCache[images[8]];
        }
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

