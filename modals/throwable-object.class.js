class ThrowableObject extends MoveableObject {


    constructor(x, y) {
       super().loadImage('assets/img/7_statusbars/3_icons/icon_salsa_bottle.png');
       this.x = x;
       this.y = y;
       this.width = 50;
       this.height = 80;
       this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
        }, 25);
    }
}
