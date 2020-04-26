var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var totalCols = canvas.width/60;
var totalRows = canvas.height/20;
var updating = 0;
var scale = 20;




const Color = {
    1 : "#FF355E",
    2 : "#FD5B78",
    3 : "#FF6037",
    4 : "#CCFF00",
    5 : "#AAF0D1",
    6 : "#EE34D2",
    7 : "#FF00CC",

}




class Block {
    x = 0;
    y = 0;
    color;
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
     
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,scale,scale);
         ctx.strokeRect(this.x,this.y,scale,scale);
    }
  
  
}

class Shape{

    
    x = 60;
    y = 0;
    hasFallen = false;
    totalBlocks = new Array(4);
    speed = scale;
    type = Math.floor(Math.random() * 7);
   
  
  
    initializeShape(){
        
        var xsquare = this.x;
        var ysquare = this.y;
     

        
        switch(this.type){
            case 0:

                // [][][][]
               
                for(let i = 0;i < this.totalBlocks.length;i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare,Color[1]);
                    xsquare+=scale;
                   
                
                }
               
               
       
                break;
            

            case 1:
                //[]
                //[][][]
                
                this.totalBlocks[0] = new Block(xsquare,ysquare,Color[2]);
                ysquare += scale;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare,Color[2]);
                    
