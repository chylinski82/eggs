let egg11 = document.getElementById('egg-1-1');
let egg12 = document.getElementById('egg-1-2');
let egg13 = document.getElementById('egg-1-3');
let egg14 = document.getElementById('egg-1-4');
let eggBrokenLeft = document.getElementById('broken-egg-left');
let egg21 = document.getElementById('egg-2-1');
let egg22 = document.getElementById('egg-2-2');
let egg23 = document.getElementById('egg-2-3');
let egg24 = document.getElementById('egg-2-4');
let egg31 = document.getElementById('egg-3-1');
let egg32 = document.getElementById('egg-3-2');
let egg33 = document.getElementById('egg-3-3');
let egg34 = document.getElementById('egg-3-4');
let eggBrokenRight = document.getElementById('broken-egg-right');
let egg41 = document.getElementById('egg-4-1');
let egg42 = document.getElementById('egg-4-2');
let egg43 = document.getElementById('egg-4-3');
let egg44 = document.getElementById('egg-4-4');

let player = document.getElementById('character');
let playerImages = document.getElementsByClassName('player-image');
let leftArrow = document.querySelector('#arrow-left img');
let rightArrow = document.querySelector('#arrow-right img');
let playerIndex = 0;

let eggsUpLeft = [egg11, egg12, egg13, egg14, eggBrokenLeft];
let eggsDownLeft = [egg21, egg22, egg23, egg24, eggBrokenLeft];
let eggsUpRight = [egg31, egg32, egg33, egg34, eggBrokenRight];
let eggsDownRight = [egg41, egg42, egg43, egg44, eggBrokenRight];

let allEggs = [eggsUpLeft, eggsDownLeft, eggsUpRight, eggsDownRight];

let upLeft = document.getElementById("up-left");
let downLeft = document.getElementById("down-left");
let upRight = document.getElementById("up-right");
let downRight = document.getElementById("down-right");

let allAreas = [upLeft, downLeft, upRight, downRight];

let baskets = document.getElementsByClassName('basket');

let score = -1;
let speed = 500;
let speedScreen = document.getElementById('speed');
let callCount = 0;
let heartIndex = 4;

const colorfulEggs = () => {
    if((Math.floor(Math.random()*3)) + (Math.floor(Math.random()*2)) === 3) return  `#${Math.floor(Math.random()*16777215).toString(16)}`;
    else return '#ffc000';
}

const fallingEggs = (arr, speed) => {
    let eggsColor = colorfulEggs();
    let rollingEggs = document.getElementsByClassName('egg');
    for(egg of rollingEggs) egg.style.background = eggsColor;
    let scoreScreen = document.getElementById('score');
    callCount++;
    let timeDelay = 0;
    let hearts = document.getElementsByClassName('heart');
    let audioBump = new Audio('./audio/483602__raclure__game-bump.mp3');
    let audioBroken = new Audio('./audio/broken_egg.ogg');
    for(let i=0; i<arr.length; i++) {
        setTimeout (function() {            
            arr[i].style.visibility = 'visible';
            if(i<4) audioBump.play(); 
            if(i===3 && baskets[allEggs.indexOf(arr)].style.visibility === 'visible') clearTimeout(callCount*10);
            if(eggBrokenLeft.style.visibility === 'visible' || eggBrokenRight.style.visibility === 'visible') {
                hearts[Math.ceil(heartIndex)].style.visibility = 'hidden';
                heartIndex -= 1;
                audioBroken.play()
            }            
            }, timeDelay);    
        timeDelay += speed; 
        setTimeout(function() {                          
            arr[i].style.visibility = 'hidden';
            }, timeDelay);
            timeDelay += speed/10;
        }
        score++;     
        scoreScreen.innerHTML = `SCORE: ${score.toString()}`;
        speedScreen.innerHTML = `speed: ${speed.toString()}`
    }     
 
const catchingEggs = () => { 
    let eggIndex;
    document.querySelector('html').style.backgroundColor = 'transparent';
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
    player.removeEventListener('click', catchingEggs);
    leftArrow.removeEventListener('click', choosePlayerLeft);
    rightArrow.removeEventListener('click', choosePlayerRight);
    document.querySelector('html').requestFullscreen();
    myInterval = setInterval(function(){  
        if(score % 10 === 0) {
            speed -= 20;
        }
        if(heartIndex<-0) {
            clearInterval(myInterval);
            return;    
        }
        eggIndex = Math.floor(Math.random()*4); 
        fallingEggs(allEggs[eggIndex], speed);
        }, speed*5); 
}

upLeft.addEventListener('mousedown', function (){clickArea(upLeft)});
downLeft.addEventListener('mousedown', function (){clickArea(downLeft)});
upRight.addEventListener('mousedown', function (){clickArea(upRight)});
downRight.addEventListener('mousedown', function (){clickArea(downRight)});

const clickArea = (arr) => {
    for(basket of baskets) {
        basket.style.visibility = 'hidden'
    }
    switch(arr) {
        case upLeft || eggsUpLeft:
            baskets[0].style.visibility = 'visible';
            player.style.left = '-20%';
            break;
        case downLeft || eggsDownLeft:
            baskets[1].style.visibility = 'visible';
            player.style.left = '-25%';
            break;
        case upRight || eggsUpRight:
            baskets[2].style.visibility = 'visible';
            player.style.left = '45%';
            break;
        case downRight || eggsDownRight:
            baskets[3].style.visibility = 'visible';
            player.style.left = '55%';
            break;
        default:
            window.alert('error');
            break;
    }
}

const choosePlayerLeft = () => {
    for(img of playerImages) {
        img.style.display = 'none'
    }
    if(playerIndex===0) playerIndex = 4;
    else playerIndex--;
    playerImages[playerIndex].style.display = 'block';
}

const choosePlayerRight = () => {
    for(img of playerImages) {
        img.style.display = 'none'
    }
    if(playerIndex===4) playerIndex = 0;
    else playerIndex++;
    playerImages[playerIndex].style.display = 'block';
}

const playGame = () => { 
    screen.orientation.lock('landscape');
    document.querySelector('html').style.backgroundColor = 'rgb(31, 28, 28)';
    playerImages[0].style.display = 'block';
    player.addEventListener('click', catchingEggs);
    rightArrow.addEventListener('click', choosePlayerRight); 
    leftArrow.addEventListener('click', choosePlayerLeft);
     
}


//fallingEggs(allEggs[Math.floor(Math.random()*4)], speed);

//catchingEggs()
playGame()


