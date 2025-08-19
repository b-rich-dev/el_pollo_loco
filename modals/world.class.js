class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    canvas;
    ctx;
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0, 0),
    ];

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}