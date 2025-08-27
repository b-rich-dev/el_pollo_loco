class DrawableObject {
    x = 100;
    y = 80;
    img;
    imageCache = {};
    currentImage = 0;
    width = 148;
    height = 360;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        if (Array.isArray(arr)) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        } else if (typeof arr === 'string') {
            let img = new Image();
            img.src = arr;
            this.imageCache[arr] = img;
            this.img = img;
        }
    }

    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        // Optional: else-Zweig für Debugging
        // else {
        //     // Bild noch nicht geladen oder ungültig
        // }
    }

    drawBoundingBox(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.strokeStyle = 'red'; // transparent
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.x + this.width - this.offset.right) - (this.x + this.offset.left), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
    }
}
