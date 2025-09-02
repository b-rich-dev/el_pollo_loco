class GameOverScreens {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.hoveredButton = null;
    }

    showLoseScreen() {
        this.drawGameOverScreen();
    }

    drawGameOverScreen() {
        // Hintergrundbild
        let img = new Image();
        img.src = 'assets/img/You won, you lost/Game Over.png'; // Pfad anpassen!
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Bildgröße und Position berechnen (z.B. 80% der Canvas-Größe, zentriert)
            let paddingX = this.canvas.width * 0.2;
            let paddingY = this.canvas.height * 0.1;
            let imgWidth = this.canvas.width * 0.6;
            let imgHeight = this.canvas.height * 0.6;
            let imgX = paddingX;
            let imgY = paddingY;

            this.ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

            // Buttonfläche berechnen
            let btnAreaWidth = this.canvas.width * 0.6;
            let btnAreaHeight = this.canvas.height * 0.1;
            let btnAreaX = this.canvas.width / 2 - btnAreaWidth / 2;
            let btnAreaY = imgY + imgHeight + 30;

            // Einzelne Button-Größe und Abstand
            let gap = 18;
            let btnWidth = (btnAreaWidth - gap) / 2;
            let btnHeight = btnAreaHeight;
            let radius = 10;

            // Button 1 ("Try again?")
            let btn1X = btnAreaX;
            let btn1Y = btnAreaY;

            // Button 2 ("Exit")
            let btn2X = btn1X + btnWidth + gap;
            let btn2Y = btnAreaY;

            // Funktion zum Zeichnen der Buttons mit Hover-Effekt
            const drawButtons = (hovered) => {
                // Button 1
                this.ctx.beginPath();
                this.ctx.moveTo(btn1X + radius, btn1Y);
                this.ctx.lineTo(btn1X + btnWidth - radius, btn1Y);
                this.ctx.quadraticCurveTo(btn1X + btnWidth, btn1Y, btn1X + btnWidth, btn1Y + radius);
                this.ctx.lineTo(btn1X + btnWidth, btn1Y + btnHeight - radius);
                this.ctx.quadraticCurveTo(btn1X + btnWidth, btn1Y + btnHeight, btn1X + btnWidth - radius, btn1Y + btnHeight);
                this.ctx.lineTo(btn1X + radius, btn1Y + btnHeight);
                this.ctx.quadraticCurveTo(btn1X, btn1Y + btnHeight, btn1X, btn1Y + btnHeight - radius);
                this.ctx.lineTo(btn1X, btn1Y + radius);
                this.ctx.quadraticCurveTo(btn1X, btn1Y, btn1X + radius, btn1Y);
                this.ctx.closePath();
                this.ctx.fillStyle = '#FF9C00';
                this.ctx.fill();
                this.ctx.lineWidth = 3;
                this.ctx.strokeStyle = '#9E5431';
                this.ctx.stroke();

                // Button 2
                this.ctx.beginPath();
                this.ctx.moveTo(btn2X + radius, btn2Y);
                this.ctx.lineTo(btn2X + btnWidth - radius, btn2Y);
                this.ctx.quadraticCurveTo(btn2X + btnWidth, btn2Y, btn2X + btnWidth, btn2Y + radius);
                this.ctx.lineTo(btn2X + btnWidth, btn2Y + btnHeight - radius);
                this.ctx.quadraticCurveTo(btn2X + btnWidth, btn2Y + btnHeight, btn2X + btnWidth - radius, btn2Y + btnHeight);
                this.ctx.lineTo(btn2X + radius, btn2Y + btnHeight);
                this.ctx.quadraticCurveTo(btn2X, btn2Y + btnHeight, btn2X, btn2Y + btnHeight - radius);
                this.ctx.lineTo(btn2X, btn2Y + radius);
                this.ctx.quadraticCurveTo(btn2X, btn2Y, btn2X + radius, btn2Y);
                this.ctx.closePath();
                this.ctx.fillStyle = '#FF9C00';
                this.ctx.fill();
                this.ctx.lineWidth = 3;
                this.ctx.strokeStyle = '#9E5431';
                this.ctx.stroke();

                // Text für beide Buttons, mit Hover-Farbe
                this.ctx.font = '24px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'alphabetic';
                this.ctx.fillStyle = (hovered === 'try') ? '#FFFFFF' : '#ffdd02ff';
                this.ctx.fillText('Try again?', btn1X + btnWidth / 2, btn1Y + btnHeight / 2 + 10);
                this.ctx.fillStyle = (hovered === 'exit') ? '#FFFFFF' : '#ffdd02ff';
                this.ctx.fillText('Exit', btn2X + btnWidth / 2, btn2Y + btnHeight / 2 + 10);
            };

            // Initial zeichnen
            drawButtons(null);

            // Mousemove für Hover-Effekt
            this.canvas.onmousemove = (e) => {
                let rect = this.canvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                let hovered = null;
                if (x > btn1X && x < btn1X + btnWidth && y > btn1Y && y < btn1Y + btnHeight) {
                    hovered = 'try';
                } else if (x > btn2X && x < btn2X + btnWidth && y > btn2Y && y < btn2Y + btnHeight) {
                    hovered = 'exit';
                }
                // Cursor ändern
                this.canvas.style.cursor = hovered ? 'pointer' : 'default';
                // Buttons neu zeichnen mit Hover-Farbe
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
                drawButtons(hovered);
            };

            // Klick-Listener für beide Buttons
            this.canvas.onclick = (e) => {
                let rect = this.canvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                // Try again?
                if (x > btn1X && x < btn1X + btnWidth && y > btn1Y && y < btn1Y + btnHeight) {
                    window.keyboard = new Keyboard();
                    keyboard = window.keyboard; // <--- Diese Zeile hinzufügen
                    window.world = new World(this.canvas, this.ctx, window.keyboard);
                }
                // Exit
                if (x > btn2X && x < btn2X + btnWidth && y > btn2Y && y < btn2Y + btnHeight) {
                    window.location.href = 'index.html'; // oder beliebige Exit-Logik
                }
            };
        };
    }
}

