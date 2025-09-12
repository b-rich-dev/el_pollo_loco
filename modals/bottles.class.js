/** Class for bottles in the game */
class Bottle extends MoveableObject {
    y = 200;
    height = 90;
    width = 90;
    offset = {
        left: 38,
        right: 18,
        top: 18,
        bottom: 11
    };
    IMAGE_BOTTLE_ON_GROUND = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];
    IMAGE_SIMPLE_BOTTLE = ['assets/img/6_salsa_bottle/salsa_bottle.png'];

    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 30 + Math.random() * 2200;
        this.y = 326 + Math.random() * 70;
    }
}