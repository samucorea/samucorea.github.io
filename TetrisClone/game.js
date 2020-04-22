var allShapes = [];
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var currentShape;

var game = new Array(canvas.height/scale+ 1);
var jumping;
var isOn = true;

for(let i = 0; i < game.length;i++){
    game[i] = new Array(canvas.width/scale).fill(0);
   
}
game[game.length-1] = new Array(canvas.width/scale).fill(1);

allShapes.push(new Shape());


currentShape = allShapes[allShapes.length-1];

currentShape.initializeShape();
 var playing = setInterval(juego,1000);










function clearShape(){
    for(let i = 0;i < currentShape.totalBlocks.length;i++){
        ctx.clearRect(currentShape.totalBlocks[i].x,currentShape.totalBlocks[i].y,scale,scale);
    }
}
function drawNew(matrix){

    for(var i = 0; i < matrix.length; i++){
       for(let x = 0; x < matrix[i].length; x++){
           if(matrix[i][x] == 1){
               var block = new Block(x*scale,i*scale);
               block.draw();
              
           }
       }
       
    }
}
function juego(){

   
    
  
    if(currentShape.hasFallen){
       
        
    
        allShapes.push(new Shape());
        currentShape = allShapes[allShapes.length-1];
        currentShape.initializeShape();
        
       
       
       
    }else{
        clearShape();
    }
   
    
    currentShape.update();
     currentShape.drawShape();

    
}

