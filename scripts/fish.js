function fish(texture,vel,xPos,yPos,width,height){
    let that = {
        yPos,
        xPos,
        texture,
        height,
        width
    };

    that.update = function(elapsedTime){
        that.xPos += vel.x*elapsedTime/1000
        that.yPos += vel.y*elapsedTime/1000
    }

    that.rot = Math.atan(yPos/xPos)

    return that;

}