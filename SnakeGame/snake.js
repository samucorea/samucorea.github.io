var canvas =document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var scale = 10;
var rows = canvas.height/10;
var cols = canvas.width/10;
var colas = [];
var right = true;
var left, up , down;
left = up = down = false;

class Snake {
    constructor(x, y){
        //this.totalColas = 1;
        this.x = x;
        this.y = y;
        this.xSpeed = 10;
        this.ySpeed = 0;
        this.show = function () {
            ctx.fillStyle = "green";
            
            ctx.fillRect(this.x, this.y, scale, scale);
            
        };

        this.update = function () {
         
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            
        };
       
        addEventListener("keydown", function () {
            if (event.keyCode == "38" && down == false) {
                up = true;
                right = left = down = false;
                player.xSpeed = 0;
                player.ySpeed = -scale;
            }
            if (event.keyCode == "40" && up == false) {
                down = true;
                up = right = left = false;
                player.xSpeed = 0;
                player.ySpeed = scale;
            }
            if (event.keyCode == "37" && right == false) {
                left = true;
                right = up = down = false;
                player.xSpeed = -scale;
                player.ySpeed = 0;
            }
            if (event.keyCode == "39" && left == false) {
                right = true;
                up = down = left = false;
                player.xSpeed = scale;
                player.ySpeed = 0;
            }
        });
        
    }
}

class Fruit{

    constructor(){
        this.x = Math.floor(Math.random() * 10) * rows;
        this.y = Math.floor(Math.random()*10) * cols;

        this.draw = function(){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x,this.y,scale,scale);
        }
        


        
    }

   
    
}