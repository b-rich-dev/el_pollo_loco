class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    level_end_x = 1540;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addBackgroundObject(backgroundObject) {
        this.backgroundObjects.push(backgroundObject);
    }
}
