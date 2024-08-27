let score = 0;
let health = 0;
let gameInterval;
let interval_speed = 3000;
let displayTime = 2500;
let displayTimeout;
let max_health = 9;
health=max_health;
let no_of_level = ["Slow", "Medium", "Fast"];
let level =no_of_level[0];
// Flags to track if the level screen has been shown
let level1Shown = false;
let level2Shown = false;
let level3Shown = false;


/** Elements dom id
 * for score , health , level ,start/restart buttons and holes
*/
const soundToggleButton = document.getElementById("soundToggleButton");
const gameSound = document.getElementById("gameSound"); // Get the audio element
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const holes = document.getElementsByClassName("holes");
const winnerScreen = document.getElementById("WinnerScreen");
const gameOverScreen=document.getElementById("gameOverScreen");
const soundBtn = document.getElementById("soundButton");
const grid = document.getElementById("grid"); // Get the grid element
scoreDisplay.textContent=score;
levelDisplay.textContent=level;
healthDisplay.textContent=health;
startBtn.addEventListener("click",function(){
    gameInterval = setInterval(startGame, interval_speed);
})
// StartGame Method
function startGame() {

    stBtn.style.display = "none";
    restBtn.style.display = "inline-block";

    // Clear all holes before starting the next iteration
    clearHoles();

    // Show level screen only once at specific scores
    if (score === 0 && !level1Shown) {
        showLevelScreen(no_of_level[0], function () {
            level1Shown = true;
            displayImages();
        });
    } else if (score === 10 && !level2Shown) {
        showLevelScreen(no_of_level[1], function () {
            level2Shown = true;
            displayImages();
        });
    } else if (score === 20 && !level3Shown) {
        showLevelScreen(no_of_level[2], function () {
            level3Shown = true;
            displayImages();
        });
    } else {
        displayImages();
    }
}
function showLevelScreen(levelText, callback) {
    winnerScreen.textContent = "Level:" + levelText;
    winnerScreen.style.display = "flex";
    setTimeout(function () {
        winnerScreen.style.display = "none";
        callback(); // Resume the game
    }, 1500);
}

function clearHoles() {
    for (let i = 0; i < holes.length; i++) {
        holes[i].innerHTML = '';
    }
}