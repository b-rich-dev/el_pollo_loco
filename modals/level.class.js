/** Class representing a game level */
class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    coins = [];
    bottles = [];
    level_end_x = 2260;

    /** Create a level with specified game elements
    * @param {Enemy[]} enemies - Array of enemy instances in the level
    * @param {Cloud[]} clouds - Array of cloud instances in the level
    * @param {BackgroundObject[]} backgroundObjects - Array of background object instances in the level
    * @param {Coin[]} coins - Array of coin instances in the level
    * @param {Bottle[]} bottles - Array of bottle instances in the level
    */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    /** Add an enemy to the level
    * @param {Enemy} enemy - The enemy instance to add.
    */
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    /** Add a background object to the level
    * @param {BackgroundObject} backgroundObject - The background object instance to add.
    */
    addBackgroundObject(backgroundObject) {
        this.backgroundObjects.push(backgroundObject);
    }
}
