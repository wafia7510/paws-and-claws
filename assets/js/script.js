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
});
// StartGame Method
function startGame() {

    startBtn.style.display = "none";
    restartBtn.style.display = "inline-block";

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
function displayImages() {
    clearTimeout(displayTimeout)
    try {
        let generator1 = Math.floor(Math.random() * 9) + 1;
        let generator2;
        do {
            generator2 = Math.floor(Math.random() * 9) + 1;
        } while (generator2 === generator1);

        // Place the first image for dog
        const hole_selector1 = document.getElementById(`hole${generator1}`);
        if (!hole_selector1) {
            throw new Error(`Hole with ID 'hole${generator1}' not found.`);
        }

        else {
            const img1 = document.createElement("img");
            img1.src = "assets/images/cute-dog.jpg";
            img1.alt = "Dog image";
            img1.style.width = "100px";
            img1.style.height = "100px";
            img1.style.borderRadius = "50%";

            // Attach the whackDog function to the click event
            img1.addEventListener("click", whackDog);

            hole_selector1.appendChild(img1);
            displayTimeout = setTimeout(function () {
                hole_selector1.innerHTML = '';
            }, displayTime);
        }

        // Place the second image for cat
        const hole_selector2 = document.getElementById(`hole${generator2}`);
        if (!hole_selector2) {
            throw new Error(`Hole with ID 'hole${generator2}' not found.`);
        }
        else {
            const img2 = document.createElement("img");
            img2.src = "assets/images/cute-cat.jpg";
            img2.alt = "Cat image";
            img2.style.width = "100px";
            img2.style.height = "100px";
            img2.style.borderRadius = "50%";

            // Attach the whackCat function to the click event
            img2.addEventListener("click", whackCat);

            hole_selector2.appendChild(img2);
            displayTimeout = setTimeout(function () {
                hole_selector2.innerHTML = '';
            }, displayTime);
        }

    } catch (error) {
        alert(error)
    }

}
// Function to handle the click event when the cat image is clicked
function whackCat() {
    incrementScore();
    playSoundEffect();

}

// Function to handle the click event when the dog image is clicked
function whackDog() {
    weakeningHealth();
    playSoundEffect();
}
function incrementScore() {
    score++;
    scoreDisplay.textContent = score;

    if (score <= 10) {
        level = no_of_level[0];
        levelDisplay.textContent = level;
        interval_speed = 3000;
        displayTime = 2500;
    } else if (score > 10 && score <= 20) {
        level = no_of_level[1];
        levelDisplay.textContent = level;
        interval_speed = 2000;
        displayTime = 1500;
    } else if (score > 20 && score <= 30) {
        level = no_of_level[2];
        levelDisplay.textContent = level;
        interval_speed = 1000;
        displayTime = 800;
    } else {
        showWinnercreen();
        clearInterval(gameInterval);
        clearTimeout(displayTimeout);
        endGame();
        return;
    }

    // Reset the interval to match the current level speed
    clearInterval(gameInterval);
    gameInterval = setInterval(startGame, interval_speed);
}