class GameOverScreens {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.hoveredButton = null;
    }
    
    showLoseScreen() {
        getLoseScreen();
    }

    showWinScreen() {
        getWinScreen();
    }

}

