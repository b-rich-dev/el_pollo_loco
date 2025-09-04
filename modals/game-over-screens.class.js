class GameOverScreens {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    
    showLoseScreen() {
        getLoseScreen();
    }

    showWinScreen() {
        getWinScreen();
    }

}

