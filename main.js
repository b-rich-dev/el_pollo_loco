let main = document.getElementById("main");
let startScreen = document.getElementById("startScreen");
let gameCanvas = document.getElementById("gameCanvas");
// let sCbuttons = document.querySelectorAll(".sc-btn");
let dialog = document.getElementById("howToPlayDialog");

function startGame() {
    main.style.display = "none";
    gameCanvas.style.display = "block";
    // sCbuttons.forEach(btn => btn.style.pointerEvents = "none");
    init();
}

function showHowToPlay() {   
    dialog.showModal();
}

function closeHowToPlayDialog() {
    dialog.close();
}

function showImprint() {
    window.location.href = "imprint.html";
}

document.getElementById('howToPlayDialog').addEventListener('click', function(event) {
    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent.contains(event.target)) {
        closeHowToPlayDialog();
    }
});