                    xsquare += scale;
                    
                }
         
                break;
            case 2:
                     //[]
                 //[][][]

                 this.totalBlocks[0] = new Block(xsquare,ysquare,Color[3]);
                
                ysquare += scale;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare,Color[3]);
                  
                    xsquare -= scale;
                    
                    
                }
         
                break;
            case 3:
                //[][]
                //[][]
                for(let i = 0; i <= 2;i +=2){
                     this.totalBlocks[i] = new Block(xsquare,ysquare,Color[4]);
                 
                    this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare,Color[4]);
           
                    ysquare+=scale;
                }
                break;
            case 4:
                //[][]
            //  [][]
                
               for(let i = 0; i <= 2; i+=2){
                    this.totalBlocks[i] = new Block(xsquare,ysquare,Color[5]);
              
                    this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare,Color[5]);
                   
                   
                    ysquare -= scale;
                    xsquare += scale;
               }
                break;
            case 5:
            //[]
        //  [][][]

               for(let i =0; i < 3; i++){
                   this.totalBlocks[i] = new Block(xsquare,ysquare,Color[6]);
          
                   xsquare+=scale;
               }
               xsquare -=scale*2;
               ysquare -=scale;
               this.totalBlocks[3]= new Block(xsquare,ysquare,Color[6]);
         
               break;

            case 6:
          //  [][]
            //  [][]
            for(let i = 0; i <= 2; i+=2){
                this.totalBlocks[i] = new Block(xsquare,ysquare,Color[7]);
                
                this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare,Color[7]);
         
               
                ysquare -= scale;
                xsquare -= scale;
           }
           break;
              
        }
        
         
    }
    drawShape(){

        for(let i = 0; i < 4; i++){
            this.totalBlocks[i].draw();
        }
        jumping = false;
    }
    
   
    update(){
     
        jumping = true;
    
      
        
        if(this.totalBlocks.every(function(block){return block.y < canvas.height-10}) && this.totalBlocks.every(checkBlock)){

           
                this.modify(0,this.speed);
            
           
        }
       
        
        else{
               var thisShape = this;
               
                var shapeColor = this.type + 1;

                 setTimeout(function(){
                if(!(thisShape.totalBlocks.every(function(block){return block.y < canvas.height-10}) && thisShape.totalBlocks.every(checkBlock))){
                   
                    clearInterval(playing);
                   
   
                    
                   thisShape.hasFallen = true;
                  
                   
                   
                   var spots = [];
                   var lastSpot;
                   var counter = 0;
                   var changingLevel = false;
                   var currentRowsTaken;
                    for(let i = 0;i<4;i++){
                        var blockx = thisShape.totalBlocks[i].x/scale;
                        var blocky = thisShape.totalBlocks[i].y/scale;
                        game[blocky][blockx] = shapeColor;
                      
                        
                        
                    }
                    checkLines(spots);
                    
                    currentRowsTaken = spots.length;
                    
                   
         
                  
                  
                   
                  if(spots.length > 0){

                 
                     
                    for(let i = 0; i < spots.length; i++){
                        ctx.clearRect(0,spots[i]*scale,canvas.width,scale);
                        
                        game[spots[i]].fill(0);
                     
                        
                    }
                   
                  
                   
                    while(spots.length > 0){

                        
                

                        lastSpot =spots.pop() + counter;
                       
                       
                        if(game[lastSpot].some(function(block){ return block != 0})){
                           
                            break;
                        }
                        
  
                            do{
                         
                            
                            for(var x = lastSpot; x > 0; x--){
                               
                                game[x] = [...game[x-1]];
                              
                               
                               
                            }
                         
                           
                           
                           
                            
                        } while(game[lastSpot].every(block => {return block == 0}));
                        
                        
                      
                    
                            
                            counter++;
                    }
                    
                    
                    
                     ctx.clearRect(0,0,canvas.width,canvas.height);   
                     drawNew(game);
                     changingLevel = calculatePoints(currentRowsTaken);
                    
                }
                //If level is not changing, then create the interval. This is because in the CalculatePoints function, it is necessary
                // to create a new interval with changed time. If left open it would cause a double interval.(see scoring.js)
                if(!changingLevel){
                playing = setInterval(juego,timeInterval);
                }
               
                }
                
                
              },500);
                    
               
          
           
        }
        if(this.totalBlocks.some(function(block){return block.y < 0})){
            clearInterval(playing);
            document.write("puto");
        }
       
       

        

        }
        modify(accX,accY){
            for(let i = 0; i < 4; i++){
                this.totalBlocks[i].x += accX;
                this.totalBlocks[i].y += accY;
            }
        }
        
        rotateShape(){
             
         
           var beforeTotalBlocks = [...this.totalBlocks];
           var horizontalCenter = this.totalBlocks[1].x;
           var verticalCenter = this.totalBlocks[1].y;
           var aux;

            for(let i = 0; i < 4; i++){

                if( i == 1){
                    continue;
                }
               
                var y = this.totalBlocks[i].y;
                var x = this.totalBlocks[i].x;

                y-= verticalCenter;
                x -= horizontalCenter;
                aux = x;
                x = -y;
                y = aux;
                 x+= horizontalCenter;
                y += verticalCenter;
                
                if(game[y/scale][x/scale] == 1 && y/scale != game.length-1 || x > canvas.width-scale || x < 0){
               
                    this.totalBlocks = [...beforeTotalBlocks];
                    return;
                
                }
               

               this.totalBlocks[i]= new Block(x,y);
              
            }
            if(this.totalBlocks.some(function (blockY){return blockY > canvas.height})){
                console.log("hola");
                for(let i = 0; i < this.totalBlocks.length;i++){
                    this.totalBlocks[i].y -= scale;
                }

            }
            this.drawShape();
        }
        
    
    }
   function keyMov(event){

     
        clearShape();
        if(event.keyCode == 39 && currentShape.totalBlocks.every(function(block){return block.x <canvas.width - scale && game[block.y/scale][block.x/scale + 1] == 0}) ){
            currentShape.modify(scale,0);
        
 
         }

        if(event.keyCode == 37 && currentShape.totalBlocks.every(function(block){return block.x > 0 && game[block.y/scale][block.x/scale -1] == 0})){
            currentShape.modify(-scale,0);
        }

        if(event.keyCode == 40 && currentShape.totalBlocks.every(function(block){return block.y < canvas.height - scale}) && jumping == false){
    
     
           currentShape.update();

        }

        if(event.keyCode == 38 && currentShape.type != 3){
            
        
           currentShape.rotateShape();
              
                
     
          
           
        }
        if(event.keyCode == 32){
       
            if(isOn){
                
            clearInterval(playing);
            isOn = false;
            }
            else if(!isOn){
                playing  = setInterval(juego,timeInterval);
                isOn = true;
            }
        }
    
    
    currentShape.drawShape();

  
    
}

   

   function checkBlock(block){
       try{
       
       return game[block.y/scale + 1][block.x / scale] == 0;
       }
       catch{
         
       }
   }

 function checkLines(spots)
 {
     
   for(var i =0; i < game.length-1; i++){
       if(game[i].every(block =>{return block > 0})){
        spots.push(i);
       }
   }
  
    
 }
  

   addEventListener('keydown',keyMov);