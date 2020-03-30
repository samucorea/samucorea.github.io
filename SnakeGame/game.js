var canvas =document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var total = 0;
var player = new Snake(150,150);
var fruit = new Fruit();
var colas = [player];









var Game = setInterval(() => {
    ctx.clearRect(0,0,300,300);
//If fruit eaten
if(player.x == fruit.x && player.y == fruit.y){
       
    fruit = new Fruit();
    var newTail = new Snake(player.x,player.y);
    colas.unshift(newTail);

    
    
}
    //Show snake tails
    
    for(var i =0;i < colas.length-1; i++){
        
        colas[i].x = colas[i+1].x;
        colas[i].y = colas[i+1].y;
        
        colas[i].show();
      
        
        
        
    }
    //Create random fruit
    fruit.draw();
    //Update snake head
    player.update();
    player.show();
    
    for(var i =0;i < colas.length-1;i++){
        
        if(player.x == colas[i].x && player.y == colas[i].y){
            clearInterval(Game);
           
        }
       
    }
    if(player.x < 0){
        player.x = 0;
        player.show();
         clearInterval(Game);
    } 
    else if(player.x > 290){
        player.x = 290;
        player.show();
        clearInterval(Game);
    }
    else if(player.y > 290){
        player.y = 280;
        player.show();
        clearInterval(Game);
    }
    else if(player.y < 0){
        player.y = 0;
        player.show();
        clearInterval(Game);
    }
    //Border defining
    // if(player.x == -10){
     
    //     player.x = 0;
    // }
    // if(player.x == canvas.width){
    //     player.x = canvas.width-10;
        
    // }
   
    // if (player.y == canvas.height){
    //     player.y = canvas.height-10;
    // }
    // if(player.y == -10){
    //     player.y = 0;
    // }
    
   
   
    }, 200);

    
   

