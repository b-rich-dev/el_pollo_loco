/** Helper functions to manage enemy tracking behavior towards the character
* @param {Object} world - The game world object
*/
export function trackEndbossToCharacter(world) {
    if (world.endbossTrackInterval) clearInterval(world.endbossTrackInterval);
    let attackPlayed = false;
    world.endbossTrackInterval = setInterval(() => {
        const e = world.endboss;
        if (!e || e.isDeadChicken) { clearInterval(world.endbossTrackInterval); return; }
        if (!e.attackInterval) {
            const cx = world.character.x;
            if (e.x > cx + 240) { approachLeft(e); attackPlayed = false; }
            else if (e.x < cx - 340) { approachRight(e); attackPlayed = false; }
            else if (!attackPlayed) { attackPlayed = true; startEndbossAttack(e, world); }
        }
    }, 100);
}

/** Functions to manage enemy movement and direction changes
* @param {Object} e - The enemy object
*/
function approachLeft(e) { e.otherDirection = false; e.speed = 7.8; e.moveLeft(); e.walking(); e.enemyRandomJump(); }

/** Functions to manage enemy movement and direction changes
* @param {Object} e - The enemy object
*/
function approachRight(e) { e.otherDirection = true; e.speed = 7.8; e.moveRight(); e.walking(); e.enemyRandomJump(); }

/** Start the endboss attack sequence
* @param {Object} e - The enemy object
* @param {Object} world - The game world object
*/
function startEndbossAttack(e, world) {
    const finish = () => {
        if (e.x < world.character.x + 240 || e.x > world.character.x - 340) {
            clearInterval(world.endbossTrackInterval);
            e.alert(world, () => trackEndbossToCharacter(world), 300);
        }
    };
    if (typeof e.attack === 'function' && e.attack.length > 0) e.attack(finish);
    else { e.attack(); setTimeout(finish, 2000); }
}

/** Functions to handle enemy direction changes with cooldowns
* @param {Object} enemy - The enemy object
* @param {number} characterX - The x position of the character
* @param {number} directionCooldown - Cooldown time in milliseconds
*/
function handleLeftDirection(enemy, now, directionCooldown) {
    if (enemy._pendingDirection !== 'left') {
        enemy._pendingDirection = 'left';
        enemy._pendingSince = now;
    }
    if (now - enemy._pendingSince > directionCooldown) {
        enemy.otherDirection = false;
        enemy.lastDirectionChange = now;
        enemy._pendingDirection = null;
        enemy._pendingSince = null;
        return true;
    }
    return false;
}

/** Functions to handle enemy direction changes with cooldowns
* @param {Object} enemy - The enemy object
* @param {number} characterX - The x position of the character
* @param {number} directionCooldown - Cooldown time in milliseconds
*/
function handleRightDirection(enemy, now, directionCooldown) {
    if (enemy._pendingDirection !== 'right') {
        enemy._pendingDirection = 'right';
        enemy._pendingSince = now;
    }
    if (now - enemy._pendingSince > directionCooldown) {
        enemy.otherDirection = true;
        enemy.lastDirectionChange = now;
        enemy._pendingDirection = null;
        enemy._pendingSince = null;
        return true;
    }
    return false;
}

/** Handle enemy direction changes based on character position with cooldowns
* @param {Object} enemy - The enemy object
* @param {number} characterX - The x position of the character
* @param {number} directionCooldown - Cooldown time in milliseconds
*/
function handleEnemyDirectionChange(enemy, characterX, directionCooldown) {
    if (typeof enemy.lastDirectionChange !== 'number') enemy.lastDirectionChange = 0;
    const now = Date.now();
    let directionChanged = false;
    if (enemy.x > characterX && enemy.otherDirection !== false) {
        directionChanged = handleLeftDirection(enemy, now, directionCooldown);
    } else if (enemy.x < characterX && enemy.otherDirection !== true) {
        directionChanged = handleRightDirection(enemy, now, directionCooldown);
    } else {
        enemy._pendingDirection = null;
        enemy._pendingSince = null;
    }
    return directionChanged;
}

/** Start or restart enemy movement intervals based on their direction
* @param {Object} enemy - The enemy object
*/
function startEnemyMoveInterval(enemy) {
    clearInterval(enemy.moveLeftAnimateIntervalEnemy);
    if (enemy.moveInterval) {
        clearInterval(enemy.moveInterval);
        enemy.moveInterval = null;
    }
    enemy.speed = enemy.moveSpeed;
    if (enemy.otherDirection === true) {
        startMoveRightInterval(enemy);
    } else {
        startMoveLeftInterval(enemy);
    }
}

/** Start moving the enemy to the right at regular intervals
* @param {Object} enemy - The enemy object
*/
function startMoveRightInterval(enemy) {
    enemy.moveInterval = setInterval(() => {
        enemy.moveRight();
    }, 50);
}

/** Start moving the enemy to the left at regular intervals
* @param {Object} enemy - The enemy object
*/
function startMoveLeftInterval(enemy) {
    enemy.moveInterval = setInterval(() => {
        enemy.moveLeft();
    }, 50);
}

/** Main function to track all enemies towards the character
* @param {Object} world - The game world object
*/
export function enemyTrackingOfCharacter(world) {
    const directionCooldown = 2000;
    if (world.character.x) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) return;
            const directionChanged = handleEnemyDirectionChange(enemy, world.character.x, directionCooldown);
            if (directionChanged) startEnemyMoveInterval(enemy);
        });
    }
}
