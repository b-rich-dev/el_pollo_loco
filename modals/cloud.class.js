/** Cloud class for background clouds */
class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;

    /** Create a cloud object */
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = -1000 + Math.random() * 4000;
        this.animate();
    }

    /** Move the cloud to the left */
    animate() {
        this.moveLeft();
    }
}
