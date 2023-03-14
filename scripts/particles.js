function particles(
    posX,
    posY,
    pps,
    gravityVector,
    ageFunction,
    rotationFunction,
    directionFunc,
    speedFunc,
    sizeFunc,
    texturesFunc,
    randomNumFunc){
    let that = {
        particles: [],
        posX,
        posY
    };

    let on = false;

    let time = 0;

    that.turnOn = function(){
        on = true;
    }

    that.turnOff = function(){
        on = false;
    }

    that.update = function(elapsedTime){
        if(on){
            time += pps*elapsedTime/1000
            while(time >= 1){

                let num = randomNumFunc();

                let age = ageFunction(num);

                let rotation = rotationFunction(num);

                let direction = directionFunc(num);

                let speed = speedFunc(num);

                let size = sizeFunc(num);

                let texture = texturesFunc(num);

                that.particles.push({
                    rotation,
                    size,
                    texture,
                    current: {
                        age,
                        rotation,
                        speed,
                        pos: {
                            x:0,
                            y:0
                        },
                        vel: {
                            x:direction.x*speed,
                            y:direction.y*speed
                        }
                    }
                });

                time--;
            }
        }

        for(let particle in that.particles ){
            that.particles[particle].current.age -= elapsedTime/1000;
            that.particles[particle].current.rotation += that.particles[particle].rotation*elapsedTime/1000;
            that.particles[particle].current.pos.x += that.particles[particle].current.vel.x*elapsedTime/1000;
            that.particles[particle].current.pos.y += that.particles[particle].current.vel.y*elapsedTime/1000;
            that.particles[particle].current.vel.x += gravityVector.x*elapsedTime/1000;
            that.particles[particle].current.vel.y += gravityVector.y*elapsedTime/1000;
        }

        that.particles = that.particles.filter((x)=>{return x.current.age > 0})
        
    }

    return that;
}