export function trackEndbossToCharacter(world) {
    if (world.endbossTrackInterval) {
        clearInterval(world.endbossTrackInterval);
    }
    let attackPlayed = false;
    world.endbossTrackInterval = setInterval(() => {
        if (!world.endboss || world.endboss.isDeadChicken) {
            clearInterval(world.endbossTrackInterval);
            return;
        }
        if (!world.endboss.attackInterval) {
            if (world.endboss.x > world.character.x + 240) {
                world.endboss.otherDirection = false;
                world.endboss.speed = 5;
                world.endboss.moveLeft();
                world.endboss.walking();
                world.endboss.enemyRandomJump();
                attackPlayed = false;
            } else if (world.endboss.x < world.character.x - 340) {
                world.endboss.otherDirection = true;
                world.endboss.speed = 5;
                world.endboss.moveRight();
                world.endboss.walking();
                world.endboss.enemyRandomJump();
                attackPlayed = false;
            } else {
                if (!attackPlayed) {
                    attackPlayed = true;
                    if (typeof world.endboss.attack === 'function' && world.endboss.attack.length > 0) {
                        world.endboss.attack(() => {
                            if (world.endboss.x < world.character.x + 240 || world.endboss.x > world.character.x - 340) {
                                clearInterval(world.endbossTrackInterval);
                                world.endboss.alert(world, () => trackEndbossToCharacter(world), 300);
                            }
                        });
                    } else {
                        world.endboss.attack();
                        setTimeout(() => {
                            if (world.endboss.x < world.character.x + 240 || world.endboss.x > world.character.x - 340) {
                                clearInterval(world.endbossTrackInterval);
                                world.endboss.alert(world, () => trackEndbossToCharacter(world), 300);
                            }
                        }, 2000);
                    }
                }
            }
        }
    }, 100);
}

export function enemyTrackingOfCharacter(world) {
    const directionCooldown = 2000;
    if (world.character.x) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                return;
            }
            if (typeof enemy.lastDirectionChange !== 'number') {
                enemy.lastDirectionChange = 0;
            }
            const now = Date.now();
            let directionChanged = false;
            if (enemy.x > world.character.x && enemy.otherDirection !== false) {
                if (enemy._pendingDirection !== 'left') {
                    enemy._pendingDirection = 'left';
                    enemy._pendingSince = now;
                }
                if (now - enemy._pendingSince > directionCooldown) {
                    enemy.otherDirection = false;
                    enemy.lastDirectionChange = now;
                    enemy._pendingDirection = null;
                    enemy._pendingSince = null;
                    directionChanged = true;
                }
            } else if (enemy.x < world.character.x && enemy.otherDirection !== true) {
                if (enemy._pendingDirection !== 'right') {
                    enemy._pendingDirection = 'right';
                    enemy._pendingSince = now;
                }
                if (now - enemy._pendingSince > directionCooldown) {
                    enemy.otherDirection = true;
                    enemy.lastDirectionChange = now;
                    enemy._pendingDirection = null;
                    enemy._pendingSince = null;
                    directionChanged = true;
                }
            } else {
                enemy._pendingDirection = null;
                enemy._pendingSince = null;
            }
            if (directionChanged) {
                clearInterval(enemy.moveLeftAnimateIntervalEnemy);
                if (enemy.moveInterval) {
                    clearInterval(enemy.moveInterval);
                    enemy.moveInterval = null;
                }
                enemy.speed = enemy.moveSpeed;
                if (enemy.otherDirection === true) {
                    enemy.moveInterval = setInterval(() => {
                        enemy.moveRight();
                    }, 50);
                } else {
                    enemy.moveInterval = setInterval(() => {
                        enemy.moveLeft();
                    }, 50);
                }
            }
        });
    }
}
