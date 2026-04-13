/** Class for background objects in the game */
class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /** Create a background object
    * @param {string} imagePath - The path to the image for the background object
    * @param {number} x - The x-coordinate position of the background object
    * @param {number} y - The y-coordinate position of the background object
    */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}
