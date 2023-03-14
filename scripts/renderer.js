'use strict';

let Graphics = (function (){
    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    function drawTriangle(spec) {
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);

        context.beginPath();

        context.moveTo(spec.points[0].x, spec.points[0].y);
        context.lineTo(spec.points[1].x, spec.points[1].y);
        context.lineTo(spec.points[2].x, spec.points[2].y);

        context.closePath();

        context.strokeStyle = spec.outlineColor;
        context.fillStyle = spec.fillColor;

        context.fill();
        context.stroke();

        context.restore();
    }

    function drawButton(texture,data){
        drawRectangle(texture.rect,data);
        drawWords(texture.text,data);
    }

    function drawWords(texture,data){
        context.save();

        context.strokeStyle = texture.color;
        context.fillStyle = texture.color;
        context.font = texture.font;//"48px serif";
        let w = context.measureText(texture.text).width;
        context.fillText(texture.text, data.center.x-w/2, data.center.y);

        context.restore();
    }

    function drawRectangle(texture,data) {
        context.save();

        context.translate(data.center.x, data.center.y);
        context.rotate(data.rotation);
        context.translate(-data.center.x, -data.center.y);

        context.strokeStyle = texture.outColor;
        context.fillStyle = texture.color;

        context.fillRect(
            data.center.x - data.width / 2, data.center.y - data.height / 2, 
            data.width, data.height);

        context.strokeRect(
            data.center.x - data.width / 2, data.center.y - data.height / 2, 
            data.width, data.height);

        context.restore();
    }

    function drawTexture(texture,data) {
        if (texture.ready) {
            context.save();
            
            context.translate(data.center.x, data.center.y);
            context.rotate(data.rotation);
            context.translate(-data.center.x, -data.center.y);

            context.drawImage(
                texture,
                data.center.x,
                data.center.y,
                data.width, data.height);

            context.restore();
        }
    }

    function drawParticles(particleSystem){
        let oX = particleSystem.posX;
        let oY = particleSystem.posY;

        for(let part = particleSystem.particles.length-1;part>=0;part--){
            let p = particleSystem.particles[part];
            let data = dataObject(p.current.pos.x+oX,p.current.pos.y+oY,p.size.x,p.size.y,p.current.rotation);

            drawTexture(p.texture,data);
        }
    }

    function drawCrossWord(crossword){
        for(let c of crossword.crossword){
            let data = dataObject(c.wX,c.wY,crossword.cellsizeX,crossword.cellsizeY,0)
            if(crossword.focused === c){
                drawTexture(crossword.textureSelected,data);
            }
            else{
                drawTexture(crossword.texture,data);
            }
            

            let data1 = dataObject(c.wX+crossword.cellsizeX/2,c.wY+crossword.cellsizeY/1.5,crossword.cellsizeX,crossword.cellsizeY,0)
            drawWords({
                color:"rgb(0,0,0)",
                text:c.currentLetter,
                font:"48px arial"
            },data1);

            if(c.subscript){
                let data2 = dataObject(c.wX+crossword.cellsizeX/9,c.wY+crossword.cellsizeY/4,crossword.cellsizeX,crossword.cellsizeY,0)
                drawWords({
                    color:"rgb(0,0,0)",
                    text:c.subscript,
                    font:"16px arial"
                },data2);
            }

            drawRectangle({
                color:'rgb(255,255,255)',
                outColor: 'rgb(0,0,0)'
            },
            dataObject(500,950,1000,100,0));
            drawWords({
                color:"rgb(0,0,0)",
                text:crossword.focused.hint,
                font:"32px arial"
            },
            dataObject(500,950,1000,100,0));
        }
    }

    return {
        canvas: canvas,
        clear : clear,
        drawTexture : drawTexture,
        drawRectangle : drawRectangle,
        drawTriangle : drawTriangle,
        drawButton: drawButton,
        drawParticles: drawParticles,
        drawCrossWord: drawCrossWord,
        drawWords: drawWords
    };
}());

