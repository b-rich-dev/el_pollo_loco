class MoveableObject {
    x = 120;
    y = 250;
    img;
    width = 100;
    height = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('object moved right');
    }

    moveLeft() {
        console.log('object moved left');
    }
}
