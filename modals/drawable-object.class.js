/** Base class for all drawable objects in the game */
class DrawableObject {
    x = 100;
    y = 80;
    img;
    imageCache = {};
    currentImage = 0;
    width = 148;
    height = 360;

    /** Default offset for collision detection */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /** Load multiple images into the image cache
    * @param {string[]} arr - Array of image paths
    */
    loadImages(arr) {
        if (Array.isArray(arr)) {
            arr.forEach((path) => {
                this.arrayImages(path);
            });
        } else if (typeof arr === 'string') {
            this.singleImage(arr);
        }
    }

    /** Load a single image into the image cache if its an array
    * @param {string} path - Path of the image
    */
    arrayImages(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    /** Load a single image into the image cache and set it as the current image
    * @param {string} arr - Path of the image
    */
    singleImage(arr) {
        let img = new Image();
        img.src = arr;
        this.imageCache[arr] = img;
        this.img = img;
    }

    /** Draw the object on the canvas
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /** Draw the bounding box for collision detection
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
    */
    drawBoundingBox(ctx) {
        if (this.allCollidingObjects()) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'transparent';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                (this.x + this.width - this.offset.right) - (this.x + this.offset.left),
                (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top)
            );
            ctx.stroke();
        }
    }

    /** Check if this object is colliding with another object
    * @param {DrawableObject} mo - Another drawable object
    * @returns {boolean} - True if colliding, false otherwise
    */
    allCollidingObjects() {
        return this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Bottle ||
            this instanceof Coins ||
            this instanceof Chicks ||
            this instanceof ThrowableObject
    }
}
