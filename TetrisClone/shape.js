var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var totalCols = canvas.width/60;
var totalRows = canvas.height/20;
var updating = 0;
var scale = 20;




class Block {
    x = 0;
    y = 0;
    constructor(x,y){
        this.x = x;
        this.y = y;
     
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,scale,scale);
         ctx.strokeRect(this.x,this.y,scale,scale);
    }
  
  
}

class Shape{

    
    x = 160;
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
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    xsquare+=scale;
                   
                
                }
               
               
       
                break;
            

            case 1:
                //[]
                //[][][]
                
                this.totalBlocks[0] = new Block(xsquare,ysquare);
                ysquare += scale;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    
                    xsquare += scale;
                    
                }
         
                break;
            case 2:
                     //[]
                 //[][][]

                 this.totalBlocks[0] = new Block(xsquare,ysquare);
                
                ysquare += scale;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                  
                    xsquare -= scale;
                    
                    
                }
         
                break;
            case 3:
                //[][]
                //[][]
                for(let i = 0; i <= 2;i +=2){
                     this.totalBlocks[i] = new Block(xsquare,ysquare);
                 
                    this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare);
           
                    ysquare+=scale;
                }
                break;
            case 4:
                //[][]
            //  [][]
                
               for(let i = 0; i <= 2; i+=2){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
              
                    this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare);
                   
                   
                    ysquare -= scale;
                    xsquare += scale;
               }
                break;
            case 5:
            //[]
        //  [][][]

               for(let i =0; i < 3; i++){
                   this.totalBlocks[i] = new Block(xsquare,ysquare);
          
                   xsquare+=scale;
               }
               xsquare -=scale*2;
               ysquare -=scale;
               this.totalBlocks[3]= new Block(xsquare,ysquare);
         
               break;

            case 6:
          //  [][]
            //  [][]
            for(let i = 0; i <= 2; i+=2){
                this.totalBlocks[i] = new Block(xsquare,ysquare);
                
                this.totalBlocks[i+1] = new Block(xsquare+scale,ysquare);
         
               
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


               setTimeout(function(){
                if(!(thisShape.totalBlocks.every(function(block){return block.y < canvas.height-10}) && thisShape.totalBlocks.every(checkBlock))){
                   thisShape.hasFallen = true;
                    for(let i = 0;i<4;i++){
                        var blockx = thisShape.totalBlocks[i].x/scale;
                        var blocky = thisShape.totalBlocks[i].y/scale;
                        game[blocky][blockx] = 1;

                        if(game[blocky].every(function(spot){return spot == 1})){
                            ctx.clearRect(0,thisShape.totalBlocks[i].y,canvas.width,scale);
                            game[blocky].fill(0);
                            for(var x = 19; x > 0; x--){
                                game[x] = game[x-1].slice(0);
                               
                            }
                            ctx.clearRect(0,0,canvas.width,canvas.height);
                            drawNew(game);
                            
                            console.log(game);
                        }

                    }

                }
             

               },750);
                    
               
          
           
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
             
         

           var horizontalCenter = this.totalBlocks[1].x;
           var verticalCenter = this.totalBlocks[1].y;

            for(let i = 0; i < 4; i++){
                if( i == 1){
                    continue;
                }
               
                var y = this.totalBlocks[i].y;
                var x = this.totalBlocks[i].x;

                y-= verticalCenter;
                x -= horizontalCenter;
                var aux = x;
                x = -y;
                y = aux;
                 x+= horizontalCenter;
                y += verticalCenter;
               

               this.totalBlocks[i]= new Block(x,y);
               this.totalBlocks[i].draw();
            }
        }
        
    
    }
   function keyMov(event){

     
        clearShape();
        if(event.keyCode == 39 && currentShape.totalBlocks.every(function(block){return block.x <canvas.width - scale && game[block.y/scale][block.x/scale + 1] != 1}) ){
            currentShape.modify(scale,0);
        
 
         }

        if(event.keyCode == 37 && currentShape.totalBlocks.every(function(block){return block.x > 0 && game[block.y/scale][block.x/scale -1] != 1})){
            currentShape.modify(-scale,0);
        }

        if(event.keyCode == 40 && currentShape.totalBlocks.every(function(block){return block.y < canvas.height - scale}) && jumping == false){
    
     
           currentShape.update();

        }

        if(event.keyCode == 38){
        
        
           currentShape.rotateShape();
              
                
     
          
           
        }
    
    
    currentShape.drawShape();

  
    
}

   

   function checkBlock(block){
       try{
       
       return game[block.y/scale + 1][block.x / scale] != 1;
       }
       catch{
         
       }
   }

 
  

   addEventListener('keydown',keyMov);