$(document).ready(function() {
    let canvas = $("#screen")[0];
    let ctx = canvas.getContext("2d");
    let wdtScreen = $("#screen").width();
    let hdtScreen = $("#screen").height();
    let blockSize = 20;
    let xBlock = 20;
    let yBlock = 15;
    let foodBlock;
    let block;
    let growSize = 0;
    let gameloop = setInterval(update, 100);

    //FUNCTION UPDATE IS CALLED REPEATEDLY BY THE SETINTERVAL EVERY 100 MILISECONDS. TO CHECK IF THE BLOCK PASS THE BOARD SCREEN, IF THE BLOCK IS IN THE SAME PLACE OF THE FOOD BLOCK, THE BLANK TO REFRESH DE BACKGROUND COLOR, AND THE PAINT FOOD AND BLOCK, TO PAINT THE NEW POSITION IN THE SCREEN.
    function update() {
        checkBorders();
        checkFoodBlock();
        blank();
        paintPood(foodBlock.x, foodBlock.y, "#119DA4");
        paintBlock(block.x, block.y, "#FFC857");
    }
    
    // SHOWGAMEOVER, THIS FUNCTION DISPLAY THE MESSAGE GAME OVER IN THE SCREEN.
    function showGameOver() {
        $('#gameover').fadeIn()
    }
    
    //THIS FUNCTION IS TO DISPLAY THE FOOD BLOCK IN THE SCREEN, POSITION X AND Y IS RANDOMLY.MATH.RANDOM RETURNS A RANDOM NUMBER BETWEEN 0 AND 1, WHICH IS THEN MULTIPLIED BY (WDTSCREEN-BLOCKSIZE)/BLOCKSIZE TO GENERATE A VALUE IN THE RANGE OF THE GRID WIDTH.
    function placefoodBlock() {
        foodBlock = {
            x:Math.round(Math.random()*(wdtScreen-blockSize)/blockSize),
            y:Math.round(Math.random()*(hdtScreen-blockSize)/blockSize),
        }
    }
    placefoodBlock();


    //THIS FUNCTION IS TO DISPLAY THE BLOCK IN THE MIDDLE OF THE SCREEN, I JUST SETUP THE FIX POSITION Y AND POSITION X TO MY BLOCK. 
    function placeblock() {
        block = {
            x:xBlock,
            y:yBlock,
        }
    }
    placeblock();


    //MY LOGIC IN THIS FUNCTION IS IF THE BLOCK IN POSITION X IS SMALLER OF THE POSITION 0 OR BIGGER THEN MY MAX X POSITION (SCREEN), IT MEANS THE BLOCK PASSES COMPLETELY OF THE SCREEN. THE SAME IN THE POSITION Y, IF THE BLOCK POSITION Y IS SMALLER OF THE POSITION 0 OR BIGGER THEN MY MAX Y POSITION (SCREEN), IT MEANS THE BLOCK PASSES COMPLETELY OF THE SCREEN.
    function checkBorders() {
        if (block.x < 0 || block.x > (wdtScreen-blockSize)/blockSize || block.y < 0 || block.y > (hdtScreen-blockSize)/blockSize) {
            clearInterval(gameloop);
            showGameOver();
        }
    }
   
    //FUNCTION TO PAINT THE BORDER AND COLOR IF THE BLOCK.
    function paintBlock(x,y,color){
        ctx.fillStyle=color;
        ctx.fillRect(x*blockSize,y*blockSize,blockSize+(growSize*25),blockSize+(growSize*25));
        ctx.strokeStyle="#F6F6F6"; //BLOCK BORDER COLOR;
        ctx.strokeRect(x*blockSize,y*blockSize,blockSize+(growSize*25),blockSize+(growSize*25)); //BLOCK BORDER SIZE;
    }

    //FUNCTION TO PAINT THE BORDER AND COLOR IF THE FOOD.
    function paintPood(x,y,color){
        ctx.fillStyle=color;
        ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize); //PAINT THE BLOCK FOOD
        ctx.strokeStyle="#F6F6F6"; //BLOCK BORDER COLOR;
        ctx.strokeRect(x*blockSize,y*blockSize,blockSize,blockSize); //BLOCK BORDER SIZE;
    }

    //MY SCREEN COLOR
    function blank(){
        ctx.fillStyle = "#1F2041";
        ctx.fillRect(0, 0, wdtScreen, hdtScreen);
    }
   
    //THIS FUNCTION CHECKS IF THE FOOD AND BLOCK ARE IN THE SAME LOCATION (POSITION X AND POSITION Y). IF THEY ARE, INCREASE THE VARIABLE GROWSIZE AND INCREASE THE SCORE, AND CALL THE FUNCTION PLACEFOOD BLOCK TO CREATE AND SHOW ME ANOTHER FOOD IN ANOTHER POSITION. THIS VARIABLE GROWSIZE IS RESPONSIBLE TO INCREASE THE SIZE OF THE BLOCK, IT MEANS, IF THE FOOD AND BLOCK IN THE SAME LOCATION, GROW THE BLOCK.
    function checkFoodBlock() {
        if (foodBlock.x == block.x && foodBlock.y == block.y){
            growSize++;
            var foodScore = parseInt($('#score').text());
            foodScore += 1;
            $('#score').text(foodScore);
            placefoodBlock();
        }
    }
    checkFoodBlock();


    //FUNCTION TO MOVE THE BLOCK, IF THE KEY PRESS IS UP, DOWN, LEFT OR RIGHT MOVE THE BLOCK. INCREASE OR DECREASE IN THE POSITION X OR Y.
    $(document).keydown(function(e){
        var key = e.which;
        if(key == "37") {
            block.x -= 1;
        }
        else if(key == "38") {
            block.y -= 1;
        }
        else if(key == "39") {
            block.x += 1;
        }
        else if(key=="40") {
            block.y += 1;
        }
    });


    // TO SET THE LEVEL OF MY GAME, I CREATE THE FUNCTION TIMEOUT TO STOP THE GAME LOOP AND SHOW ME THE MESSAGE GAME OVER. AND I USED THIS FUNCTION IN THE SETTIMEROUT
    function timerOut(){
        clearInterval(gameloop);
        showGameOver();
    }
    
    //IF I CLIKED IN EASY BUTTON, SET TIMER OUT, CALL THE FUNCTION TIME OUT AFTER 600.000MS, IT MEANS 10 MINUTES
    $("#easy").click(function(){
        setTimeout(timerOut, 6000);
    });

    //IF I CLIKED IN EASY BUTTON, SET TIMER OUT CALL THE FUNCTION TIMEOUT AFTER 300.000MS, IT MEANS 5 MINUTES
    $("#medium").click(function(){
        setTimeout(timerOut, 300000);
    });

    //IF I CLIKED IN EASY BUTTON, SET TIMER OUT, CALL THE FUNCTION TIME OUT AFTER 120.000MS, IT MEANS 2 MINUTES
    $("#hard").click(function(){
        setTimeout(timerOut, 120000);
    });
   
});
