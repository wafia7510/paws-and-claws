let score = 0;
let health = 0;
let level = 0;
let gameDuration = 20000; // 20 seconds per level
let gameInterval;
let elementInterval;
const holeElements=[]
/** Elements dom id
 * for score , health , level ,start/restart buttons and holes
*/
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const holes = document.querySelectorAll('.holes');

function startGame(){
    clearTimeout(timeClock);// prms has to go in
    clearInterval(intervalSpeed);
    let timeClock=setTimeout(showHoles, 3000);
    let intervalSpeed=setInterval(showHoles,3000);
}
function endGame(){}
function restartGame(){
}
function nextLevel(){
}
function healthBoost(){}
function incrementScore(){

}
function scoreDown(){}
function whackACat(){}
function whackADog(){}
function showHoles(){}
