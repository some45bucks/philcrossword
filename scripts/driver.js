'use strict';

let previousTime = performance.now();
let myInputKey = Input.Keyboard();
let myInputMouse= Input.Mouse();

let startGame = false;
let gameStarted = false;

let plays = 0;

let scenePlaying = false;

let gameOver = false;

let sceneTime = 0;

let fishes = [];

let bubbles = particles(1500,1000,50,{x:0,y:-180},
    (x)=>{
        return x/10;
    },
    (x)=>{
        return 0;
    },
    (a)=>{
        a = (Math.random()*360);
        let x = Math.cos(a*Math.PI/180);
        let y = Math.sin(a*Math.PI/180);
        return {x,y};
    },
    (x)=>{
        return x*2;
    },
    (x)=>{
        return {x:x,y:x};
    },
    (x)=>{
        return bubbleTexture;
    },
    ()=>{
        return Math.random()*50;
    }
    );

let sparkels = particles(1000,500,100,{x:0,y:0},
    (x)=>{
        return x/10;
    },
    (x)=>{
        return x/100;
    },
    (a)=>{
        a = (Math.random()*360);
        let x = Math.cos(a*Math.PI/180);
        let y = Math.sin(a*Math.PI/180);
        return {x,y};
    },
    (x)=>{
        return x*2;
    },
    (x)=>{
        return {x:x,y:x};
    },
    (x)=>{
        return starTexture;
    },
    ()=>{
        return Math.random()*50;
    }
    );

let crossWord = crossword(squareTexture,squareSelectedTexture,[
    [' ',' ',' ',' ',' ',' ',' ',' ','T8',' ',],
    [' ',' ',' ',' ',' ',' ','G7',' ','H',' ',],
    [' ',' ',' ',' ',' ',' ','R4','A','R','E',],
    [' ',' ',' ','P6',' ',' ','A',' ','E',' ',],
    [' ',' ','F3','I','F','T','Y',' ','E',' ',],
    [' ','T5',' ','N',' ',' ',' ',' ',' ',' ',],
    ['N2','E','C','K',' ',' ',' ',' ',' ',' ',],
    [' ', 'A',' ',' ',' ',' ',' ',' ',' ',' ',],
    ['B1','L','U','E',' ',' ',' ',' ',' ',' ',],
],
{
    0:"Click on a cell with a number or the 'Play Scene' button",
    1:"What is the color of the first fish to finish?",
    2:"Which body part is the right most object worn on?",
    3:"How many bubbles are relased per second?",
    4:"What is one word that can be use to describe the falling obejcts?",
    5:"What is the color of the fish that swims weird?",
    6:"What is the color of the fish that finishes the same time as another?",
    7:"What is the color of the fish that leaves the screen last?",
    8:"How many factors does a crossword entry depend on? (Haack pg 86)",
},
9,10,180,180,630,700,myInputMouse);



myInputKey.registerAnyCommand('crossword',(key)=>{crossWord.setFocus(key);});

function startOnClick(){
    startGame = true;
}

function playScene(){
    plays++;
    scenePlaying = true;
}

function resetfish(){
    fishes = [];
    fishes.push(fish(grayFishTexture,{x:-250,y:200},2000,55,100,50));
    fishes.push(fish(pinkFishTexture,{x:-350,y:-215},2000,990,100,100));
    fishes.push(fish(tealFishTexture,{x:350,y:-115},1000,990,100,100));
    fishes.push(fish(blueFishTexture,{x:550,y:115},1000,30,100,100));
    fishes.push(fish(smallFishTexture,{x:-300,y:150},2000,300,50,50));

    fishes.push(fish(coinTexture,{x:-50,y:300},1300,0,50,50));
    fishes.push(fish(bustTexture,{x:40,y:350},1500,0,150,150));
    fishes.push(fish(necklaceTexture,{x:-10,y:300},1650,0,70,70));
}

let startButton = button(startButtonTexture,startOnClick,Graphics.canvas.width/2,Graphics.canvas.height/2,250,125);
let playSceneButton = button(playSceneButtonTexture,playScene,1500,500,250,125);
myInputMouse.registerClickCommand('start',startButton.box,startButton.onClick);

function processInput(elapsedTime) {
    myInputKey.update(elapsedTime);
    myInputMouse.update(elapsedTime);
}

function update(elapsedTime) {
    if(startGame){
        if(!gameOver){
            if(!gameStarted){
                myInputMouse.removeClickCommand('start');
                myInputMouse.registerClickCommand('play',playSceneButton.box,playSceneButton.onClick);
                gameStarted = true
            }
    
            bubbles.update(elapsedTime);
    
            for(let fish of fishes){
                    
                fish.update(elapsedTime);
            }
    
            if(scenePlaying){
                
                if(sceneTime === 0){
                    myInputMouse.removeClickCommand('play');
                    resetfish();
                }
    
                bubbles.turnOn();
    
                sceneTime += elapsedTime;
    
                if(sceneTime >= 4000){
                    myInputMouse.registerClickCommand('play',playSceneButton.box,playSceneButton.onClick);
                    sceneTime = 0;
                    scenePlaying = false;
                }
            }
            else{
                bubbles.turnOff();
            }
    
            if(crossWord.isCorrect()){
                gameOver = true;
            }
        }
        else{
            sparkels.turnOn();
            sparkels.update(elapsedTime);
            myInputMouse.removeClickCommand('play');
            resetfish();
            sceneTime = 0;
            scenePlaying = false;
        }   
    }
}

function render() {
    Graphics.clear();

    if(startGame){
        if(!gameOver){
            Graphics.drawTexture(waterTexture,dataObject(Graphics.canvas.width/2,0,Graphics.canvas.width/2,Graphics.canvas.height,0));
            if(!scenePlaying){
                
                Graphics.drawButton(playSceneButton.texture,dataObject(playSceneButton.posX,playSceneButton.posY,playSceneButton.width,playSceneButton.height,0))
            }

            for(let f of fishes){
                Graphics.drawTexture(f.texture,dataObject(f.xPos,f.yPos,f.width,f.height,f.rot))
            }

            Graphics.drawParticles(bubbles);

            Graphics.drawTexture(backgroundTexture,dataObject(0,0,Graphics.canvas.width/2,Graphics.canvas.height,0));

            Graphics.drawCrossWord(crossWord);
        }
        else{
            Graphics.drawParticles(sparkels);
            
            Graphics.drawWords({
                color:"rgb(0,0,0)",
                text:"You Justified the Cross Word! \n With only "+plays+" scene plays",
                font:"68px arial"
            },dataObject(1000,500,10,10,0));
        }
        
        

    }
    else{
        Graphics.drawButton(startButton.texture,dataObject(startButton.posX,startButton.posY,startButton.width,startButton.height,0))
    }
}

function gameLoop(time) {
    
    let elapsedTime = time - previousTime;
    previousTime = time;

    processInput(elapsedTime);
    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
