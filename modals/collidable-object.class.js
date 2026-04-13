/** CollidableObject class extending MoveableObject */
class CollidableObject extends MoveableObject {
    collidable = true;

    damage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
}
