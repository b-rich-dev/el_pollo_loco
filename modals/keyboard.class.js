/** Class to track the state of keyboard keys */
class Keyboard {
    LEFT = false;
    UP = false;
    RIGHT = false;
    DOWN = false;
    SPACE = false;
    D = false;
    NUMPAD_ZERO = false;
}

/** Create a global keyboard instance */
window.keyboard = new Keyboard();
