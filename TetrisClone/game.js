var newShape;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

newShape = new Shape();

addEventListener('keydown',keyMov);
setInterval(function(){



    ctx.clearRect(0,0,canvas.width,canvas.height);

    newShape.update();
    newShape.drawShape();
   
        
    

},1000);

function keyMov(event){
    if(event.keyCode == 39){
        newShape.x+=10;
        
 
    }
    if(event.keyCode == 37){
        newShape.x-=10;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);

    newShape.drawShape();
}



