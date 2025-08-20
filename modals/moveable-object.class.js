class MoveableObject {
    x = 100;
    y = 80;
    img;
    width = 148;
    height = 360;
    imageCache = {};
    currentImage = 0;
    speed = 0.18;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        this.currentImage = (this.currentImage + 1) % images.length;
        this.img = this.imageCache[images[this.currentImage]];
    }

    moveRight() {
        console.log('object moved right');
    }

    moveLeft() {
        setInterval(() => this.x -= this.speed, 1000 / 60);
    }

}
