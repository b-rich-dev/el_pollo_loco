export function checkEnemyCollisions(world) {
    world.level.enemies.forEach((enemy, index) => {
        if (world.character.isColliding(enemy)) {
            if (world.character.isCollidingFromAbove(enemy)) {
                if (typeof enemy.die === 'function' && !enemy.isDeadChicken) {
                    enemy.die(() => {
                        enemy._remove = true;
                    });
                    world.character.littleJump();
                }
            } else {
                if (!enemy.isDeadChicken && !world.character.isHurt()) {
                    world.character.hit();
                    world.statusBarHealth.setPercentage(world.character.energy);
                    if (world.character.energy <= 0) {
                        world.character.die();
                    }
                }
            }
        }
    });
}

export function checkBottleCollisions(world) {
    world.level.bottles.forEach((bottle, index) => {
        if (world.character.isColliding(bottle)) {
            world.statusBarBottle.collectItem('bottle');
            world.level.bottles.splice(index, 1);
        }
    });
}

export function checkCoinCollisions(world) {
    world.level.coins.forEach((coin, index) => {
        if (world.character.isColliding(coin)) {
            world.statusBarCoins.collectItem('coin');
            world.level.coins.splice(index, 1);
        }
    });
}

export function checkThrowableObjectEnemyCollisions(world) {
    world.throwableObject.forEach((obj, objIndex) => {
        let hit = false;
        world.level.enemies.forEach((enemy, enemyIndex) => {
            if (!hit && obj.isColliding && obj.isColliding(enemy) && !enemy.isDeadChicken) {
                if (enemy instanceof Endboss) {
                    if (enemy.endbossEnergy > 0) {
                        if (obj.isCoin) {
                            enemy.endbossEnergy -= 10;
                        } else {
                            enemy.endbossEnergy -= 20;
                        }
                        if (enemy.endbossEnergy < 0) enemy.endbossEnergy = 0;
                        enemy.hurt();
                        world.statusBarBoss.setPercentage(enemy.endbossEnergy);
                        if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
                            obj.x = enemy.x;
                            obj.y = enemy.y;
                            obj.speedY = 0;
                            obj.acceleration = 0;
                            obj.animateSplash();
                            hit = true;
                        } else {
                            hit = true;
                            world.throwableObject.splice(objIndex, 1);
                        }
                        if (enemy.endbossEnergy === 0) {
                            enemy.die(() => {
                                enemy._remove = true;
                            });
                        }
                    }
                } else {
                    if (typeof enemy.die === 'function') {
                        enemy.die(() => {
                            enemy._remove = true;
                        });
                    }
                    if (obj.IMAGES_BOTTLE_ROTATION && !obj.isCoin && !obj.isSplashing) {
                        obj.x = enemy.x;
                        obj.y = enemy.y;
                        obj.speedY = 0;
                        obj.acceleration = 0;
                        obj.animateSplash();
                        hit = true;
                    } else {
                        hit = true;
                        world.throwableObject.splice(objIndex, 1);
                    }
                }
            }
        });
    });
}
