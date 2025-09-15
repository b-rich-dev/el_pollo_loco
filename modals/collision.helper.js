/** Collision helper functions for game world 
* @param {World} world - The game world instance.
*/
export function checkEnemyCollisions(world) {
    world.level.enemies.forEach((enemy, index) => {
        if (world.character.isColliding(enemy)) {
            if (world.character.isCollidingFromAbove(enemy)) {
                if (typeof enemy.die === 'function' && !enemy.isDeadChicken) enemyDyingToDos(world, enemy);
            } else {
                if (!enemy.isDeadChicken && !world.character.isHurt()) characterDyingToDos(world);
            }
        }
    });
}

/** Handle the actions when an enemy dies
* @param {World} world - The game world instance.
* @param {Enemy} enemy - The enemy instance.
*/
export function enemyDyingToDos(world, enemy) {
    killEnemy(enemy);
    world.character.littleJump();
}

/** Handle the actions when the character is hurt
* @param {World} world - The game world instance.
*/
export function characterDyingToDos(world) {
    world.character.hit();
    world.statusBarHealth.setPercentage(world.character.energy);
    if (world.character.energy <= 0) {
        world.character.die();
    }
}

/** Check for collisions between the character and bottles
* @param {World} world - The game world instance.
*/
export function checkBottleCollisions(world) {
    world.level.bottles.forEach((bottle, index) => {
        if (world.character.isColliding(bottle)) {
            world.statusBarBottle.collectItem('bottle');
            world.level.bottles.splice(index, 1);
        }
    });
}

/** Check for collisions between the character and coins
* @param {World} world - The game world instance.
*/
export function checkCoinCollisions(world) {
    world.level.coins.forEach((coin, index) => {
        if (world.character.isColliding(coin)) {
            world.statusBarCoins.collectItem('coin');
            world.level.coins.splice(index, 1);
        }
    });
}

/** Check for collisions between throwable objects and enemies
* @param {World} world - The game world instance.
*/
export function checkThrowableObjectEnemyCollisions(world) {
    world.throwableObject.forEach((obj, objIndex) => {
        let hit = false;
        world.level.enemies.forEach((enemy) => {
            if (!hit && obj.isColliding && obj.isColliding(enemy) && !enemy.isDeadChicken) {
                if (enemy instanceof Endboss) {
                    handleEndbossCollision(world, obj, objIndex, enemy, () => (hit = true));
                } else {
                    handleEnemyCollision(world, obj, objIndex, enemy, () => (hit = true));
                }
            }
        });
    });
}

/** Handle the collision between a throwable object and the endboss
* @param {World} world - The game world instance.
* @param {ThrowableObject} obj - The throwable object instance.
* @param {number} objIndex - The index of the throwable object.
* @param {Endboss} enemy - The endboss instance.
* @param {Function} setHit - The function to call when a hit is detected.
*/
function handleEndbossCollision(world, obj, objIndex, enemy, setHit) {
    if (enemy.endbossEnergy <= 0) return;
    if (obj.isCoin) enemy.endbossEnergy -= 10;
    else enemy.endbossEnergy -= 20;
    if (enemy.endbossEnergy < 0) enemy.endbossEnergy = 0;
    hurtBehavior(world, enemy);
    if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
        setObjectAnimation(obj, enemy, setHit);
    } else {
        setHit();
        world.throwableObject.splice(objIndex, 1);
    }
    if (enemy.endbossEnergy === 0) killEnemy(enemy);
}

/** Handle the actions when an enemy is hurt
* @param {World} world - The game world instance.
* @param {Enemy} enemy - The enemy instance.
*/
function hurtBehavior(world, enemy) {
    enemy.hurt();
    world.statusBarBoss.setPercentage(enemy.endbossEnergy);
}

/** Handle the collision between a throwable object and a regular enemy
* @param {World} world - The game world instance.
* @param {ThrowableObject} obj - The throwable object instance.
* @param {number} objIndex - The index of the throwable object.
* @param {Enemy} enemy - The enemy instance.
* @param {Function} setHit - The function to call when a hit is detected.
*/
function handleEnemyCollision(world, obj, objIndex, enemy, setHit) {
    if (typeof enemy.die === 'function') {
        enemy.die(() => {
            enemy._remove = true;
        });
    }
    if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
        setObjectAnimation(obj, enemy, setHit);
    } else {
        setHit();
        world.throwableObject.splice(objIndex, 1);
    }
}

/** Handle the object animation when it hits an enemy 
* @param {ThrowableObject} obj - The throwable object instance.
* @param {Enemy} enemy - The enemy instance.
* @param {Function} setHit - The function to call when a hit is detected.
*/
function setObjectAnimation(obj, enemy, setHit) {
    obj.x = enemy.x;
    obj.y = enemy.y;
    obj.speedY = 0;
    obj.acceleration = 0;
    obj.animateSplash();
    setHit();
}

/** Handle the actions when an enemy is hurt
* @param {Enemy} enemy - The enemy instance.
*/
function killEnemy(enemy) {
    enemy.die(() => {
        enemy._remove = true;
    });
}
