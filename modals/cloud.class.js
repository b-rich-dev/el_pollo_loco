class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = 100 + Math.random() * 600;
        
    }
}
