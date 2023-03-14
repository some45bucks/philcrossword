function button(texture,onClick,posX,posY,width,height){
    let box = {
        x1:posX-(width/2),
        x2:posX+(width/2),
        y1:posY-(height/2),
        y2:posY+(height/2)
    };
    
    return {
        texture,
        onClick,
        box,
        width,
        height,
        posX,
        posY
    };
}