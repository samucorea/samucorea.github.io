var allShapes = [];
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var currentShape;
console.log(canvas.height/scale);
var game = new Array(canvas.height/scale);
var jumping;

for(let i = 0; i < game.length;i++){
    game[i] = new Array(canvas.width/scale).fill(0);
  
}

allShapes.push(new Shape());


currentShape = allShapes[allShapes.length-1];

currentShape.initializeShape();
 setInterval(function(){
    
   
   
    
  
    if(currentShape.hasFallen){
       
        
        console.log(game);
        allShapes.push(new Shape());
        currentShape = allShapes[allShapes.length-1];
        currentShape.initializeShape();
        
       
       
       
    }else{
        clearShape();
    }
   
    
    currentShape.update();
     currentShape.drawShape();

    
   

   
    
    

 },1000);


function clearShape(){
    for(let i = 0;i < currentShape.totalBlocks.length;i++){
        ctx.clearRect(currentShape.totalBlocks[i].x,currentShape.totalBlocks[i].y,scale,scale);
    }
}

