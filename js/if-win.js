const smilies = [trashSmile(), lameSmile(), mehSmile(), basicSmile(), alrightSmile(), chillSmile(), coolSmile(), awesomeSmile(), epicSmile(), absolutelyGreatSmile()];

function setWinInfo(){
    const finalScore = document.getElementById("finalScore");
    const finalSentence = document.getElementById("finalSentence");
    if (window.world && window.world.gameOver) {
        if (finalScore && finalSentence) {
            const coins = window.world.statusBarCoins.coins;
            finalScore.textContent = `${coins}`;
            let smileyIndex = coins;
            if (smileyIndex < 0) smileyIndex = 0;
            if (smileyIndex >= smilies.length) smileyIndex = smilies.length - 1;
            finalSentence.innerHTML = smilies[smileyIndex];
        } else {
            console.warn('finalScore oder finalSentence ist null!');
        }
    }
}
