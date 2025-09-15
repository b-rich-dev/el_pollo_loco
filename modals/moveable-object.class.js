/** Class representing a moveable object in the game, extending DrawableObject */
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
    energy = 100;
    lastHit = 0;
    jumpLandTimer = null;
    jumpLandLocked = false;

    /** Ground level for the object */
    applyGravity() {
        if (this.gravityInterval) return;
        this.gravityInterval = setInterval(() => {
            if (this instanceof ThrowableObject) {
                if (this.y >= this.groundLevel) {
                    this.setGravity();
                } else if (this.isAboveGround() || this.speedY > 0) {
                    this.reduceSpeedYandAcceleration();
                }
            } else if (this.isAboveGround() || this.speedY > 0) {
                this.reduceSpeedYandAcceleration();
            }
        }, 1000 / 25);
    }

    /** Set the object on the ground level */
    setGravity() {
        this.y = this.groundLevel;
        this.speedY = 0;
        this.acceleration = 0;
        clearInterval(this.gravityInterval);
    }

    /** Reduce vertical speed and acceleration due to gravity */
    reduceSpeedYandAcceleration() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /** Check if the object is above ground level */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Endboss) {
            return this.y < 94;
        } else if (this instanceof Chicken || this instanceof Chicks) {
            return this.y < 340;
        } else {
            return this.y < 148;
        }
    }

    /** Play animation by cycling through given images */
    playAnimation(images) {
        if (!images || images.length === 0) return;
        this.currentImage = (this.currentImage + 1) % images.length;
        this.img = this.imageCache[images[this.currentImage]];
    }

    /** Move the object to the right */
    moveRight() {
        this.x += this.speed;
    }

    /** Move the object to the left */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Make the object jump by setting vertical speed */
    jump() {
        this.speedY = 20;
    }

    /** Check if this object is colliding with another moveable object
    * @param {MoveableObject} mo - Another moveable object to check collision with
    * @returns {boolean} - True if colliding, false otherwise
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /** Check if this object is colliding with another moveable object from above
    * @param {MoveableObject} mo - Another moveable object to check collision with
    * @returns {boolean} - True if colliding from above, false otherwise
    */
    isCollidingFromAbove(mo) {
        const isFromAbove = this.y + this.height - this.offset.bottom <= mo.y + mo.offset.top + 20
            && this.speedY < 0;
        return isFromAbove;
    }

    /** Reduce energy when hit and update last hit time */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** Check if the object was recently hurt */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /** Check if the object is dead (energy <= 0) 
    * @param ctx - The canvas rendering context
    */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /** Set the current image based on index and image array
    * @param {number} index - The index of the image to set
    * @param {Array} images - The array of images to choose from
    */
    setImage(index, images) {
        this.img = this.imageCache[images[index]];
    }

    /** Clear any existing jump/land timer */
    clearJumpLandTimer() {
        if (!this.jumpLandTimer) return;
        clearTimeout(this.jumpLandTimer);
        this.jumpLandTimer = null;
    }

    /** Handle the start of a jump animation
    * @param {Array} images - The array of images to use for the jump animation
    */
    handleJumpStart(images) {
        this.setImage(0, images);
        this.clearJumpLandTimer();
        this.jumpLandLocked = false;
    }

    /** Handle the landing animation sequence
    * @param {Array} images - The array of images to use for the landing animation
    */
    handleLanding(images) {
        if (this.jumpLandLocked) return true;

        this.jumpLandLocked = true;
        this.setImage(7, images);

        if (this.jumpLandTimer) clearTimeout(this.jumpLandTimer);

        const first = setTimeout(() => {
            this.setImage(8, images);
            const second = setTimeout(() => {
                this.jumpLandLocked = false;
                this.jumpLandTimer = null;
            }, 80);
            this.jumpLandTimer = second;
        }, 80);

        this.jumpLandTimer = first;
        return true;
    }

    /** Set the current image based on vertical speed
    * @param {Array} images - The array of images to choose from
    */
    setImageBySpeed(images) {
        if (!this.isAboveGround()) { this.setImage(8, images); return; }
        const s = this.speedY;
        if (s > 15) this.setImage(1, images);
        else if (s > 10) this.setImage(2, images);
        else if (s > 0) this.setImage(3, images);
        else if (s === 0) this.setImage(4, images);
        else if (s > -10) this.setImage(5, images);
        else if (s > -19 && s <= -13) this.setImage(6, images);
        else if (s <= -18) this.setImage(7, images);
    }

    /** Set jump or landing animation based on state
    * @param {Array} images - The array of images to use for the animation
    * @param {boolean} jumpStart - True if jump is starting
    * @param {boolean} landing - True if landing is occurring
    */
    setJumpAnimation(images, jumpStart = false, landing = false) {
        if (jumpStart) { this.handleJumpStart(images); return; }
        if (landing) { if (this.handleLanding(images)) return; }
        if (this.jumpLandLocked) return;
        this.setImageBySpeed(images);
    }
}
