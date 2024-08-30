let score = 0;
let health = 0;
let gameInterval;
let interval_speed = 2000;
let displayTime = 1600;
let displayTimeout;
let max_health = 9;
health = max_health;
let no_of_level = ["Slow", "Medium", "Fast"];
let level = no_of_level[0];
// Flags to track if the level screen has been shown
let level1Shown = false;
let level2Shown = false;
let level3Shown = false;
let soundOn = false;

/** Elements dom id
 * for score , health , level ,start/restart buttons and holes
 */
const soundToggleButton = document.getElementById("soundToggleButton");
const soundToggleIcon = document.getElementById("soundToggleIcon");
const gameSound = document.getElementById("gameSound"); // Get the audio element
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const holes = document.getElementsByClassName("holes");
const winnerScreen = document.getElementById("WinnerScreen");
const gameOverScreen = document.getElementById("gameOverScreen");


scoreDisplay.textContent = score;
levelDisplay.textContent = level;
healthDisplay.textContent = health;

startBtn.addEventListener("click", function () {
    gameInterval = setInterval(startGame, interval_speed);
});

function toggleSound() {
    soundOn = !soundOn; // Toggle the sound state
    soundToggleIcon.classList.contains("fa-volume-mute") ?
        soundToggleIcon.classList.replace("fa-volume-mute", "fa-volume-high") :
        soundToggleIcon.classList.replace("fa-volume-high", "fa-volume-mute");

}
// Add event listener for the button to toggle sound
soundToggleButton.addEventListener("click", toggleSound);

//  play sound only if sound is enabled
function playSoundEffect() {
    if (soundOn) {
        gameSound.currentTime = 0.1; // Reset to the start for each play
        gameSound.play();
    } else {
        gameSound.pause();
    }
}
gameSound.onerror = function () {
    console.error("Audio file failed to load.");
    // Optionally provide a fallback sound or disable the sound toggle button
    soundToggleButton.disabled = true;
};
restartBtn.addEventListener("click", resartGame);
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

    } else if (score === 31 && !level2Shown) {
        showLevelScreen(no_of_level[1], function () {
            level2Shown = true;
            console.log("showscreem")
            displayImages();
        });

    } else if (score === 61 && !level3Shown) {
        showLevelScreen(no_of_level[2], function () {
            level3Shown = true;
            displayImages();
        });

    } else {
        displayImages();
    }
}

function showLevelScreen(levelText, callback) {
    winnerScreen.textContent = "Level: " + levelText;
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
    clearTimeout(displayTimeout);
    clearHoles();
    try {
        let generator1 = Math.floor(Math.random() * 9) + 1;
        let generator2;
        do {
            generator2 = Math.floor(Math.random() * 9) + 1;
        } while (generator2 === generator1);



        const hole_selector1 = document.getElementById(`hole${generator1}`);
        if (!hole_selector1) {
            throw new Error(`Hole with ID 'hole${generator1}' not found.`);
        } else {
            const img1 = document.createElement("img");
            img1.src = "assets/images/cute-dog-head.png";
            img1.alt = "Dog image";
            img1.classList.add("dog");
            hole_selector1.appendChild(img1);
            img1.addEventListener("click", whackDog);
            displayTimeout = setTimeout(function () {
                hole_selector1.innerHTML = '';
            }, displayTime);
        }



        const hole_selector2 = document.getElementById(`hole${generator2}`);
        if (!hole_selector2) {
            throw new Error(`Hole with ID 'hole${generator2}' not found.`);
        } else {
            const img2 = document.createElement("img");
            img2.src = "assets/images/cute-cat-head.png";
            img2.alt = "Cat image";
            img2.classList.add("cat");
            hole_selector2.appendChild(img2);
            img2.addEventListener("click", whackCat);
            displayTimeout = setTimeout(function () {
                hole_selector2.innerHTML = '';
            }, displayTime);
        }

    } catch (error) {
        alert(error);
    }
}
// Function to handle the click event when the cat image is clicked
function whackCat() {
    let cat = document.querySelector(".cat");
    cat.classList.add("disable")
    playSoundEffect();
    incrementScore(); 
}

// Function to handle the click event when the dog image is clicked
function whackDog() {
    let dog = document.querySelector(".dog");
    
    dog.classList.add("disable");
    playSoundEffect();
    weakeningHealth();
    
}

function incrementScore() {
    score++;
    scoreDisplay.textContent = score;

    if (score <= 30) {
        level = no_of_level[0];
        levelDisplay.textContent = level;
        interval_speed = 2000;
        displayTime = 1600;
    } else if (score >= 31 && score <= 60) {
        level = no_of_level[1];
        levelDisplay.textContent = level;
        interval_speed = 1500;
        displayTime = 1100;
    } else if (score >= 61 && score <= 99) {
        level = no_of_level[2];
        levelDisplay.textContent = level;
        interval_speed = 1000;
        displayTime = 800;
    } else {
        showWinnerScreen();
        clearInterval(gameInterval);
        clearTimeout(displayTimeout);
        endGame();
        return;
    }

    // Reset the interval to match the current level speed
    clearHoles();
    clearInterval(gameInterval);
    gameInterval = setInterval(startGame, interval_speed);
}

function weakeningHealth() {
    playSoundEffect();
    health--;
    if (health >= 1 && health <= 9) {
        healthDisplay.textContent = health;
    } else {
        clearInterval(gameInterval);
        clearTimeout(displayTimeout);
        displayGameOver();
        endGame();
    }
}

function displayGameOver() {
   
    gameOverScreen.style.display = "flex";
    setTimeout(function () {
        gameOverScreen.style.display = "none";
    }, 2000);
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(displayTimeout);
    resartGame();
    clearHoles();
}

function showWinnerScreen() {
    winnerScreen.textContent = "You Won";
    winnerScreen.style.display = "flex";
    setTimeout(function () {
        winnerScreen.style.display = "none";
    }, 2000);
}

function resartGame() {

    startBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    levelDisplay.textContent = no_of_level[0];
    health = max_health;
    healthDisplay.textContent = health;
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(gameInterval);
    clearTimeout(displayTimeout);
    interval_speed = 2000;
    displayTime = 1600;
    soundOn = false;
    if (soundToggleIcon.classList.contains("fa-volume-high") )
        {
            soundToggleIcon.classList.replace("fa-volume-high", "fa-volume-mute");

        }
    clearHoles();
    // Reset level screen flags
    level1Shown = false;
    level2Shown = false;
    level3Shown = false;
}