/** Collision helper functions for game world 
* @param {World} world - The game world instance.
*/
function getActiveCollisions(world) {
    return world.level.enemies.filter(enemy => !enemy.isDeadChicken && world.character.isColliding(enemy));
}

/** Get enemies that are colliding from above with the character
* @param {World} world - The game world instance.
* @param {Enemy[]} collisions - Array of enemy instances colliding with the character.
* @returns {Enemy[]} - Array of enemy instances colliding from above.
*/
function getAboveCollisions(world, collisions) {
    return collisions.filter(enemy => world.character.isCollidingFromAbove(enemy));
}

/** Choose the closest enemy above the character
* @param {World} world - The game world instance.
* @param {Enemy[]} aboveList - Array of enemy instances colliding from above.
* @returns {Enemy} - The closest enemy above the character.
*/
function chooseClosestAbove(world, aboveList) {
    const charBottom = world.character.y + world.character.height;
    let best = aboveList[0];
    let bestDist = Math.abs(charBottom - best.y);
    for (let i = 1; i < aboveList.length; i++) {
        const e = aboveList[i];
        const dist = Math.abs(charBottom - e.y);
        if (dist < bestDist) {
            best = e;
            bestDist = dist;
        }
    }
    return best;
}

/** Process side hit collisions between the character and enemies
* @param {World} world - The game world instance.
* @param {Enemy[]} collisions - Array of enemy instances colliding with the character.
*/
function processSideHit(world, collisions) {
    const anySideHit = collisions.some(enemy => !enemy.isDeadChicken);
    if (anySideHit && !world.character.isHurt()) characterDyingToDos(world);
}

/** Check for collisions between the character and enemies
* @param {World} world - The game world instance.
*/
export function checkEnemyCollisions(world) {
    const collisions = getActiveCollisions(world);
    if (collisions.length === 0) return;

    const above = getAboveCollisions(world, collisions);
    if (above.length > 0) {
        const best = chooseClosestAbove(world, above);
        if (typeof best.die === 'function' && !best.isDeadChicken) enemyDyingToDos(world, best);
        return;
    }

    processSideHit(world, collisions);
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

    const damage = obj.isCoin ? 10 : 20;
    let applied = false;
    if (typeof enemy.receiveDamage === 'function') applied = enemy.receiveDamage(damage);
    else applied = toDoIfNoReceiveDamage(world, obj, enemy, damage);

    if (typeof world.statusBarBoss?.setPercentage === 'function') world.statusBarBoss.setPercentage(enemy.endbossEnergy);
    if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) setObjectAnimation(obj, enemy, setHit);
    else removeThrowableAndSetHit(world, objIndex, setHit);
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
    if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) setObjectAnimation(obj, enemy, setHit);
    else removeThrowableAndSetHit(world, objIndex, setHit);
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

/** Remove the throwable object from the world and call setHit */
function removeThrowableAndSetHit(world, objIndex, setHit) {
    if (typeof setHit === 'function') setHit();
    if (world && Array.isArray(world.throwableObject) && typeof objIndex === 'number') {
        world.throwableObject.splice(objIndex, 1);
    }
}

/** Handle the actions when an enemy is hurt
* @param {Enemy} enemy - The enemy instance.
*/
function killEnemy(enemy) {
    enemy.die(() => {
        enemy._remove = true;
    });
}

/** Fallback function to handle damage when no specific receiveDamage function exists
* @param {World} world - The game world instance.
* @param {ThrowableObject} obj - The throwable object instance.
* @param {Enemy} enemy - The enemy instance.
* @param {number} damage - The amount of damage to apply.
* @returns {boolean} - Returns true if damage was applied, false otherwise.
*/
function toDoIfNoReceiveDamage(world, obj, enemy, damage) {
    if (!enemy) return false;

    enemy.endbossEnergy -= damage;
    if (enemy.endbossEnergy < 0) enemy.endbossEnergy = 0;
    hurtBehavior(world, enemy);
    if (enemy.endbossEnergy === 0) killEnemy(enemy);
    return true;
}
