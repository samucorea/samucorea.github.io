var allShapes = [];
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var currentShape;
var game = new Array(40);

for(let i = 0; i < game.length;i++){
    game[i] = new Array(30).fill(0);
  
}

allShapes.push(new Shape());


currentShape = allShapes[allShapes.length-1];
currentShape.drawShape();
setInterval(function(){
    
   
   
    
  
    if(currentShape.hasFallen){
       
        for(let i = 0;i<4;i++){
           var blockx = currentShape.totalBlocks[i].x/10;
           var blocky = currentShape.totalBlocks[i].y/10;
            game[blocky][blockx] = 1;

        }
        
        allShapes.push(new Shape());
        currentShape = allShapes[allShapes.length-1];
       
       
    }else{
        for(let i = 0;i < currentShape.totalBlocks.length;i++){
            ctx.clearRect(currentShape.totalBlocks[i].x,currentShape.totalBlocks[i].y,10,10);
        }
    }
    currentShape.drawShape();
    currentShape.update();
    
   

   
    
    

},1000);




