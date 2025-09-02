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
    energy = 0; // 100
    lastHit = 0;

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
        if (jumpStart) {
            // Erstes Bild beim Sprungstart
            this.img = this.imageCache[images[0]];
        } else if (landing) {
            // Letztes Bild bei Landung
            this.img = this.imageCache[images[images.length - 1]];
        } else {
            // Höchster Punkt: Bild mit J-34.png (Index 3)
            if (Math.abs(this.speedY) < 1) {
                this.img = this.imageCache[images[3]];
            } else {
                // Dazwischen: Verteile Bilder nach Y-Position/Sprungphase
                let phase = Math.floor((this.speedY + 20) / 40 * (images.length - 2));
                phase = Math.max(1, Math.min(images.length - 2, phase));
                this.img = this.imageCache[images[phase]];
            }
        }
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

