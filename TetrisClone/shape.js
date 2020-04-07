var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var totalCols = canvas.width/30;
var totalRows = canvas.height/10;



class Block {
    x = 0;
    y = 0;
    constructor(x,y){
        this.x = x;
        this.y = y;
        ctx.fillStyle = "red";
        ctx.fillRect(x,y,10,10);
        ctx.strokeRect(x,y,10,10);
    }
}

class Shape{
    x = 20;
    y = 100;
    hasFallen = false;
    totalBlocks = new Array(4);
    speed = 10;
    type = Math.floor(Math.random() * 7);
  
  
    drawShape(){
        var xsquare = this.x;
        var ysquare = this.y;

        
        switch(this.type){
            case 0:
                // [][][][]
               
                for(let i = 0;i < this.totalBlocks.length;i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    xsquare+=10;
                   
                
                }
               
       
                break;
            

            case 1:
                //[]
                //[][][]
                
                this.totalBlocks[0] = new Block(xsquare,ysquare);
                ysquare += 10;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare,10,10);
                    xsquare += 10;
                    
                }
                break;
            case 2:
                     //[]
                 //[][][]

                 this.totalBlocks[0] = new Block(xsquare,ysquare);
                ysquare += 10;
                for(let i = 1; i < 4; i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    xsquare -= 10;
                    
                    
                }
         
                break;
            case 3:
                //[][]
                //[][]
                for(let i = 0; i <= 2;i +=2){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    this.totalBlocks[i+1] = new Block(xsquare+10,ysquare);
                    ysquare+=10;
                }
                break;
            case 4:
                //[][]
            //  [][]
                
               for(let i = 0; i <= 2; i+=2){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    this.totalBlocks[i+1] = new Block(xsquare+10,ysquare);
                   
                    ysquare -= 10;
                    xsquare += 10;
               }
                break;
            case 5:
            //[]
        //  [][][]

               for(let i =0; i < 3; i++){
                   this.totalBlocks[i] = new Block(xsquare,ysquare);
                   xsquare+=10;
               }
               xsquare -=20;
               ysquare -=10;
               this.totalBlocks[3]= new Block(xsquare,ysquare);
               break;

            case 6:
          //  [][]
            //  [][]
            for(let i = 0; i <= 2; i+=2){
                this.totalBlocks[i] = new Block(xsquare,ysquare);
                this.totalBlocks[i+1] = new Block(xsquare+10,ysquare);
               
                ysquare -= 10;
                xsquare -= 10;
           }
           break;
              
        }
         
    }
    update(){
        
        addEventListener('keydown',keyMov);

        
        if(this.totalBlocks.every(function(block){return block.y < 390})&& this.hasFallen == false && this.totalBlocks.every(checkBlock)){
        
            this.y += this.speed;
           
        }
        else{

          
            this.hasFallen = true;
           
        }

        for(let i = 0; i < 4; i++){
            if(game[(this.totalBlocks[i].y/10)+1][this.totalBlocks[i].x/10] == 1){
            setTimeout(function(){this.hasFallen = true;},1000);
                
            
            }
            
        }
        

        }
    
    }
   function keyMov(event){
       console.log(currentShape.totalBlocks.every(checkBlock));
    if(event.keyCode == 39 && currentShape.totalBlocks.every(function(block){return block.x <290 && game[block.y/10][block.x/10 + 1] != 1})){
        currentShape.x+=10;
        
 
    }

    if(event.keyCode == 37 && currentShape.totalBlocks.every(function(block){return block.x > 0 && game[block.y/10][block.x/10 -1] != 1})){
        currentShape.x-=10;
    }

    if(event.keyCode == 40 && currentShape.totalBlocks.every(function(block){return block.y < 390}) && currentShape.totalBlocks.every(checkBlock)){

        currentShape.y += 10;
       
    }
    for(let i = 0;i < currentShape.totalBlocks.length;i++){
        ctx.clearRect(currentShape.totalBlocks[i].x,currentShape.totalBlocks[i].y,10,10);
    }

    currentShape.drawShape();
}

   

   function checkBlock(block){
       return game[block.y/10 + 1][block.x / 10] != 1;
   }

   function adyacentBlockright(block){
       return game[block.y/10][block.x/10+1] != 1;
   }


