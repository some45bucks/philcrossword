function crossword(texture,textureSelected,solution,hints,w,h,posX,posY,sizeX,sizeY,inputs){
    let cellsizeX = sizeX/w;
    let cellsizeY = sizeY/h;
    let that = {
        crossword: [],
        focused: {hint:hints["0"]},
        cellsizeX,
        cellsizeY,
        texture,
        textureSelected
    }
    

    for(let x = 0;x<w;x++){

        for(let y = 0;y<h;y++){
            if(solution[x][y] !== ' '){
                let sub = ''
                let sol = ''
                let hint = hints["0"];
                if(solution[x][y].length == 2){
                    sol = solution[x][y].charAt(0);
                    sub = solution[x][y].charAt(1);
                    hint = hints[sub];
                }
                else{
                    sol = solution[x][y]
                }
                let wY = x*cellsizeX+posX;
                let wX = y*cellsizeY+posY;

                let cell = {
                    correctLetter: sol,
                    currentLetter: '',
                    subscript: sub,
                    wX,
                    wY,
                    hint,
                };


                that.crossword.push(cell);

                let box = {
                    x1:wX,
                    x2:wX+(cellsizeX),
                    y1:wY,
                    y2:wY+(cellsizeY)
                };

                inputs.registerClickCommand(x+''+y,box,()=>{
                    that.focused = cell;
                });
            }
        }
    }

    that.isCorrect = function(){

        for(let c of that.crossword){

            if(c.correctLetter !== c.currentLetter){
                return false;
            }
        }

        return true;
    }

    that.setFocus = function(s){
        if( that.focused){
            that.focused.currentLetter = s.toUpperCase();
        }
        
    }

    return that
}