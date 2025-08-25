class Bottle extends MoveableObject {
    y = 200;
    height = 90;
    width = 90;
    IMAGE_BOTTLE_ON_GROUND = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];
    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);

        this.x = 30 + Math.random() * 2260;
        this.y = 330 + Math.random() * 72;
        // this.animate();
        // Animation entfernt, da nur ein Bild vorhanden ist
    }

    // animate() entfernt
}