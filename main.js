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

let score = -1;
let scoreScreen = document.getElementById('score');
let speed = 500;
let speedScreen = document.getElementById('speed');
let position;
let callCount = 0;
let stopped = false;

const fallingEggs = (arr, speed) => {
    callCount++;
    let timeDelay = 0;
    for(let i=0; i<arr.length; i++) {
        //if(speed >= 25) speed = 500 - score*15;
        setTimeout (function() {            
            arr[i].style.visibility = 'visible'; 
            if(i===3 && position === allEggs.indexOf(arr)) clearTimeout(callCount*10);
            if(eggBrokenLeft.style.visibility === 'visible' || eggBrokenRight.style.visibility === 'visible') stopped = true;
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
       
const clickArea = (arr) => {
    for(area of allAreas) {
        area.style.border = 'solid orange 3px'
    }
    arr.style.border = 'dotted red 5px';
    switch(arr) {
        case upLeft:
            position = 0;
            break;
        case downLeft:
            position = 1;
            break;
        case upRight:
            position = 2;
            break;
        case downRight:
            position = 3;
            break;
        default:
            window.alert('error')
    }
    return position
}

const catchingEggs = () => { 
    
    let eggIndex;
    myInterval = setInterval(function(){
        
        if(eggBrokenLeft.style.visibility === "visible" || eggBrokenRight.style.visibility === "visible") {
            clearInterval(myInterval);
            return
        }
        //if(speed >= 25) speed = 500 - score*15;
        eggIndex = Math.floor(Math.random()*4);
        fallingEggs(allEggs[eggIndex], speed);
        }, speed*5);     
}  

upLeft.addEventListener('mousedown', function (){clickArea(upLeft)});
downLeft.addEventListener('mousedown', function (){clickArea(downLeft)});
upRight.addEventListener('mousedown', function (){clickArea(upRight)});
downRight.addEventListener('mousedown', function (){clickArea(downRight)});
//fallingEggs(allEggs[Math.floor(Math.random()*4)], speed);

catchingEggs()
//downRight.addEventListener('click', catchingEggs);

 

//fallingEggs(allEggs[Math.floor(Math.random()*4)], speed);

