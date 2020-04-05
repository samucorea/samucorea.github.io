var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var totalCols = canvas.width/30;
var totalRows = canvas.height/10;
var game = new Array(40);

for(let i = 0; i < game.length;i++){
    game[i] = new Array(30).fill(0);
  
}


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
    y = 200;
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
                for(let i = 0; i < 2;i++){
                    this.totalBlocks[i] = new Block(xsquare,ysquare);
                    this.totalBlocks[i+1] = new Block(xsquare+10,ysquare);
                    ysquare+=10;
                }
                break;
            case 4:
                //[][]
            //  [][]
                
               for(let i = 0; i < 2; i++){
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
               this.totalBlocks.push(new Block(xsquare,ysquare));
               break;

            case 6:
          //  [][]
            //  [][]
            for(let i = 0; i < 2; i++){
                this.totalBlocks[i] = new Block(xsquare,ysquare);
                this.totalBlocks[i+1] = new Block(xsquare+10,ysquare);
               
                ysquare -= 10;
                xsquare -= 10;
           }
           break;
                
        }
        
    }
    update(){
        this.y += this.speed;
       
    
    }
   
   
   
}

