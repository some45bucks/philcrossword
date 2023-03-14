'use strict';

let Input = (function() {
    function Keyboard() {
        let that = {
            keys : {},
            handlers : {},
            universalhandlers: []
        };

        function keyPress(e) {
            if(!that.keys[e.key])
            {
                that.keys[e.key] = {
                    t:e.timeStamp,
                    done:false
                };
            }
            
        }
        
        function keyRelease(e) {
            delete that.keys[e.key];
        }

        window.addEventListener('keydown', keyPress);
        window.addEventListener('keyup', keyRelease);

        that.registerCommand = function(key, handler) {
            that.handlers[key] = handler;
        };

        that.registerAnyCommand = function(name,handler) {
            that.universalhandlers.push({name,handler});
        };

        that.update = function(elapsedTime) {
            
            for (let key in that.keys) {
                if (that.keys.hasOwnProperty(key)) {
                    
                    if (!that.keys[key].done) {
                        if(that.handlers[key]){
                            that.handlers[key](elapsedTime);
                        }
                        
                        for(let handler of that.universalhandlers){
                            handler.handler(key,elapsedTime);
                        }

                        that.keys[key].done = true;
                    }

                    
                }
            }
        };

        return that;
    }

    function Mouse() {
        let canvas = document.getElementById('id-canvas');

        let that = {
            clicks: [],
            //hovers: [],
            clickHandlers : [],
            //hoverHandlers: []
        };

        function getMousePos(evt) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
                y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            };
        }

        function click(e) {
            let mousePos = getMousePos(e);
            
            that.clicks.push({mousePos,timeStamp:e.timeStamp,done:false});
        }

        // function hover(e) {
        //     let mousePos = getMousePos(e);
            
        //     that.hovers.push({mousePos,timeStamp:e.timeStamp,done:false});
        // }

        

        window.addEventListener('click', click);
        //window.addEventListener('mousemove', hover);

        that.registerClickCommand = function(name,box,handler) {
            that.clickHandlers.push({name,box,handler});
        };

        // that.registerHoverCommand = function(name,box,handler) {
        //     that.hoverHandlers.push({name,box,handler});
        // };

        that.removeClickCommand = function(name) {
            that.clickHandlers = that.clickHandlers.filter(item => item.name != name);
        };

        // that.removeHoverCommand = function(name) {
        //     that.hoverHandlers = that.hoverHandlers.filter(item => item.name != name);
        // };


        that.update = function(elapsedTime) {
            for (let click in that.clicks) {
                if (!that.clicks[click].done) {
                    let mousePos = that.clicks[click].mousePos;
                    for (let handler in that.clickHandlers) {
                        let box = that.clickHandlers[handler].box;

                        if(mousePos.x <= box.x2 && mousePos.x >= box.x1 && mousePos.y <= box.y2 && mousePos.y >= box.y1){
                            that.clickHandlers[handler].handler(elapsedTime);
                        }
                    }

                    that.clicks[click].done = true;
                    
                }
            }


            // for (let hover in that.hovers) {
            //     if (!that.hovers[hover].done) {
            //         let mousePos = that.hovers[hover].mousePos;
            //         for (let handler in that.hoverHandlers) {
            //             let box = that.hoverHandlers[handler].box;

            //             if(mousePos.x <= box.x2 && mousePos.x >= box.x1 && mousePos.y <= box.y2 && mousePos.y >= box.y1){
            //                 that.hoverHandlers[handler].handler(elapsedTime);
            //             }
            //         }

            //         that.hovers[hover].done = true;
                    
            //     }
            // }

            that.clicks = [];
            //that.hovers = [];
        };

        return that;
    }

    return {
        Keyboard : Keyboard,
        Mouse : Mouse
    };
}());
