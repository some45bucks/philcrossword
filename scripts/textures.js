blue = 'rgb(5,50,200)';
darkBlue = 'rgb(5,50,250)';
lightBlue = 'rgb(5,50,150)';
white = 'rgb(255,255,255)';
black = 'rgb(0,0,0)';

function texture(src){

    let image = new Image();
    image.ready = false;
    image.onload = function() {
        this.ready = true;
    };

    image.src = src;

    return image;
}

function button(color,outColor,textColor,text,font){
    return {
        rect: {
            color,
            outColor
        },
        text: {
            color:textColor,
            text,
            font
        }
    }
}

function dataObject(cx,cy,w,h,r){
    return {
        center:{
            x:cx,
            y:cy
        },

        rotation: r,

        width: w,

        height: h
    }
}

let startButtonTexture = button(blue,darkBlue,white,'START',"48px arial");

let playSceneButtonTexture = button(blue,darkBlue,white,'Play Scene',"48px arial");

let backgroundTexture = texture('images/brain.jpg');

let squareTexture = texture('images/square.png');

let squareSelectedTexture = texture('images/squareSelected.png');

let waterTexture = texture('images/water.jpg');

let bubbleTexture = texture('images/bubble.png');

let grayFishTexture = texture('images/grayFish.png');

let pinkFishTexture = texture('images/pinkFish.png');

let tealFishTexture = texture('images/tealFish.png');

let blueFishTexture = texture('images/blueFish.png');

let smallFishTexture = texture('images/smallFish.png');

let coinTexture = texture('images/coin.png');

let bustTexture = texture('images/bust.png');

let necklaceTexture = texture('images/necklace.png');

let starTexture = texture('images/star.png');