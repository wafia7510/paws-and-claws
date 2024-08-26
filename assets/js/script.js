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
